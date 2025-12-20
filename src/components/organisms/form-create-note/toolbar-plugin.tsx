import {
	$getSelection,
	$isRangeSelection,
	FORMAT_TEXT_COMMAND,
	type TextFormatType,
} from 'lexical'

import { useState, useEffect } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { Popover } from '@ark-ui/react/popover'
import Button from '../../atoms/Button'
import FormattingIcon from '../../../assets/icons/formatting.svg'

function ToolbarPlugin() {
	const [editor] = useLexicalComposerContext()
	const [isBold, setIsBold] = useState(false)
	const [isItalic, setIsItalic] = useState(false)
	const [isUnderline, setIsUnderline] = useState(false)
	const [isStrikethrough, setIsStrikethrough] = useState(false)

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

	// const buttonClass = (isActive: boolean) =>
	// 	`h-8 w-8 border rounded-full ${
	// 		isActive ? 'bg-blue-500 text-white' : 'bg-white text-black'
	// 	} hover:bg-blue-100`

	return (
		<div className='flex gap-2 p-2 '>
			<Popover.Root>
				<Popover.Trigger>
					<Button size='SM' icon={<img src={FormattingIcon} />} />
				</Popover.Trigger>
				<Popover.Positioner>
					<Popover.Content>
						<Button size='SM' icon={<img src={FormattingIcon} />} />
						<Button size='SM' icon={<img src={FormattingIcon} />} />
						<Button size='SM' icon={<img src={FormattingIcon} />} />
						<Button size='SM' icon={<img src={FormattingIcon} />} />
						<Button size='SM' icon={<img src={FormattingIcon} />} />
						<Button size='SM' icon={<img src={FormattingIcon} />} />
						<Button size='SM' icon={<img src={FormattingIcon} />} />
					</Popover.Content>
				</Popover.Positioner>
			</Popover.Root>
			{/* <button
				onClick={() => formatText('bold')}
				className={buttonClass(isBold)}
				type='button'
			>
				<strong>B</strong>
			</button>
			<button
				onClick={() => formatText('italic')}
				className={buttonClass(isItalic)}
				type='button'
			>
				<em>I</em>
			</button>
			<button
				onClick={() => formatText('underline')}
				className={buttonClass(isUnderline)}
				type='button'
			>
				<u>U</u>
			</button>
			<button
				onClick={() => formatText('strikethrough')}
				className={buttonClass(isStrikethrough)}
				type='button'
			>
				<s>S</s>
			</button> */}
		</div>
	)
}

export default ToolbarPlugin
