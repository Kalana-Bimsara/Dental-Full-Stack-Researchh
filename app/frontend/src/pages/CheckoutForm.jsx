
import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";


export default function CheckoutForm() {
  // Use ONE env variable for your frontend URL
  const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || "http://localhost:3000";

  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${FRONTEND_URL}/complete`,
      },
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={{ layout: "accordion" }} />

        <button disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
          </span>
        </button>

        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );
}
