import Image from "next/image"
import LoginButton from "./login-button";
import SearchInput from "./search-input";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NavUser from "./nav-user";
import CreateCommunityBtn from "./create-community-btn";

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <nav className="fixed top-0 inset-x-0 h-16 border-b border-gray-800 z-10 px-4 md:px-5 lg:px-8 xl:px-10 flex items-center justify-between bg-[#0B1416]">
      <div className="h-max w-full flex justify-between items-center">
        <a href="/">
          <Image
            src="/logo.png"
            alt="Logo png"
            className="object-contain h-8 md:h-8 w-fit"
            height={500}
            width={500}
            priority
          />
        </a>
        <SearchInput />
        {!session ? (
          <LoginButton />
        ) : (
          <div className="flex items-center gap-2">
            <CreateCommunityBtn />
            <NavUser imageUrl={session.user.image!} />
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar;