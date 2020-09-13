export function getOrderLinesTotal(orderlines) {
  let count = 0;

  orderlines.forEach(order => {
    if (order.orderQuantity) {
      count = count + order.orderQuantity;
    } else if (order.quantity) {
      count = count + order.quantity;
    }
  });

  return count.toString();
}
