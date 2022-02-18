import { CircularProgress } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState, useEffect } from "react";
import useAuth from "../../../hook/useAuth";

const CheckoutForm = ({ appointmentDetails }) => {
  const { price, patientName, _id } = appointmentDetails;
  const { user } = useAuth();

  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data));
  }, [price]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    setProcessing(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setErrorMessage(error.message);
      setSuccess("");
    } else {
      setErrorMessage("");
      console.log(paymentMethod);
    }

    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret.clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: patientName,
            email: user.email,
          },
        },
      });

    if (intentError) {
      setErrorMessage(intentError.message);
      setSuccess("");
    } else {
      setErrorMessage("");
      setSuccess("Your Payment processed successfully.");
      setProcessing(false);
      console.log(paymentIntent);
      //save to db
      const payment = {
        amount: paymentIntent.amount,
        transactionId: paymentIntent.client_secret.slice("_secret")[0],
        created: paymentIntent.created,
        currency: paymentIntent.currency,
        last4: paymentMethod.card.last4,
      };
      const url = `http://localhost:5000/appointments/${_id}`;
      fetch(url, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        {processing ? (
          <CircularProgress></CircularProgress>
        ) : (
          <button type="submit" disabled={!stripe || success}>
            Pay ${price}
          </button>
        )}
      </form>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default CheckoutForm;
