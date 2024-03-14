"use client"

import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import { useCommunityModal } from "@/hooks/use-community-modal"
import CreateCommunityForm from "../forms/create-community-form";

const CreateCommunityModal = () => {
    const communityModal = useCommunityModal();
  return (
    <Dialog open={communityModal.isOpen} onOpenChange={communityModal.onClose}>
      <DialogContent className="bg-[#0B1416] border-none outline-none">
          <CreateCommunityForm />    
      </DialogContent>
    </Dialog>
  )
}

export default CreateCommunityModal