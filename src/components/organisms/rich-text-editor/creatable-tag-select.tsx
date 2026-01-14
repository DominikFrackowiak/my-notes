import { useMemo, useState } from "react";
import SearchIcon from "../../../assets/icons/search.svg?react";
import TagSelectItem from "./tag-select-item";
import CreateTag from "./create-tag";
import { useNoteDraftStore } from "../../../store/note-draft/note-draft.store";

export default function CreatableTagSelect() {
  const [searchedValue, setSearchedValue] = useState("");
  const tags = useNoteDraftStore((store) => store.note.tagsAddedToList);

  const query = searchedValue.trim();
  const q = query.toLowerCase();

  const filteredTags = useMemo(() => {
    if (!query) return tags;
    return tags.filter((tag) => tag.toLowerCase().includes(q));
  }, [query, q, tags]);

  const exactExists = useMemo(() => {
    if (!query) return false;
    return tags.some((t) => t.toLowerCase() === q);
  }, [tags, q, query]);

  const showCreate =
    query.length > 0 && filteredTags.length === 0 && !exactExists;

  return (
    <div
      className="absolute flex flex-col bg-background dark:bg-background-dark py-2 px-2.5 rounded-lg shadow-popover gap-2 max-h-[315px] w-[225px]"
      data-ui="form-create-tag"
    >
      <h2>Etykieta notatki</h2>

      <div className="relative w-full h-5 border border-red-700 text-gray-400">
        <input
          className="absolute top-0 left-0 w-full h-full border"
          type="text"
          placeholder="Enter your tag"
          value={searchedValue}
          onChange={(e) => setSearchedValue(e.target.value)}
        />
        <SearchIcon className="absolute top-1/2 -translate-y-1/2 right-0 h-4 w-4 border" />
      </div>

      <ul className="flex flex-col flex-1 overflow-y-auto mt-2">
        {showCreate ? (
          <CreateTag query={searchedValue} />
        ) : (
          filteredTags.map((tag) => <TagSelectItem key={tag} tag={tag} />)
        )}
      </ul>
    </div>
  );
}
