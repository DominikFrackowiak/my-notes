// // image-plugin.ts
// import { useEffect } from 'react'
// import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
// import { COMMAND_PRIORITY_EDITOR, createCommand, $insertNodes } from 'lexical'
// import { $createImageNode, ImagePayload } from '../nodes/image-node'

// export const INSERT_IMAGE_COMMAND = createCommand<ImagePayload>()

// export default function ImagePlugin() {
// 	const [editor] = useLexicalComposerContext()

// 	useEffect(() => {
// 		return editor.registerCommand<ImagePayload>(
// 			INSERT_IMAGE_COMMAND,
// 			payload => {
// 				editor.update(() => {
// 					const node = $createImageNode(payload)
// 					$insertNodes([node])
// 				})
// 				return true
// 			},
// 			COMMAND_PRIORITY_EDITOR
// 		)
// 	}, [editor])

// 	return null
// }

// image-plugin.ts
import { useEffect } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
	COMMAND_PRIORITY_EDITOR,
	createCommand,
	$insertNodes,
	$getSelection,
	$getRoot,
} from 'lexical'
import { $createImageNode, ImagePayload } from '../nodes/image-node'

export const INSERT_IMAGE_COMMAND = createCommand<ImagePayload>()

export default function ImagePlugin() {
	const [editor] = useLexicalComposerContext()

	useEffect(() => {
		return editor.registerCommand<ImagePayload>(
			INSERT_IMAGE_COMMAND,
			payload => {
				// 1) upewnij się, że editor ma focus (żeby selection miało sens)
				editor.focus()

				// 2) wstaw w kontrolowanym miejscu nawet jeśli selection było null
				editor.update(() => {
					const selection = $getSelection()
					if (!selection) {
						$getRoot().selectEnd()
					}

					const node = $createImageNode(payload)
					$insertNodes([node])
				})

				return true
			},
			COMMAND_PRIORITY_EDITOR
		)
	}, [editor])

	return null
}
