const fetch = require("node-fetch");
global.Headers = fetch.Headers;

async function getOrderObject(postedOrder) {
  let productDetails = await getOrderLists(postedOrder);

  let orderObjApp = {
    order_number: postedOrder.order_number,
    customer_name: postedOrder.customer_name,
    customer_phone: postedOrder.customer_phone,
    order_status: postedOrder.order_status,
    rejected_reason: postedOrder.rejected_reason,
    created_in_app_at: postedOrder.created_in_app_at,
    status_changed_at: postedOrder.status_changed_at,
    process_finished_at: postedOrder.process_finished_at,
    order_lines: productDetails,
  };
  return orderObjApp;
}

async function getOrderLists(postedOrder) {
  return await Promise.all(
    postedOrder.order_lines.map((order) => {
      try {
        let productDetails = {
          productId: order.sku || 0000000,
          productName: order.name || "No name found",
          description: order.description || "No information found",
          orderQuantity: order.quantity || 1,
          price: order.price || ",-",
          priceConsumer: order.offeredPrice || postedOrder.price,
          currency: order.currency || "NOK",
          imgUrl: order.productImageUrl || "No image found",
          color: order.color || "-",
          size: order.size || "unsex",
        };
        return productDetails;
      } catch (error) {
        return "Oh no! Could not get order details!";
      }
    })
  );
}

module.exports = getOrderObject;
