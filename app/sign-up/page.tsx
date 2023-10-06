import Link from "next/link";

import { SignUp } from "@/components";

export default function Page() {
  return (
    <div className="flex flex-col w-full max-w-[1200px]">
      <div className="flex flex-col items-center pt-8 max-w-[460px] mx-auto">
        <h1 className="text-3xl font-bold">Creá tu cuenta</h1>
        <div className="text-center my-2">
          Una cuenta es todo lo que necesitas para comenzar a agregar productos
          a tu carrito.
        </div>
        <div>
          <span>¿Ya tenés una cuenta?</span>{" "}
          <Link href="/sign-in" className="text-tertiary-blue">
            Ingresar ahora
          </Link>
        </div>
      </div>

      <SignUp />

    </div>
  );
}
