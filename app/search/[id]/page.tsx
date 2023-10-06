import { ProductCard } from "@/components";
import { getSearch } from "@/lib/actions/product.actions";
import { Product } from "@/types";

export default async function Page({ params }: { params: { id: string } }) {
  const search = await getSearch(params.id);

  return (
    <div className="flex justify-center w-full grow">
      <div className="flex flex-col flex-grow w-full max-w-[980px] mb-8">
        <section className="flex flex-col">
          <div className="pt-14 pb-5">
            <h1 className="text-center text-5xl leading-[1.05] font-semibold">
              Resultado de búsqueda
            </h1>
          </div>
          <div className="flex justify-center flex-wrap flex-1 gap-2 md:gap-4">
            {search.map((product: Product) => (
              <ProductCard key={product.node.title} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
