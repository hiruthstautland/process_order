var express = require("express");
var router = express.Router();
const getOrderObject = require("../services/getOrder");

const {
  createOrder,
  getStoreAccount,
  getAllOrders,
  updateOrderStatus,
  updateRejectedOrderStatus,
  getOrder,
  createOrderHistory,
} = require("../postgresAPI");

router.post("/orders", async (req, res, next) => {
  const orderObject = req.body;
  try {
    const newOrder = await createOrder(orderObject);
    return res.send(newOrder);
  } catch (error) {
    res.status(400).send(`Bad Request error: ${error.message}`);
  }
});

router.get("/:storename", async (req, res, next) => {
  let { storename } = req.params;
  let storeaccount = await getStoreAccount(storename);
  try {
    const allOrders = await getAllOrders(storeaccount);
    res.status(200).send(allOrders);
  } catch (error) {
    res.status(500).send(`Klarte ikke å finne tabellen!`);
  }
});

router.get("/:orderstatus/:ordernumber", async (req, res, next) => {
  const { ordernumber } = req.params;

  try {
    const postedOrder = await getOrder(ordernumber);
    const orderObjApp = await getOrderObject(postedOrder);

    res.status(200).send(orderObjApp);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.patch("/:ordernumber", async (req, res, next) => {
  const { ordernumber } = req.params;
  const { order_status, rejected_reason } = req.body;

  const postedOrder = await getOrder(ordernumber);

  try {
    if (order_status === "rejected") {
      let updateRejectedOrder = await updateRejectedOrderStatus(
        ordernumber,
        order_status,
        rejected_reason
      );

      // history table
      await createOrderHistory(postedOrder, order_status, rejected_reason);

      return res.status(200).send(updateRejectedOrder);
    }

    if (order_status === "in-process") {
      const updatedOrder = await updateOrderStatus(ordernumber, order_status);

      return res.status(200).send(updatedOrder);
    }

    if (order_status === "delivered") {
      // history table
      await createOrderHistory(postedOrder, order_status, rejected_reason);
    }

    const updatedOrder = await updateOrderStatus(ordernumber, order_status);
    res.status(200).send(updatedOrder);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    next(error);
  }
});

router.post("/errors", async (err, req, res, next) => {
  try {
    const errorObj = req.body;
    const newError = await logError(errorObj);
    res.send(newError);
  } catch (error) {
    res.status(500).send("Not able to post");
  }
});

module.exports = router;
