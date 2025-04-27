import React, {  useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';

import axios from 'axios';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';

import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';

const JobDescription = () => {
    const {singleJob} = useSelector((state) => state.job)
    const {user} = useSelector((state) => state.auth)
    
  
    const isInitiallyApplied = singleJob?.applications?.some((application) => application.applicant=== user?._id) || false

    const [isApplied, setIsApplied] = useState(isInitiallyApplied)



    const params = useParams()
    const jobId = params.id
     
    const dispatch = useDispatch()
    //useGetSingleJob(jobId)
    


    const applyJobHandler = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true })
       console.log(res.data)
        if(res.data.success){
          setIsApplied(true) // Update the state to reflect that the user has applied
          const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user._id }] }
          dispatch(setSingleJob(updatedSingleJob)) // Update the Redux store with the new job data
          toast.success(res.data.message)
         // dispatch(setSingleJob(res.data.job))
         
        }
      } catch (error) {
        console.error("Error applying for job:", error);
        toast.error(error.response.data.message)
        
      }
     
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
          try {
            const res= await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,
              { withCredentials: true }
            );
            if(res.data.success){
              dispatch(setSingleJob(res.data.job))
              setIsApplied(res.data.job.application.some((application) => application.applicant === user?._id)) // Check if the user has already applied for the job
            };
          } catch (error) {
            console.error("Error fetching jobs:", error);
          }
        }
        console.log("Redux updated job:", singleJob);
        fetchSingleJob();
    }, [jobId, dispatch ,user?._id,singleJob]);
  
  



    return (
        <div className="max-w-7xl mx-auto my-10 ">
            <div className="flex item-center justify-between">
                <div>
                    <h1 className="font-bold text-xl ">{singleJob?.title}</h1>
                    <Badge className={"text-blue-700 font-bold"} variant="ghost">{singleJob?.position}</Badge>
                    <Badge className={"text-[#F83002] font-bold"} variant="ghost">{singleJob?.jobType}</Badge>
                    <Badge className={"text-purple-700 font-bold"} variant="ghost">{singleJob?.salary}LPA</Badge>


                </div>
                <Button 
                onClick={isApplied ? null : applyJobHandler}
                disabled={isApplied}
                 variant="outline" className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#F83002]'}`}>{isApplied ? 'Already Applied' : "Apply Now"}</Button>
            </div>
            <h1 className="border-b-2 border-b-gray-300 font-medium py-4">{singleJob?.description}</h1>
            <div className="my-4">
            <h1 className="font-bold my-1">Role: <span className="pl-4 font-normal texy-gray-800">{singleJob?.title}</span></h1>
            <h1 className="font-bold my-1">Location: <span className="pl-4 font-normal texy-gray-800">{singleJob?.location}</span></h1>
            <h1 className="font-bold my-1">Description: <span className="pl-4 font-normal texy-gray-800">{singleJob?.description}</span></h1>
            <h1 className="font-bold my-1">Experience: <span className="pl-4 font-normal texy-gray-800">{singleJob?.experienceLevel} </span></h1>
            <h1 className="font-bold my-1">Salary: <span className="pl-4 font-normal texy-gray-800">{singleJob?.salary}LPA</span></h1>
            <h1 className="font-bold my-1">Total Applications: <span className="pl-4 font-normal texy-gray-800">{singleJob?.application?.length}</span></h1>
            <h1 className="font-bold my-1">Posted Date: <span className="pl-4 font-normal texy-gray-800">{singleJob?.createdAt.split(" ")}</span></h1>
           
            </div>


        </div>

    )
}

export default JobDescription