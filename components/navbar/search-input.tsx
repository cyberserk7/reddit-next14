"use client"

import { Search } from "lucide-react"

const SearchInput = () => {

  return (
    <div className="h-10 w-[45%] rounded-full bg-[#1A282D] hidden lg:flex items-center px-5 gap-2 cursor-text">
        <Search className="h-5 w-5 text-gray-400" />
        <span className="text-sm text-gray-500">Search Communities</span>
    </div>
  )
}

export default SearchInput