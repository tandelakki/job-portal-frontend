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
    
    const [input,setInput] = useState("")
    const Navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
    dispatch(setSearchJobByText(input));
    }
    , [input])
    return (
        <div>
            <Navbar />
            <div> <div className=" item-center justify-between flex max-w-7xl mx-auto mt-10">
                <Input
                    type="text"
                    placeholder="Search for a company"
                    onChange={(e) => setInput(e.target.value)}
                    className="w-fit"

                />
                <Button className="bg-black text-white" onClick={() => Navigate("/admin/jobs/create")}>Post Jobs</Button>
            </div>
            <AdminJobsTable />


            </div>
        </div>
    )
}

export default AdminJobs


