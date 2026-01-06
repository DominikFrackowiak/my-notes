import {
	$getSelection,
	$isRangeSelection,
	FORMAT_TEXT_COMMAND,
	type TextFormatType,
} from 'lexical'

import { useState, useEffect, useRef } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { INSERT_IMAGE_COMMAND } from './image-plugin'

import Button from '../../../atoms/Button'
import PopoverComponent from '../../../molecules/popover'
import ImageIcon from '../../../../assets/icons/image.svg?react'
import PaletteIcon from '../../../../assets/icons/palette.svg?react'
import FormattingIcon from '../../../../assets/icons/formatting.svg?react'
import MoreOptionsIcon from '../../../../assets/icons/more-options.svg?react'
import ArchiveIcon from '../../../../assets/icons/archive.svg?react'
import TextFormattingSelection from './text-format'
import BackgroundColorSelection from './background-color-selection'
import MoreOptions from './more-options'

import { useFormStore } from '../../../../store/ui/form.store'
import { useNoteDraftStore } from '../../../../store/note-draft/note-draft.store'

function ToolbarPlugin() {
	const [editor] = useLexicalComposerContext()
	const [isBold, setIsBold] = useState(false)
	const [isItalic, setIsItalic] = useState(false)
	const [isUnderline, setIsUnderline] = useState(false)
	const [isStrikethrough, setIsStrikethrough] = useState(false)
	const [isOpen, setIsOpen] = useState(false)
	const [showCreatableTagSelect, setShowCreatableTagSelect] =
		useState<boolean>(false)

	const setIsFormActive = useFormStore(store => store.setIsFormActive)
	const setIsArchived = useNoteDraftStore(store => store.setIsArchived)

	const fileRef = useRef<HTMLInputElement | null>(null)

	// Aktualizuj stan buttonów na podstawie zaznaczenia
	const updateToolbar = () => {
		const selection = $getSelection()
		if (!$isRangeSelection(selection)) return

		setIsBold(selection.hasFormat('bold'))
		setIsItalic(selection.hasFormat('italic'))
		setIsUnderline(selection.hasFormat('underline'))
		setIsStrikethrough(selection.hasFormat('strikethrough'))
	}

	// Nasłuchuj zmian w edytorze
	useEffect(() => {
		return editor.registerUpdateListener(({ editorState }) => {
			editorState.read(() => {
				updateToolbar()
			})
		})
	}, [editor, updateToolbar])

	const formatText = (format: TextFormatType) => {
		editor.dispatchCommand(FORMAT_TEXT_COMMAND, format)
	}

	return (
		<div className='w-full flex flex-col gap-2 p-2'>
			{isOpen ? <TextFormattingSelection formatText={formatText} /> : null}
			<div className='flex w-full justify-between items-center'>
				<div className='w-full flex items-center gap-2'>
					<Button
						size='SM'
						icon={<FormattingIcon className=' text-txt dark:text-txt-dark' />}
						onClick={() => setIsOpen(v => !v)}
					/>
					<PopoverComponent
						trigger={
							<Button
								size='SM'
								icon={<PaletteIcon className='text-txt dark:text-txt-dark' />}
							/>
						}
						onClick={() => setIsOpen(false)}
					>
						<BackgroundColorSelection />
					</PopoverComponent>
					<Button
						size='SM'
						icon={<ImageIcon className=' text-txt dark:text-txt-dark' />}
						onClick={e => {
							e.stopPropagation()
							fileRef.current?.click()
						}}
					/>
					<input
						ref={fileRef}
						type='file'
						accept='image/*'
						hidden
						onChange={e => {
							const file = e.target.files?.[0]
							if (!file) return

							const reader = new FileReader()
							reader.onload = () => {
								const src = String(reader.result)
								editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
									src,
									altText: file.name,
								})
								e.target.value = ''
							}
							reader.readAsDataURL(file)
						}}
					/>
					<Button
						size='SM'
						icon={<ArchiveIcon className=' text-txt dark:text-txt-dark' />}
						onClick={e => {
							e.stopPropagation()
							setIsArchived(true)
							setIsFormActive(false)
						}}
					/>
					<PopoverComponent
						trigger={
							<Button
								size='SM'
								icon={
									<MoreOptionsIcon className='text-txt dark:text-txt-dark' />
								}
							/>
						}
						onClick={() => {
							setShowCreatableTagSelect(false)
							setIsOpen(false)
						}}
					>
						<MoreOptions
							showCreatableTagSelect={showCreatableTagSelect}
							setShowCreatableTagSelect={setShowCreatableTagSelect}
							data-ui='form-more-options'
						/>
					</PopoverComponent>
				</div>
				<Button
					isRectangular={true}
					onClick={e => {
						e.stopPropagation()

						setIsFormActive(false)
					}}
				>
					<span className='text-txt-translucid-darker text-sm dark:text-txt-dark'>
						Zamknij
					</span>
				</Button>
			</div>
		</div>
	)
}

export default ToolbarPlugin
