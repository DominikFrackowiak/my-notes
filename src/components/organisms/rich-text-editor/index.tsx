import { useEditor, EditorContent } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";

// import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node";
// import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";

import { useRef } from "react";
import MainOptionsMenu from "./main-options-menu";
import { useFormStore } from "../../../store/ui/form.store";
import { cn } from "../../../lib/tw-merge";
import { backgroundColors } from "../../../constants/background-colors";
import { useNoteDraftStore } from "../../../store/note-draft/note-draft.store";

function RichTextEditor() {
  const refEditor = useRef<HTMLDivElement | null>(null);
  const isFormActive = useFormStore((store) => store.isFormActive);
  const setIsFormActive = useFormStore((store) => store.setIsFormActive);
  const backgroundColor = useNoteDraftStore(
    (store) => store.note.backgroundColor
  );
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: "Utwórz notatkę…",
      }),
      Image.configure({
        resize: {
          enabled: true,
          alwaysPreserveAspectRatio: true,
        },
      }),
      //   ImageUploadNode.configure({
      //     accept: "image/*",
      //     maxSize: MAX_FILE_SIZE,
      //     limit: 3,
      //     upload: handleImageUpload,
      //     onError: (error) => console.error("Upload failed:", error),
      //   }),
    ],
    // content: '<p>Utworz notatke</p>',
    editorProps: {
      attributes: {
        class: "tiptap",
      },
    },
  });

  const titleEditor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: "Tytuł",
      }),
    ],
    // content: '<p>Utworz notatke</p>',
    editorProps: {
      attributes: {
        class: "tiptap",
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex justify-center items-start",
        isFormActive
          ? "h-screen w-full bg-transparent"
          : "h-11 w-auto bg-transparent"
      )}
      onClick={(e) => {
        e.stopPropagation();
        setIsFormActive(false);
      }}
    >
      <div
        data-ui="form"
        ref={refEditor}
        className={cn(
          "flex flex-col w-full lg:w-form shadow-xl rounded-lg border border-border-form transition-colors duration-1000 text-txt-translucid gap-4",
          !isFormActive
            ? "h-11 justify-center px-4"
            : "min-h-34 h-auto justify-start px-4 pt-3",
          backgroundColors[backgroundColor]
        )}
        onClick={(e) => {
          e.stopPropagation();
          setIsFormActive(true);
        }}
      >
        {isFormActive ? <EditorContent editor={titleEditor} /> : null}
        <EditorContent editor={editor} />
        {isFormActive ? <MainOptionsMenu editor={editor} /> : null}
      </div>
    </div>
  );
}

export default RichTextEditor;
