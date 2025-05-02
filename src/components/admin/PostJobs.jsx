import React, { useState } from 'react'
import Navbar from '../ui/shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import store from '@/redux/store'
import { useSelector } from 'react-redux'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'

const PostJobs = () => {
  const [input, setInput] = useState({
    title: '',
    description: '',
    requirements: '',
    jobType: '',
    experience: '',
    position: 0,
    companyId: '',
    location: '',
    salary: ''
  })

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { companies } = useSelector((store) => store.company)

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    )
    if (selectedCompany) {
      setInput({
        ...input,
        companyId: selectedCompany._id
      })
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })

      if (res.data.success) {
        toast.success(res.data.message)
        console.log("Navigating to /admin/jobs")
       
          navigate('/admin/jobs')
         // delay for toast visibility
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white p-10 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Post a New Job</h2>

          <form onSubmit={submitHandler} className="space-y-8">
            {/* Job Details */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Job Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label>Job Title</Label>
                  <Input
                    name="title"
                    value={input.title}
                    onChange={changeEventHandler}
                    placeholder="e.g. Software Engineer"
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Input
                    name="description"
                    value={input.description}
                    onChange={changeEventHandler}
                    placeholder="Short job description"
                  />
                </div>
                <div>
                  <Label>Requirements</Label>
                  <Input
                    name="requirements"
                    value={input.requirements}
                    onChange={changeEventHandler}
                    placeholder="Skills, qualifications"
                  />
                </div>
                <div>
                  <Label>Job Type</Label>
                  <Input
                    name="jobType"
                    value={input.jobType}
                    onChange={changeEventHandler}
                    placeholder="Full-time, Part-time"
                  />
                </div>
                <div>
                  <Label>Experience</Label>
                  <Input
                    name="experience"
                    value={input.experience}
                    onChange={changeEventHandler}
                    placeholder="e.g. 2-4 years"
                  />
                </div>
                <div>
                  <Label>No. of Positions</Label>
                  <Input
                    type="number"
                    name="position"
                    value={input.position}
                    onChange={changeEventHandler}
                  />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input
                    name="location"
                    value={input.location}
                    onChange={changeEventHandler}
                    placeholder="City, State"
                  />
                </div>
                <div>
                  <Label>Salary (INR/month)</Label>
                  <Input
                    type="number"
                    name="salary"
                    value={input.salary}
                    onChange={changeEventHandler}
                    placeholder="e.g. 50000"
                  />
                </div>
              </div>
            </div>

            {/* Company Selector with Professional Design */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Company</h3>
              {companies.length > 0 ? (
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="border border-gray-300 bg-transparent hover:bg-gray-50 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-300 rounded-lg shadow-lg">
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem
                          key={company._id}
                          value={company.name.toLowerCase()}
                          className="hover:bg-gray-100"
                        >
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <div className="text-red-500">
                  No companies found. Please add one first.
                </div>
              )}
            </div>

            {/* Submit */}
            <div>
              {loading ? (
                <Button className="w-full" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Posting Job...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-6"
                >
                  Post Job
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PostJobs
