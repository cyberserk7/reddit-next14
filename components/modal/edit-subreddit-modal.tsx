"use client"

import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import { useModal } from "@/hooks/use-modal-store";
import EditCommunityForm from "../forms/edit-community-form";

const EditSubredditModal = () => {
    const {isOpen, onClose, type, data} = useModal();
    const isModalOpen = isOpen && type === "editSubreddit";
    const {subreddit} = data;
    
  return (
    <Dialog open={isModalOpen} onOpenChange={() => onClose()}>
      <DialogContent className="bg-[#0B1416] border-none outline-none max-w-md">
          <EditCommunityForm subreddit={subreddit} />
      </DialogContent>
    </Dialog>
  )
}

export default EditSubredditModal