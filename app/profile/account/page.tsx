import { EditPrivacy, EditShipping } from "@/components";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getPrivacy } from "@/lib/actions/privacy.actions";
import { getShipping } from "@/lib/actions/shipping.actions";

export default async function Page() {
  const cookieStore = cookies();
  const cookie = cookieStore.get("accessToken");

  if (!cookie) {
    return redirect("/sign-in");
  }

  const privacy = await getPrivacy();

  const shipping = await getShipping();

  return (
    <div className="flex flex-col gap-8 w-full m-4">
      <div>
        <h3 className="text-2xl font-semibold mb-1.5">Envío</h3>
        <div className="flex gap-16">
          <div>
            <h4 className="font-semibold">Dirección de envío</h4>
            <div>
              <span>{shipping?.address1 && `${shipping?.address1},`}</span>{" "}
              <span>{shipping?.city}</span>
            </div>
            <div>{shipping?.zip}</div>
            <div>{shipping?.province}</div>
            <div>{shipping?.country}</div>
          </div>
          <div>
            <h4 className="font-semibold">Información de contacto</h4>
            <div>
              <span>{shipping?.phone}</span>
            </div>
          </div>
        </div>
        <EditShipping shipping={shipping} />
      </div>
      <div>
        <h3 className="text-2xl font-semibold mb-1.5">Privacidad</h3>
        <div>
          <h4 className="font-semibold">Información personal</h4>
          <div>
            <span>{privacy.firstName}</span> <span>{privacy.lastName}</span>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-semibold mb-1.5">Cuenta</h3>
        <div>
          <div>{privacy.email}</div>
          <div>******</div>
        </div>
        <EditPrivacy privacy={privacy} />
      </div>
    </div>
  );
}
