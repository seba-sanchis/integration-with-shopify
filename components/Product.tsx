"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { addToBag } from "@/lib/actions/bag.actions";
import { Product } from "@/types";

export default function Product({
  accessToken,
  product,
}: {
  accessToken: string | undefined;
  product: Product;
}) {
  const router = useRouter();

  const [selected, setSelected] = useState<{ [key: string]: string }>(
    product.node.options.reduce((acc, option) => {
      return {
        ...acc,
        [option.name]: option.values[0],
      };
    }, {})
  );

  // Find the selected item ID
  const findItem = () => {
    const item = product.node.variants.edges.find((item) => {
      const match = product.node.options.every((option) => {
        return item.node.selectedOptions.find(
          (item) =>
            item.name === option.name && item.value === selected[option.name]
        );
      });

      return match;
    });

    return item ? item.node : null;
  };

  const item = findItem();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (accessToken) {
      if (item) {
        await addToBag(item.id);

        router.refresh();
        router.push("/bag");
      }
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <div className="flex flex-row p-4 md:p-0">
      <div className="hidden md:flex flex-wrap flex-1">
        <div className="block md:sticky md:top-0 h-fit">
          {product && item && item.image?.url && (
            <Image
              src={item.image?.url}
              alt="product"
              width={410}
              height={410}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col flex-wrap flex-1">
        <h1 className="text-2xl md:text-4xl font-semibold mb-2 md:m-0">
          {product.node.title}
        </h1>
        <div className="flex justify-center md:hidden md:justify-start flex-wrap flex-1 mb-2 md:m-0">
          <div className="block w-[75%]">
            {product && item && item.image?.url && (
              <Image
                src={item.image.url}
                alt="product"
                width={410}
                height={410}
              />
            )}
          </div>
        </div>
        <div className="pt-3 mb-4 md:mb-8 text-sm md:text-base">
          {product.node.description}
        </div>
        <form onSubmit={handleSubmit} className="border-t border-[#d2d2d7]">
          {product.node.options.map((option) => (
            <div key={option.name}>
              <h3 className="mt-4">{option.name}</h3>
              <div className="flex flex-col flex-wrap gap-2 md:gap-3 mt-3.5">
                {option.values.map((value) => (
                  <div key={value} className="flex items-center h-14">
                    <input
                      id={value}
                      value={value}
                      checked={selected[option.name] === value} // Check if this value is selected
                      onChange={(e) =>
                        setSelected({
                          ...selected,
                          [option.name]: e.target.value,
                        })
                      }
                      type="checkbox"
                      className="absolute appearance-none peer"
                    />
                    <label
                      htmlFor={value}
                      className="flex flex-wrap p-3.5 w-full cursor-pointer rounded-xl border border-tertiary-gray peer-checked:border-2 peer-checked:border-primary-blue peer-disabled:opacity-40"
                    >
                      <span className="text-sm md:text-base">{value}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="flex justify-end items-center pt-8 gap-4">
            <div className="flex flex-col items-end">
              <span className="text-2xl font-semibold">
                {product &&
                  item &&
                  parseFloat(item.priceV2.amount).toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  })}
              </span>

              <div className="flex gap-2">
                <i className="fi fi-rr-truck-side text-xl flex justify-center items-center"></i>
                <span>Envío gratis</span>
              </div>
            </div>

            <button disabled={item?.quantityAvailable === 0} className="button">
              Agregar al carrito
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
