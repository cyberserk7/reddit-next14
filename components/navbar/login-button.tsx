"use client"
import { useAuth } from "@/hooks/use-auth";
import { Button } from "../ui/button";


const LoginButton = () => {

    const auth = useAuth();

  return (
    <Button className="rounded-full h-9 md:h-10" onClick={auth.onOpen}>
        Login
    </Button>
  )
}

export default LoginButton