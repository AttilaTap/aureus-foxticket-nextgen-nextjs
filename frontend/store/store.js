import { create } from "zustand";

const useTicketStore = create((set) => ({
  showLog: false,
  showReg: false,
  user: null,
  backendState: false,
  userEmailFromLocalStorage: null,
  ticketToBuy: [{}],
  setBackendState: (newState) => set((state) => ({ backendState: newState })),
  setUser: (email) => set({ user: email }),
  setUserEmailFromLocalStorage: (email) => set({ userEmailFromLocalStorage: email }),
  setShowLog: () => set((state) => ({ showLog: !state.showLog })),
  setShowReg: () => set((state) => ({ showReg: !state.showReg })),
  setTicketToBuy: (ticket) => set({ ...ticketToBuy, ticket }),
}));

export default useTicketStore;
