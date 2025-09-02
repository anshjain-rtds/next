"use client";
import React, { startTransition, useActionState } from "react";
import * as actions from "@/actions";
import { Input, Textarea } from "@heroui/react";
import FormButton from "../common/form-button";
import { Button } from "../ui/button";

interface PostCreateFormProps {
  slug: string;
}

export default function PostCreateForm({ slug }: PostCreateFormProps) {
  const [formState, action] = useActionState(
    actions.createPost.bind(null, slug),
    {
      errors: {},
    }
  );

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

      {formState.errors._form ? (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {formState.errors._form?.join(", ")}
          </div>
        </div>
      ) : null}

      <div className="pt-2">
        <FormButton className="w-full">Create Post</FormButton>
      </div>
    </form>
  );
}
