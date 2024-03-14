"use client"

import { useUsernameModal } from "@/hooks/use-set-username";
import { useSession } from "next-auth/react"
import { useEffect } from "react";

function ClientUsernameModalSetter() {
    const {onOpen} = useUsernameModal();
    const {data: session} = useSession();
    console.log(session);
    useEffect(() => {
        if(session) {
            onOpen();
        }
    }, [onOpen, session])
    return null;
}

export default ClientUsernameModalSetter;