"use client"
import { Button } from "../ui/button";
import { useModal } from "@/hooks/use-modal-store";


const LoginButton = () => {

  const {onOpen} = useModal();

  return (
    <Button className="rounded-full h-9 md:h-10" onClick={() => onOpen("auth")}>
        Login
    </Button>
  )
}

export default LoginButton