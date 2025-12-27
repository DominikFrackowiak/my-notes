import { useState } from 'react'
import Header from '../../organisms/header/header'
import Sidebar from '../../organisms/sidebar/sidebar'
import Form from '../../organisms/form-create-note/form'
import { cn } from '../../../lib/tw-merge'
import { useThemeStore } from '../../../store/ui/theme.store'

export default function AppLayout() {
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
	const [isSidebarPinned, setIsSidebarPinned] = useState<boolean>(false)

	const theme = useThemeStore(state => state.theme)

	const toggleSidebar = () => {
		setIsSidebarOpen(prev => {
			const next = !prev
			setIsSidebarPinned(next)
			return next
		})
	}

	const closeSidebar = () => {
		setIsSidebarOpen(false)
		setIsSidebarPinned(false)
	}

	const openSidebar = () => {
		setIsSidebarOpen(true)
	}

	return (
		<div
			className={cn(
				theme === 'dark' ? 'dark' : 'light',
				'bg-background dark:bg-background-dark text-txt dark:text-txt-dark'
			)}
		>
			<Header toggleSidebar={toggleSidebar} />
			<div className='flex'>
				<Sidebar
					isSidebarOpen={isSidebarOpen}
					openSidebar={openSidebar}
					closeSidebar={closeSidebar}
					isSidebarPinned={isSidebarPinned}
				/>
				<main className='flex items-start justify-center gap-8 flex-1 mt-16 py-8'>
					<Form />
				</main>
			</div>
		</div>
	)
}
