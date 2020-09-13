import React, { useEffect, useState } from "react";
import NewOrderView from "./OrderViewNew";
import ProcessingOrderView from "./OrderViewProcessing";
import { Delivered } from "./OrderViewDelivered";
import Rejected from "./OrderViewRejected";
import { ContentLoader } from "../ContentLoader";
import ErrorCard from "../ErrorAndInfoCard/ErrorCard";
import {
  getOrderByOrderNumber,
  updateOrderStatus,
} from "../../clientAPI/clientAPI";
import { getFormattedDeadLine } from "../../utils/getFormattedDeadLine";
import { getFormattedDate } from "../../utils/getFormattedDate";

const OrderViews = ({ match, history }) => {
  const [error, setError] = useState(null);
  const [order, setOrder] = useState([]);
  const [now, setNow] = useState(new Date());
  const [loading, setLoading] = useState(null);
  const [pickedProducts, setPickedProducts] = useState([]);

  const { orderstatus, ordernumber } = match.params;

  useEffect(() => {
    let timeInterval = setInterval(updateTime.bind(this), 1000 * 60);

    setLoading(true);

    const getOrder = async () => {
      try {
        const order = await getOrderByOrderNumber(ordernumber);
        setOrder(order);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    getOrder();

    return () => {
      setLoading(null);
      clearInterval(timeInterval);
      setOrder([]);
    };
  }, [ordernumber]);

  const updateTime = () => {
    setNow(new Date());
  };

  const handleChange = async (newStatus) => {
    try {
      if (newStatus === "rejected") {
        return history.push(`/${orderstatus}/${ordernumber}/${newStatus}`);
      } else if (newStatus === "packed") {
        await updateOrderStatus(ordernumber, newStatus);
        return history.push(`/${orderstatus}/${ordernumber}/${newStatus}`);
      } else {
        setLoading(true);
        await updateOrderStatus(ordernumber, newStatus);
        setLoading(false);
        return history.push(`/${newStatus}`);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };
  const handleClick = (productId) => {
    if (pickedProducts.includes(productId)) {
      let i = pickedProducts.indexOf(productId);
      let pickedProductsCopy = [...pickedProducts];
      pickedProductsCopy.splice(i, 1);
      setPickedProducts(pickedProductsCopy);
    } else {
      setPickedProducts([...pickedProducts, productId]);
    }
  };

  if (loading) {
    return <ContentLoader />;
  }

  if (error) {
    return <ErrorCard />;
  }

  let ActiveView;

  switch (orderstatus) {
    case "new":
      ActiveView = NewOrderView;
      break;
    case "packed":
      ActiveView = ProcessingOrderView;
      break;
    case "in-process":
      ActiveView = NewOrderView;
      break;
    case "delivered":
      ActiveView = Delivered;
      break;
    case "rejected":
      ActiveView = Rejected;
      break;
    default:
      ActiveView = ErrorCard;
  }

  return order ? (
    <ActiveView
      order={order}
      now={now}
      getFormattedDeadLine={getFormattedDeadLine}
      getFormattedDate={getFormattedDate}
      handleChange={handleChange}
      history={history}
      pickedProducts={pickedProducts}
      handleClick={handleClick.bind(this)}
    />
  ) : (
    <ContentLoader />
  );
};

export default OrderViews;
