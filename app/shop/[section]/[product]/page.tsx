import { Product } from "@/components";
import { getProduct } from "@/lib/actions/product.actions";
import { cookies } from "next/headers";

export default async function Page({
  params,
}: {
  params: { product: string };
}) {
  const accessToken = cookies().get("accessToken");

  const product = await getProduct(params.product);

  return (
    <div className="flex flex-col flex-grow w-full max-w-[980px] my-8">
      <Product accessToken={accessToken?.name} product={product} />
    </div>
  );
}
