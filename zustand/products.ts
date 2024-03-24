import { create } from "zustand";

interface ProductState {
  products: any[];
  setProducts: (value: any[]) => void;
}

export const useProductStore = create<ProductState>()((set) => ({
  products: [],
  setProducts: (value) => set({ products: value }),
}));
