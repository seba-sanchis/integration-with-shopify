import Image from "next/image";
import Link from "next/link";

import { Product } from "@/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/shop/${product.node.collections.edges[0]?.node.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/ /g, "-")}/${product.node.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/ /g, "-")}`}
      className="group flex flex-col w-[48%] md:w-[230px] md:rounded-2xl bg-primary-gray cursor-pointer"
    >
      <div className="flex flex-contain rounded-2xl-t overflow-hidden">
        <Image
          src={product.node.images.edges[0]?.node.originalSrc}
          alt={product.node.title}
          width={230}
          height={230}
        />
      </div>
      <div className="flex flex-col p-4 gap-2 text-ellipsis overflow-hidden">
        <div className="text-sm font-semibold line-clamp-2 group-hover:text-tertiary-blue">
          {product.node.title}
        </div>
        <div>
          {parseFloat(
            product.node.variants.edges[0]?.node.priceV2.amount
          ).toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
          })}
        </div>
        <div className="text-sm text-primary-blue group-hover:text-secondary-blue transition-colors">
          Ver producto
        </div>
      </div>
    </Link>
  );
}
