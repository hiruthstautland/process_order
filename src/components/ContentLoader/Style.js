import styled, { keyframes } from "styled-components";

export const Grid = styled.div`
  background-color: var(--varner-darkest);
  height: 100vh;
  width: 100vw;
`;
export const spin = keyframes`
100% {
transform: rotate(360deg);
}
`;

export const fade = keyframes`
20% {
opacity: 0.1;
}
40% {
opacity: 1;
}
60% {
opacity: 0.1;
}
`;

export const MagicV1 = styled.div`
  margin: auto;
  position: relative;
  top: 30%;
  box-sizing: border-box;
  background-clip: padding-box;
  width: 200px;
  height: 200px;
  border-radius: 100px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  mask: linear-gradient(rgba(0, 0, 0, 0.1), #000000 90%);
  transform-origin: 50% 60%;
  transform: perspective(200px) rotateX(180deg);
  animation: spinner-wiggle 1.2s infinite;
  ::before,
  ::after {
    content: "";
    position: absolute;
    margin: -4px;
    box-sizing: inherit;
    width: inherit;
    height: inherit;
    border-radius: inherit;
    opacity: 1;
    border: inherit;
    border-color: transparent;
    animation: ${spin} 1.2s cubic-bezier(0.1, 0.2, 0, 0.8) infinite,
      ${fade} 1.2s linear infinite;
  }
  :: before {
    border-top-color: var(--varner-green-disabled);
  }
  :: after {
    border-top-color: var(--varner-green);
    animation-delay: 0.3s;
  }
`;
