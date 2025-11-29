// import React, { useState } from "react";
// import {
//   PaymentElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";

// export default function CheckoutForm() {
//   const baseUrl = import.meta.env.REACT_APP_PUBLIC_BASE_URL_WITH_PORT;
//   const FRONT_END_PORT = import.meta.env.FRONT_END_PORT || "3000";
//   const HOST = import.meta.env.HOST || "http://localhost";

//   const stripe = useStripe();
  
//   const elements = useElements();

//   const [message, setMessage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) {
//       // Stripe.js hasn't yet loaded.
//       // Make sure to disable form submission until Stripe.js has loaded.
//       return;
//     }

//     setIsLoading(true);

//     const { error } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         // Make sure to change this to your payment completion page
//         return_url: `http://${HOST}:${FRONT_END_PORT}/complete`  ,
//       },
//     });

//     if (error.type === "card_error" || error.type === "validation_error") {
//       setMessage(error.message);
//     } else {
//       setMessage("An unexpected error occurred.");
//     }

//     setIsLoading(false);
//   };

//   const paymentElementOptions = {
//     layout: "accordion",
//   };

//   return (
//     <>
//       <div className="container d-flex justify-content-center align-items-center vh-100">
//         <form id="payment-form" onSubmit={handleSubmit}>
//           <PaymentElement
//             id="payment-element"
//             options={paymentElementOptions}
//           />
//           <button disabled={isLoading || !stripe || !elements} id="submit">
//             <span id="button-text">
//               {isLoading ? (
//                 <div className="spinner" id="spinner"></div>
//               ) : (
//                 "Pay now"
//               )}
//             </span>
//           </button>
//           {/* Show any error or success messages */}
//           {message && <div id="payment-message">{message}</div>}
//         </form>
//       </div>
//     </>
//   );
// }



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
