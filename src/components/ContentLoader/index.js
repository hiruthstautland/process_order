import React, { useEffect, useState } from "react";
import { Grid, MagicV1 } from "./Style";
import DbInfoCard from "../ErrorAndInfoCard/DbInfoCard";

export const ContentLoader = () => {
  const [spinner, setSpinner] = useState(null);

  useEffect(() => {
    setSpinner(true);

    let timer = setTimeout(() => setSpinner(false), 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return spinner ? (
    <Grid>
      <MagicV1></MagicV1>
    </Grid>
  ) : (
    <Grid>
      <DbInfoCard />
    </Grid>
  );
};
