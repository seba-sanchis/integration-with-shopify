import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { Sidebar } from "@/components";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const accessToken = cookies().get("accessToken");

  if (!accessToken) redirect("/");

  return (
    <section className="flex flex-grow w-full max-w-[980px] my-8">
      <Sidebar />
      {children}
    </section>
  );
}
