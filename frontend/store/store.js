import { create } from "zustand";

const useTicketStore = create((set) => ({
  showLog: false,
  showReg: false,
  user: null,
  backendState: false,
  userEmailFromLocalStorage: null,
  ticketToBuy: [{}],
  basket: [],
  showPassword: false,

  setBackendState: (newState) => set((state) => ({ backendState: newState })),
  setUser: (email) => set({ user: email }),
  setUserEmailFromLocalStorage: (email) => set({ userEmailFromLocalStorage: email }),
  setShowLog: () => set((state) => ({ showLog: !state.showLog })),
  setShowReg: () => set((state) => ({ showReg: !state.showReg })),
  setUser: (email) => set({ user: email }),
  setBackendState: (newState) => set(() => ({ backendState: newState })),
  setUserEmailFromLocalStorage: (email) => set({ userEmailFromLocalStorage: email }),
  setTicketToBuy: (ticket) => set({ ...ticketToBuy, ticket }),
  addToBasket: (ticket) => set((state) => ({ basket: [...state.basket, ticket] })),
  removeFromBasket: (ticketId) => set((state) => ({ basket: state.basket.filter((item) => item.ticket_id !== ticketId) })),
  clearBasket: () => set({ basket: [] }),
  togglePasswordVisibility: () => set((state) => ({ showPassword: !state.showPassword })),
}));

export default useTicketStore;
