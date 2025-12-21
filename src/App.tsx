import './App.css'
import AppLayout from './components/templates/app-layout/app-layout'
import ThemeLayout from './components/templates/theme-layout/theme-layout'

function App() {
	return (
		<>
			<ThemeLayout>
				<AppLayout />
			</ThemeLayout>
		</>
	)
}

export default App
