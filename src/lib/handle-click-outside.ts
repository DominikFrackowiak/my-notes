import { RefObject } from 'react'
import { useNoteDraftStore } from '../store/note-draft/note-draft.store'
import { useFormStore } from '../store/ui/form.store'

function handleClickOutside(
	e: MouseEvent,
	ref: RefObject<HTMLDivElement | null>
) {
	const el = ref.current
	if (!el) return
	if (!(e.target instanceof Node)) return

	if (!el.contains(e.target)) {
		useNoteDraftStore.getState().clearNote()
	} else {
		useFormStore.getState().setIsFormActive(true)
	}
}

export default handleClickOutside
