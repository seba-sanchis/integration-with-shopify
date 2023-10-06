"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { signIn } from "@/lib/actions/account.actions";
import { newPrivacy } from "@/lib/actions/privacy.actions";
import { signUpValidation } from "@/lib/validations";
import { Privacy, Validation } from "@/types";

export default function SignUp() {
  const router = useRouter();

  const [account, setAccount] = useState<Privacy>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<Validation>();

  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate the form fields
    const validation = signUpValidation(account);

    // All validations passed, create account
    if (Object.keys(validation).length === 0) {
      // const response =
      await newPrivacy(account);

      // if (response) {
      await signIn(account);
      // }

      router.refresh();
      router.push("/profile/account");
    } else {
      // Form has error
      setError(validation);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full max-w-[1200px] border-b border-[#e7e7e8]">
        <div className="flex flex-col gap-4 w-full py-8 max-w-[460px] mx-auto">
          <div className="flex gap-4">
            <div>
              <input
                value={account.firstName}
                onChange={(e) =>
                  setAccount({ ...account, firstName: e.target.value })
                }
                type="text"
                placeholder="Nombre"
                className={`input ${
                  error?.firstName
                    ? "input_error"
                    : "border-[#d6d6d6] bg-[hsla(0,0%,100%,.8)]"
                }`}
              />
              {error?.firstName && (
                <div className="flex items-center mt-2 text-xs text-primary-red">
                  <i className="fi fi-rr-exclamation flex items-center mx-1"></i>
                  <span>{error.firstName}</span>
                </div>
              )}
            </div>

            <div>
              <input
                value={account.lastName}
                onChange={(e) =>
                  setAccount({ ...account, lastName: e.target.value })
                }
                type="text"
                placeholder="Apellido"
                className={`input ${
                  error?.lastName
                    ? "input_error"
                    : "border-[#d6d6d6] bg-[hsla(0,0%,100%,.8)]"
                }`}
              />
              {error?.lastName && (
                <div className="flex items-center mt-2 text-xs text-primary-red">
                  <i className="fi fi-rr-exclamation flex items-center mx-1"></i>
                  <span>{error.lastName}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1200px] border-b border-[#e7e7e8]">
        <div className="flex flex-col gap-4 w-full py-8 max-w-[460px] mx-auto">
          <div>
            <input
              value={account.email}
              onChange={(e) =>
                setAccount({ ...account, email: e.target.value })
              }
              type="email"
              placeholder="Email"
              className={`input ${
                error?.email
                  ? "input_error"
                  : "border-[#d6d6d6] bg-[hsla(0,0%,100%,.8)]"
              }`}
            />
            {error?.email && (
              <div className="flex items-center mt-2 text-xs text-primary-red">
                <i className="fi fi-rr-exclamation flex items-center mx-1"></i>
                <span>{error.email}</span>
              </div>
            )}
          </div>
          <input
            value={account.password}
            onChange={(e) =>
              setAccount({ ...account, password: e.target.value })
            }
            type="password"
            placeholder="Contraseña"
            className={`input ${
              error?.password
                ? "input_error"
                : "border-[#d6d6d6] bg-[hsla(0,0%,100%,.8)]"
            }`}
          />
          <div>
            <input
              value={account.confirmPassword}
              onChange={(e) =>
                setAccount({ ...account, confirmPassword: e.target.value })
              }
              type="password"
              placeholder="Confirmar contraseña"
              className={`input ${
                error?.password
                  ? "input_error"
                  : "border-[#d6d6d6] bg-[hsla(0,0%,100%,.8)]"
              }`}
            />
            {error?.password && (
              <div className="flex items-center mt-2 text-xs text-primary-red">
                <i className="fi fi-rr-exclamation flex items-center mx-1"></i>
                <span>{error.password}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center py-8 max-w-[460px] mx-auto">
        <button className="button">Crear cuenta</button>
      </div>
    </form>
  );
}
