"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const handleLogout = async () => {
  console.log("clik");
  const cookiesStore = await cookies();
  cookiesStore.delete("authorization");
  redirect("/login");
};
