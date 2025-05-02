import { Bookmark, Briefcase, IndianRupee, Users } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Navigate, useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
  const navigate = useNavigate()

  // Function to calculate the days since the job was posted
  const daysAgoFunction = (mongoDbTime) => {
    const createdAt = new Date(mongoDbTime)
    const currentTime = new Date()
    const timeDifference = Math.abs(currentTime - createdAt)
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24)) // Convert to days
  }

  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 p-5">
      {/* Job Posted Date and Save Button */}
      <div className="flex items-center justify-between my-2">
        <p className="text-sm text-gray-600">{daysAgoFunction(job?.createdAt)} days ago</p>
        <Button variant="outlined" className="rounded-full p-1" size="icon">
         
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 my-2">
        <Button variant="outlined" className="rounded-full p-1" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
          </Avatar>
        </Button>
        <div>
          <h1 className="text-lg font-semibold text-gray-800">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      {/* Job Title and Description */}
      <div className="my-4">
        <h1 className="text-xl font-bold text-gray-900">{job?.title}</h1>
        <p className="text-sm text-gray-600 mt-2">{job?.description}</p>
      </div>

      {/* Job Type, Position, Salary */}
      <div className="flex gap-3 mt-4">
        <Badge className="text-blue-700 font-semibold" variant="ghost">
        <Users size={16} className="text-purple-600" />
        {job?.position} Vacancy
          
        </Badge>
        <Badge className="text-[#F83002] font-semibold" variant="ghost">
        <Briefcase size={16} className="text-blue-600" />
          {job?.jobType}
        </Badge>
        <Badge className="text-purple-700 font-semibold" variant="ghost">
           <IndianRupee size={16} className="text-green-600" />
          {job?.salary}
        </Badge>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-5">
        <Button
          onClick={() => navigate(`/jobs/description/${job?._id}`)}
          variant="outline"
          className="text-indigo-600 hover:bg-indigo-600 hover:text-white transition duration-200"
        >
          View Details
        </Button>
       
      </div>
    </div>
  )
}

export default Job
