"use client"

import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import { useModal } from "@/hooks/use-modal-store"

const PostImageUploadModal = () => {
    const {onClose, isOpen, type} = useModal();
    const showModal = isOpen && type === "postImageUpload"
  return (
    <Dialog open={showModal} onOpenChange={onClose}>
    <DialogContent className="bg-[#0B1416] border-none outline-none">
          
    </DialogContent>
  </Dialog>
  )
}

export default PostImageUploadModal