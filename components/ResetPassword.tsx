"use client";

import { useState } from "react";

import { resetPassword } from "@/lib/actions/account.actions";
import { passwordValidation } from "@/lib/validations";
import { Validation } from "@/types";
import { useRouter } from "next/navigation";

export default function ResetPassword({
  id,
  token,
}: {
  id: string;
  token: string;
}) {
  const [newPassword, setNewPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();

  const [error, setError] = useState<Validation>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form fields
    const validation = passwordValidation(newPassword);

    // All validations passed, create account
    if (Object.keys(validation).length === 0) {
      const error = await resetPassword(id, token, newPassword);

      if (error.length > 0) {
        setError({ password: error[0].message });
      } else {
        router.refresh();
        router.push("/");
      }
    } else {
      // Form has error
      setError(validation);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
      <div className="max-w-sm">
        <input
          value={newPassword.password}
          onChange={(e) =>
            setNewPassword({ ...newPassword, password: e.target.value })
          }
          type="password"
          placeholder="Contraseña"
          className="input border-[#d6d6d6] bg-[hsla(0,0%,100%,.8)]"
        />
        {/* {emailSent && (
          <div className="flex items-center mt-2 text-xs text-primary-green">
            <i className="fi fi-rr-check-circle flex items-center mx-1"></i>
            <span>{emailSent}</span>
          </div>
        )} */}
      </div>
      <div className="max-w-sm h-24">
        <input
          value={newPassword.confirmPassword}
          onChange={(e) =>
            setNewPassword({ ...newPassword, confirmPassword: e.target.value })
          }
          type="password"
          placeholder="Confirmar contraseña"
          className="input border-[#d6d6d6] bg-[hsla(0,0%,100%,.8)]"
        />
        {error && (
          <div className="flex items-center mt-2 text-xs text-primary-red">
            <i className="fi fi-rr-exclamation flex items-center mx-1"></i>
            <span>{error.password}</span>
          </div>
        )}
      </div>
      <button className="button">Restablecer</button>
    </form>
  );
}
