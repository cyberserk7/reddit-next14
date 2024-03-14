"use client"

import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import { useUsernameModal } from "@/hooks/use-set-username"
import SetUsernameForm from "../forms/set-username-form";
import { useEffect, useState } from "react";

const SetUsernameModal = () => {
    const usernameModal = useUsernameModal();
    const [isMounted, setIsMounted] = useState(false);
    
    useEffect(() => {
      setIsMounted(true);
    }, [])

    if(!isMounted) return null;

  return (
    <Dialog open={usernameModal.isOpen}>
      <DialogContent className="bg-[#0B1416] border-none outline-none">
          <SetUsernameForm />    
      </DialogContent>   
    </Dialog>
  )
}

export default SetUsernameModal