import React from 'react';

import { DarkCard } from '../ListOrderCard/Style';
import ListOrderCard from '../ListOrderCard/ListOrderCard';
import { getTotalOrderQuantity } from '../../utils/getTotalOrderQuantity';

const MainViewOrders = ({
  handleCardClick,
  orderstatus,
  allOrders,
  now,
  search,
}) => {
  // shows a list of orders based on active tab
  const orderListStatus = allOrders.filter(
    (order) => orderstatus === order.order_status
  );
  // filters based on input in search field
  let orderList = orderListStatus
    .filter(
      (order) =>
        order.customer_name.toLowerCase().indexOf(search) !== -1 ||
        order.customer_phone.toLowerCase().indexOf(search) !== -1
    )

    .map((order) => {
      return (
        <div
          onClick={() => handleCardClick(order.order_number)}
          key={order.order_number}
        >
          <DarkCard>
            <ListOrderCard
              now={now}
              order={order}
              orderQuantity={getTotalOrderQuantity(order.order_lines)}
              cardTitle={order.order_number}
            />
          </DarkCard>
        </div>
      );
    });
  return orderList.length === 0 ? null : orderList;
};

export default MainViewOrders;
