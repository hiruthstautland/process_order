import { updateRejectedOrderStatus } from '../clientAPI/clientAPI';
import { getFormattedDeadLine } from './getFormattedDeadLine';
import { getExpiryFromOrderDate } from './getExpiryFromOrderDate';
import { differenceInMinutes } from 'date-fns';

export const FormattedDeadline = (order, now) => {
  let formattedDeadLine = ``;
  if (order.order_status === 'new') {
    formattedDeadLine = getFormattedDeadLine(
      new Date(getExpiryFromOrderDate(order.created_in_app_at)),
      now
    );
  }
  if (formattedDeadLine === '0') {
    updateRejectedOrderStatus(order.order_number, 'rejected', 'Har ikke tid');
  }
  if (order.order_status === 'packed' || order.order_status === 'in-process') {
    formattedDeadLine = getFormattedDeadLine(
      now,
      new Date(order.status_changed_at)
    );
  }
  if (formattedDeadLine === '1 time') {
    updateRejectedOrderStatus(order.order_number, 'rejected', 'Har ikke tid');
  }
  return formattedDeadLine;
};

export const TimeText = (order) => {
  let info = ``;
  if (
    order.order_status === 'new' ||
    order.order_status === 'packed' ||
    order.order_status === 'in-process'
  ) {
    order.order_status === 'new'
      ? (info = `Utløper om: `)
      : (info = `Ventet: `);
  }
  return info;
};

export const GetPacking = (order, now) => {
  let prioritize = null;
  let diff;

  if (order.order_status === 'new') {
    diff = differenceInMinutes(
      new Date(getExpiryFromOrderDate(order.created_in_app_at)),
      now
    );
    prioritize = diff < 20;
  }
  if (order.order_status === 'packed') {
    diff = differenceInMinutes(now, new Date(order.status_changed_at));
    prioritize = diff > 20;
  }
  return prioritize;
};
