"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Placeholder from "@tiptap/extension-placeholder";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Code from "@tiptap/extension-code";
import Heading from "@tiptap/extension-heading";
import { BiBold, BiItalic, BiLink, BiUnderline } from "react-icons/bi";
import { Button } from "@nextui-org/react";
import "./styles.css";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      Link,
      Document,
      Text,
      Paragraph,
      Code,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Placeholder.configure({
        placeholder: "Write your blog content here...",
      }),
    ],

    editorProps: {
      attributes: {
        class: "min-h-[200px] p-3 bg-[#2E2E30] rounded-lg outline-none mt-0",
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full mx-auto ">
      {/* toolbar */}
      <div className="flex space-x-2 mb-2 mx-auto">
        {/* Bold */}
        <Button
          size="sm"
          isIconOnly
          auto
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "bg-primary" : ""}
        >
          <BiBold className="text-xl" />
        </Button>
        {/* Italic */}
        <Button
          size="sm"
          isIconOnly
          auto
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "bg-primary" : ""}
        >
          <BiItalic className="text-xl" />
        </Button>
        {/* Underline */}
        <Button
          size="sm"
          isIconOnly
          auto
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "bg-primary" : ""}
        >
          <BiUnderline className="text-xl" />
        </Button>
        {/* Link */}
        <Button
          size="sm"
          isIconOnly
          auto
          onClick={() => {
            const url = prompt("Enter the URL");
            editor.chain().focus().setLink({ href: url }).run();
          }}
          className={editor.isActive("link") ? "bg-primary" : ""}
        >
          <BiLink className="text-xl" />
        </Button>
      </div>

      {/* editor */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
