// src/Tiptap.tsx
import { useEditor, EditorContent } from '@tiptap/react'
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextFormattingMenu from './text-formatting-menu'

function RichTextEditor() {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Placeholder.configure({
				placeholder: 'Write something ...',
			}),
		],
		// content: '<p>Utworz notatke</p>',
		editorProps: {
			attributes: {
				class: 'tiptap bg-gray-50 min-h-10 min-w-50',
			},
		},
	})

	return (
		<>
			<EditorContent editor={editor} />
			<TextFormattingMenu editor={editor} />
		</>
	)
}

export default RichTextEditor
