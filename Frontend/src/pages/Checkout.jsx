
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import API from "../services/api";
import { useCart } from "../context/CartContext";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "");

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { cart, clear } = useCart();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await API.post("/api/checkout/create-payment-intent", {
      items: cart.map(i => ({ productId: i.product, quantity: i.qty }))
    });
    const clientSecret = res.data.clientSecret || res.data.client_secret;
    if (!clientSecret) { alert("Payment intent creation failed"); setLoading(false); return; }
    const card = elements.getElement(CardElement);
    const result = await stripe.confirmCardPayment(clientSecret, { payment_method: { card } });
    setLoading(false);
    if (result.error) alert(result.error.message);
    else if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
      alert("Payment succeeded!");
      clear();
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button className="btn" disabled={!stripe || loading}>{loading ? "Processing..." : "Pay"}</button>
    </form>
  );
}

export default function Checkout() {
  const publishable = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
  if (!publishable) return <div>Please set VITE_STRIPE_PUBLISHABLE_KEY in Frontend/.env</div>;
  return (
    <Elements stripe={stripePromise}>
      <h2>Checkout</h2>
      <CheckoutForm />
    </Elements>
  );
}

