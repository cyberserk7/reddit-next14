"use client"

import CreateCommunityModal from "@/components/modal/create-community-modal";
import EditSubredditModal from "@/components/modal/edit-subreddit-modal";
import AuthModal from "@/components/modal/login-modal"
import MobileSidebar from "@/components/modal/mobile-sidebar";
import SetUsernameModal from "@/components/modal/set-username-modal";
import { useEffect, useState } from "react"

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, [])

    if(!isMounted) {
        return null;
    }

    return (
        <>
            <AuthModal />
            <MobileSidebar />
            <SetUsernameModal />
            <CreateCommunityModal />
            <EditSubredditModal />
        </>
    )
}