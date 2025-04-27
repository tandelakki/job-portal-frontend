import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'


const AdminJobsTable = () => {


    const { allAdminJobs, searchJobByText } = useSelector(store => store.job)
    const [filterJobs, setFilterJobs] = useState(allAdminJobs)
    const navigate = useNavigate()



    useEffect(() => {
        const filteredCompany = (allAdminJobs || []).filter((job) => {
            if (!searchJobByText) {
                return true
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filteredCompany)
    }, [allAdminJobs, searchJobByText])



    return (
        <div>
            <Table>
                <TableCaption>A list of your recent Posted Jobs </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name </TableHead>
                        <TableHead>Role </TableHead>
                        <TableHead>Date </TableHead>
                        <TableHead className="text-right">Action </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {


                        filterJobs?.map((job) => {
                            return (
                            <TableRow key={job._id}>


                                <TableCell >{job.company?.name || 'NA'}</TableCell>
                                <TableCell >{job.title}</TableCell>
                                <TableCell>{new Date(job.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32 bg-black text-white">
                                            <div onClick={() => navigate(`/admin/companies/${job._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                                                <Edit2 className="w-4" />
                                                <span>Edit</span>
                                            </div>
                                            <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center gap-2 w-fit cursor-pointer mt-2">
                                                <Eye className="w-4" />
                                                <span>Applicants</span>
                                            </div>

                                        </PopoverContent>
                                    </Popover>
                                </TableCell>

                            </TableRow>
                            
                            )
                        
















                        }
                        )}

                </TableBody>

            </Table>
        </div>
    )
}

export default AdminJobsTable