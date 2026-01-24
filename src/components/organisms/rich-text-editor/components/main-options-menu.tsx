import { useRef, useState } from "react";

import Button from "../../../atoms/Button";
import PopoverComponent from "../../../molecules/popover";

import ImageIcon from "../../../../assets/icons/image.svg?react";
import PaletteIcon from "../../../../assets/icons/palette.svg?react";
import FormattingIcon from "../../../../assets/icons/formatting.svg?react";
import MoreOptionsIcon from "../../../../assets/icons/more-options.svg?react";
import ArchiveIcon from "../../../../assets/icons/archive.svg?react";
import RepeatIcon from "../../../../assets/icons/repeat.svg?react";

import BackgroundColorSelection from "./background-color-selection";
import MoreOptions from "./more-options";
import TextFormattingMenu from "./text-formatting-menu";
import { type Editor } from "@tiptap/react";
import { useFormStore } from "../../../../store/ui/form.store";
import { useNoteDraftStore } from "../../../../store/note-draft/note-draft.store";
import { uploadImage } from "../../../../services/upload-image";

export default function MainOptionsMenu({ editor }: { editor: Editor }) {
  const [isTextFormattingMenuOpen, setIsTextFormattingMenuOpen] =
    useState(false);
  const [showCreatableTagSelect, setShowCreatableTagSelect] =
    useState<boolean>(false);

  const setIsFormActive = useFormStore((store) => store.setIsFormActive);
  const setIsArchived = useNoteDraftStore((store) => store.setIsArchived);

  const fileRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);

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
    <div className="w-full flex flex-col gap-2 py-2">
      {isTextFormattingMenuOpen ? <TextFormattingMenu editor={editor} /> : null}
      <div className="flex w-full justify-between items-center">
        <div className="w-full flex items-center gap-2">
          <Button
            size="SM"
            icon={<FormattingIcon className=" text-txt dark:text-txt-dark" />}
            onClick={() => setIsTextFormattingMenuOpen((v) => !v)}
          />
          <PopoverComponent
            trigger={
              <Button
                size="SM"
                icon={<PaletteIcon className="text-txt dark:text-txt-dark" />}
                as="div"
              />

            }
            onClick={() => setIsTextFormattingMenuOpen(false)}
          >
            <BackgroundColorSelection />
          </PopoverComponent>
          <Button
            size="SM"
            icon={<ImageIcon className=" text-txt dark:text-txt-dark" />}
            onClick={(e) => {
              e.stopPropagation();
              fileRef.current?.click();
            }}
          />
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
          <Button
            size="SM"
            icon={<ArchiveIcon className=" text-txt dark:text-txt-dark" />}
            onClick={(e) => {
              e.stopPropagation();
              setIsArchived(true);
              setIsFormActive(false);
            }}
          />
          <PopoverComponent
            trigger={
              <Button
                size="SM"
                icon={
                  <MoreOptionsIcon className="text-txt dark:text-txt-dark" />
                }
                as="div"
              />
            }
            onClick={() => {
              setShowCreatableTagSelect(false);
              setIsTextFormattingMenuOpen(false);
            }}
          >
            <MoreOptions
              showCreatableTagSelect={showCreatableTagSelect}
              setShowCreatableTagSelect={setShowCreatableTagSelect}
              data-ui="form-more-options"
            />
          </PopoverComponent>
          <Button size="SM" icon={<RepeatIcon className="text-txt dark:text-txt-dark" />} onClick={() => editor.chain().focus().undo().run()} />
          <Button size="SM" icon={<RepeatIcon className="text-txt dark:text-txt-dark rotate-180" />} onClick={() => editor.chain().focus().redo().run()} />
        </div>
        <Button
          isRectangular
          onClick={(e) => {
            e.stopPropagation();

            setIsFormActive(false);
          }}
        >
          <span className="text-txt-translucid-darker text-sm dark:text-txt-dark">
            Zamknij
          </span>
        </Button>
      </div>
    </div>
  );
}
