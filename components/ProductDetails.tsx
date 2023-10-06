"use client";

import { useState } from "react";

import { Item } from "@/types";

export default function ProductDetails({ item }: { item: Item[] }) {
  const [toggleFeatures, setToggleFeatures] = useState(false);

  return (
    <div className="flex flex-col">
      <button
        onClick={() => setToggleFeatures((state) => !state)}
        className="flex items-center mt-3 text-[17px] text-tertiary-blue"
      >
        <span>Ver detalle de producto</span>
        <i className="fi fi-rr-angle-small-down flex items-center ml-1"></i>
      </button>
      <ul
        className={`mt-1 text-sm overflow-hidden transition-all ease-in-out duration-300 list-disc list-inside ${
          toggleFeatures ? "h-full" : "h-0"
        }`}
      >
        <h3 className="font-semibold mt-4">Características</h3>
        {item.map((item) => (
          <li key={item.name} className="mt-1 ml-1">
            <span>{item.name}</span> <span>{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
