import React from "react";
import { Grid, Main } from "./Style";
import { IconInfo } from "./icon.js";

const DbInfoCard = () => {
  return (
    <Grid>
      <Main>
        <IconInfo />
        <h1>Obs! Sjekk databasen</h1>
        <p>
          Databasen ser ut til å være nede. Sjekk at du har oppdatert databasen
          og er tilkoblet. Vedvarer problemet, kontakt helpdesk.
        </p>
        <a href="helpdesk@varner.com">Email: helpdesk@varner.com</a>
      </Main>
    </Grid>
  );
};

export default DbInfoCard;
