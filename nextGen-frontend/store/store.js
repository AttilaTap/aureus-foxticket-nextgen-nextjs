import { create } from 'zustand';

const useTicketStore = create((set) => ({
  showLog: false,
  showReg: false,
  user: null, // to represent the logged-in user's email
  setUser: (email) => set(() => ({ user: email })), // to set the user's email
  setShowLog: () => set((state) => ({ showLog: !state.showLog })),
  setShowReg: () => set((state) => ({ showReg: !state.showReg })),
}));

export default useTicketStore;
