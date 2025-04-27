import React, { useState } from 'react'
import Navbar from '../ui/shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import store from '@/redux/store'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'

const companyArray = []

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
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const {companies} = useSelector(store => store.company)
  

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }
  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find((company => company.name.toLowerCase() === value));
    setInput({
      ...input,
      companyId: selectedCompany._id
    });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log(JOB_API_END_POINT)
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          'Content-Type': 'application/json',
          //'Authorization': `Bearer ${store.getState().auth.token}`
        },
        withCredentials: true
      });
      console.log('Job posted:', res.data);
      if(res.data.success){
        toast.success(res.data.message)
        // setTimeout(() => {
          navigate('/admin/jobs')
      //   }, 1000) // wait 1 second before navigating
     }
      

    } catch (error) {
      toast.error(error.response.data.message)
      
    }finally {
      setLoading(false);
    }
  
  
  
  
  }



  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <form onSubmit={submitHandler} className="p-8 max-w-4xl border-gray-200 shadow-lg rounded-md ">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              value={input.title}
              onChange={changeEventHandler}
              className="focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none focus-visible:ring-opacity-50"
            />
          </div>
          <div>
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              className="focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none focus-visible:ring-opacity-50"
            />
          </div>
          <div>
            <Label>Requirements</Label>
            <Input
              type="text"
              name="requirements"
              value={input.requirements}
              onChange={changeEventHandler}
              className="focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none focus-visible:ring-opacity-50"
            />
          </div>
          <div>
            <Label>Salary</Label>
            <Input
              type="number"
              name="salary"
              value={input.salary}
              onChange={changeEventHandler}
              className="focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none focus-visible:ring-opacity-50"
            />
          </div>
          <div>
            <Label>Location</Label>
            <Input
              type="text"
              name="location"
              value={input.location}
              onChange={changeEventHandler}
              className="focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none focus-visible:ring-opacity-50"
            />
          </div>
          <div>
            <Label>Job Type</Label>
            <Input
              type="text"
              name="jobType"
              value={input.jobType}

              onChange={changeEventHandler}
              className="focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none focus-visible:ring-opacity-50"
            />
          </div>
          <div>
            <Label>Experience Level</Label>
            <Input
              type="text"
              name="experience"
              value={input.experience}
              onChange={changeEventHandler}
              className="focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none focus-visible:ring-opacity-50"
            />
          </div>
          <div>
            <Label>No of positions</Label>
            <Input
              type="number"
              name="position"
              value={input.position}
              onChange={changeEventHandler}
              className="focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none focus-visible:ring-opacity-50"
            />
          </div>
          {

               companies.length > 0 && (
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {
                        companies.map((company) => (
                          <SelectItem key={company._id} value={company.name.toLowerCase()} >
                            {company.name}
                          </SelectItem>
                        ))
                      }
                    </SelectGroup>
                  </SelectContent>
                </Select>
               )    
                  
                
         
          
          }


        </div>
           {
                                      loading ? <Button  className="w-full my-4"> <Loader2 className = "mr-2 h-4 w-4 animate-spin "/> Please wait</Button> :  <Button variant="outline" type="submit" className="w-full my-4 bg-black text-white">Post New Job</Button>
                                    }
                            
        {
          companyArray.length === 0 && <div className="text-red-500 text-center mt-4">No companies found</div>
        }
        </form>



      </div>
    </div>
  )
}

export default PostJobs