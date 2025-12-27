interface SidebarItem {
	title: string
	icon?: React.ReactElement
}

export default function SidebarItem({ icon, title }) {
	return (
		<li>
			<button className='flex justify-between w-full rounded-r-3xl bg-transparent hover:bg-button-background-gray dark:hover:bg-button-background-gray-dark'>
				{icon}
				<span>{title}</span>
			</button>
		</li>
	)
}
