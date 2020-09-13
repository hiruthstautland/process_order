import PickOrderButton from "../Buttons/PickOrderButton";
import React from "react";
import {
  ProdCard,
  ProdTitle,
  ProdImage,
  ProdUlElem,
  ProdLiElem,
  ButtonContainer,
  ProdErrorCard
} from "./Style";

const DetailedOrderCard = ({
  cardTitle,
  showButton,
  handleClick,
  pickedProducts,
  size,
  color,
  orderQuantity,
  imgUrl,
  productId
}) => {
  if (cardTitle === undefined) {
    return (
      <ProdErrorCard>
        <h5>Her har det skedd en feil!</h5>
        <p>:-(</p>
        <p>Informasjon om dette produktet mangler dessverre.</p>
        <p>Avvis denne ordren.</p>
      </ProdErrorCard>
    );
  }
  return (
    <ProdCard>
      <ProdTitle>{cardTitle}</ProdTitle>
      <ProdImage>
        <img src={imgUrl} width={"100%"} alt={"Inget bilde"} />
      </ProdImage>
      <ProdUlElem>
        <ProdLiElem>Str: {size} </ProdLiElem>
        <ProdLiElem>Farge: {color}</ProdLiElem>
        <ProdLiElem>Antall: {orderQuantity}</ProdLiElem>
        <ProdLiElem>SKU: {productId}</ProdLiElem>
        {orderQuantity > 1 && (
          <ProdLiElem>
            <span>Noter antall varer!</span>
          </ProdLiElem>
        )}
      </ProdUlElem>

      {showButton ? (
        <ButtonContainer>
          <PickOrderButton
            handleClick={handleClick}
            productId={productId}
            pickedProducts={pickedProducts}
          />
        </ButtonContainer>
      ) : (
        <React.Fragment />
      )}
    </ProdCard>
  );
};

export default DetailedOrderCard;
