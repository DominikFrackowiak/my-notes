import { create } from 'zustand'

interface SelectedTagStore{
 selectedTag: string
}

export const useSelectedTagStore = create<SelectedTagStore>(

)