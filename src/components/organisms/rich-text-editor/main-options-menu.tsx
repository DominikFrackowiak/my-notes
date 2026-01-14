import { useState } from "react";

// import useImageUpload from "@/components/tiptap-ui/image-upload-button";
import Button from "../../atoms/Button";
import PopoverComponent from "../../molecules/popover";
// import ImageIcon from "../../assets/icons/image.svg?react";
import ImageIcon from "../../../assets/icons/image.svg?react";
import PaletteIcon from "../../../assets/icons/palette.svg?react";
import FormattingIcon from "../../../assets/icons/formatting.svg?react";
import MoreOptionsIcon from "../../../assets/icons/more-options.svg?react";
import ArchiveIcon from "../../../assets/icons/archive.svg?react";

import BackgroundColorSelection from "../form-create-note/components/background-color-selection";
import MoreOptions from "../form-create-note/components/more-options";
import TextFormattingMenu from "./text-formatting-menu";
import { type Editor } from "@tiptap/react";
import { useFormStore } from "../../../store/ui/form.store";
import { useNoteDraftStore } from "../../../store/note-draft/note-draft.store";

export default function MainOptionsMenu({ editor }: { editor: Editor }) {
  // const { handleImage } = useImageUpload({
  //   editor,
  //   hideWhenUnavailable: true,
  //   onInserted: () => {
  //     // opcjonalnie: toast / analytics
  //   },
  // });
  const [isTextFormattingMenuOpen, setIsTextFormattingMenuOpen] =
    useState(false);
  const [showCreatableTagSelect, setShowCreatableTagSelect] =
    useState<boolean>(false);

  const setIsFormActive = useFormStore((store) => store.setIsFormActive);
  const setIsArchived = useNoteDraftStore((store) => store.setIsArchived);

  //   const fileRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className="w-full flex flex-col gap-2 p-2">
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
              //   fileRef.current?.click();
              alert("working");
              // handleImage();
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
        </div>
        <Button
          isRectangular={true}
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
