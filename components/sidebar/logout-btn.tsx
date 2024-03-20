import { TbLogout } from "react-icons/tb";

const LogoutBtn = () => {
  return (
    <div className="rounded-xl py-2.5 px-5 w-[90%] flex items-center hover:bg-[#131F23] text-sm">
        <div className="w-max h-max flex items-center justify-center gap-3">
            <TbLogout className="w-5 h-5" />
            <span className="text-sm font-normal text-white">Logout</span>
        </div>
    </div>
  )
}

export default LogoutBtn