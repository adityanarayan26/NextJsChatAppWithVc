import { create } from 'zustand';

const getInitialSelectedUser = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('selectedUser');
    return stored ? JSON.parse(stored) : null;
  }
  return null;
};

export const Store = create((set) => ({
  isSidebaropen: false,
  setIsSidebarOpen: (isSidebaropen) => set({ isSidebaropen }),
  SelectedUser: getInitialSelectedUser(),
  setSelectedUser: (SelectedUser) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedUser', JSON.stringify(SelectedUser));
    }
    set({ SelectedUser });
  },
}));
