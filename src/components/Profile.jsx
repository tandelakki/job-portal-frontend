import React, { useState } from 'react'
import Navbar from './ui/shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import { useSelector } from 'react-redux'
import UpdateProfileDialog from './UpdateProfileDialog'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const Profile = () => {
  useGetAppliedJobs()

  const [open, setOpen] = useState(false)
  const { user } = useSelector((store) => store.auth)

  const skills = user?.profile?.skills || []
  const hasResume = !!user?.profile?.resume

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-3 py-6 pt-24">
        {/* Profile Card */}
        <div className="bg-white shadow-sm border rounded-xl p-4 mb-5">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border">
                <AvatarImage
                  src="https://png.pngtree.com/png-vector/20190304/ourmid/pngtree-growth-business-company-logo-png-image_728232.jpg"
                  alt="Profile"
                />
              </Avatar>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{user?.fullname || 'Full Name'}</h2>
                <p className="text-sm text-gray-500">{user?.profile?.bio || 'No bio available.'}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
              <Pen className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white shadow-sm border rounded-xl p-4 mb-5">
          <h3 className="text-base font-semibold text-gray-800 border-b pb-2 mb-3">Contact</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-400" />
              <span>{user?.email || 'Not Provided'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Contact className="w-4 h-4 text-gray-400" />
              <span>{user?.phoneNumber || 'Not Provided'}</span>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white shadow-sm border rounded-xl p-4 mb-5">
          <h3 className="text-base font-semibold text-gray-800 border-b pb-2 mb-3">Skills</h3>
          <div className="flex flex-wrap gap-1.5">
            {skills.length > 0 ? (
              skills.map((skill, index) => (
                <Badge key={index} className="bg-gray-800 text-white px-2 py-0.5 text-xs rounded">
                  {skill}
                </Badge>
              ))
            ) : (
              <span className="text-sm text-gray-500">No skills added.</span>
            )}
          </div>
        </div>

        {/* Resume Section */}
        <div className="bg-white shadow-sm border rounded-xl p-4 mb-5">
          <h3 className="text-base font-semibold text-gray-800 border-b pb-2 mb-3">Resume</h3>
          {hasResume ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={user?.profile?.resume}
              className="text-blue-600 hover:underline text-sm"
            >
              {user?.profile?.resumeOriginalName || 'View Resume'}
            </a>
          ) : (
            <span className="text-sm text-gray-500">Resume not uploaded.</span>
          )}
        </div>

        {/* Applied Jobs Table */}
        <div className="bg-white shadow-sm border rounded-xl p-4">
          <h3 className="text-base font-semibold text-gray-800 border-b pb-2 mb-3">Applied Jobs</h3>
          <AppliedJobTable />
        </div>
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  )
}

export default Profile
