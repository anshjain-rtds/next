"use server";
import * as auth from "@/auth";
import { redirect } from "next/navigation";


export async function signOut() {
  return auth.signOut();
  redirect("/auth")
}

