import React, { useEffect } from 'react'
import Navbar from '../ui/shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import { useParams } from 'react-router-dom'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setAllApplicants } from '@/redux/applicationSlice'


const Applicants = () => {
    const params = useParams()
    console.log("Job ID:", params.id);

    const dispatch = useDispatch()
    const { applicants} = useSelector(store => store.application)
    


    useEffect(() => {
        //const jobId = params.id


        const fetchAllApplicants = async () => {
            try {
               
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get/${params.id}/applicants`, { withCredentials: true })
                console.log(res.data)
                dispatch(setAllApplicants(res.data.job))
            } catch (error) {
                console.log(error)

            }
        }
        fetchAllApplicants();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto">
                <h1 className="font-bold"> Applicants {applicants?.application?.length}
                </h1>
                <ApplicantsTable />
            </div>
        </div>
    )
}

export default Applicants