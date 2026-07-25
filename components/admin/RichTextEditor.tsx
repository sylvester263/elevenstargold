"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Heading2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Lightweight rich-text editor for blog post bodies — 05-admin-panel-and-blog.md
// says a full page-builder is out of scope, so this is intentionally a
// small, fixed toolbar rather than an extensible plugin system.
export function RichTextEditor({
  value,
  onChange,
}: {
  value: unknown;
  onChange: (json: unknown) => void;
}) {
  const editor = useEditor({
    extensions: [StarterKit, Link.configure({ openOnClick: false }), Image],
    content: (value as never) ?? "",
    onUpdate: ({ editor }) => onChange(editor.getJSON()),
    editorProps: {
      attributes: {
        class: "min-h-[240px] px-3 py-3 text-sm focus:outline-none",
      },
    },
    immediatelyRender: false,
  });

  if (!editor) return null;

  function toolbarButton(active: boolean) {
    return cn(
      "rounded p-1.5 text-ink hover:bg-line",
      active && "bg-line text-gold",
    );
  }

  return (
    <div className="border border-line bg-paper">
      <div className="flex flex-wrap gap-1 border-b border-line p-1.5">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={toolbarButton(editor.isActive("bold"))}
          aria-label="Bold"
        >
          <Bold className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={toolbarButton(editor.isActive("italic"))}
          aria-label="Italic"
        >
          <Italic className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={toolbarButton(editor.isActive("heading", { level: 2 }))}
          aria-label="Heading"
        >
          <Heading2 className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={toolbarButton(editor.isActive("bulletList"))}
          aria-label="Bullet list"
        >
          <List className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={toolbarButton(editor.isActive("orderedList"))}
          aria-label="Numbered list"
        >
          <ListOrdered className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => {
            const url = window.prompt("Link URL");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          className={toolbarButton(editor.isActive("link"))}
          aria-label="Link"
        >
          <LinkIcon className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => {
            const url = window.prompt("Image URL");
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
          className={toolbarButton(false)}
          aria-label="Image"
        >
          <ImageIcon className="size-4" />
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
