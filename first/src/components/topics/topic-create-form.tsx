"use client";
import React from "react";
import {
  Input,
  Textarea,
} from "@heroui/react";
import { Button } from "../ui/button";
import * as actions from "@/actions";
import FormButton from "../common/form-button";
import { useActionState, startTransition } from "react";

export default function TopicCreateForm() {
  const [formState, action] = useActionState(actions.createTopic, {
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
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div>
        <h3 className="text-lg font-medium text-foreground mb-3">Create a Topic</h3>
        <p className="text-sm text-muted-foreground mb-4">Start a new discussion topic for the community</p>
      </div>
      
      <div className="space-y-2">
        <Input
          name="name"
          type="text"
          label="Name"
          labelPlacement="outside"
          placeholder="Enter topic name"
          isInvalid={!!formState.errors.name}
          errorMessage={formState.errors.name?.join(", ")}
          className="text-foreground"
        />
      </div>
      
      <div className="space-y-2">
        <Textarea
          name="description"
          label="Description"
          labelPlacement="outside"
          placeholder="Describe your topic"
          isInvalid={!!formState.errors.description}
          errorMessage={formState.errors.description?.join(", ")}
          className="text-foreground"
          minRows={3}
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
        <FormButton className="w-full">Create Topic</FormButton>
      </div>
    </form>
  );
}
