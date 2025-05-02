import React, { useEffect, useState } from 'react'
import Navbar from './ui/shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux'

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((state) => state.job)
  const [filterJobs, setFilterJobs] = useState([])

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job?.title?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job?.description?.name?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job?.location?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job?.company?.name?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job?.jobType?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job?.salary?.toString().toLowerCase().includes(searchedQuery.toLowerCase())
        )
      })

      setFilterJobs(filteredJobs)
    } else {
      setFilterJobs(allJobs)
    }
  }, [allJobs, searchedQuery])

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
                  <div key={job?._id}>
                    <Job job={job} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Jobs
