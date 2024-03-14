"use client"

import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import CreateCommunityForm from "../forms/create-community-form";
import { useModal } from "@/hooks/use-modal-store";

const CreateCommunityModal = () => {
    const {onClose, isOpen, type} = useModal();
    const showModal = isOpen && type === "createCommunity"

  return (
    <Dialog open={showModal} onOpenChange={onClose}>
      <DialogContent className="bg-[#0B1416] border-none outline-none">
          <CreateCommunityForm />    
      </DialogContent>
    </Dialog>
  )
}

export default CreateCommunityModal