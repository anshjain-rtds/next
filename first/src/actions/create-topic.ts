"use server";

import { topics } from "@/db/schema";
import { z } from "zod";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/db/db";
import paths from "@/path";
import { revalidatePath } from "next/cache";
import * as yup from "yup";

const createTopicSchema = yup.object({
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters long")
    .matches(/^[a-z-]+$/, "Name must be lowercase letters or dashes without spaces")
    .required("Name is required"),
  description: yup
    .string()
    .min(10, "Description must be at least 10 characters long")
    .required("Description is required"),
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

  try {
    const validatedData = await createTopicSchema.validate({
      name: formData.get("name"),
      description: formData.get("description"),
    }, { abortEarly: false });

    const session = await auth();
    if (!session || !session.user) {
      return {
        errors: {
          _form: ["You must be signed in to do this"],
        },
      };
    }

    let topic;
    try {
      const res = await db
        .insert(topics)
        .values({
          slug: validatedData.name,
          description: validatedData.description,
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

  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errors: { [key: string]: string[] } = {};
      
      error.inner.forEach((err) => {
        if (err.path) {
          errors[err.path] = errors[err.path] ? [...errors[err.path], err.message] : [err.message];
        }
      });

      return {
        errors: {
          ...errors,
          _form: [],
        } as CreateTopicFormState['errors'],
      };
    }

    return {
      errors: {
        _form: ["An unexpected error occurred"],
      },
    };
  }
}