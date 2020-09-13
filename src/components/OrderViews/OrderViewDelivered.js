import React from "react";
import ListOrderCard from "../ListOrderCard/ListOrderCard";
import OrderCard from "../DetailedOrderCard";
import BackButton from "../Buttons/BackButton";
import { ContentLoader } from "../ContentLoader";
import { Grid, Header, Highlight, Main, InfoCard, HeaderInfo } from "./Style";
import { SmallButtonContainer, BlackBtn } from "../Buttons/Style";

export const Delivered = ({ order, history }) => {
  if (order && order.order_lines) {
    let orderElments = order.order_lines.map(
      ({ productName, orderQuantity, productId, imgUrl, size, color }) => {
        return (
          <OrderCard
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
    return (
      <Grid>
        <Header>
          <BackButton />
          <HeaderInfo>
            <Highlight>UTLEVERT</Highlight>
          </HeaderInfo>
        </Header>
        <InfoCard>
          <ListOrderCard
            order={order}
            orderQuantity={order.order_lines.length}
            cardTitle="Bestillingsammendrag"
          />
        </InfoCard>
        <Main>{orderElments}</Main>
        <SmallButtonContainer>
          <BlackBtn onClick={() => history.push("/delivered")}>
            Tilbake til oversikt
          </BlackBtn>
        </SmallButtonContainer>
      </Grid>
    );
  }
  return <ContentLoader />;
};
//  default Delivered;
