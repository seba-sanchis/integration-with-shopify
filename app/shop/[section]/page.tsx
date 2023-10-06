import { ProductCard } from "@/components";
import { getSection } from "@/lib/actions/section.actions";
import { Product } from "@/types";

export default async function Page({
  params,
}: {
  params: { section: string };
}) {
  const section = await getSection(params.section);

  return (
    <div className="flex justify-center w-full grow">
      <div className="flex flex-col flex-grow w-full max-w-[980px] mb-8">
        <section className="flex flex-col">
          <div className="pt-14 pb-5">
            <h1 className="text-center text-5xl leading-[1.05] font-semibold">
              {section.title}
            </h1>
          </div>
          <div className="flex justify-center flex-wrap flex-1 gap-2 md:gap-4">
            {section.products.edges.map((product: Product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
