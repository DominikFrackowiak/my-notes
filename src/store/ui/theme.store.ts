import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark'

interface ThemeStore {
	theme: Theme
	switchTheme: () => void
}

export const useThemeStore = create<ThemeStore>()(
	persist(
		set => ({
			theme: 'light',
			switchTheme: () =>
				set(state => ({
					theme: state.theme === 'dark' ? 'light' : 'dark',
				})),
		}),
		{
			name: 'theme-storage',
		}
	)
)
