import { getProducts } from "@/lib/actions/product.actions";
import { Scroller } from ".";

export default async function CardsShelf() {
  const products = await getProducts();

  return (
    <section className="py-10">
      <div className="flex flex-col w-full max-w-[980px] rounded mx-auto relative overflow-hidden">
        <div className="text-xl font-semibold mb-4 mx-4 md:mx-0">
          Productos más vendidos
        </div>
        <Scroller products={products} />
      </div>
    </section>
  );
}
