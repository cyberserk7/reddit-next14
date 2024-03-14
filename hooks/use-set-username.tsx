import { create } from "zustand";

type setUsernameStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    toggle: () => void;
}

export const useUsernameModal = create<setUsernameStore>((set, get) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
    toggle: () => set(({isOpen: !get().isOpen})),
}))