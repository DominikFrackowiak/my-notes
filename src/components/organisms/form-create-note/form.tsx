import { useState, useEffect, useRef } from 'react'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import ToolbarPlugin from './toolbar-plugin'

import { cn } from '../../../lib/tw-merge'

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
	const [titleState, setTitleState] = useState<string>('')
	const [contentState, setContentState] = useState<string>('')
	const [isFormActive, setIsFormActive] = useState<boolean>(false)
	const [resetId, setResetId] = useState<number>(0)

	const refForm = useRef<HTMLDivElement | null>(null)

	const titleConfig = {
		namespace: 'TitleEditor',
		theme,
		onError,
	}

	const contentConfig = {
		namespace: 'ContentEditor',
		theme,
		onError,
	}

	function handleClickOutside(e: MouseEvent) {
		const el = refForm.current
		if (!el) return

		if (!(e.target instanceof Node)) return

		if (!el.contains(e.target)) {
			resetForm()
		} else {
			setFormActive(true)
		}
	}

	useEffect(() => {
		console.log({ titleState })
		console.log({ contentState })
	}, [titleState, contentState])

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true)

		return () => {
			document.removeEventListener('click', handleClickOutside, true)
		}
	}, [])

	const toggleFormActive = () => {
		setIsFormActive(prev => !prev)
	}

	const setFormActive = (val: boolean) => {
		setIsFormActive(val)
	}

	const onCreateNote = (note: { title: string; contentHtml: string }) => {
		alert(note.contentHtml)
	}

	function resetForm() {
		setTitleState('')
		setContentState('')
		setIsFormActive(false)
		setResetId(x => x + 1)
	}

	return (
		<div
			ref={refForm}
			className={cn(
				'flex flex-col w-form shadow-md rounded-md',
				!isFormActive ? 'h-11 ' : 'min-h-34 h-auto'
			)}
			onClick={e => {
				e.stopPropagation()
				setFormActive(true)
			}}
		>
			<div className='min-h-0 overflow-hidden flex flex-col'>
				{isFormActive && (
					<div className='relative'>
						<LexicalComposer
							key={`title-${resetId}`}
							initialConfig={titleConfig}
						>
							<RichTextPlugin
								contentEditable={
									<ContentEditable
										aria-placeholder={'Enter title...'}
										className='w-full p-2 outline-none'
										placeholder={
											<div className='pointer-events-none absolute left-3 top-2 text-gray-400'>
												Title
											</div>
										}
									/>
								}
								ErrorBoundary={LexicalErrorBoundary}
							/>
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
				<div className='relative '>
					<LexicalComposer
						key={`content-${resetId}`}
						initialConfig={contentConfig}
					>
						<RichTextPlugin
							contentEditable={
								<ContentEditable className='w-full p-2 outline-none' />
							}
							placeholder={
								<div className='pointer-events-none absolute left-3 top-2 text-gray-400'>
									Enter some text...
								</div>
							}
							ErrorBoundary={LexicalErrorBoundary}
						/>

						<HistoryPlugin />
						<OnChangePlugin
							onChange={editorState => {
								const json = JSON.stringify(editorState.toJSON())
								setContentState(json)
							}}
						/>
						{isFormActive ? <ToolbarPlugin /> : null}
					</LexicalComposer>
				</div>
			</div>
		</div>
	)
}
