import { cn } from '../../../lib/tw-merge'

interface Props {
	size?: 'L' | 'SM'
	icon: React.ReactElement
 onClick?: ()=>void
}

const buttonStyles = {
	L: 'h-12 w-12',
	SM: 'h-9 w-9',
} as const

export default function Button({ size = 'L', icon, onClick }: Props) {
	return (
		<button
			className={cn(
				'rounded-full bg-transparent hover:bg-[#E9EAEA] inline-flex items-center justify-center',
				buttonStyles[size]
			)}
   onClick={onClick}
		>
			{icon}
		</button>
	)
}

