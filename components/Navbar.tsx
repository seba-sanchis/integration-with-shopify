import Link from "next/link";
import { cookies } from "next/headers";

import { Flyout, Menu, SearchMenu, Searchbar } from ".";
import { getSections } from "@/lib/actions/section.actions";
import { getBag } from "@/lib/actions/bag.actions";
import { getBrand } from "@/lib/actions/content.actions";
import { Bag } from "@/types";

export default async function Navbar() {
  const accessToken = cookies().get("accessToken");

  let totalQuantity = 0;

  if (accessToken) {
    const bag = await getBag();

    bag.forEach((bag: Bag) => {
      totalQuantity += bag.node.quantity;
    });
  }

  const sections = await getSections();

  const brand = await getBrand();

  return (
    <header className="w-full h-14 px-4 z-10 bg-[rgba(251,251,253,.8)]">
      <nav className="flex justify-between items-center w-full max-w-[980px] h-full mx-auto">
        <Flyout brand={brand} sections={sections} />

        <Searchbar />

        <div className="flex justify-end items-center md:gap-4 z-30">
          {accessToken ? (
            <Link
              href="/profile/orders"
              className="navbar_link hidden md:flex justify-center items-center px-2"
            >
              Mi perfil
            </Link>
          ) : (
            <Link
              href="/sign-in"
              className="navbar_link hidden md:flex justify-center items-center px-2"
            >
              Ingresá
            </Link>
          )}
          <SearchMenu />
          <Link
            href={accessToken ? "/bag" : "/sign-in"}
            className="flex justify-center items-center w-10 h-10"
          >
            <i className="fi fi-rr-shopping-bag flex justify-center items-center text-primary-black/80 hover:text-primary-black transition-colors"></i>
            {accessToken && (
              <div className="absolute flex justify-end items-end w-8 h-8">
                <span className="flex justify-center items-center w-3.5 h-3.5 rounded-full text-[10px] text-white bg-black">
                  {accessToken && totalQuantity}
                </span>
              </div>
            )}
          </Link>

          <Menu accessToken={accessToken?.name} sections={sections} />
        </div>
      </nav>
    </header>
  );
}
