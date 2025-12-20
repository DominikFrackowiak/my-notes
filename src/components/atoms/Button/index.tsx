import { cn } from '../../../lib/tw-merge'

interface Props {
	size?: 'L' | 'SM'
	icon: React.ReactElement
	onClick?: () => void
}

const buttonStyles = {
	L: 'h-12 w-12',
	SM: 'h-9 w-9',
} as const

const IconSizes = {
	L: 'h-6 w-6',
	SM: 'h-3 w-3',
}

export default function Button({ size = 'L', icon, onClick }: Props) {
	return (
		<button
			className={cn(
				'rounded-full bg-transparent hover:bg-[#E9EAEA] inline-flex items-center justify-center cursor-pointer',
				buttonStyles[size]
			)}
			onClick={onClick}
		>
			<div className={cn(IconSizes[size])}>{icon}</div>
		</button>
	)
}
