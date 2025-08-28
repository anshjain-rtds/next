import React from "react";
import { db } from "@/db/db";
import { snippet } from "@/db/schema";
import { redirect } from "next/navigation";

export default function page() {
  async function createSnippet(formData: FormData) {
    "use server";
    //check the user input is valid or not
    const snipTitle = formData.get("title") as string;
    const snipCode = formData.get("code") as string;

    //create a new record in the database
    const snip = await db.insert(snippet).values({
      snipTitle,
      snipCode,
    });
    console.log(snip);
    //redirect the user back to the root route
    redirect('/')
  }
  return (
    <form action={createSnippet}>
      <h3 className="font-bold m-10 ">Create a snippet</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label htmlFor="title" className="w-12">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="border rounded p-2 w-full"
            id="title"
          />
        </div>
        <div className="flex gap-4">
          <label htmlFor="code" className="w-12">
            Code
          </label>
          <input
            type="text"
            name="code"
            className="border rounded p-2 w-full"
            id="code"
          />
        </div>
        <button type="submit" className="rounded p-2 bg-blue-200 text-black">
          Create
        </button>
      </div>
    </form>
  );
}
