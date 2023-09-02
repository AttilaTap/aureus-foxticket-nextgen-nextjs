import { create } from "zustand";

const useTicketStore = create((set) => ({
  showLog: false,
  showReg: false,
  user: null,
  backendState: false,
  setBackendState: (newState) => set((state) => ({ backendState: newState })),
  setUser: (email) => set({ user: email }),
  setShowLog: () => set((state) => ({ showLog: !state.showLog })),
  setShowReg: () => set((state) => ({ showReg: !state.showReg })),
}));

export default useTicketStore;
