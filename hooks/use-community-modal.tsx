import { create } from "zustand";

type CommunityModalStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    toggle: () => void;
}

export const useCommunityModal = create<CommunityModalStore>((set, get) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
    toggle: () => set(({isOpen: !get().isOpen})),
}))