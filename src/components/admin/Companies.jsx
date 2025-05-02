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
    const [input, setInput] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input])

    return (
        <div className="bg-gray-100 min-h-screen py-10">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 mt-10">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-4 rounded-lg shadow">
                    <Input
                        type="text"
                        placeholder="Search by company name..."
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full md:w-1/3"
                    />
                    <Button
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                        onClick={() => navigate("/admin/companies/create")}
                    >
                        + Add New Company
                    </Button>
                </div>

                <div className="mt-8 bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Company Listings</h2>
                    <CompaniesTable />
                </div>
            </div>
        </div>
    )
}

export default Companies
