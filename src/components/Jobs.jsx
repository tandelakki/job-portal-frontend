import React, { useEffect, useState } from 'react';
import Navbar from './ui/shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((state) => state.job);
  const [filterJobs, setFilterJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchedQuery && typeof searchedQuery === 'object') {
      const filteredJobs = allJobs.filter((job) => {
        const {
          location,
          jobType,
          experience,
          salary,
        } = searchedQuery;

        return (
          (!location || job.location?.toLowerCase() === location.toLowerCase()) &&
          (!jobType || job.jobType?.toLowerCase() === jobType.toLowerCase()) &&
          (!experience || parseInt(job.experience) >= parseInt(experience)) &&
          (!salary || parseInt(job.salary) >= parseInt(salary))
        );
      });

      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  const handleJobClick = (jobId) => {
    navigate(`/jobs/description/${jobId}`);
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-6 pt-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-5">
          {/* FilterCard section */}
          <div className="w-full sm:w-1/4 lg:w-1/5">
            <FilterCard />
          </div>

          {/* Jobs List Section */}
          <div className="flex-1">
            {filterJobs.length <= 0 ? (
              <span>No Jobs Found</span>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filterJobs.map((job) => (
                  <div
                    key={job._id}
                    onClick={() => handleJobClick(job._id)}
                    className="cursor-pointer rounded-lg hover:shadow-lg transition-shadow"
                  >
                    <Job job={job} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
