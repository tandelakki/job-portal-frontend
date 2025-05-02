import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="bg-[#f9f9f9] py-12 px-4 md:px-10">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
          Latest <span className="text-[#6A38C2]">Job Openings</span>
        </h2>

        {allJobs.length <= 0 ? (
          <p className="text-center text-gray-600">No jobs available at the moment.</p>
        ) : (
          <div className="flex flex-col gap-5">
            {allJobs.slice(0, 6).map((job) => (
              <LatestJobCards key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
