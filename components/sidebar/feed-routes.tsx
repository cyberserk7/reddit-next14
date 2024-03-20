"use client"

import { HiMiniHome } from "react-icons/hi2";
import { BsArrowUpRightCircle } from "react-icons/bs";
import { MdInsertChartOutlined } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { PiChartLine } from "react-icons/pi";

const routes = [
    {
      title: "Home",
      href: "/",
      icon: HiMiniHome,
    },
    {
      title: "Popular",
      href: "/r/popular",
      icon: BsArrowUpRightCircle,
    },
    {
      title: "All",
      href: "/r/all",
      icon: PiChartLine,
    },
  ];

const FeedRoutes = () => {
    const pathname = usePathname();
    const router = useRouter();

  return (
    <div className="w-[90%] h-fit">
        {routes.map((route) => {
            const Icon = route.icon;
            const isActive = pathname === route.href;
            return (
                <Link
                    className={cn(
                    "rounded-xl py-2.5 px-5 w-full flex items-center hover:bg-[#131F23]",
                    isActive && "bg-[#1A282D] hover:bg-[#1A282D]"
                    )}
                    key={route.title}
                    href={route.href}
                >
                    <div className="w-max h-max flex items-center justify-center gap-3">
                        <Icon className="w-6 h-6" />
                        <span className="text-sm font-normal text-white">{route.title}</span>
                    </div>
                </Link>
            )
        })}
    </div>
  )
}

export default FeedRoutes