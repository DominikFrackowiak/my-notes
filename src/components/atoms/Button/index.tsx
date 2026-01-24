import { cn } from '../../../lib/tw-merge'
import { buttonColors } from '../../../constants/button-colors'
import type { BackgroundColor } from '../../../constants/background-colors'

interface Props {
	size?: 'L' | 'SM' | 'XS'
	icon?: React.ReactElement
	onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void
	type?: 'button' | 'submit'
	backgroundColor?: BackgroundColor
	children?: React.ReactElement
	className?: string
	id?: string
	isRectangular?: boolean
	isActive?: boolean
	as?: React.ElementType
}

const buttonStyles = {
	L: 'h-12 w-12',
	M: 'h-8.5 w-8.5',
	SM: 'h-7 w-7',
	XS: 'h-4 w-4',
} as const

const IconSizes = {
	L: 'h-6 w-6',
	M: 'h-4 w-4',
	SM: 'h-4 w-4',
	XS: 'h-3 w-3',
}

export default function Button({
	size,
	icon,
	onClick,
	backgroundColor = 'default',
	children,
	className = '',
	isRectangular = false,
	isActive = false,
	as = 'button'
}: Props) {
	const El = as
	return (

		<El
			className={cn(
				'flex items-center justify-center cursor-pointer ',
				size ? buttonStyles[size] : '',
				backgroundColor
					? buttonColors[backgroundColor]
					: 'bg-transparent hover:bg-button-background-gray dark:hover:bg-button-background-gray-dark',
				isRectangular ? 'rounded px-6! py-2!' : 'rounded-full',
				isActive ? 'bg-button-background-gray dark:bg-button-background-gray-dark' : 'hover:bg-button-background-gray dark:hover:bg-button-background-gray-dark',
				className
			)}
			onClick={onClick}
		>
			<div
				className={cn(
					'flex justify-center items-center w-full',
					size ? IconSizes[size] : ''
				)}
			>
				{icon}
				{children}
			</div>
		</El>
	)
}
