"use client"

import { Search } from "lucide-react"
import { Input } from "../ui/input"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import qs from "query-string"

const SearchInput = () => {
  const [input, setInput] = useState("");
  const [edited, setEdited] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if(edited){
      const url = qs.stringifyUrl({
        url: "/r/communities",
        query: {
          name: input,
        }
      }, {skipEmptyString: true, skipNull: true})
      router.push(url)
    } 
  }, [router, input, edited])

  return (
    <div 
      className="h-10 w-[45%] rounded-full bg-[#1A282D] hidden lg:flex items-center px-5 gap-2 cursor-text"
    >
        <Search className="h-5 w-5 text-gray-400" />
        <Input 
          className="outline-none bg-transparent border-none p-0" 
          placeholder="Search Communities" 
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if(!edited) {
              setEdited(true);
            }
          }}
        />
    </div>
  )
}

export default SearchInput