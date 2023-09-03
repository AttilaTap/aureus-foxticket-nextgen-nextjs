import { create } from "zustand";

const useTicketStore = create((set) => ({
  showLog: false,
  showReg: false,
  user: null,
  backendState: false,
  userEmailFromLocalStorage: null,
  setBackendState: (newState) => set((state) => ({ backendState: newState })),
  setUser: (email) => set({ user: email }),
  setUserEmailFromLocalStorage: (email) => set({ userEmailFromLocalStorage: email }),
  setShowLog: () => set((state) => ({ showLog: !state.showLog })),
  setShowReg: () => set((state) => ({ showReg: !state.showReg })),
}));

export default useTicketStore;
