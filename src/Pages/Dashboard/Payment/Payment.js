import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51KOHg9JBmd0LxHjPsV0rbayuLbsxK2dhL0mcCyXchE7D9x9wILkboHhr7zaEe1KvmvFs9l16qmDlzYWS1zLSfwMi00YcvVhMl5"
);

const Payment = () => {
  const { id } = useParams();
  const [appointmentDetails, setAppointmentDetails] = useState({});
  useEffect(() => {
    fetch(`https://salty-island-18444.herokuapp.com/appointments/${id}`)
      .then((res) => res.json())
      .then((data) => setAppointmentDetails(data));
  }, [id]);

  return (
    <div>
      <h2>Please pay for: {appointmentDetails.patientName} </h2>
      <p>
        {" "}
        on{" "}
        {`${appointmentDetails.date} ${appointmentDetails.time} ${appointmentDetails.serviceName} Booking`}
      </p>
      <h3>Payment : ${appointmentDetails.price}</h3>

      {appointmentDetails?.price && (
        <Elements stripe={stripePromise}>
          <CheckoutForm appointmentDetails={appointmentDetails}></CheckoutForm>
        </Elements>
      )}
    </div>
  );
};

export default Payment;
