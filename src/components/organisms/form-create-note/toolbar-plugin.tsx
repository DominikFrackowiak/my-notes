import {
	$getSelection,
	$isRangeSelection,
	FORMAT_TEXT_COMMAND,
	type TextFormatType,
} from 'lexical'

import { useState, useEffect } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
// import { Popover } from '@ark-ui/react/popover'
import Button from '../../atoms/Button'
// import FormattingIcon from '../../../assets/icons/formatting.svg'
import PopoverComponent from '../../molecules/popover'
import ImageIcon from '../../../assets/icons/image.svg?react'
import PaletteIcon from '../../../assets/icons/palette.svg?react'
import FormattingIcon from '../../../assets/icons/formatting.svg?react'
import MoreOptionsIcon from '../../../assets/icons/more-options.svg?react'
import ArchiveIcon from '../../../assets/icons/archive.svg?react'
import TextFormattingSelection from './text-format'
import BackgroundColorSelection from './background-color-selection'
import MoreOptions from './more-options'

function ToolbarPlugin() {
	const [editor] = useLexicalComposerContext()
	const [isBold, setIsBold] = useState(false)
	const [isItalic, setIsItalic] = useState(false)
	const [isUnderline, setIsUnderline] = useState(false)
	const [isStrikethrough, setIsStrikethrough] = useState(false)
	const [isOpen, setIsOpen] = useState(false)

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
				<div className='w-full flex items-center'>
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
						// onClick={() => setIsOpen(v => !v)}
					/>
					<Button
						size='SM'
						icon={<ArchiveIcon className=' text-txt dark:text-txt-dark' />}
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
						onClick={() => setIsOpen(false)}
					>
						<MoreOptions/>
					</PopoverComponent>
				</div>
				<Button
					isRectangular={true}
					size='SM'
					onClick={() => console.log('Close')}
				>
					<span className='text-txt text-sm dark:text-txt-dark'>Zamknij</span>
				</Button>
			</div>
		</div>
	)
}

export default ToolbarPlugin
