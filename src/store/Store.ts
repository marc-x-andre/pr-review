import { create } from "zustand";

type Store = {
  count: number;
  setCount: (count: number) => void;
  ghToken?: string;
};

export const useStore = create<Store>()((set) => ({
  count: 1,
  setCount: (count) => set(() => ({ count: count })),
  ghToken: undefined,
}));
