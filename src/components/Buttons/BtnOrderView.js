import React from "react";
import { BigButton, SmallButtonContainer, BlackBtn } from "./Style";

const BtnOrderView = ({ order, handleChange, pickedProducts }) => {
  return (
    <SmallButtonContainer>
      {order.order_status !== "in-process" ? (
        <div>
          {order.order_status === "new" ? (
            <BigButton
              greenBtn
              value={"packed"}
              onClick={handleChange.bind(this, "packed")}
            >
              Godta ordre
            </BigButton>
          ) : (
            <BigButton
              value={"in-process"}
              disabled={pickedProducts.length !== order.order_lines.length}
              onClick={handleChange.bind(this, "in-process")}
            >
              Klar til opphenting
            </BigButton>
          )}
          <BlackBtn
            value={"rejected"}
            onClick={handleChange.bind(this, "rejected")}
          >
            Avvis ordre
          </BlackBtn>
        </div>
      ) : (
        <BigButton
          value={"delivered"}
          onClick={handleChange.bind(this, "delivered")}
        >
          Marker som levert !
        </BigButton>
      )}
    </SmallButtonContainer>
  );
};
export default BtnOrderView;
