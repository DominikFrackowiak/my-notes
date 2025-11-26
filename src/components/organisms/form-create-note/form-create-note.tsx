import { cn } from '../../../lib/tw-merge'

interface Props {
	isFormActive: boolean
	toggleFormActive: (val: boolean) => void
}

export default function FormCreateNote({
	isFormActive,
	toggleFormActive,
}: Props) {
	return (
		<div
			className={cn(
				'flex justify-center bg-transparent z-50',
				isFormActive ? 'w-full h-full' : 'w-auto h-11'
			)}
			onClick={() => toggleFormActive(false)}
		>
			<form
				className={cn(
					'flex flex-col w-form shadow',
					isFormActive ? 'h-11' : 'h-auto min-h-33'
				)}
				onClick={e => {
					e.stopPropagation()
					toggleFormActive(true)
				}}
			>
				{isFormActive ? <input type='text' placeholder='Tytul' /> : null}
				<input type='text' placeholder='Utworz notatke' />
				{isFormActive ? (
					<div className='flex'>
						<button
							onClick={e => {
								e.stopPropagation()
								toggleFormActive(false)
							}}
						>
							Zamknij
						</button>
					</div>
				) : null}
			</form>
		</div>
	)
}
