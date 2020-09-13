import React from "react";
import ListOrderCard from "../ListOrderCard/ListOrderCard";
import DetailedOrderCard from "../DetailedOrderCard";
import BackButton from "../Buttons/BackButton";
import { ContentLoader } from "../ContentLoader";
import { Grid, Header, Highlight, Main, InfoCard, HeaderInfo } from "./Style";
import { SmallButtonContainer, BlackBtn } from "../Buttons/Style";

const Rejected = ({ order, history }) => {
  
  if (order && order.order_lines) {

    let orderElements = order["order_lines"].map(
      ({ productName, orderQuantity, productId, imgUrl, size, color }) => {
        return (
          <DetailedOrderCard
            key={productId}
            cardTitle={productName}
            size={size}
            color={color}
            orderQuantity={orderQuantity}
            productId={productId}
            imgUrl={imgUrl}
            showButton={false}
          />
        );
      }
    );
    console.log("orderElements", orderElements);

    return (
      <Grid>
        <Header>
          <BackButton onClick={() => history.goBack()} />
          <HeaderInfo>
            Avvist: <Highlight>{order.rejected_reason}</Highlight>
          </HeaderInfo>
        </Header>
        <InfoCard>
          <ListOrderCard
            order={order}
            orderQuantity={order.order_lines.length}
            cardTitle="Bestillingsammendrag"
          />
        </InfoCard>
        <Main>{orderElements}</Main>
        <SmallButtonContainer>
          <BlackBtn onClick={() => history.push("/rejected")}>
            Tilbake til oversikt
          </BlackBtn>
        </SmallButtonContainer>
      </Grid>
    );
  }
  return <ContentLoader />;
};

export default Rejected;
