import { cn } from '../../../lib/tw-merge'

interface Tag {
	id: string
	title: string
}

interface Props {
	tags?: Tag[]
	isSidebarOpen: boolean
	closeSidebar: () => void
	openSidebar: () => void
	isSidebarPinned: boolean
}

export default function Sidebar({
	tags,
	isSidebarOpen,
	closeSidebar,
	openSidebar,
	isSidebarPinned,
}: Props) {
	return (
		<aside
			className={cn(
				'min-h-screen transition-width will-change-[width] duration-300 ease-in-out',
				isSidebarOpen ? 'w-20 lg:w-sidebar-full' : 'w-20 lg:w-20'
			)}
			onMouseOver={() => {
				if (!isSidebarPinned) {
					openSidebar()
				}
			}}
			onMouseLeave={() => {
				if (!isSidebarPinned) {
					closeSidebar()
				}
			}}
		>
			{/* <div>TAGI</div> */}
			{tags ? <ul></ul> : null}
		</aside>
	)
}
