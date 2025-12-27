import useIsMobile from '../../../hooks/useIsMobile'

interface SidebarItem {
	title: string
	icon?: React.ReactElement
}

export default function SidebarItem({ icon, title }) {
	const isMobile = useIsMobile()
	return (
		<li>
			<button className='flex justify-between w-full rounded-r-3xl bg-transparent hover:bg-button-background-gray dark:hover:bg-button-background-gray-dark'>
				{icon}
				{!isMobile ? <span>{title}</span> : null}
			</button>
		</li>
	)
}
