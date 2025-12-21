import Button from '../../atoms/button'
import HamburgerIcon from '../../../assets/icons/hamburger.svg'

import RepeatIcon from '../../../assets/icons/repeat.svg'
import Icon from '../../atoms/icon/icon'

interface Props {
	toggleSidebar: () => void
}

export default function Header({ toggleSidebar }: Props) {
	return (
		<header className='fixed top-0 left-0 flex w-full h-16'>
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
		</header>
	)
}
