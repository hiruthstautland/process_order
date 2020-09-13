import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 10rem auto;
  padding: 1.5rem;
  background-color: var(--varner-dark);
`;

export const Main = styled.main`
  grid-row: 2 / 3;
  text-align: center;
  color: var(--varner-text-white);
  & a {
    color: var(--varner-link);
    font-size: 1.2rem;
    font-weight: bold;
  }
  & h1 {
    font-size: 2rem;
  }
  & p {
    font-size: 1rem;
    line-height: 2rem;
  }
`;