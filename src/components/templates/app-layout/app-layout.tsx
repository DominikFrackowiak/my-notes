import { useState, useEffect } from 'react'
import Header from '../../organisms/header/header'
import Sidebar from '../../organisms/sidebar/sidebar'
import Form from '../../organisms/form-create-note/form'
import { cn } from '../../../lib/tw-merge'

const THEME_KEY = 'theme'

function getInitialIsDarkTheme(): boolean {
	if (typeof window === 'undefined') return false

	const saved = localStorage.getItem(THEME_KEY)
	if (saved === 'dark') return true
	if (saved === 'light') return false

	return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
}

export default function AppLayout() {
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
	const [isSidebarPinned, setIsSidebarPinned] = useState<boolean>(false)

	const [isDarkTheme, setIsDarkTheme] = useState<boolean>(getInitialIsDarkTheme)

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

	function toggleTheme() {
		setIsDarkTheme(prev => !prev)
	}

	useEffect(() => {
		localStorage.setItem(THEME_KEY, isDarkTheme ? 'dark' : 'light')
	}, [isDarkTheme])

	return (
		<div
			className={cn(
				isDarkTheme ? 'dark' : 'light',
				'bg-background dark:bg-background-dark text-txt dark:text-txt-dark'
			)}
		>
			<Header toggleSidebar={toggleSidebar} toggleTheme={toggleTheme} />
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
