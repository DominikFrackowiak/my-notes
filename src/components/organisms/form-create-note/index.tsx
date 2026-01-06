import { useEffect, useRef } from 'react'

import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import ToolbarPlugin from './components/toolbar-plugin'
import { cn } from '../../../lib/tw-merge'
import Button from '../../atoms/Button'
import PinNoteIcon from '../../../assets/icons/pin-note.svg?react'
import PinnedNoteIcon from '../../../assets/icons/pinned-note.svg?react'
import ImageIcon from '../../../assets/icons/image.svg?react'
import TagChip from '../../atoms/tag-chip'
import { useNoteDraftStore } from '../../../store/note-draft/note-draft.store'
import { useFormStore } from '../../../store/ui/form.store'
import { backgroundColors } from '../../../constants/background-colors'
import { ImageNode } from './nodes/image-node'
import ImagePlugin from './components/image-plugin'
import { INSERT_IMAGE_COMMAND } from './components/image-plugin'
import { ImageUploadButtonPlugin } from './components/image-upload-button-plugin'

const theme = {
	text: {
		bold: 'font-bold',
		italic: 'italic',
		underline: 'underline',
		strikethrough: 'line-through',
	},
}

function onError(error: Error) {
	console.error(error)
}

export default function Form() {
	const tagsAddedToList = useNoteDraftStore(store => store.note.tagsAddedToList)
	const backgroundColor = useNoteDraftStore(store => store.note.backgroundColor)
	const resetId = useNoteDraftStore(store => store.note.resetId)
	const setTitleState = useNoteDraftStore(store => store.setTitleState)
	const setContentState = useNoteDraftStore(store => store.setContentState)
	const resetForm = useNoteDraftStore(store => store.clearNote)
	const isFormActive = useFormStore(store => store.isFormActive)
	const setIsFormActive = useFormStore(store => store.setIsFormActive)
	const isPinned = useNoteDraftStore(store => store.note.isPinned)
	const togglePinned = useNoteDraftStore(store => store.togglePinned)
	const note = useNoteDraftStore(store => store.note)

	const refForm = useRef<HTMLDivElement | null>(null)
	const fileRef = useRef<HTMLInputElement | null>(null)

	const titleConfig = {
		namespace: 'TitleEditor',
		theme,
		onError,
	}

	const contentConfig = {
		namespace: 'ContentEditor',
		theme,
		onError,
		nodes: [ImageNode],
	}

	useEffect(() => {
		const onDocClick = (e: MouseEvent) => {
			const el = refForm.current
			if (!el) return
			if (!(e.target instanceof Node)) return

			if (!el.contains(e.target)) {
				console.log(note)
				// resetForm()
				setIsFormActive(false)
			}
		}

		document.addEventListener('click', onDocClick, true)
		return () => document.removeEventListener('click', onDocClick, true)
	}, [resetForm, setIsFormActive])

	const onCreateNote = (note: { title: string; contentHtml: string }) => {
		alert(note.contentHtml)
	}

	return (
		<div
			data-ui='form'
			ref={refForm}
			className={cn(
				'flex flex-col w-full lg:w-form shadow-xl rounded-lg border border-border-form transition-colors duration-1000 text-txt-translucid gap-4',
				!isFormActive
					? 'h-11 justify-center px-4'
					: 'min-h-34 h-auto justify-start px-4 pt-3',
				backgroundColors[backgroundColor]
			)}
			onClick={e => {
				e.stopPropagation()
				setIsFormActive(true)
			}}
		>
			<div className='min-h-0 flex flex-col'>
				{isFormActive && (
					<div className='relative'>
						<LexicalComposer
							key={`title-${resetId}`}
							initialConfig={titleConfig}
						>
							<div className='flex justify-between items-center '>
								<RichTextPlugin
									contentEditable={
										<ContentEditable
											aria-placeholder={'Enter title...'}
											className='w-full py-2 px-3 outline-none'
											placeholder={
												<span className='pointer-events-none absolute left-3 top-2 text-xl'>
													Tytuł
												</span>
											}
										/>
									}
									ErrorBoundary={LexicalErrorBoundary}
								/>

								<Button
									size='L'
									icon={!isPinned ? <PinNoteIcon /> : <PinnedNoteIcon />}
									onClick={togglePinned}
								/>
								
							</div>
							<HistoryPlugin />

							<OnChangePlugin
								onChange={editorState => {
									const json = JSON.stringify(editorState.toJSON())
									setTitleState(json)
								}}
							/>
						</LexicalComposer>
					</div>
				)}
				<div className='relative h-full'>
					<LexicalComposer
						key={`content-${resetId}`}
						initialConfig={contentConfig}
					>
						<div className='flex justify-between items-center h-full px-3'>
							<RichTextPlugin
								contentEditable={
									<ContentEditable className='flex items-center w-full  outline-none' />
								}
								placeholder={
									<span className='pointer-events-none absolute text-15'>
										Utwórz notatkę…
									</span>
								}
								ErrorBoundary={LexicalErrorBoundary}
							/>
							<ImagePlugin />
							{!isFormActive ? <ImageUploadButtonPlugin />  : null}
						</div>

						<HistoryPlugin />
						<OnChangePlugin
							onChange={editorState => {
								const json = JSON.stringify(editorState.toJSON())
								setContentState(json)
							}}
						/>
						{isFormActive ? (
							<div className='w-full'>
								<div className='w-full flex gap-2 flex-wrap px-3'>
									{tagsAddedToList.length
										? tagsAddedToList.map(tag => <TagChip tag={tag} />)
										: null}
								</div>
								<div className='flex gap-2'>
									<ToolbarPlugin />
								</div>
							</div>
						) : null}
					</LexicalComposer>
				</div>
			</div>
		</div>
	)
}
