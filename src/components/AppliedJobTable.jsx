import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const { allAppliedJobs, loading } = useSelector((state) => state.job)

    // Loading state
    if (loading) {
        return (
            <div className="text-center py-4">
                <span>Loading your applied jobs...</span>
            </div>
        )
    }

    // If no applied jobs, display a placeholder message
    if (!allAppliedJobs || allAppliedJobs.length === 0) {
        return (
            <div className="text-center py-4">
                <span className="text-gray-600">You have not applied to any jobs yet.</span>
            </div>
        )
    }

    return (
        <div>
            <Table>
                <TableCaption>A List of Your Applied Jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allAppliedJobs.map((appliedJob) => (
                        <TableRow key={appliedJob._id}>
                            <TableCell>{new Date(appliedJob.job?.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell>{appliedJob.job?.title}</TableCell>
                            <TableCell>{appliedJob.job?.company?.name}</TableCell>
                            <TableCell className="text-right">
                                <Badge className={`${appliedJob?.status === 'rejected' ? 'bg-red-400' : appliedJob.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>
                                    {appliedJob.status?.toUpperCase()}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable
