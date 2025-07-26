import React, { useEffect, useState } from 'react'
import Navbar from '../ui/shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'

const AdminJobs = () => {
    useGetAllAdminJobs()
    
    const [input, setInput] = useState("")
    const Navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSearchJobByText(input));
    }, [input])

    return (
        

        
        <div className="bg-gray-100 min-h-screen py-0">
            <Navbar />
            
            <div className="max-w-7xl mx-auto px-4 mt-10">
                <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row items-center justify-between">
                    {/* Search Bar */}
                    <div className="flex items-center w-full md:w-1/2 mb-4 md:mb-0">
                        <div className="relative w-full">
                            <Input
                                type="text"
                                placeholder="Search for a job or company"
                                onChange={(e) => setInput(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border rounded-md text-sm"
                            />
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                <i className="fas fa-search"></i>
                            </span>
                        </div>
                    </div>

                    {/* Post Jobs Button */}
                    <Button
                        className="bg-black text-white py-2 px-6 rounded-lg text-sm hover:bg-gray-800 transition-all"
                        onClick={() => Navigate("/admin/jobs/create")}
                    >
                        Post Jobs
                    </Button>
                </div>

                {/* Admin Jobs Table */}
                <AdminJobsTable />
            </div>
        </div>
    )
}

export default AdminJobs
