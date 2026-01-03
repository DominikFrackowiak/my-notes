import { create } from 'zustand'

interface UseFormStore {
	isFormActive: boolean
	setIsFormActive: (val: boolean) => void
	toggleFormActive: () => void
}

export const useFormStore = create<UseFormStore>((set, get) => ({
	isFormActive: false,
	setIsFormActive: (val: boolean) =>
		set({
			isFormActive: val,
		}),
	toggleFormActive: () => set(state => ({ isFormActive: !state.isFormActive })),
}))
