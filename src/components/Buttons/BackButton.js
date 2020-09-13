import React from "react";
import { withRouter } from "react-router-dom";
import { BackImg, BackBtn } from "./Style";

const BackButton = props => {
  return (
    <BackBtn onClick={() => props.history.goBack()}>
      <BackImg viewBox="0 0 16 16">
        <path d="M8 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zM8 1.5c3.59 0 6.5 2.91 6.5 6.5s-2.91 6.5-6.5 6.5-6.5-2.91-6.5-6.5 2.91-6.5 6.5-6.5z"></path>
        <path d="M10.457 4.957l-1.414-1.414-4.457 4.457 4.457 4.457 1.414-1.414-3.043-3.043z"></path>
      </BackImg>
    </BackBtn>
  );
};

export default withRouter(BackButton);
