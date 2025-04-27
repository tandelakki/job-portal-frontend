
import { setAllAdminJobs, setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch()
    useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        
        const res= await axios.get(`${JOB_API_END_POINT}/getadmin`,
           { withCredentials: true }
        );
        if(res.data.success){
          dispatch(setAllAdminJobs(res.data.jobs))
        };
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchAllAdminJobs();
  }, []);
}

export default useGetAllAdminJobs;