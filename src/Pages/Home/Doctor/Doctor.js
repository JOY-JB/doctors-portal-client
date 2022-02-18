import { Grid } from "@mui/material";
import React from "react";

const Doctor = ({ doctor }) => {
  const { name, image } = doctor;
  return (
    <Grid xs={2} sm={4} md={4}>
      <h2>{name}</h2>
      <img src={`data:image/png;base64,${image}`} alt="" />
    </Grid>
  );
};

export default Doctor;
