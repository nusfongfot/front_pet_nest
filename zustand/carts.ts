import { create } from "zustand";

interface CartState {
  carts: any[];
  setCarts: (value: any[]) => void;
}

export const useCartStore = create<CartState>()((set) => ({
  carts: [],
  setCarts: (value) => set({ carts: value }),
}));
