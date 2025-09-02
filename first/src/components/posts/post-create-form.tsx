"use client";
import React, { startTransition, useActionState } from "react";
import * as actions from "@/actions";
import { Input, Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
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
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create a post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-xl font-semibold">Create a Post</h3>
            <Input
              name="title"
              label="Title"
              labelPlacement="outside"
              placeholder="Title"
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(",")}
            />
            <Input
              name="content"
              label="Content"
              labelPlacement="outside"
              placeholder="Content"
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(",")}
            />
            {formState.errors._form ? (
              <div className="p-2 bg-red-400 rounded border text-black border-red-400">
                {formState.errors._form?.join(", ")}
              </div>
            ) : null}

            <FormButton>Create Post</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
