import React, { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import Doctor from "../Doctor/Doctor";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch("https://salty-island-18444.herokuapp.com/doctors")
      .then((res) => res.json())
      .then((data) => setDoctors(data));
  }, []);

  return (
    <div>
      <h2>Our Doctors : {doctors.length}</h2>

      <Container>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {doctors.map((doctor) => (
            <Doctor key={doctor._id} doctor={doctor}></Doctor>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Doctors;
