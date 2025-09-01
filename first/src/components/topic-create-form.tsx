"use client";
import React from "react";
import {
  Input,
  
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@heroui/react";
import { Button } from "./ui/button";
import * as actions from "@/actions";
import { useActionState , startTransition } from "react";
export default function TopicCreateForm() {
  const [formState, action] = useActionState(actions.createTopic, {
    errors: {}
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }
  return (
    <Popover placement="left" className="justify-between">
      <PopoverTrigger>
        <Button color="primary">Create a Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a topic</h3>
            <Input
              name="name"
              type="text"
              label="name"
              labelPlacement="outside"
              placeholder="Name"
              isInvalid = {!!formState.errors.name}
              errorMessage={formState.errors.name?.join(",")}
            />
            <Textarea
              name="description"
              label="Description"
              labelPlacement="outside"
              placeholder="Describe your topic"
              isInvalid = {!!formState.errors.description}
              errorMessage={formState.errors.description?.join(",")}
            />
            {formState.errors._form? <div className="p-2 bg-red-400 rounded border text-black border-red-400">{formState.errors._form?.join(', ')}</div> : null}
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
