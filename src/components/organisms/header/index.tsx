import Button from '../../atoms/Button'
import HamburgerIcon from '../../../assets/icons/hamburger.svg'
import { useThemeStore } from '../../../store/ui/theme.store'
import { useSidebarStore } from '../../../store/ui/sidebar.store'

export default function Header() {
	const toggleTheme = useThemeStore(state => state.switchTheme)
	const toggleSidebar = useSidebarStore(state => state.toggleSidebar)

	return (
		<header className='fixed top-0 left-0 flex w-full h-16 justify-between'>
			<div className='flex items-center h-full gap-2'>
				<Button
					size='L'
					onClick={toggleSidebar}
					icon={<img src={HamburgerIcon} />}
				/>
				<div className='flex items-center h-full gap-2'>
					<img
						id='logo'
						src='https://www.gstatic.com/images/branding/product/2x/keep_2020q4_48dp.png'
						alt='logo'
						className='h-10 w-10'
					/>
					<span className='text-xl'>MyNotes</span>
				</div>
			</div>
			<div></div>
			<button onClick={toggleTheme}>Dark/Light</button>
		</header>
	)
}
