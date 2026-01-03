import { useState } from 'react'
import BoldIcon from '../../../../assets/icons/bold.svg?react'
import ItalicIcon from '../../../../assets/icons/italic.svg?react'
import UnderlineIcon from '../../../../assets/icons/underline.svg?react'
import NoFormatIcon from '../../../../assets/icons/no-format.svg?react'
import Button from '../../../atoms/Button'

export default function TextFormattingSelection({
	formatText,
}: {
	formatText: (val: string) => void
}) {
	const [formatOptionActive, setFormatOptionActive] = useState({
		bold: false,
		italic: false,
		underline: false,
		clear: false,
	})
	return (
		<div className='flex gap-2'>
			<Button
				size='SM'
				icon={<BoldIcon className='text-txt dark:text-txt-dark' />}
				onClick={() => {
					setFormatOptionActive(prev => ({
						...prev,
						bold: !prev.bold,
					}))
					formatText('bold')
				}}
				className={
					formatOptionActive.bold
						? 'bg-button-background-gray dark:bg-button-background-gray-dark'
						: 'bg-transparent hover:bg-button-background-gray dark:hover:bg-button-background-gray-dark'
				}
			/>
			<Button
				size='SM'
				icon={<ItalicIcon className='text-txt dark:text-txt-dark' />}
				onClick={() => formatText('italic')}
			/>
			<Button
				size='SM'
				icon={<UnderlineIcon className='text-txt dark:text-txt-dark' />}
				onClick={() => formatText('underline')}
			/>
			<Button
				size='SM'
				icon={<NoFormatIcon className='text-txt dark:text-txt-dark' />}
				onClick={() => formatText('clear')}
			/>
		</div>
	)
}
