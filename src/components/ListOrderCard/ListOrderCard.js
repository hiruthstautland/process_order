import React from 'react';
import {
  FormattedDeadline,
  TimeText,
  GetPacking,
} from '../../utils/listOrderCardFunc';
import { getTotalOrderQuantity } from '../../utils/getTotalOrderQuantity';
import { getFormattedDate } from '../../utils/getFormattedDate';

import {
  OrderTitle,
  OrderTime,
  OrderVariables,
  OrderUlElem,
  OrderLiElem,
} from './Style';

const ListOrderCard = ({ order, cardTitle, now, orderView }) => {
  let formattedDeadLine = FormattedDeadline(order, now);
  let timeText = TimeText(order);
  let getPacking = GetPacking(order, now);

  return (
    <React.Fragment key={order.orderNumber}>
      <OrderTitle>{cardTitle}</OrderTitle>
      {orderView ? (
        ``
      ) : (
        <>
          {order.order_status !== 'in-process' && (
            <OrderTime>
              {timeText}
              <OrderVariables expires={getPacking}>
                {formattedDeadLine}
              </OrderVariables>
            </OrderTime>
          )}
        </>
      )}

      <OrderUlElem>
        <OrderLiElem>
          Antall varer: {getTotalOrderQuantity(order.order_lines)}
        </OrderLiElem>
        <OrderLiElem>
          Bestillingsdato: {getFormattedDate(order.created_in_app_at)}{' '}
        </OrderLiElem>
        {order.order_status !== 'delivered' &&
          order.order_status !== 'rejected' && (
            <>
              <OrderLiElem data-hj-suppress>
                Kunde: {order.customer_name}
              </OrderLiElem>
              <OrderLiElem>Telefon: {order.customer_phone}</OrderLiElem>
            </>
          )}
      </OrderUlElem>
    </React.Fragment>
  );
};
export default ListOrderCard;
