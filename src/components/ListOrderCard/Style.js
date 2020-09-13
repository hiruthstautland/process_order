import styled from "styled-components";

const Card = styled.div`
  padding: 1.5rem;
  margin-bottom: 0.7rem;
  margin-top: 0.7rem;
  box-shadow: 0.5px 1px 2px 1px var(--varner-darkest);

  & h4 {
    text-decoration: underline;
  }
`;

export const DarkCard = styled(Card)`
  background-color: var(--varner-darkest);
  color: var(--varner-text-white);
`;

export const OrderTitle = styled.h4`
  justify-self: center;
  font-size: 1.2rem;
  margin-top: 0.8rem;
  margin-bottom: 0.5rem;
`;

export const OrderTime = styled.b`
  padding-top: 0.5rem;
  font-weight: 500;
`;
export const OrderVariables = styled.strong`
  color: ${props =>
    props.expires ? "var(--varner-redlight)" : "var(--varner-greenlight)"};
`;
export const OrderUlElem = styled.ul`
  margin: 0;
  padding: 0;
  padding-top: 0.5rem;
`;
export const OrderLiElem = styled.li`
  list-style-type: none;
  font-size: 1rem;
  line-height: 1.8rem;
`;
