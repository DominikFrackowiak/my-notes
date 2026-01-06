import { useRef } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { INSERT_IMAGE_COMMAND } from './image-plugin'
import Button from '../../../atoms/Button'

import ImageIcon from '../../../../assets/icons/image.svg?react'

export function ImageUploadButtonPlugin() {
	const [editor] = useLexicalComposerContext()
	const fileRef = useRef<HTMLInputElement | null>(null)

	return (
		<>
			<Button
				size='L'
				icon={<ImageIcon />}
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
		</>
	)
}
