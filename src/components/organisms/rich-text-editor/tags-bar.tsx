import TagChip from "@/components/atoms/tag-chip";
import { useNoteDraftStore } from "@/store/note-draft/note-draft.store";

export default function TagsBar() {
  const tagsAddedToList = useNoteDraftStore(
    (store) => store.note.tagsAddedToList
  );

  return (
    <>
      {tagsAddedToList.length ? (
        <div className="w-full flex gap-2 flex-wrap border border-red-800">
          {tagsAddedToList.map((tag) => (
            <TagChip tag={tag} key={tag} />
          ))}
        </div>
      ) : null}
    </>
  );
}
