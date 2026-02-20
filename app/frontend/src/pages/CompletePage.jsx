import React, { useEffect, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

export default function CompletePage() {
  const stripe = useStripe();
  const [status, setStatus] = useState("default");
  const [intentId, setIntentId] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const HOST = "__VITE_HOST__";
  const BACKEND_PORT = "__VITE_BACKEND_PORT__";


console.log("=== CompletePage Mounted ===");
  console.log("Stripe instance:", stripe);
  console.log("HOST:", HOST);
  console.log("BACKEND_PORT:", BACKEND_PORT);

  useEffect(() => {
    console.log("useEffect triggered");

    if (!stripe) {
      console.warn("Stripe not loaded yet");
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
       console.log("Client Secret from URL:", clientSecret);

    if (!clientSecret) {
            console.warn("No clientSecret found in URL");

      return;
    } else {
      setClientSecret(clientSecret);
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            console.log("Stripe retrievePaymentIntent response:", paymentIntent);

      if (!paymentIntent) {
        return;
      }

      setStatus(paymentIntent.status);
      setIntentId(paymentIntent.id);

       console.log("Payment Status:", paymentIntent.status);
      console.log("Payment Intent ID:", paymentIntent.id);
    });
  }, [stripe]);

    console.log("Current status:", status);
  console.log("Current intentId:", intentId);
  console.log("Current clientSecret:", clientSecret);

  if (status !== "succeeded") {
    return <h2>Something went wrong. Please try again.</h2>;
  }
  saveBooking();
  async function saveBooking() {
    try {
      if (
          intentId &&
          clientSecret &&
          status === "succeeded" &&
          !sessionStorage.getItem("bookingSaved")
        ) {
        const response = await axios.post(`${HOST}/api/saveBooking`, {
          patientName: sessionStorage.getItem("patientName"),
          mobileNumber: sessionStorage.getItem("mobileNumber"),
          emailAddress: sessionStorage.getItem("emailAddress"),
          doctor: sessionStorage.getItem("doctor"),
          service: sessionStorage.getItem("service"),
          appointmentDate: sessionStorage.getItem("appointmentDate"),
          price: sessionStorage.getItem("price"),
        });

        

        if (response) {
          sessionStorage.setItem("bookingSaved", "true");
        }
      }
    
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  }
  return (
    <>
      {(intentId &&
        clientSecret &&
        status === "succeeded")? (
        <div style={styles.container}>
          <div style={styles.card}>
            <h1 style={styles.title}>Thank You!</h1>
            <p style={styles.subtitle}>Your payment was successful.</p>
            <p style={styles.details}>We appreciate your purchase.</p>
            <p style={styles.orderInfo}>
              <strong>Payment ID:</strong> {intentId}
            </p>
            <button
              style={styles.button}
              onClick={() => {
                sessionStorage.clear(); 
                window.location.href = "/"; 
              }}
            >
              Back To Home
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p>wait for success to payment </p>
        </div>
      )}
    </>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    maxWidth: "400px",
    width: "100%",
  },
  title: {
    fontSize: "32px",
    margin: "0",
    color: "#333333",
  },
  subtitle: {
    fontSize: "18px",
    marginTop: "10px",
    color: "#666666",
  },
  details: {
    fontSize: "16px",
    marginTop: "20px",
    color: "#888888",
  },
  orderInfo: {
    fontSize: "14px",
    marginTop: "20px",
    color: "#333333",
  },
  button: {
    marginTop: "30px",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#ffffff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

