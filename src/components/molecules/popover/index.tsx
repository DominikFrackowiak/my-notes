import { Popover } from '@ark-ui/react'

export default function PopoverComponent({
	trigger,
	children,
	isBodyUnderTrigger = true,
	onClick,
	bgColor,
}: {
	trigger: React.ReactNode
	children: React.ReactNode
	isBodyUnderTrigger?: boolean
	onClick: () => void
	bgColor?: string
}) {
	return (
		<Popover.Root>
			<Popover.Trigger onClick={onClick}>{trigger}</Popover.Trigger>
			<Popover.Positioner
				style={{
					// position: 'absolute',
					// top: '0',
					// left: '0',
					// transform: isBodyUnderTrigger
					// 	? 'translate(14%, 170%)'
					// 	: 'translate(24%, 50%)',
					// borderRadius: '10px',
					// boxShadow:
					// 	'0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 2px 6px 2px rgba(60, 64, 67, 0.15)',
					// background: 'transparent',
				}}
			>
				<Popover.Content>
					{children}
				</Popover.Content>
			</Popover.Positioner>
		</Popover.Root>
	)
}
