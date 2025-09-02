"use client";

import { snippet } from "@/db/schema";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import * as actions from "@/actions";
import Link from "next/link";

interface SnippetEditFormProps {
  snippet: typeof snippet;
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const [code, setCode] = useState(snippet.code);

  const handleEditorChange = (value: string = "") => {
    setCode(value);
  };

  const editSnippetAction = actions.editSnippet.bind(
    null,
    Number(snippet.id),
    code
  );

  return (
    <div className="space-y-6">
      <div className="rounded-lg overflow-hidden border border-border">
        <Editor
          height="50vh"
          theme="vs-dark"
          language="javascript"
          defaultValue={snippet.code}
          options={{ 
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            automaticLayout: true
          }}
          onChange={handleEditorChange}
        />
      </div>
      
      <div className="flex justify-end gap-3">
        <Link 
          href={`/snippets/${snippet.id}`} 
          className="px-4 py-2 rounded-lg border border-input bg-background text-foreground font-medium hover:bg-muted transition-colors duration-200"
        >
          Cancel
        </Link>
        <form action={editSnippetAction}>
          <button 
            type="submit" 
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors duration-200 shadow-md"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
