import { create } from "zustand";

type Store = {
  count: number;
  setCount: (count: number) => void;
};

export const useStore = create<Store>()((set) => ({
  count: 1,
  setCount: (count) => set(() => ({ count: count })),
}));
