import { useState } from 'react'
import { cn } from '../../../lib/tw-merge'
import DeleteIcon from '../../../assets/icons/delete.svg?react'
import Button from '../Button'
import { useNoteDraftStore } from '../../../store/note-draft/note-draft.store'

export default function TagChip({ tag }) {
	const [isMouseOver, setIsMouseOver] = useState<boolean>(false)
	const toggleTag = useNoteDraftStore(store => store.toggleTag)
	return (
		<div
			className='flex items-center gap-1 h-6  bg-translucid-black shadow-chip px-2 rounded-xl'
			onMouseEnter={() => setIsMouseOver(true)}
			onMouseLeave={() => setIsMouseOver(false)}
		>
			<span className='text-11 font-semibold whitespace-nowrap'>{tag}</span>
			{/* {isMouseOver ? ( */}
				<Button
					className={cn(
						'transition-opacity duration-300 bg-transparent hover:bg-[#D8D9D9]',
						isMouseOver ? 'flex opacity-100' : 'hidden opacity-0'
					)}
					size='XS'
					icon={<DeleteIcon />}
					onClick={() => toggleTag(tag)}
				/>
			{/* ) : null} */}
		</div>
	)
}

// <div
// 	className='flex justify-center items-center relative h-6 w-auto min-w-20 bg-translucid-black shadow-chip p-[3px] rounded-xl'
// 	onMouseOver={() => setIsMouseOver(true)}
// 	onMouseOut={() => setIsMouseOver(false)}
// >
// 	<span className='absolute top-1/2 left-1/2 -translate-1/2 text-11'>
// 		{tag}
// 	</span>
// 	<Button
// 		className={cn(
// 			'absolute right-1 top-1/2 -translate-y-1/2 border transition-opacity duration-300 bg-translucid-black dark:bg-translucid-black hover:bg-[#D8D9D9] dark:hover:bg-gray-dark',
// 			isMouseOver ? 'opacity-100' : 'opacity-0'
// 		)}
// 		size='XS'
// 		icon={<DeleteIcon />}
// 		onClick={() => toggleTag(tag)}
// 	/>
// </div>
