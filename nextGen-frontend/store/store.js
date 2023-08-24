import { create } from 'zustand';

const useTicketStore = create((set) => ({
  showLog: false,
  showReg: false,
  user: null,
  token: null,
  setUser: (email) => set({ user: email }),
  setToken: (token) => set(() => ({ token: token })),
  setShowLog: () => set((state) => ({ showLog: !state.showLog })),
  setShowReg: () => set((state) => ({ showReg: !state.showReg })),
}));

export default useTicketStore;
