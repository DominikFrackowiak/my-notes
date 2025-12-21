import {
	$getSelection,
	$isRangeSelection,
	FORMAT_TEXT_COMMAND,
	type TextFormatType,
} from 'lexical'

import { useState, useEffect } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { Popover } from '@ark-ui/react/popover'
import Button from '../../atoms/button'
import FormattingIcon from '../../../assets/icons/formatting.svg'
import PopoverComponent from '../../molecules/popover'
import ImageIcon from '../../../assets/icons/image.svg'
import PaletteIcon from '../../../assets/icons/palette.svg'

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
		<div className='flex flex-col gap-2 p-2'>
			{isOpen ? (
				<div className='flex gap-2'>
					<Button
						size='SM'
						icon={<img src={FormattingIcon} />}
						onClick={() => formatText('bold')}
					/>
					<Button
						size='SM'
						icon={<img src={FormattingIcon} />}
						onClick={() => formatText('bold')}
					/>
					<Button
						size='SM'
						icon={<img src={FormattingIcon} />}
						onClick={() => formatText('bold')}
					/>
					<Button
						size='SM'
						icon={<img src={FormattingIcon} />}
						onClick={() => formatText('bold')}
					/>
					<Button
						size='SM'
						icon={<img src={FormattingIcon} />}
						onClick={() => formatText('bold')}
					/>
					<Button
						size='SM'
						icon={<img src={FormattingIcon} />}
						onClick={() => formatText('bold')}
					/>
					<Button
						size='SM'
						icon={<img src={FormattingIcon} />}
						onClick={() => formatText('bold')}
					/>
				</div>
			) : null}
			<div>
				{' '}
				<Button
					size='SM'
					icon={<img src={FormattingIcon} />}
					onClick={() => setIsOpen(v => !v)}
				/>
				<PopoverComponent
					trigger={<Button size='SM' icon={<img src={PaletteIcon} />} />}
					onClick={() => setIsOpen(false)}
				>
					<div>
						<Button size='SM' icon={<img src={ImageIcon} />} />
						<Button size='SM' icon={<img src={ImageIcon} />} />
						<Button size='SM' icon={<img src={ImageIcon} />} />
						<Button size='SM' icon={<img src={ImageIcon} />} />
						<Button size='SM' icon={<img src={ImageIcon} />} />
						<Button size='SM' icon={<img src={ImageIcon} />} />
						<Button size='SM' icon={<img src={ImageIcon} />} />
					</div>
				</PopoverComponent>
			</div>
		</div>
	)
}

export default ToolbarPlugin
