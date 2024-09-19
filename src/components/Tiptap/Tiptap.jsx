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
import Heading from "@tiptap/extension-heading";
import { BiBold, BiCode, BiItalic, BiLink, BiUnderline } from "react-icons/bi";
import { Button } from "@nextui-org/react";
import { LuHeading1, LuHeading2, LuHeading3 } from "react-icons/lu";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { all, createLowlight } from "lowlight";
import "./styles.css";

// create a lowlight instance
const lowlight = createLowlight(all);

const Tiptap = ({ setContent }) => {
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
      Heading.configure({
        HTMLAttributes: {
          class: "my-custom-class",
          levels: [1, 2, 3],
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
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

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContent(html);
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full mx-auto ">
      {/* toolbar */}
      <div className="flex space-x-2 mb-2 mx-auto ">
        {/* heading 1 */}
        <Button
          size="sm"
          variant="flat"
          isIconOnly
          auto
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "bg-primary" : ""
          }
        >
          <LuHeading1 className="text-xl" />
        </Button>

        {/* heading 2 */}
        <Button
          size="sm"
          variant="flat"
          isIconOnly
          auto
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "bg-primary" : ""
          }
        >
          <LuHeading2 className="text-xl" />
        </Button>

        {/* heading 3 */}
        <Button
          size="sm"
          variant="flat"
          isIconOnly
          auto
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "bg-primary" : ""
          }
        >
          <LuHeading3 className="text-xl" />
        </Button>

        {/* Bold */}
        <Button
          size="sm"
          variant="flat"
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
          variant="flat"
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
          variant="flat"
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
          variant="flat"
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

        {/* codeBlock */}
        <Button
          size="sm"
          variant="flat"
          isIconOnly
          auto
          onClick={() => editor.chain().focus().setCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "bg-primary" : ""}
        >
          <BiCode className="text-xl" />
        </Button>
      </div>

      {/* editor */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
