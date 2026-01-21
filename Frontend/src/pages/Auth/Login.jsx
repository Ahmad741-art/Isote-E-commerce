
import React, { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const { login } = useAuth();
  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/api/auth/login", { email, password });
      if (res.data.token) {
        const token = res.data.token;
        const user = res.data.user || res.data.data;
        login(token, user);
        nav("/");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };
  return (
    <form onSubmit={submit}>
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button className="btn">Login</button>
    </form>
  );
}

