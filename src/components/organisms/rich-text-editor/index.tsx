import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";

import { useRef, useState } from "react";
import MainOptionsMenu from "./components/main-options-menu";
import { useFormStore } from "../../../store/ui/form.store";
import { cn } from "../../../lib/tw-merge";
import { backgroundColors } from "../../../constants/background-colors";
import { useNoteDraftStore } from "../../../store/note-draft/note-draft.store";
import TagsBar from "./components/tags-bar";
import Button from "@/components/atoms/Button";
import PinNoteIcon from "../../../assets/icons/pin-note.svg?react";
import PinnedNoteIcon from "../../../assets/icons/pinned-note.svg?react";
import ImageIcon from "../../../assets/icons/image.svg?react";
import { uploadImage } from "../../../services/upload-image";

function RichTextEditor() {
  const refEditor = useRef<HTMLDivElement | null>(null);
  const isFormActive = useFormStore((store) => store.isFormActive);
  const setIsFormActive = useFormStore((store) => store.setIsFormActive);
  const isPinned = useNoteDraftStore(store => store.note.isPinned);
  const togglePinned = useNoteDraftStore(store => store.togglePinned);
  const backgroundColor = useNoteDraftStore(
    (store) => store.note.backgroundColor
  );

  const fileRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      // Underline,
      Placeholder.configure({
        placeholder: "Utwórz notatkę…",
      }),
      Image.configure({
        resize: {
          enabled: true,
          alwaysPreserveAspectRatio: true,
        },
      }),
    ],

    editorProps: {
      attributes: {
        class: "tiptap",
      },
    },
  });

  const titleEditor = useEditor({
    extensions: [
      StarterKit,
      // Underline,
      Placeholder.configure({
        placeholder: "Tytuł",
      }),
    ],

    editorProps: {
      attributes: {
        class: "tiptap",
      },
    },
  });

  if (!editor) {
    return null;
  }

  function replaceImageSrc(editor: Editor, fromSrc: string, toSrc: string) {
    const { state, view } = editor;
    const { tr } = state;

    state.doc.descendants((node, pos) => {
      if (node.type.name === "image" && node.attrs.src === fromSrc) {
        tr.setNodeMarkup(pos, undefined, { ...node.attrs, src: toSrc });
        return false;
      }
      return true;
    });

    if (tr.docChanged) view.dispatch(tr);
  }

  async function onPickImage(file: File) {
    setIsFormActive(true);
    setIsUploading(true);

    const localUrl = URL.createObjectURL(file);
    editor.chain().focus().setImage({ src: localUrl, alt: file.name }).createParagraphNear().run();

    try {
      const remoteUrl = await uploadImage(file);

      replaceImageSrc(editor, localUrl, remoteUrl);
    } catch (err) {
      console.error(err);
    } finally {
      URL.revokeObjectURL(localUrl);
      setIsUploading(false);
    }
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
        editor.getJSON().content.forEach(el => console.log(el.attrs))
        setIsFormActive(false);
        editor.destroy();
      }}
    >
      <div
        data-ui="form"
        ref={refEditor}
        className={cn(
          "flex flex-col w-full lg:w-form shadow-xl rounded-lg border border-border-form transition-colors duration-1000 text-txt-translucid gap-2",
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
        {isFormActive ? <div className="flex justify-between items-center"><EditorContent editor={titleEditor} />
          <Button
            size='L'
            icon={!isPinned ? <PinNoteIcon /> : <PinnedNoteIcon />}
            onClick={togglePinned}
          /></div> : null}
        <div className="flex flex-1 justify-between items-center">
          <EditorContent editor={editor} />
          {!isFormActive ? <Button
            size='L'
            icon={<ImageIcon />}
            onClick={(e) => {
              e.stopPropagation();
              fileRef.current?.click();
            }}
          /> : null}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              e.stopPropagation();
              const file = e.target.files?.[0];
              if (!file) return;
              e.currentTarget.value = "";
              await onPickImage(file);
            }}
          />
        </div>
        {isFormActive ? <TagsBar /> : null}
        {isFormActive ? <MainOptionsMenu editor={editor} /> : null}
      </div>
    </div>
  );
}

export default RichTextEditor;
