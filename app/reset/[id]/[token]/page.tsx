import { ResetPassword } from "@/components";

export default function Page({
  params,
}: {
  params: { id: string; token: string };
}) {
  return (
    <section className="flex flex-col flex-1 max-w-[980px] w-full mx-auto pt-14 px-4 md:px-0">
      <h1 className="text-2xl md:text-3xl font-semibold md:w-2/3 h-16">
        Nueva contraseña
      </h1>
      <div className="flex">
        <div className="md:w-2/3 md:pr-10">
          <p>Ingresá una nueva contraseña para continuar.</p>

          <ResetPassword id={params.id} token={params.token} />
        </div>
        <div className="hidden md:flex w-1/3 pl-10 border-l border-secondary-gray text-[#6e6e73]">
          <i className="fi fi-rr-circle-user text-6xl"></i>
          <p className="pl-5 text-sm">
            Te enviaremos un enlace a tu correo electrónico para que puedas
            restablecer la contraseña.
          </p>
        </div>
      </div>
    </section>
  );
}
