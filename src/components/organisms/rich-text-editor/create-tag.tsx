import AddIcon from "../../../../assets/icons/plus.svg?react";
import { useNoteDraftStore } from "../../../store/note-draft/note-draft.store";

export default function CreateTag({ query }: { query: string }) {
  const addTag = useNoteDraftStore((store) => store.toggleTag);
  return (
    <div
      className="flex items-center justify-start gap-3 w-full pt-3 border-t"
      onClick={() => addTag(query)}
    >
      <AddIcon />{" "}
      <p>
        Utworz etykiete <span className="font-semibold">"{query}"</span>
      </p>
    </div>
  );
}
