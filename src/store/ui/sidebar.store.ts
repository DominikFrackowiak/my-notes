import { create } from 'zustand'

interface SidebarStore {
	isSidebarOpen: boolean
	isSidebarPinned: boolean

	openSidebar: () => void
	closeSidebar: () => void
	toggleSidebar: () => void

	pinSidebar: () => void
	unpinSidebar: () => void
	togglePin: () => void

	syncForMobile: (isMobile: boolean) => void
}

export const useSidebarStore = create<SidebarStore>((set, get) => ({
	isSidebarOpen: false,
	isSidebarPinned: false,

	openSidebar: () => set({ isSidebarOpen: true }),
	closeSidebar: () => set({ isSidebarOpen: false, isSidebarPinned: false }),

	toggleSidebar: () => {
		const next = !get().isSidebarOpen

		set({
			isSidebarOpen: next,
			isSidebarPinned: next,
		})
	},

	pinSidebar: () => set({ isSidebarPinned: true, isSidebarOpen: true }),
	unpinSidebar: () => set({ isSidebarPinned: false }),
	togglePin: () =>
		set(s => ({ isSidebarPinned: !s.isSidebarPinned, isSidebarOpen: true })),

	syncForMobile: isMobile => {
		if (!isMobile) return
		set({ isSidebarOpen: false, isSidebarPinned: false })
	},
}))
