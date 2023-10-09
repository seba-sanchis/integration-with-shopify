"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/actions/account.actions";
import { signInValidation } from "@/lib/validations";
import { Privacy, Validation } from "@/types";

export default function SignIn() {
  const router = useRouter();

  const [account, setAccount] = useState<Privacy>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [toggleInput, setToggleInput] = useState(true);
  const [error, setError] = useState<Validation>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate the form fields
    const validation = signInValidation(account);

    // All validations passed, create account
    if (Object.keys(validation).length === 0) {
      await signIn(account);

      router.refresh();
      router.back();
    } else {
      // Form has error
      setAccount({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setToggleInput(true);
      setError(validation);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && account.email !== "") {
      e.preventDefault();
      setToggleInput(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center w-full max-w-sm h-20"
    >
      <label className="sr-only">Iniciá sesión con tu e-mail</label>
      {toggleInput ? (
        <input
          value={account.email}
          onChange={(e) => setAccount({ ...account, email: e.target.value })}
          onKeyDown={handleKeyDown}
          type="email"
          placeholder="Email"
          className={`w-full px-4 py-3 rounded-full outline-none border focus:border-2 focus:px-[15px] focus:py-[11px] focus:bg-[hsla(0,0%,100%,.8)] focus:border-primary-blue ${
            error
              ? "placeholder:text-primary-red border-primary-red bg-secondary-red"
              : "border-secondary-gray bg-[hsla(0,0%,100%,.8)]"
          }`}
        />
      ) : (
        <input
          value={account.password}
          onChange={(e) => setAccount({ ...account, password: e.target.value })}
          type="password"
          placeholder="Contraseña"
          className={`w-full px-4 py-3 rounded-full outline-none border focus:border-2 focus:px-[15px] focus:py-[11px] focus:bg-[hsla(0,0%,100%,.8)] focus:border-primary-blue ${
            error
              ? "placeholder:text-primary-red border-primary-red bg-secondary-red"
              : "border-secondary-gray bg-[hsla(0,0%,100%,.8)]"
          }`}
        />
      )}
      {error && (
        <div className="flex items-center mt-2 text-xs text-primary-red">
          <i className="fi fi-rr-exclamation flex items-center mr-1"></i>
          <span>Ingresá un email y contraseña válidos.</span>
        </div>
      )}

      <button></button>
    </form>
  );
}
