import styled from "styled-components";

export const Grid = styled.div`
  background-color: var(--varner-dark);
  height: 100vh;
  display: grid;
  grid-template-rows: 4rem 3fr 3fr 1fr;
  grid-template-areas:
    "back"
    "top"
    "main"
    "footer";
`;

export const Svg = styled.svg`
  height: 8rem;
  width: 8rem;
  justify-self: center;
  fill: white;
  margin-top: 3rem;
  padding: 2rem;
`;

export const Back = styled.div`
  grid-area: back;
  justify-self: left;
  padding: 0.7rem;
`;

export const Text = styled.div`
  grid-area: main;
  justify-self: center;
  color: var(--varner-text-white);
  text-align: center;
  padding: 1rem;
  h1 {
    font-size: 1.8rem;
  }
  p {
    font-size: 1.2rem;
    line-height: 1.8rem;
  }
`;

export const Title = styled.h1`
  grid-area: top;
  margin-top: 4rem;
  padding: 1rem;
  text-align: center;
  color: var(--varner-text-white);
  font-size: 1.8rem;
  line-height: 2.5rem;
`;

export const BigButtonContainer = styled.div`
  grid-area: main;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
`;
