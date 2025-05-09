import { create } from 'zustand'

export const Store = create((set) => ({
 isSidebaropen: false,
    setIsSidebarOpen: (isSidebaropen) => set({ isSidebaropen }),
    SelectedUser: JSON.parse(localStorage.getItem('selectedUser')) || null,
    setSelectedUser: (SelectedUser) => {
      localStorage.setItem('selectedUser', JSON.stringify(SelectedUser));
      set({ SelectedUser });
    },
}))
