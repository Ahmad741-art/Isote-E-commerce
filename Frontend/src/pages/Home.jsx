
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <section className="hero">
        <h1>Welcome to Isoté</h1>
        <p>Luxury curated fashion</p>
        <Link to="/shop" className="btn">Shop Now</Link>
      </section>
    </div>
  );
}

