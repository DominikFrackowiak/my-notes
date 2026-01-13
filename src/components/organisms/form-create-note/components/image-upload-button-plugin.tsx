// import { useRef } from 'react'
// import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
// import { INSERT_IMAGE_COMMAND } from './image-plugin'
// import Button from '../../../atoms/Button'

// import ImageIcon from '../../../../assets/icons/image.svg?react'

// export function ImageUploadButtonPlugin() {
// 	const [editor] = useLexicalComposerContext()
// 	const fileRef = useRef<HTMLInputElement | null>(null)

// 	return (
// 		<>
// 			<Button
// 				size='L'
// 				icon={<ImageIcon />}
// 				onClick={e => {
// 					e.stopPropagation()
// 					fileRef.current?.click()
// 				}}
// 			/>
// 			<input
// 				ref={fileRef}
// 				type='file'
// 				accept='image/*'
// 				hidden
// 				onChange={e => {
// 					const file = e.target.files?.[0]
// 					if (!file) return

// 					const reader = new FileReader()
// 					reader.onload = () => {
// 						const src = String(reader.result)
// 						editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
// 							src,
// 							altText: file.name,
// 						})
// 						e.target.value = ''
// 					}
// 					reader.readAsDataURL(file)
// 				}}
// 			/>
// 		</>
// 	)
// }

import { useRef } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { INSERT_IMAGE_COMMAND } from './image-plugin'
import Button from '../../../atoms/Button'
import ImageIcon from '../../../../assets/icons/image.svg?react'
import { $getRoot } from 'lexical'
import { useFormStore } from '../../../../store/ui/form.store'

export function ImageUploadButtonPlugin() {
	const [editor] = useLexicalComposerContext()
	const fileRef = useRef<HTMLInputElement | null>(null)

	const setIsFormActive = useFormStore(store => store.setIsFormActive)

	return (
		<>
			<Button
				size='L'
				icon={<ImageIcon />}
				onClick={e => {
					e.preventDefault()
					e.stopPropagation()
					fileRef.current?.click()
				}}
			/>

			<input
				ref={fileRef}
				type='file'
				accept='image/*'
				hidden
				onClick={e => {
					// mega ważne u Ciebie, bo wrapper ma onClick aktywujący form
					e.stopPropagation()
				}}
				onChange={e => {
					e.stopPropagation()

					const file = e.target.files?.[0]
					if (!file) return

					const reader = new FileReader()
					reader.onload = () => {
						const src = String(reader.result)

						// ustaw “punkt wstawienia” nawet gdy edytor nie był aktywny
						editor.focus()
						editor.update(() => {
							$getRoot().selectEnd()
						})

						editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
							src,
							altText: file.name,
						})

						e.target.value = ''
					}
					setIsFormActive(true)
					reader.readAsDataURL(file)
				}}
			/>
		</>
	)
}
