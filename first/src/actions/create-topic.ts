"use server";

import { topics } from "@/db/schema";
import { z } from "zod";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/db/db";
import paths from "@/path";
import { revalidatePath } from "next/cache";
const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message: "must be lowercase letters or dashes without spaces",
    }),
  description: z.string().min(10),
});

interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}

export async function createTopic(
  formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const result = createTopicSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });
  if (!result.success) {
    return {
      errors: {
        ...result.error.flatten().fieldErrors,
        _form: [],
      },
    };
  }

  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["you must be signed in to do this"],
      },
    };
  }

  let topic;
  try {
    const res = await db
      .insert(topics)
      .values({
        slug: result.data.name,
        description: result.data.description,
      })
      .returning();
    topic = res[0];
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["An error occurred while creating the topic"],
        },
      };
    }
  }
  revalidatePath("/");
  redirect(paths.topicShow(topic.slug));

  return {
    errors: {},
  };
}
