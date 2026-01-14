import CreatableTagSelect from './creatable-tag-select'

interface Props {
	showCreatableTagSelect: boolean
	setShowCreatableTagSelect: (val: boolean) => void
}

export default function MoreOptions({
	showCreatableTagSelect,
	setShowCreatableTagSelect,
}: Props) {
	return (
		<>
			{!showCreatableTagSelect ? (
				<div className='absolute flex flex-col min-w-32 bg-background dark:bg-background-dark py-2  rounded-lg shadow-popover'>
					<div className='px-4.5 py-1 cursor-pointer hover:bg-translucid-black'>
						<span className='text-sm'>Usun notatke</span>
					</div>
					<div className='px-4.5 py-1 cursor-pointer hover:bg-translucid-black'>
						<span
							className='text-sm'
							onClick={() => setShowCreatableTagSelect(true)}
						>
							Dodaj etykiete
						</span>
					</div>
				</div>
			) : (
				<CreatableTagSelect />
			)}
		</>
	)
}
