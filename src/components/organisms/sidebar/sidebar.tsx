import { cn } from '../../../lib/tw-merge'
import SidebarItem from '../../atoms/sidebar-item'
import TagIcon from '../../../assets/icons/tag.svg?react'

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
	tags = [
		{
			id: '1',
			title: 'HTML',
		},
	],
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
			{tags ? (
				<ul className='mt-16'>
					<SidebarItem title='TEST' icon={<TagIcon />} />
				</ul>
			) : null}
		</aside>
	)
}
