import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import axios from 'axios'



const shortListingStatus = ["Accepted", "Rejected"]
const ApplicantsTable = () => {

    const { applicants } = useSelector(store => store.application)
   
    
    
    const statusHandler = async ( status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, {status});
            console.log(res.data)
            if(res.data.success){
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }



    return (
        <div>
            <Table>
                <TableCaption>
                    A list of your recent Applicants
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName </TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact </TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
  {applicants?.application?.map((app, index) => (
    <TableRow key={index}>
      <TableCell>{app?.applicant?.fullname}</TableCell>
      <TableCell>{app?.applicant?.email}</TableCell>
      <TableCell>{app?.applicant?.phoneNumber}</TableCell>
      <TableCell className="text-blue-600">
        {app?.applicant?.profile?.resume ? (
          <a href={app.applicant.profile.resume} target="_blank" rel="noopener noreferrer">
            {app.applicant.profile.resumeOriginalName}
          </a>
        ) : (
          <span className="text-red-600">NA</span>
        )}
      </TableCell>
      <TableCell>{app?.createdAt?.split("T")[0]}</TableCell>
      <TableCell className="text-right">
        <Popover>
          <PopoverTrigger>
            <MoreHorizontal />
          </PopoverTrigger>
          <PopoverContent className="w-32 bg-black text-white">
            {shortListingStatus.map((status, i) => (
              <div onClick={() => statusHandler(status, app._id)} key={i}>
                <span>{status}</span>
              </div>
            ))}
          </PopoverContent>
        </Popover>
      </TableCell>
    </TableRow>
  ))}
</TableBody>


            </Table>
        </div>
    )
}

export default ApplicantsTable