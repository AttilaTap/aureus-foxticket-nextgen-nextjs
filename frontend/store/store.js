import { create } from "zustand";

const useTicketStore = create((set) => ({
  showLog: false,
  showReg: false,
  user: null,
  backendState: false,
  userEmailFromLocalStorage: null,
  ticketToBuy: [{}],
  setShowLog: () => set((state) => ({ showLog: !state.showLog })),
  setShowReg: () => set((state) => ({ showReg: !state.showReg })),
  setUser: (email) => set({ user: email }),
  setBackendState: (newState) => set(() => ({ backendState: newState })),
  setUserEmailFromLocalStorage: (email) => set({ userEmailFromLocalStorage: email }),
  setTicketToBuy: (ticket) => set({ ...ticketToBuy, ticket }),
}));

export default useTicketStore;
