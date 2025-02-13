import { authFetch } from "@/lib/authFetch";
import { BACKEND_URL } from "@/lib/constants";
import { deleteSession } from "@/lib/session";
import { redirect, RedirectType } from "next/navigation";

export async function GET() {
  const respone = await authFetch(`${BACKEND_URL}/auth/signout`, {
    method: "POST",
  });
  if (respone.ok) {
    await deleteSession();
  }

  redirect("/", RedirectType.push);
}
