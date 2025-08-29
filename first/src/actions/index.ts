"use server";
import { db } from "@/db/db";
import { snippet } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
export async function editSnippet(id: number, code: string) {
  console.log(id, code);
  await db
    .update(snippet)
    .set({
      code: code,
    })
    .where(eq(snippet.id, Number(id)));
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.delete(snippet).where(eq(snippet.id, Number(id)));
  revalidatePath('/')
  redirect('/')
}


export async function createSnippet(formState: {message: string},formData: FormData) {
    try {
      //check the user input is valid or not
      const snipTitle = formData.get("title") ;
      const snipCode = formData.get("code") ;
      if(typeof snipTitle!=='string' || snipTitle.length < 3){
          return {
              message: "title must be longer"
          };
      }
      if(typeof snipCode!=='string' || snipCode.length < 10){
          return {
              message: "code must be longer"
          };
      }
      //create a new record in the database
      const snip = await db.insert(snippet).values({
        title : snipTitle,
        code : snipCode,
      });
      console.log(snip);
      //redirect the user back to the root route
    } catch (error: unknown) {
      if(error instanceof Error){
        return {
          message : error.message
        }
      }
      else {
        return {
          message :"something went wrong"
        }
      }
    }
    redirect('/')
    revalidatePath('/')
  }