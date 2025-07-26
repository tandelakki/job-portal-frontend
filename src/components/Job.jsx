import { Briefcase, IndianRupee, Users } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
  const navigate = useNavigate()

  const daysAgoFunction = (mongoDbTime) => {
    const createdAt = new Date(mongoDbTime)
    const currentTime = new Date()
    const timeDifference = Math.abs(currentTime - createdAt)
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24)) // days
  }

  const handleCardClick = () => {
    navigate(`/jobs/description/${job?._id}`)
  }

 return (
  <div
    onClick={handleCardClick}
    className="cursor-pointer bg-white rounded-xl border hover:shadow-lg transition-all duration-300 ease-in-out p-5 space-y-4  transform hover:scale-105"
  >
    {/* Company Info + Posted Date */}
    <div className="flex justify-between items-start">
      <div className="flex items-center gap-3">
        <Avatar className="w-12 h-12">
          <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
        </Avatar>
        <div>
          <h2 className="text-sm font-medium text-gray-800">{job?.company?.name}</h2>
          <p className="text-xs text-gray-500">{job?.company?.location || 'India'}</p>
        </div>
      </div>
      <span className="text-xs text-gray-400">{daysAgoFunction(job?.createdAt)} days ago</span>
    </div>

    {/* Job Title & Description */}
    <div>
      <h1 className="text-lg font-semibold text-blue-900">{job?.title}</h1>
      <p className="text-sm text-gray-600 line-clamp-2 mt-1">{job?.description}</p>
    </div>

    {/* Job Highlights */}
    <div className="flex flex-wrap gap-3 text-sm">
      <div className="flex items-center gap-1 text-gray-600">
        <Users size={16} className="text-purple-600" />
        {job?.position} Opening{job?.position > 1 ? 's' : ''}
      </div>
      <div className="flex items-center gap-1 text-gray-600">
        <Briefcase size={16} className="text-blue-600" />
        {job?.jobType}
      </div>
      <div className="flex items-center gap-1 text-gray-600">
        <IndianRupee size={16} className="text-green-600" />
        {job?.salary} LPA
      </div>
    </div>

    {/* CTA */}
    <div className="mt-3">
      <Button
        onClick={(e) => {
          e.stopPropagation()
          navigate(`/jobs/description/${job?._id}`)
        }}
        variant="outline"
        className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-sm font-medium"
      >
        View Details
      </Button>
    </div>
  </div>
)

}

export default Job
