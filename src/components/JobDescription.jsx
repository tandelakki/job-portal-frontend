import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Briefcase, Users, IndianRupee, MapPin, CalendarDays } from 'lucide-react';
import { Button } from './ui/button';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { toast } from 'sonner';

const JobDescription = () => {
  const { singleJob } = useSelector((state) => state.job);
  const { user } = useSelector((state) => state.auth);
  const [isApplied, setIsApplied] = useState(false);
  const { id: jobId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setIsApplied(true);
        dispatch(
          setSingleJob({
            ...singleJob,
            applications: [...(singleJob.applications || []), { applicant: user._id }],
          })
        );
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications?.some((app) => app.applicant === user?._id)
          );
        }
      } catch (error) {
        console.error('Failed to fetch job:', error);
      }
    };
    fetchJob();
  }, [jobId, dispatch, user?._id]);

  if (!singleJob) {
    return <div className="text-center py-20 text-gray-500">Loading job details...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6  ">
      {/* Back Button */}
      <Button onClick={() => navigate(-1)} variant="outline" className="mb-4">
        ← Back
      </Button>

      {/* Job Description Card */}
      <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-md space-y-6 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105">
        {/* Header: Logo + Title */}
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 border rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden">
            {singleJob?.company?.logo ? (
              <img
                src={singleJob?.company?.logo}
                alt={singleJob.company.name}
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-xs text-gray-400">no logo</span>
            )}
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-semibold text-[#00366d]">{singleJob.title}</h2>
            <p className="text-sm text-gray-600 mt-1">
              {singleJob?.company?.name} | {singleJob?.company?.location || 'India'}
            </p>
            <div className="mt-3 flex flex-wrap gap-5 text-sm text-gray-700">
              <span className="flex items-center gap-1">
                <IndianRupee size={16} className="text-green-600" />
                {singleJob.salary} LPA
              </span>
              <span className="flex items-center gap-1">
                <Briefcase size={16} className="text-blue-600" />
                {singleJob.jobType}
              </span>
              <span className="flex items-center gap-1">
                <Users size={16} className="text-purple-600" />
                {singleJob.vacancies || 1} Vacancy
              </span>
              <span className="flex items-center gap-1">
                <CalendarDays size={16} className="text-gray-500" />
                Posted {new Date(singleJob.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Apply Button */}
        <div>
          <Button
            onClick={!isApplied ? applyJobHandler : undefined}
            disabled={isApplied}
            className={`mt-2 ${isApplied ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
          >
            {isApplied ? 'Already Applied' : 'Apply Now'}
          </Button>
        </div>

        {/* Job Description */}
        <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line border-t pt-4">
          {singleJob.description}
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
