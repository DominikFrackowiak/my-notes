import { type Editor, useEditorState } from "@tiptap/react";
import BoldIcon from "../../../assets/icons/bold.svg?react";
import ItalicIcon from "../../../assets/icons/italic.svg?react";
import UnderlineIcon from "../../../assets/icons/underline.svg?react";
import NoFormatIcon from "../../../assets/icons/no-format.svg?react";
import ParagraphIcon from "../../../assets/icons/paragraph.svg?react";
import Heading1Icon from "../../../assets/icons/heading1.svg?react";
import Heading2Icon from "../../../assets/icons/heading2.svg?react";
import Button from "../../atoms/Button";

export default function TextFormattingMenu({ editor }: { editor: Editor }) {
  useEditorState({
    editor,
    selector: ({ editor }) => ({
      bold: editor.isActive("bold"),
      italic: editor.isActive("italic"),
      underline: editor.isActive("underline"),
      h1: editor.isActive("heading", { level: 1 }),
      h2: editor.isActive("heading", { level: 2 }),
      p: editor.isActive("paragraph"),
    }),
  });

  if (!editor) {
    return null;
  }

  const HTMLTagOptions = [
    {
      name: "Heading1",
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive("heading", { level: 1 }),
      icon: <Heading1Icon className="text-txt dark:text-txt-dark" />,
    },
    {
      name: "Heading2",
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive("heading", { level: 2 }),
      icon: <Heading2Icon className="text-txt dark:text-txt-dark" />,
    },
    {
      name: "Paragraph",
      onClick: () => editor.chain().focus().setParagraph().run(),
      isActive: () => editor.isActive("paragraph"),
      icon: <ParagraphIcon className="text-txt dark:text-txt-dark" />,
    },
  ];

  const Options = [
    {
      name: "Bold",
      onClick: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive("bold"),
      icon: <BoldIcon className="text-txt dark:text-txt-dark" />,
    },
    {
      name: "Italic",
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive("italic"),
      icon: <ItalicIcon className="text-txt dark:text-txt-dark" />,
    },

    {
      name: "Underline",
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      isActive: () => editor.isActive("underline"),
      icon: <UnderlineIcon className="text-txt dark:text-txt-dark" />,
    },
    {
      name: "NoFormat",
      onClick: () =>
        editor
          .chain()
          .focus()
          .unsetAllMarks()
          .clearNodes()
          .setParagraph()
          .run(),
      isActive: () => false,

      icon: <NoFormatIcon className="text-txt dark:text-txt-dark" />,
    },
  ];

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 px-4">
        {HTMLTagOptions.map((option) => (
          <Button
            key={option.name}
            onClick={option.onClick}
            size="SM"
            isActive={option.isActive()}
            icon={option.icon}
          />
        ))}
      </div>
      <div className="h-6 w-px bg-button-background-gray dark:bg-button-background-gray-dark"></div>
      <div className="flex gap-2 px-4 ">
        {Options.map((option) => (
          <Button
            key={option.name}
            onClick={option.onClick}
            size="SM"
            isActive={option.isActive()}
            icon={option.icon}
          />
        ))}
      </div>
    </div>
  );
}
