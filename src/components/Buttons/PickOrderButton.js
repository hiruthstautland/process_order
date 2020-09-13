import React from "react";
import styled from "styled-components";

const PickOrderButton = ({ handleClick, productId, pickedProducts }) => {
  const PickBtn = styled.button`
    background-color: var(--varner-redlight);
    color: var(--varner-black);
    box-shadow: 1px 1px 0.5px var(--varner-darkest);
    height: 3em;
    margin: 0.4em;
    font-weight: bold;
    font-size: 1.2rem;
    border: none;

    &.pick-button-active {
      background-color: var(--varner-greenlight);
      color: var(--varner-black);
    }
  `;

  return (
    <PickBtn
      className={pickedProducts.includes(productId) && "pick-button-active"}
      onClick={() => {
        handleClick(productId);
      }}
    >
      {pickedProducts.includes(productId) ? "Plukket" : "Marker som plukket"}
    </PickBtn>
  );
};

export default PickOrderButton;
