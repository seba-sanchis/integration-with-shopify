import Link from "next/link";

import { SignIn } from "@/components";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Page() {
  const accessToken = cookies().get("accessToken");

  if (accessToken) return redirect("/");

  return (
    <section className="flex flex-col flex-1 max-w-[980px] w-full mx-auto">
      <h1 className="text-[40px] font-semibold pt-[34px]">
        Iniciá sesión para comprar.
      </h1>
      <div className="flex flex-col items-center grow w-[480px] mt-[72px] mx-auto text-[#494949]">
        <h2 className="text-2xl font-semibold mb-10">Ingresá a la tienda</h2>

        <SignIn />

        <div className="flex flex-col items-center text-sm gap-2 my-4">
          <div>
            <Link href="/forgotten-password" className="text-tertiary-blue">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <div>
            <span>¿No tenés cuenta?</span>{" "}
            <Link href="/sign-up" className="text-tertiary-blue">
              Crear ahora
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
