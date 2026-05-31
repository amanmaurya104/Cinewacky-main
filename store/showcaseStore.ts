"use client";

import { create } from 'zustand';

type State = {
	index: number;
	length: number;
	setIndex: (n: number) => void;
	next: () => void;
	prev: () => void;
	setLength: (n: number) => void;
};

export const useShowcaseStore = create<State>((set, get) => ({
	index: 0,
	length: 0,
	setIndex: (n) => set({ index: n }),
	next: () => {
		const { index, length } = get();
		set({ index: Math.min(length - 1, index + 1) });
	},
	prev: () => {
		const { index } = get();
		set({ index: Math.max(0, index - 1) });
	},
	setLength: (n) => set({ length: n }),
}));

export default useShowcaseStore;
