import styled from "styled-components";

export const SmallButtonContainer = styled.div`
  background-color: var(--varner-light-grey);
  grid-area: footer;
  padding: 1rem;
  //margin-top: 2rem;
`;

const Button = styled.button`
  width: 100%;
  margin-top: 1rem;
  padding: 1rem;
  border: none;
  border-radius: 0;
  font-weight: bold;
`;

export const BigButton = styled(Button)`
  font-size: 1.5rem;
  box-shadow: -0.5px 0.5px 2px 0 var(--varner-dark);

  background: ${props =>
    props.greenBtn
      ? "  var(--varner-green)"
      : props.disabled
      ? "var(--varner-green-disabled)"
      : "var(--varner-green)"};
  color: ${props =>
    props.greenBtn ? " var(--varner-text-white)" : "var(--varner-text-white)"};
`;

export const BlackBtn = styled(BigButton)`
  background: var(--varner-black);
  color: var(--varner-text-white);
  box-shadow: -0.5px 0.5px 2px 0 var(--varner-dark);
`;

export const LightBtn = styled(Button)`
  background-color: var(--varner-light-grey);
  color: var(--varner-text-dark);
  font-size: 1.2rem;
  box-shadow: -1px 1px 3px 0 var(--varner-darkest);
`;

export const BackImg = styled.svg`
  height: 2rem;
  border-radius: 5px;
  //margin: 15px;
  fill: var(--varner-light-grey);
`;

export const BackBtn = styled.button`
  grid-column: 1 / 2;
  background-color: transparent;
  border: none;
`;

// else back btn
