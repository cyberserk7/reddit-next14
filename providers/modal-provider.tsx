"use client"

import CreateCommunityModal from "@/components/modal/create-community-modal";
import DeleteCommunityModal from "@/components/modal/delete-community-modal";
import EditSubredditModal from "@/components/modal/edit-subreddit-modal";
import AuthModal from "@/components/modal/login-modal"

import SetUsernameModal from "@/components/modal/set-username-modal";
import UserSettingsModal from "@/components/modal/user-settings";
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
            <SetUsernameModal />
            <CreateCommunityModal />
            <EditSubredditModal />
            <DeleteCommunityModal />
            <UserSettingsModal />
        </>
    )
}