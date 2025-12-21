import { Popover } from '@ark-ui/react/popover'

export default function PopoverComponent({
	trigger,
	children,
	isBodyUnderTrigger = true,
	onClick
}: {
	trigger: React.ReactNode
	children: React.ReactNode
	isBodyUnderTrigger?: boolean
	onClick: ()=>void
}) {
	return (
		<Popover.Root>
			<Popover.Trigger onClick={onClick}>{trigger}</Popover.Trigger>
			<Popover.Positioner
				style={{
					position: 'absolute',
					top: '0',
					left: '0',
					transform: isBodyUnderTrigger
						? 'translate(24%, 210%)'
						: 'translate(24%, 50%)',
					borderRadius: '10px',
					boxShadow:
						'0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 2px 6px 2px rgba(60, 64, 67, 0.15)',
					background: 'white',
				}}
			>
				<Popover.Content className='flex'>{children}</Popover.Content>
			</Popover.Positioner>
		</Popover.Root>
	)
}
