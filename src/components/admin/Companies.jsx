import React, { useEffect, useState } from 'react'
import Navbar from '../ui/shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'


const Companies = () => {
    useGetAllCompanies()
    const [input,setInput] = useState("")
    const Navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
    dispatch(setSearchCompanyByText(input));
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
                <Button className="bg-black text-white" onClick={() => Navigate("/admin/companies/create")}>New Company</Button>
            </div>
            <CompaniesTable />


            </div>
        </div>
    )
}

export default Companies


