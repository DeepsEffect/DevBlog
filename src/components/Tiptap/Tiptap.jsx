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
import {
  BiBold,
  BiCode,
  BiItalic,
  BiLink,
  BiUnderline,
  BiUnlink,
} from "react-icons/bi";
import { Button, Tooltip } from "@nextui-org/react";
import { LuHeading1, LuHeading2, LuHeading3 } from "react-icons/lu";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { GoListOrdered, GoListUnordered } from "react-icons/go";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import { useCallback } from "react";
import "./styles.css";
import CodeBlock from "@tiptap/extension-code-block";

const Tiptap = ({ setContent }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      Link,
      Document,
      OrderedList,
      BulletList,
      ListItem,
      Text,
      Paragraph,
      CodeBlock,
      Heading.configure({
        HTMLAttributes: {
          class: "my-custom-class",
          levels: [1, 2, 3],
        },
      }),
      Link.configure({
        HTMLAttributes: {
          class: "custom-tiptap-link",
        },
      }),
      OrderedList.configure({
        itemTypeName: "listItem",
        HTMLAttributes: {
          class: "custom-ordered-list",
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "custom-unordered-list",
        },
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

  // set link functionality
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full mx-auto ">
      {/* toolbar */}
      <div className="flex flex-wrap gap-2 mb-2 mx-auto">
        {/* heading 1 */}
        <Tooltip content="heading 1">
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
            <LuHeading1 className="text-2xl" />
          </Button>
        </Tooltip>

        {/* heading 2 */}
        <Tooltip content="heading 2">
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
            <LuHeading2 className="text-2xl" />
          </Button>
        </Tooltip>

        {/* heading 3 */}
        <Tooltip content="Heading 3">
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
            <LuHeading3 className="text-2xl" />
          </Button>
        </Tooltip>

        {/* Bold */}
        <Tooltip content="Bold">
          <Button
            size="sm"
            variant="flat"
            isIconOnly
            auto
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "bg-primary" : ""}
          >
            <BiBold className="text-2xl" />
          </Button>
        </Tooltip>

        {/* Italic */}
        <Tooltip content="Italic">
          <Button
            size="sm"
            variant="flat"
            isIconOnly
            auto
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "bg-primary" : ""}
          >
            <BiItalic className="text-2xl" />
          </Button>
        </Tooltip>

        {/* codeBlock */}
        <Tooltip content="Code Block">
          <Button
            size="sm"
            variant="flat"
            isIconOnly
            auto
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive("codeBlock") ? "bg-primary" : ""}
          >
            <BiCode className="text-3xl" />
          </Button>
        </Tooltip>

        {/* Link */}
        <Tooltip content="Link">
          <Button
            size="sm"
            variant="flat"
            isIconOnly
            auto
            onClick={setLink}
            className={editor.isActive("link") ? "bg-primary" : ""}
          >
            <BiLink className="text-2xl" />
          </Button>
        </Tooltip>

        {/* unset link */}
        <Tooltip content="Remove Link">
          <Button
            size="sm"
            variant="flat"
            isIconOnly
            auto
            onClick={() => editor.chain().focus().unsetLink().run()}
            disabled={!editor.isActive("link")}
          >
            <BiUnlink className="text-2xl" />
          </Button>
        </Tooltip>

        {/* Underline */}
        <Tooltip content="Underline">
          <Button
            size="sm"
            variant="flat"
            isIconOnly
            auto
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive("underline") ? "bg-primary" : ""}
          >
            <BiUnderline className="text-2xl" />
          </Button>
        </Tooltip>

        {/* unordered lists */}
        <Tooltip content="Unordered List">
          <Button
            size="sm"
            variant="flat"
            isIconOnly
            auto
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "bg-primary" : ""}
          >
            <GoListUnordered className="text-2xl" />
          </Button>
        </Tooltip>

        {/* ordered lists */}
        <Tooltip content="Ordered List">
          <Button
            size="sm"
            variant="flat"
            isIconOnly
            auto
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "bg-primary" : ""}
          >
            <GoListOrdered className="text-2xl" />
          </Button>
        </Tooltip>
      </div>

      {/* editor */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
