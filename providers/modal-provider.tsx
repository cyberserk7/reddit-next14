"use client"

import CreateCommunityModal from "@/components/modal/create-community-modal";
import DeleteCommunityModal from "@/components/modal/delete-community-modal";
import EditSubredditModal from "@/components/modal/edit-subreddit-modal";
import AuthModal from "@/components/modal/login-modal"
import PostImageUploadModal from "@/components/modal/post-image-upload-modal";
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
            <SetUsernameModal />
            <CreateCommunityModal />
            <EditSubredditModal />
            <DeleteCommunityModal />
        </>
    )
}