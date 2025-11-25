import { useState } from 'react'
import Header from '../../organisms/header/header'
import Sidebar from '../../organisms/sidebar/sidebar'
import FormCreateNote from '../../organisms/form-create-note/form-create-note'

export default function AppLayout() {
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true)
	const [isFormActive, setIsFormActive] = useState<boolean>(false)

	const toggleSidebar = (next?: boolean) => {
		if (typeof next === 'boolean') {
			setIsSidebarOpen(next)
		} else {
			setIsSidebarOpen(prev => !prev)
		}
	}

	const toggleActive = (val: boolean) => {
		setIsFormActive(val)
	}

	return (
		<>
			<Header toggleSidebar={toggleSidebar} />
			<div className='flex'>
				<Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
				<main className='flex justify-center gap-8 flex-1  mt-16 py-8'>
					<FormCreateNote
						isFormActive={isFormActive}
						toggleActive={toggleActive}
					/>
				</main>
			</div>
		</>
	)
}
