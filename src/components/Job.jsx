import { Bookmark } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Navigate, useNavigate } from 'react-router-dom'

const Job = ({job}) => {
    const navigate= useNavigate()
   // const jobId = "veda"

const daysAgoFunction = (mongoDbTime) => {
    const createdAt = new Date(mongoDbTime);
    const currentTime = new Date();
    const timeDifference = Math.abs(currentTime - createdAt);
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert to days
  }


    return (
        <div className="bg-white p-5 rounded-lg shadow-xl">
            <div className="flex items-center gap-2 my-2 mr-5 justify-between">
                <p className="text-sm text-gray-600">{daysAgoFunction(job?.createdAt)} days ago
            
                </p>
                <Button variant="" className="rounded full" size="icon"><Bookmark /></Button>

            </div>

            <div className="flex items-center gap-2 my-2 mr-5">
                <Button variant="outlined" className="rounded full" size="icon">
                    <Avatar >
                        <AvatarImage src={job?.company?.logo}/></Avatar>

                </Button>




                <div>
                    <h1 className="font-md text-lg">{job?.company?.name}</h1>
                    <p className ="text-sm text-gray-600">India</p>
                </div>
            </div>
            <div>
                <h1 className="font-bold text-lg my-2">{job?.title}</h1>
                <p className="text-sm text-gray-600"> {job?.description} </p>
            </div>
            <div className="flex items-center gap-2 mt-4">
                <Badge className={"text-blue-700 font-bold"} variant="ghost">{job?.position}</Badge>
                <Badge className={"text-[#F83002] font-bold"} variant="ghost">{job?.jobType}</Badge>
                <Badge className={"text-purple-700 font-bold"} variant="ghost">{job?.salary}</Badge>
            </div>
            <div className="flex items-center gap-2 mt-4">
                <Button onClick={()=> navigate(`/jobs/description/${job?._id}`)}variant="outline">
                    details
                </Button>
                <Button className="bg-[#7209b7] text-white">
                    Save for Later
                </Button>
            </div>

        </div>
    )
}

export default Job