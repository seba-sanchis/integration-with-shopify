"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { menu } from "@/constants";
import { Brand, Section } from "@/types";

export default function Flyout({
  brand,
  sections,
}: {
  brand: Brand;
  sections: Section[];
}) {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="flex items-center gap-5">
      <Link
        href="/"
        className="navbar_link z-30"
        onClick={() => setToggleMenu(false)}
      >
        <Image src={brand.brand.logo.image.url} alt="brand logo" width={40} height={40} />
      </Link>

      {/* Menu options */}
      <ul className="hidden md:flex gap-4 z-30">
        {menu.map((option) => (
          <li key={option}>
            <button
              onClick={() => setToggleMenu((state) => !state)}
              className="navbar_link h-10 px-2 sticky"
            >
              {option}
            </button>
          </li>
        ))}
      </ul>

      {/* Categories */}
      <div
        className={`fixed flex flex-wrap w-full p-1.5 top-0 left-0 transition-all duration-[240ms] ease-[cubic-bezier(.4,0,.6,1)] delay-100 z-10 bg-primary-white ${
          toggleMenu ? "visible h-[286px]" : "h-14 invisible"
        }`}
      >
        <div className="flex flex-col mt-14 pt-10 pb-20 w-full max-w-[980px] mx-auto gap-3">
          <h2
            className={`px-3 text-xs ${
              toggleMenu ? "text-[rgb(110,110,115)]" : "text-[rgba(0,0,0,0)]"
            }`}
          >
            Comprar
          </h2>
          <ul
            className={`flex flex-col gap-1.5 text-2xl font-semibold ${
              toggleMenu ? "text-secondary-black" : "text-[rgba(0,0,0,0)]"
            }`}
          >
            {sections.map((section) => (
              <li key={section.node.title}>
                <Link
                  href={`/shop/${section.node.title
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(/ /g, "-")}`}
                  className={`px-3 py-2 transition-all duration-[320ms] ease-[cubic-bezier(.4,0,.6,1)] ${
                    toggleMenu ? "hover:text-black" : "cursor-auto"
                  }`}
                  onClick={() => setToggleMenu(false)}
                >
                  {section.node.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        onClick={() => setToggleMenu(false)}
        className={`fixed inset-0 top-14 w-full h-screen duration-[320ms] delay-100 ease-in-out bg-[rgba(232,232,237,.4)] backdrop-blur-[20px] ${
          toggleMenu ? "visible opacity-100" : "hidden opacity-0"
        }`}
      ></div>
    </div>
  );
}
