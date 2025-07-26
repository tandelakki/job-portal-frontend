import React, { useEffect, useState, useMemo } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job)
    const [filterJobs, setFilterJobs] = useState([])
    const navigate = useNavigate()

    const filteredJobs = useMemo(() => {
        if (!allAdminJobs || allAdminJobs.length === 0) return []

        return allAdminJobs.filter((job) => {
            if (!searchJobByText) return true
            const searchTerm = searchJobByText.toLowerCase()
            return (
                job?.title?.toLowerCase().includes(searchTerm) ||
                job?.company?.name?.toLowerCase().includes(searchTerm)
            )
        })
    }, [allAdminJobs, searchJobByText])

    useEffect(() => {
        setFilterJobs(filteredJobs)
    }, [filteredJobs])

    return (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6 mt-8 max-w-7xl mx-auto">
            <Table>
                <TableCaption className="text-gray-600 font-semibold mb-4 text-left">
                    Recent Posted Jobs
                </TableCaption>
                <TableHeader>
                    <TableRow className="bg-indigo-50">
                        <TableHead className="text-sm font-semibold text-indigo-700 px-6 py-3">Company Name</TableHead>
                        <TableHead className="text-sm font-semibold text-indigo-700 px-6 py-3">Role</TableHead>
                        <TableHead className="text-sm font-semibold text-indigo-700 px-6 py-3">Date</TableHead>
                        <TableHead className="text-sm font-semibold text-indigo-700 px-6 py-3 text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJobs.length > 0 ? (
                        filterJobs.map((job) => (
                            <TableRow key={job._id} className="hover:bg-indigo-100 transition-colors cursor-default">
                                <TableCell className="px-6 py-4">{job.company?.name || 'NA'}</TableCell>
                                <TableCell className="px-6 py-4">{job.title}</TableCell>
                                <TableCell className="px-6 py-4">{new Date(job.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell className="px-6 py-4 text-right">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="w-5 h-5 text-indigo-600 hover:text-indigo-800 cursor-pointer" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-40 bg-white border border-indigo-200 rounded-lg shadow-lg p-2">
                                            <div
                                                onClick={() => navigate(`/admin/companies/${job._id}`)}
                                                className="flex items-center gap-2 p-2 cursor-pointer hover:bg-indigo-100 rounded-md"
                                            >
                                                <Edit2 className="w-4 h-4 text-indigo-500" />
                                                <span className="text-indigo-700 text-sm">Edit</span>
                                            </div>
                                            <div
                                                onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                                className="flex items-center gap-2 p-2 cursor-pointer hover:bg-indigo-100 rounded-md mt-1"
                                            >
                                                <Eye className="w-4 h-4 text-indigo-500" />
                                                <span className="text-indigo-700 text-sm">Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center text-gray-500 py-6 font-medium">
                                No jobs available
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable
