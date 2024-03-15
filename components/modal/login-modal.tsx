"use client"

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { useAuth } from "@/hooks/use-auth";
import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

const AuthModal = () => {
  const [loading, setLoading] = useState(false);
  const {isOpen, onClose, type} = useModal();
  const showModal = isOpen && type === "auth"

  const authLogin = async (str: string) => {
    setLoading(true);
    try {
      await signIn(str);
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={showModal} onOpenChange={onClose}>
      <DialogContent className="bg-[#0B1416] border-none outline-none">
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-semibold">Log In</h1>
            <span className="text-sm">By continuing, you agree to our
            <span className="text-blue-500"> User Agreement</span> and acknowledge that you understand the <span className="text-blue-500">Privacy Policy </span></span>
          </div>
          <Button className="bg-white hover:bg-white/90 text-slate-900 flex gap-2 items-center justify-center" onClick={() => authLogin("github")} disabled={loading}>
            {loading && <Loader className="h-4 w-4 animate-spin" />}
            Continue with Github 
            <FaGithub className="w-6 h-6" />
          </Button>
      </DialogContent>
    </Dialog>
  )
}

export default AuthModal;