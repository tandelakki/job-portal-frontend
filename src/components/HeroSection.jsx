import { setSearchedQuery } from '@/redux/jobSlice'
import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {

const [query, setQuery] = useState("")
const dispatch = useDispatch()
const navigate = useNavigate()


const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse")

}

  return (
    <div className="text-center ">
        <div className="flex flex-col gap-5 my-10">
        <span className = "px-4 mx-auto py-2 rounded-full bg-gray-200 text-2xl font-bold text-[#F83002] font-md">
            No. 1 Job Hunt Website
        </span>
        <h1 className = "text-5xl font-bold mt-1">
            Search , Apply & <br/> Get Your  <span className = "text-[#6A38C2]"> Dream Jobs</span>
        </h1>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati non ipsum architecto voluptatem blanditiis?
        </p>
        <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded items-center gap-4 mx-auto">
            <input
            type="text"
            placeholder="Find Your Dream Jobs"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full"
            />
            <button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2] ">
                <Search className="h-5 w-5"/>
            </button>

        </div>
        </div>
        
    </div>
  )
}

export default HeroSection