import { useState, useEffect } from 'react'

export default function useIsMobile() {
	const [isMobile, setIsMobile] = useState<boolean>(
		typeof window !== 'undefined' ? window.innerWidth < 768 : false
	)

	useEffect(() => {
		let timeoutId: NodeJS.Timeout

		function handleResize() {
			clearTimeout(timeoutId)
			timeoutId = setTimeout(() => {
				setIsMobile(window.innerWidth < 768)
			}, 150)
		}

		handleResize()
		window.addEventListener('resize', handleResize)

		return () => {
			clearTimeout(timeoutId)
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return isMobile
}
