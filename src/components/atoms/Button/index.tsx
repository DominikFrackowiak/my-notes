import { cn } from '../../../lib/tw-merge'

type BackgroundColor =
	| 'coral'
	| 'peach'
	| 'sand'
	| 'peppermint'
	| 'salvia'
	| 'lightgray'
	| 'storm'
	| 'twilight'
	| 'flower'
	| 'clay'
	| 'chalk'

interface Props {
	size?: 'L' | 'SM'
	icon?: React.ReactElement
	onClick?: () => void
	type?: 'button' | 'submit'
	backgroundColor?: BackgroundColor
	children?: React.ReactElement
	className?: string
	id?: string
	isRectangular?: boolean
}

const buttonStyles = {
	L: 'h-12 w-12',
	SM: 'h-9 w-9',
} as const

const IconSizes = {
	L: 'h-6 w-6',
	SM: 'h-3 w-3',
}

const buttonColors = {
	coral: 'bg-coral dark:bg-coral-dark ',
	peach: 'bg-peach dark:bg-peach-dark ',
	sand: 'bg-sand dark:bg-sand-dark',
	peppermint: 'bg-peppermint dark:bg-peppermint-dark ',
	salvia: 'bg-salvia dark:bg-salvia-dark ',
	lightgray: 'bg-lightgray dark:bg-lightgray-dark ',
	storm: 'bg-storm dark:bg-storm-dark ',
	twilight: 'bg-twilight dark:bg-twilight-dark ',
	flower: 'bg-flower dark:bg-flower-dark',
	clay: 'bg-clay dark:bg-clay-dark ',
	chalk: 'bg-chalk dark:bg-chalk-dark',
	yellow:
		'bg-button-background-yellow hover:bg-button-background-yellow dark:bg-button-background-yellow-dark dark:hover:bg-button-background-yellow-dark',
} as const

export default function Button({
	size = 'L',
	icon,
	onClick,
	backgroundColor,
	children,
	className = '',
	isRectangular = false,
}: Props) {
	return (
		<button
			className={cn(
				'inline-flex items-center justify-center cursor-pointer ',
				buttonStyles[size],
				backgroundColor
					? buttonColors[backgroundColor]
					: 'bg-transparent hover:bg-button-background-gray dark:hover:bg-button-background-gray-dark',
				isRectangular
					? 'w-auto! rounded px-6 py-2'
					: 'rounded-full',
				className
			)}
			onClick={onClick}
		>
			<div
				className={cn(
					'flex justify-center items-center w-full',
					IconSizes[size]
				)}
			>
				{icon}
				{children}
			</div>
		</button>
	)
}
