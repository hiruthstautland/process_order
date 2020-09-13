import styled from "styled-components";

export const Grid = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 4rem auto;
  grid-template-areas:
    "header"
    "info"
    "main"
    "footer";
  background-color: var(--varner-grey);
`;

export const Header = styled.header`
  grid-area: header;
  background-color: var(--varner-darkest);
  //height: 3rem;
  color: var(--varner-text-white);
  display: grid;
  grid-template-columns: 15% 85%;
  padding-top: 0.8rem;
  padding-bottom: 0.6rem;
  position: sticky;
  top: 0;
  box-shadow: 0.5px 0.5px 2px 1px var(--varner-dark);
`;

export const HeaderInfo = styled.strong`
  grid-column: 2 / 3;
  align-self: center;
  justify-self: center;
  line-height: 1.2rem;
  text-align: center;
  color: var(--varner-text-white);
  padding-right: 0.5rem;
`;

export const Highlight = styled(HeaderInfo)`
  color: var(--varner-greenlight);
  padding-right: 3rem;
`;

export const InfoCard = styled.div`
  grid-area: info;
  padding: 1rem;
  background: var(--varner-grey);
  color: var(--varner-text-white);
  font-size: 1.2rem;

  & h4 {
    font-size: 1.5rem;
    margin: 1rem;
  }

  & li {
    font-size: 1rem;
    margin-left: 1rem;
  }
`;

export const Main = styled.div`
  grid-area: main;
  height: 100%;
  background-color: var(--varner-grey);
`;
