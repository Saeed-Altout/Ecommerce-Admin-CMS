"use server";

import { signOut } from "@/auth";

export async function logout() {
  // some server side logic
  await signOut();
}
