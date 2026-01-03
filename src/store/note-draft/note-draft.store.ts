import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'

export type BackgroundColors =
	| 'default'
	| 'coral'
	| 'peach'
	| 'sand'
	| 'peppermint'
	| 'salvia'
	| 'lightgray'
	| 'storm'
	| 'twilight'
	| 'flower'
	| 'clay'
	| 'chalk'

export interface NoteDraft {
	userId: string
	noteId: string
	isArchived: boolean
	isPinned: boolean
	titleState: string
	contentState: string
	backgroundColor: BackgroundColors
	resetId: number
	tagsAddedToList: string[]
}

interface NoteDraftStore {
	note: NoteDraft

	setTitleState: (val: string) => void
	setContentState: (val: string) => void
	setBackgroundColor: (val: BackgroundColors) => void
	toggleTag: (tag: string) => void
	isTagSelected: (tag: string) => boolean
	togglePinned: () => void
	clearNote: () => void
	setIsArchived: (val: boolean) => void
}

const initialNote: NoteDraft = {
	userId: 'here_goes_userId',
	noteId: uuidv4(),
	titleState: '',
	contentState: '',
	isPinned: false,
	isArchived: false,
	backgroundColor: 'default',
	resetId: 0,
	tagsAddedToList: [],
}

export const useNoteDraftStore = create<NoteDraftStore>((set, get) => ({
	note: initialNote,

	setTitleState: val => set(s => ({ note: { ...s.note, titleState: val } })),

	tagsAddedToList: [],

	setContentState: val =>
		set(s => ({ note: { ...s.note, contentState: val } })),

	togglePinned: () =>
		set(s => ({
			note: { ...s.note, isPinned: !s.note.isPinned },
		})),

	setBackgroundColor: val =>
		set(s => ({ note: { ...s.note, backgroundColor: val } })),

	toggleTag: tag =>
		set(s => {
			const exists = s.note.tagsAddedToList.includes(tag)
			const tagsAddedToList = exists
				? s.note.tagsAddedToList.filter(t => t !== tag)
				: [...s.note.tagsAddedToList, tag]

			return { note: { ...s.note, tagsAddedToList } }
		}),

	isTagSelected: tag => get().note.tagsAddedToList.includes(tag),

	clearNote: () =>
		set(s => ({
			note: {
				...initialNote,
				resetId: s.note.resetId + 1,
			},
		})),

	setIsArchived: val => set(s => ({ note: { ...s.note, isArchived: val } })),
}))
