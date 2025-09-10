"use client";
import React, { startTransition, useActionState } from "react";
import { Input, Textarea } from "@heroui/react";
import FormButton from "../common/form-button";
import { createPost } from "@/actions/create-post";
interface PostCreateFormProps {
  slug: string;
}

export default function PostCreateForm({ slug }: PostCreateFormProps) {
  const [formState, action] = useActionState(createPost.bind(null, slug), {
    errors: {},
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="space-y-2">
        <Input
          name="title"
          label="Title"
          labelPlacement="outside"
          placeholder="Enter post title"
          isInvalid={!!formState.errors.title}
          errorMessage={formState.errors.title?.join(", ")}
          className="text-foreground"
        />
      </div>

      <div className="space-y-2">
        <Textarea
          name="content"
          label="Content"
          labelPlacement="outside"
          placeholder="What would you like to discuss?"
          isInvalid={!!formState.errors.content}
          errorMessage={formState.errors.content?.join(", ")}
          className="text-foreground"
          minRows={4}
        />
      </div>

      {/* {formState.errors._form && formState.errors._form.length > 0 && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/30">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 mt-0.5 mr-3 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-red-800 dark:text-red-200 mb-1">
                There was an error creating your post
              </p>
              <div className="text-red-700 dark:text-red-300">
                {formState.errors._form.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )} */}

      <div className="pt-2">
        <FormButton>Create Post</FormButton>
      </div>
    </form>
  );
}
