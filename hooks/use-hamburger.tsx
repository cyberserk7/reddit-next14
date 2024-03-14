import { create } from "zustand";

type SheetStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    toggle: () => void;
}

export const useSheet = create<SheetStore>((set, get) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
    toggle: () => set(({isOpen: !get().isOpen})),
}))