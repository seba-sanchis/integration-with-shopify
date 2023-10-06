"use client";

import { useRouter } from "next/navigation";

import { removeFromBag } from "@/lib/actions/bag.actions";
import { Bag } from "@/types";

export default function RemoveProduct({ product }: { product: Bag }) {
  const router = useRouter();

  const handleDelete = async () => {
    await removeFromBag(product.node.id);

    router.refresh();
  };

  return (
    <button
      onClick={handleDelete}
      className="mt-3 text-[17px] text-tertiary-blue"
    >
      Quitar
    </button>
  );
}
