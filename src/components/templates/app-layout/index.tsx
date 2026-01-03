import Header from '../../organisms/header'
import Sidebar from '../../organisms/sidebar'
import Form from '../../organisms/form-create-note'
import { cn } from '../../../lib/tw-merge'
import { useThemeStore } from '../../../store/ui/theme.store'

export default function AppLayout() {
	const theme = useThemeStore(state => state.theme)

	return (
		<div
			className={cn(
				theme === 'dark' ? 'dark' : 'light',
				'font-sans bg-background dark:bg-background-dark text-txt dark:text-txt-dark'
			)}
		>
			<Header />
			<div className='flex'>
				<Sidebar />
				<main className='flex items-start justify-center gap-8 flex-1 mt-16 py-8 px-8'>
					<Form />
				</main>
			</div>
		</div>
	)
}
