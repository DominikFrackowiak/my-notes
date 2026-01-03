import { useEffect } from 'react'
import { cn } from '../../../lib/tw-merge'
import SidebarItem from '../../atoms/sidebar-item'
import TagIcon from '../../../assets/icons/tag.svg?react'
import useIsMobile from '../../../hooks/useIsMobile'
import { useSidebarStore } from '../../../store/ui/sidebar.store'

interface Tag {
	id: string
	title: string
}

interface Props {
	tags?: Tag[]
}

export default function Sidebar({
	tags = [
		{
			id: '1',
			title: 'HTML',
		},
	],
}: Props) {
	const isMobile = useIsMobile()
	const isSidebarOpen = useSidebarStore(s => s.isSidebarOpen)
	const isSidebarPinned = useSidebarStore(s => s.isSidebarPinned)
	const openSidebar = useSidebarStore(s => s.openSidebar)
	const closeSidebar = useSidebarStore(s => s.closeSidebar)
	const syncForMobile = useSidebarStore(s => s.syncForMobile)

	useEffect(() => {
		syncForMobile(isMobile)
	}, [isMobile, syncForMobile])

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
