// nodes/ImageNode.tsx
import { DecoratorNode, SerializedLexicalNode, Spread, NodeKey } from 'lexical'

import { JSX } from 'react'

export type ImagePayload = {
	src: string
	altText?: string
}

export type SerializedImageNode = Spread<
	{
		type: 'image'
		version: 1
		src: string
		altText?: string
	},
	SerializedLexicalNode
>

export class ImageNode extends DecoratorNode<JSX.Element> {
	__src: string
	__altText?: string

	static getType() {
		return 'image'
	}

	static clone(node: ImageNode) {
		return new ImageNode(node.__src, node.__altText, node.__key)
	}

	constructor(src: string, altText?: string, key?: NodeKey) {
		super(key)
		this.__src = src
		this.__altText = altText
	}

	createDOM() {
		return document.createElement('span')
	}

	updateDOM() {
		return false
	}

	decorate() {
		return (
			<img
				src={this.__src}
				alt={this.__altText ?? ''}
				style={{ maxWidth: '100%', borderRadius: 8 }}
			/>
		)
	}

	static importJSON(serializedNode: SerializedImageNode) {
		return new ImageNode(serializedNode.src, serializedNode.altText)
	}

	exportJSON(): SerializedImageNode {
		return {
			type: 'image',
			version: 1,
			src: this.__src,
			altText: this.__altText,
		}
	}
}

export function $createImageNode(payload: ImagePayload) {
	return new ImageNode(payload.src, payload.altText)
}

export function $isImageNode(node: unknown): node is ImageNode {
	return node instanceof ImageNode
}
