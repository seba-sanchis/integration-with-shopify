"use client";

import { useRouter } from "next/navigation";

import { newCheckout } from "@/lib/actions/checkout.actions";

export default function Checkout() {
  const router = useRouter();

  const handleCheckout = async () => {
    const checkout = await newCheckout();

    router.push(checkout);
  };

  return (
    <div className="flex justify-end py-8">
      <button
        onClick={handleCheckout}
        className="w-72 min-w-[30px] my-2 px-8 py-4 rounded-xl border border-transparent text-white bg-primary-blue active:bg-[#006edb]"
      >
        Comprar
      </button>
    </div>
  );
}
