"use client";

import { snippet } from "@/db/schema";
import { Editor } from "@monaco-editor/react";
import   { useState} from "react";

interface SnippetEditFormProps {
  snippet: typeof snippet;
}
export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {

const [ code, setCode ] = useState(snippet.code);

  const handleEditorChange = (value: string = "") => {
    setCode(value)
  };

  async function editSnippet(){
    'use server';

    
  }
  return (
    <div>
      <Editor
        height="40vh"
        theme="vs-dark"
        language="javascript"
        defaultValue={snippet.code}
        options={{ minimap: { enabled: false } }}
        onChange={handleEditorChange}
      />
    </div>
  );
}
