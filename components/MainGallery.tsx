import Image from "next/image";
import Link from "next/link";

import { getGallery } from "@/lib/actions/content.actions";

export default async function MainGallery() {
  const gallery = await getGallery();

  return (
    <section className="bg-primary-gray">
      <div className="flex flex-col md:flex-row justify-center items-center w-full h-96  px-4 py-8 md:p-0 max-w-[980px] rounded mx-auto">
        <div className="flex flex-col justify-center items-center md:items-start mb-2 md:mb-0 md:gap-3.5 md:max-w-[33%]">
          <h2 className="text-3xl md:text-5xl font-semibold text-center md:text-left">
            {gallery[2].value}
          </h2>
          <h3 className="text-lg md:text-xl text-center md:text-left">
            {gallery[1].value}
          </h3>
          <Link
            href="/shop/calzado"
            className="group flex justify-center items-center text-lg md:text-xl text-primary-blue"
          >
            <span className="group-hover:underline">Ver más</span>
            <i className="fi fi-rr-angle-small-right icon"></i>
          </Link>
        </div>
        <div className="flex justify-center items-center flex-1">
          <Image
            src={gallery[0].reference.image.url}
            alt="advertising gallery"
            width={350}
            height={350}
          />
        </div>
      </div>
    </section>
  );
}
