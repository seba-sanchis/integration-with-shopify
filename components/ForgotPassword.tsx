"use client";

import { useState } from "react";

import { resetPassword } from "@/lib/actions/account.actions";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState("");
  const [error, setError] = useState();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const error = await resetPassword(email);
    console.log(error);
    if (error.length > 0) {
      setError(error[0].message);
    } else {
      setEmailSent("¡Correo enviado con éxito!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
      <div className="w-80 h-20">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="input border-[#d6d6d6] bg-[hsla(0,0%,100%,.8)]"
        />
        {emailSent && (
          <div className="flex items-center mt-2 text-xs text-primary-green">
            <i className="fi fi-rr-check-circle flex items-center mx-1"></i>
            <span>{emailSent}</span>
          </div>
        )}
        {error && (
          <div className="flex items-center mt-2 text-xs text-primary-red">
            <i className="fi fi-rr-exclamation flex items-center mx-1"></i>
            <span>{error}</span>
          </div>
        )}
      </div>
      <button className="button">Restablecer</button>
    </form>
  );
}
