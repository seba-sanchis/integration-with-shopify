"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { regions } from "@/constants";
import { addShipping, editShipping } from "@/lib/actions/shipping.actions";
import { shippingValidation } from "@/lib/validations";
import { Shipping, Validation } from "@/types";

export default function EditShipping({ shipping }: { shipping: Shipping }) {
  const router = useRouter();

  const [toggleForm, setToggleForm] = useState(false);
  const [account, setAccount] = useState({
    id: shipping?.id,
    address1: shipping?.address1,
    city: shipping?.city,
    province: shipping?.province,
    country: shipping?.country ? shipping.country : "Argentina",
    zip: shipping?.zip,
    phone: shipping?.phone,
  });

  const [error, setError] = useState<Validation>({
    address1: "",
    city: "",
    province: "",
    country: "",
    zip: "",
    phone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form fields
    const validation = shippingValidation(account);

    // All validations passed, create a new customer
    if (Object.keys(validation).length === 0) {
      if (account.id) {
        await editShipping(account);
      } else {
        await addShipping(account);
      }

      router.refresh();
      router.push("/profile/account");
      setToggleForm(false);
    } else {
      // Form has error
      setError(validation);
    }
  };

  return (
    <>
      <button
        onClick={() => setToggleForm(true)}
        className="group flex items-center mt-1.5 text-tertiary-blue"
      >
        <span className="group-hover:underline">Editar</span>
        <i className="fi fi-rr-angle-small-right flex items-center"></i>
      </button>
      <span className="text-primary-red text-xs">
        {(!shipping?.address1 ||
          !shipping?.city ||
          !shipping?.province ||
          !shipping?.country ||
          !shipping?.zip ||
          !shipping?.phone) &&
          "Datos de envío incompletos."}
      </span>
      <div
        onClick={() => setToggleForm(false)}
        className={`fixed transition-opacity duration-100 ease-in-out overflow-y-auto bg-[rgba(50,50,50,.88)] ${
          toggleForm ? "opacity-100 z-50 inset-0" : "opacity-0"
        }`}
      >
        {toggleForm && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative inset-0 max-w-[816px] z-10 my-10 mx-auto py-10 px-4 md:p-20 rounded-2xl bg-white"
          >
            <div className="md:max-w-[75%] mx-auto">
              <h2 className="text-2xl md:text-4xl text-center font-semibold pb-4">
                Actualizá tus datos.
              </h2>
              <div className="pb-5">
                Revisá que todos los datos sean correctos para evitar cualquier
                tipo de inconveniente en los procesos de compra y entrega.
              </div>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col w-full">
              {/* Shipment */}
              <div className="w-full border-b border-[#e7e7e8]">
                <div className="flex flex-col gap-4 w-full py-4 md:py-8 md:max-w-[75%] mx-auto">
                  <h3 className="font-semibold">Dirección de envío</h3>
                  <div className="flex items-center border border-[#d6d6d6] rounded w-full h-14 justify-between">
                    <select
                      value={account.country}
                      onChange={(e) =>
                        setAccount({ ...account, country: e.target.value })
                      }
                      className="appearance-none bg-transparent w-full h-full px-4 cursor-pointer z-10"
                    >
                      {regions.map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                    <span className="sticky flex items-center">
                      <i className="fi fi-rr-angle-small-down icon absolute right-4"></i>
                    </span>
                  </div>

                  <div>
                    <input
                      value={account.province}
                      onChange={(e) =>
                        setAccount({ ...account, province: e.target.value })
                      }
                      type="text"
                      placeholder="Estado / Provincia"
                      className={`input ${
                        error.province
                          ? "input_error"
                          : "border-[#d6d6d6] bg-[hsla(0,0%,100%,.8)]"
                      }`}
                    />
                    {error.province && (
                      <div className="flex items-center mt-2 text-xs text-primary-red">
                        <i className="fi fi-rr-exclamation flex items-center mx-1"></i>
                        <span>{error.province}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <input
                      value={account.city}
                      onChange={(e) =>
                        setAccount({ ...account, city: e.target.value })
                      }
                      type="text"
                      placeholder="Ciudad"
                      className={`input ${
                        error.city
                          ? "input_error"
                          : "border-[#d6d6d6] bg-[hsla(0,0%,100%,.8)]"
                      }`}
                    />
                    {error.city && (
                      <div className="flex items-center mt-2 text-xs text-primary-red">
                        <i className="fi fi-rr-exclamation flex items-center mx-1"></i>
                        <span>{error.city}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <div className="w-2/3">
                      <input
                        value={account.address1}
                        onChange={(e) =>
                          setAccount({ ...account, address1: e.target.value })
                        }
                        type="text"
                        placeholder="Dirección"
                        className={`input ${
                          error.address1
                            ? "input_error"
                            : "border-[#d6d6d6] bg-[hsla(0,0%,100%,.8)]"
                        }`}
                      />
                      {error.address1 && (
                        <div className="flex items-center mt-2 text-xs text-primary-red">
                          <i className="fi fi-rr-exclamation flex items-center mx-1"></i>
                          <span>{error.address1}</span>
                        </div>
                      )}
                    </div>
                    <div className="w-1/3">
                      <input
                        value={account.zip}
                        onChange={(e) =>
                          setAccount({
                            ...account,
                            zip: e.target.value,
                          })
                        }
                        type="text"
                        placeholder="Código postal"
                        className={`input ${
                          error.zip
                            ? "input_error"
                            : "border-[#d6d6d6] bg-[hsla(0,0%,100%,.8)]"
                        }`}
                      />
                      {error.zip && (
                        <div className="flex items-center mt-2 text-xs text-primary-red">
                          <i className="fi fi-rr-exclamation flex items-center mx-1"></i>
                          <span>{error.zip}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full border-b border-[#e7e7e8]">
                <div className="flex flex-col gap-4 w-full py-8 md:max-w-[75%] mx-auto">
                  <h3 className="font-semibold">Contacto</h3>
                  <div>
                    <input
                      value={account.phone}
                      onChange={(e) =>
                        setAccount({
                          ...account,
                          phone: e.target.value,
                        })
                      }
                      type="text"
                      placeholder="Teléfono"
                      className={`input ${
                        error.phone
                          ? "input_error"
                          : "border-[#d6d6d6] bg-[hsla(0,0%,100%,.8)]"
                      }`}
                    />
                    {error.phone && (
                      <div className="flex items-center mt-2 text-xs text-primary-red">
                        <i className="fi fi-rr-exclamation flex items-center mx-1"></i>
                        <span>{error.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 justify-center items-center pt-8 w-full max-w-[75%] mx-auto">
                <button className="button w-full">Guardar</button>
                <button
                  onClick={() => setToggleForm(false)}
                  className="text-tertiary-blue hover:underline"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}
        s
      </div>
    </>
  );
}
