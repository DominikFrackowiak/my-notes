import Button from '../../../atoms/Button'
import { useNoteDraftStore } from '../../../../store/note-draft/note-draft.store'

const colors = [
	'default',
	'coral',
	'peach',
	'sand',
	'peppermint',
	'salvia',
	'lightgray',
	'storm',
	'twilight',
	'flower',
	'clay',
	'chalk',
] as const

export default function BackgroundColorSelection() {
	const setBackgroundColor = useNoteDraftStore(
		store => store.setBackgroundColor
	)
	return (
		<div className='absolute flex gap-1 bg-white py-2 px-2.5 rounded-lg shadow-popover flex-wrap lg:flex-nowrap'>
			{colors.map(color => (
				<Button
					key={color}
					size='SM'
					backgroundColor={color}
					onClick={() => setBackgroundColor(color)}
					className='border border-translucid-black'
				/>
			))}
		</div>
	)
}
