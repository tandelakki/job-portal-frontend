import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Users, IndianRupee } from 'lucide-react';

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`jobs/description/${job._id}`)}
      className="cursor-pointer border border-gray-200 rounded-lg p-4 bg-white hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
    > 
      <div className="flex items-start gap-4">
        {/* Company Logo */}
        <div className="w-14 h-14 flex-shrink-0 border rounded-md bg-gray-50 flex items-center justify-center overflow-hidden">
          {job?.company?.logo ? (
            <img
              src={job.company.logo}
              alt={job.company.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-400 text-xs">No Logo</span>
          )}
        </div>

        {/* Job Content */}
        <div className="flex-1">
          {/* Job Title */}
          <h3 className="text-lg font-semibold text-gray-800 hover:text-[#6A38C2]">
            {job?.title}
          </h3>

          {/* Company Name & Location */}
          <div className="text-sm text-gray-600 mt-1">
            <span className="font-medium text-gray-700">{job?.company?.name}</span> |{' '}
            {job?.company?.location || 'India'}
          </div>

          {/* Salary & Job Type */}
          <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-700">
            <div className="flex items-center gap-1">
              <IndianRupee size={16} className="text-green-600" />
              {job?.salary} LPA
            </div>
            <div className="flex items-center gap-1">
              <Briefcase size={16} className="text-blue-600" />
              {job?.jobType}
            </div>
            <div className="flex items-center gap-1">
              <Users size={16} className="text-purple-600" />
              {job?.vacancies || 1} Vacancy{job?.vacancies > 1 ? 'ies' : ''}
            </div>
          </div>

          {/* Posted Time */}
          <div className="text-xs text-gray-500 mt-3">
            Posted {job?.postedDaysAgo || 2} days ago
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestJobCards;
