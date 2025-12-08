"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import { useEffect, useState } from "react";

interface TiptapEditorProps {
  value: string;
  onChange: (html: string) => void;
  height?: string;
}

export default function TiptapEditor({
  value,
  onChange,
  height = "200px",
}: TiptapEditorProps) {
  const [mounted, setMounted] = useState(false);

  // Only mark component as client-mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // Create editor ONCE — hooks must be unconditional
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Link.configure({ openOnClick: false }),
      BulletList,
      OrderedList,
    ],
    content: "", // DO NOT use SSR content — prevents hydration mismatch
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
    editable: true, // allow typing always
  });

  // AFTER mount, sync the content
  useEffect(() => {
    if (mounted && editor) {
      if (value && editor.getHTML() !== value) {
        editor.commands.setContent(value);
      }
    }
  }, [mounted, editor, value]);

  if (!editor) return null;

  return (
    <div className="border rounded bg-white">
      {/* Toolbar */}
      <div className="border-bottom p-2 d-flex gap-2 flex-wrap small">
        <button
          type="button"
          className={`btn btn-sm ${
            editor.isActive("bold") ? "btn-dark" : "btn-light"
          }`}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          B
        </button>

        <button
          type="button"
          className={`btn btn-sm ${
            editor.isActive("italic") ? "btn-dark" : "btn-light"
          }`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          I
        </button>

        <button
          type="button"
          className={`btn btn-sm ${
            editor.isActive("bulletList") ? "btn-dark" : "btn-light"
          }`}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          • List
        </button>

        <button
          type="button"
          className={`btn btn-sm ${
            editor.isActive("orderedList") ? "btn-dark" : "btn-light"
          }`}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1. List
        </button>

        <button
          type="button"
          className="btn btn-sm btn-light"
          onClick={() => {
            const url = window.prompt("Enter URL");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
        >
          🔗 Link
        </button>
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="p-2"
        style={{ minHeight: height }}
      />
    </div>
  );
}
