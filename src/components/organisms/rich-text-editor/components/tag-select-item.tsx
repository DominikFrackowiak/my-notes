import CheckboxChecked from "../../../../assets/icons/checkbox-checked.svg?react";
import CheckboxUnchecked from "../../../../assets/icons/checkbox-unchecked.svg?react";
import { useNoteDraftStore } from "../../../../store/note-draft/note-draft.store";

interface Props {
  tag: string;
}

export default function TagSelectItem({ tag }: Props) {
  const isTagSelected = useNoteDraftStore((store) => store.isTagSelected);
  const toggleTag = useNoteDraftStore((store) => store.toggleTag);

  return (
    <li
      onClick={() => toggleTag(tag)}
      key={tag}
      className="w-full flex items-center text-gray-400"
    >
      {isTagSelected(tag) ? (
        <CheckboxChecked className="w-4.5 h-4.5" />
      ) : (
        <CheckboxUnchecked className="w-4.5 h-4.5" />
      )}
      <span>{tag}</span>
    </li>
  );
}
