import React from "react";
import { Grid, Title, BigButtonContainer, Svg, Text, Back } from "./Style";
import { SmallButtonContainer, LightBtn, BlackBtn } from "../Buttons/Style";
import BackButton from "../Buttons/BackButton";

const RejectedView = ({ confirmed, handleDeclinedReason, history, reason }) => {
  return (
    <>
      {!confirmed ? (
        <>
          <Grid>
            <Back>
              <BackButton />
            </Back>
            <Title>Hvorfor vil du avvise orderen?</Title>
            <BigButtonContainer>
              <LightBtn
                onClick={() =>
                  handleDeclinedReason("Varene er ikke tilgjengelig")
                }
              >
                Varen er ikke tilgjengelig
              </LightBtn>
              <LightBtn
                onClick={() => handleDeclinedReason("Varene er skadet")}
              >
                Varen er skadet
              </LightBtn>
              <LightBtn onClick={() => handleDeclinedReason("Har ikke tid")}>
                Har ikke tid
              </LightBtn>
              <LightBtn onClick={() => handleDeclinedReason("Annet")}>
                Annet
              </LightBtn>
            </BigButtonContainer>
          </Grid>
        </>
      ) : (
        <Grid>
          <Back />
          <Svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
            viewBox="0 0 16 16"
          >
            <path d="M15.854 12.854c-0-0-0-0-0-0l-4.854-4.854 4.854-4.854c0-0 0-0 0-0 0.052-0.052 0.090-0.113 0.114-0.178 0.066-0.178 0.028-0.386-0.114-0.529l-2.293-2.293c-0.143-0.143-0.351-0.181-0.529-0.114-0.065 0.024-0.126 0.062-0.178 0.114 0 0-0 0-0 0l-4.854 4.854-4.854-4.854c-0-0-0-0-0-0-0.052-0.052-0.113-0.090-0.178-0.114-0.178-0.066-0.386-0.029-0.529 0.114l-2.293 2.293c-0.143 0.143-0.181 0.351-0.114 0.529 0.024 0.065 0.062 0.126 0.114 0.178 0 0 0 0 0 0l4.854 4.854-4.854 4.854c-0 0-0 0-0 0-0.052 0.052-0.090 0.113-0.114 0.178-0.066 0.178-0.029 0.386 0.114 0.529l2.293 2.293c0.143 0.143 0.351 0.181 0.529 0.114 0.065-0.024 0.126-0.062 0.178-0.114 0-0 0-0 0-0l4.854-4.854 4.854 4.854c0 0 0 0 0 0 0.052 0.052 0.113 0.090 0.178 0.114 0.178 0.066 0.386 0.029 0.529-0.114l2.293-2.293c0.143-0.143 0.181-0.351 0.114-0.529-0.024-0.065-0.062-0.126-0.114-0.178z"></path>
          </Svg>
          <Text>
            <h1>Ordren er avvist!</h1>
            <hr />
            <p>
              Grunn: {reason} <br /> Du finner den under "avviste ordre"!
            </p>
          </Text>
          <SmallButtonContainer>
            <BlackBtn onClick={() => history.push("/new")}>
              Tilbake til oversikt
            </BlackBtn>
          </SmallButtonContainer>
        </Grid>
      )}
    </>
  );
};
export default RejectedView;
