import { cn } from '../../../lib/tw-merge'

interface Tag {
	id: string
	title: string
}

interface Props {
	tags?: Tag[]
	isSidebarOpen: boolean
	toggleSidebar: (val?: boolean) => void
}

export default function Sidebar({ tags, isSidebarOpen, toggleSidebar }: Props) {
	return (
		<aside
			className={cn(
				'min-h-screen bg-amber-400 transition-all duration-300 ease-in-out',
				isSidebarOpen ? 'w-20 lg:w-sidebar-full' : 'w-20 lg:w-20'
			)}
			onMouseOver={() => toggleSidebar(true)}
			onMouseLeave={() => toggleSidebar(false)}
		>
			<div>TAGI</div>
			{tags ? <ul></ul> : null}
		</aside>
	)
}
