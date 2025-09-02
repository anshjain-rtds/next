"use client";

import { useActionState } from "react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

import FormButton from "@/components/common/form-button";
import * as actions from "@/actions";
import { Textarea } from "@heroui/react";

interface CommentCreateFormProps {
  postId: string;
  parentId?: string;
  startOpen?: boolean;
}

export default function CommentCreateForm({
  postId,
  parentId,
  startOpen,
}: CommentCreateFormProps) {
  const [open, setOpen] = useState(!!startOpen);
  const ref = useRef<HTMLFormElement | null>(null);
  const [formState, action, isPending] = useActionState(
    actions.createComment.bind(null, { postId, parentId }),
    { errors: {} }
  );

  useEffect(() => {
    if (formState.success) {
      ref.current?.reset();

      if (!startOpen) {
        setOpen(false);
      }
    }
  }, [formState, startOpen]);

  const form = (
    <form action={action} ref={ref} className="mt-3">
      <div className="space-y-3">
        <div>
          <Textarea
            name="content"
            label={parentId ? "Reply" : "Comment"}
            placeholder={parentId ? "Write a reply..." : "Share your thoughts..."}
            isInvalid={!!formState.errors.content}
            errorMessage={formState.errors.content?.join(", ")}
            className="text-foreground"
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

        <div className="flex justify-end gap-2">
          {!startOpen && (
            <Button 
              type="button" 
              size="sm" 
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          )}
          <FormButton>{parentId ? "Reply" : "Comment"}</FormButton>
        </div>
      </div>
    </form>
  );

  return (
    <div>
      {startOpen ? (
        form
      ) : (
        <div className="flex items-center gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => setOpen(!open)}
            className="text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
            Reply
          </Button>
          {open && form}
        </div>
      )}
    </div>
  );
}
