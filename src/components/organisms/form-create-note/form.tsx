import { useState, useEffect, useRef } from 'react'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import ToolbarPlugin from './toolbar-plugin'

import { cn } from '../../../lib/tw-merge'
import Button from '../../atoms/Button'
import PinNoteIcon from '../../../assets/icons/pin-note.svg'
import ImageIcon from '../../../assets/icons/image.svg'

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
				'flex flex-col w-form shadow-xl rounded-lg border border-border-form ',
				!isFormActive ? 'h-11 justify-center' : 'min-h-34 h-auto justify-start'
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
							<div className='flex justify-between items-center'>
								<RichTextPlugin
									contentEditable={
										<ContentEditable
											aria-placeholder={'Enter title...'}
											className='w-full p-2 outline-none'
											placeholder={
												<span className='pointer-events-none absolute left-3 top-2 text-gray-400 text-xl'>
													Title
												</span>
											}
										/>
									}
									ErrorBoundary={LexicalErrorBoundary}
								/>

								<Button size='SM' icon={<img src={PinNoteIcon} />} />
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
				<div className='relative '>
					<LexicalComposer
						key={`content-${resetId}`}
						initialConfig={contentConfig}
					>
						<div className='flex justify-between items-center'>
							<RichTextPlugin
								contentEditable={
									<ContentEditable className='w-full p-2 outline-none' />
								}
								placeholder={
									<span className='pointer-events-none absolute left-3 top-2 text-gray-400 text-15'>
										Enter some text...
									</span>
								}
								ErrorBoundary={LexicalErrorBoundary}
							/>
							{!isFormActive ? (
								<Button size='SM' icon={<img src={ImageIcon} />} />
							) : null}
						</div>

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
