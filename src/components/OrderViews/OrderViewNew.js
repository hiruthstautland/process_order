import React from "react";
import ListOrderCard from "../ListOrderCard/ListOrderCard";
import DetailedOrderCard from "../DetailedOrderCard";
import BtnOrderView from "../Buttons/BtnOrderView";
import { ContentLoader } from "../ContentLoader";
import {
  FormattedDeadline,
  TimeText,
  GetPacking,
} from "../../utils/listOrderCardFunc";
import { OrderVariables } from "../ListOrderCard/Style";
import BackButton from "../Buttons/BackButton";
import { Grid, Header, Main, InfoCard, HeaderInfo, Highlight } from "./Style";

export const NewOrderView = ({ order, now, handleChange, history }) => {
  let formattedDeadLine = FormattedDeadline(order, now);
  let timeText = TimeText(order);
  let getPacking = GetPacking(order, now);
  if (order["order_lines"]) {
    console.log(order["order_lines"]);
  }

  if (order && order.order_lines) {
    let orderElements = order.order_lines.map(
      ({
        productName,
        orderQuantity,
        productId,
        priceConsumer,
        imgUrl,
        size,
        color,
      }) => {
        return (
          <DetailedOrderCard
            key={productId}
            cardTitle={productName}
            size={size}
            color={color}
            priceConsumer={priceConsumer}
            orderQuantity={orderQuantity}
            productId={productId}
            imgUrl={imgUrl}
            showButton={false}
          />
        );
      }
    );

    return (
      <Grid>
        <Header>
          <BackButton onClick={() => history.goBack()} />
          {order.order_status === "in-process" ? (
            <Highlight>TIL HENTING</Highlight>
          ) : (
            <HeaderInfo>
              {timeText}
              {order.order_status === "new" ? (
                <OrderVariables expires={getPacking}>
                  {formattedDeadLine}
                </OrderVariables>
              ) : (
                <OrderVariables>{order.order_number}</OrderVariables>
              )}
            </HeaderInfo>
          )}
        </Header>
        <InfoCard>
          <ListOrderCard
            orderView={true}
            order={order}
            cardTitle={order.order_number}
          />
        </InfoCard>
        <Main>{orderElements}</Main>
        <BtnOrderView handleChange={handleChange} order={order} />
      </Grid>
    );
  }
  return <ContentLoader />;
};
export default NewOrderView;
