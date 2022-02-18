import React from "react";
import Navbar from "../../Shared/Navbar/Navbar";
import AppointmentBanner from "../AppointmentBanner/AppointmentBanner";
import Banner from "../Banner/Banner";
import Doctors from "../Doctors/Doctors";
import Services from "../Services/Services";

const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Banner></Banner>
      <Services></Services>
      <AppointmentBanner></AppointmentBanner>
      <Doctors></Doctors>
    </div>
  );
};

export default Home;
