import React, { useEffect, useState, useMemo } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job)
    const [filterJobs, setFilterJobs] = useState([]) // Default to empty array
    const navigate = useNavigate()

    // Using useMemo to optimize filtering
    const filteredJobs = useMemo(() => {
        if (!allAdminJobs || allAdminJobs.length === 0) return []

        return allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true
            }
            const searchTerm = searchJobByText.toLowerCase()
            return job?.title?.toLowerCase().includes(searchTerm) || job?.company?.name?.toLowerCase().includes(searchTerm)
        })
    }, [allAdminJobs, searchJobByText])

    useEffect(() => {
        setFilterJobs(filteredJobs) // Update filterJobs with the memoized filtered list
    }, [filteredJobs])

    return (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4 mt-6">
            <Table>
                <TableCaption>A list of your recent Posted Jobs</TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-200">
                        <TableHead className="text-sm font-medium text-gray-600">Company Name</TableHead>
                        <TableHead className="text-sm font-medium text-gray-600">Role</TableHead>
                        <TableHead className="text-sm font-medium text-gray-600">Date</TableHead>
                        <TableHead className="text-sm font-medium text-gray-600 text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJobs.length > 0 ? (
                        filterJobs.map((job) => (
                            <TableRow key={job._id} className="hover:bg-gray-50">
                                <TableCell>{job.company?.name || 'NA'}</TableCell>
                                <TableCell>{job.title}</TableCell>
                                <TableCell>{new Date(job.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="w-5 text-gray-600 hover:text-gray-800" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-36 bg-black text-white rounded-lg shadow-md">
                                            <div onClick={() => navigate(`/admin/companies/${job._id}`)} className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-700 rounded-md">
                                                <Edit2 className="w-4 text-gray-400" />
                                                <span className="text-sm">Edit</span>
                                            </div>
                                            <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-700 rounded-md mt-2">
                                                <Eye className="w-4 text-gray-400" />
                                                <span className="text-sm">Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">No jobs available</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable
