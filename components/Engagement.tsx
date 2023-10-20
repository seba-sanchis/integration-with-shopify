import Image from "next/image";
import Link from "next/link";

import { getEngagement } from "@/lib/actions/content.actions";
import { Content, Engagement } from "@/types";

export default async function Engagement() {
  const engagement = await getEngagement();

  return (
    <section className="mb-8">
      <div className="flex flex-col md:flex-row justify-between w-full max-w-[980px] px-4 md:px-0 mx-auto gap-3">
        {engagement.map((item: Engagement) => {
          const linkValue = item.node.fields.find(
            (field) => field.key === "link"
          )?.value;

          return (
            <div
              key={item.node.id}
              className="relative w-full md:w-[484px] h-[336px]]"
            >
              <Image
                src={
                  item.node.fields.find((field) => field.key === "image")
                    ?.reference?.image.url!
                }
                alt="engagement"
                width={484}
                height={336}
              />
              {/* <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-end items-center p-6 text-white">
                <h4 className="font-semibold text-4xl text-primary-black">
                  {
                    item.node.fields.find((field) => field.key === "title")
                      ?.value
                  }
                </h4>
                <h5 className="text-xl text-center text-primary-black">
                  {
                    item.node.fields.find(
                      (field) => field.key === "description"
                    )?.value
                  }
                </h5>
                {linkValue && (
                  <Link href={linkValue}>
                    <div className="group flex items-center mt-3.5 text-tertiary-blue">
                      <span className="group-hover:underline">Ver más</span>
                      <i className="fi fi-rr-angle-small-right flex"></i>
                    </div>
                  </Link>
                )}
              </div> */}
            </div>
          );
        })}
      </div>
    </section>
  );
}
