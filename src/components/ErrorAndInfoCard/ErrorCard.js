import React from "react";
import { Grid, Main } from "./Style";
import { Icon } from "./icon.js";

const ErrorCard = () => {
  return (
    <Grid>
      <Main>
        <Icon />
        <h1>Oi, rusk i pipa!</h1>
        <p>
          Her er det et problem med kontakten til databasen og/eller
          nettverksfeil. Prøv å laste siden inn igjen. Fortsatt rusk? Vennligst
          ta kontakt med teknisk avdeling.
        </p>
        <a href="helpdesk@varner.com">Email: helpdesk@varner.com</a>
      </Main>
    </Grid>
  );
};

export default ErrorCard;
