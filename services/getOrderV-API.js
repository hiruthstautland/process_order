const fetch = require("node-fetch");
const base64 = require("base-64");
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
    order_lines: productDetails
  };
  return orderObjApp;
}

async function getOrderLists(postedOrder) {
  const login = process.env.V_LOGIN;
  const password = process.env.V_PASSWORD;

  return await Promise.all(
    postedOrder.order_lines.map(async order => {
      let style = order.sku.slice(0, 7);
      let url;
      let testMode = postedOrder.test_mode;

      testMode === "1" ? (testMode = "-test.varnerbeta") : (testMode = "");

      switch (postedOrder.chain_id) {
        case "10":
          url = `https://bikbok${testMode}.com/no/api/productfeed/v2/get?style=${style}`;
          break;
        case "30":
          url = `https://cubus${testMode}.com/no/api/productfeed/v2/get?style=${style}`;
          break;
        case "40":
          url = `https://dressmann${testMode}.com/no/api/productfeed/v2/get?style=${style}`;
          break;
        default:
          url = "";
      }

      if (!url) {
        throw new Error("- Cannot find url-adress for this chain! -");
      }

      try {
        let response = await fetch(url, {
          headers: new Headers({
            Authorization: `Basic ${base64.encode(`${login}:${password}`)}`
          })
        });

        let responseJSON = await response.json();

        let size;

        let productFromSkue = await responseJSON.find(product =>
          product.Skus.find(sku => {
            if (sku.ID === order.sku) {
              size = sku.Size;
              return true;
            } else {
              return false;
            }
          })
        );

        if (productFromSkue === undefined) {
          return {};
        }

        let productDetails = {
          productId: order.sku,
          productName: productFromSkue.Name,
          description: productFromSkue.Description,
          orderQuantity: order.quantity,
          price: productFromSkue.Price,
          priceConsumer: productFromSkue.OfferedPrice,
          currency: productFromSkue.Currency,
          imgUrl: productFromSkue.ProductImages[1].Url,
          color: productFromSkue.Color,
          size: size
        };

        return productDetails;
      } catch (error) {
        `getImgUrl-error: ${error}`;
      }
    })
  );
}

module.exports = getOrderObject;
