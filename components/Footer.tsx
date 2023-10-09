import { getBrand, getSocialMedia } from "@/lib/actions/content.actions";
import { SocialMedia } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default async function Footer() {
  const brand = await getBrand();

  const socialMedia = await getSocialMedia();

  return (
    <footer className="w-full bg-primary-gray">
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-[980px] my-3 mx-auto px-4 gap-4 text-sm">
        <div className="flex flex-row items-center gap-4">
          <Image
            src={brand.brand.logo.image.url}
            alt="logo"
            width={40}
            height={40}
          />
          <div className="navbar_link">
            <span>{brand.name}</span> - <span>{brand.brand.slogan}</span>
          </div>
          {/* <Link href="/" className="navbar_link">
            Terminos y condiciones
          </Link>
          <Link href="/" className="navbar_link">
            Aviso de privacidad
          </Link>
          <Link href="/" className="navbar_link">
            Ayuda
          </Link> */}
        </div>
        <div className="flex gap-4">
          {socialMedia.map((socialMedia: SocialMedia) => (
            <Link href={socialMedia.value} key={socialMedia.key}>
              <i
                className={`fi fi-brands-${socialMedia.key} icon cursor-pointer text-primary-black/80 hover:text-primary-black`}
              ></i>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
