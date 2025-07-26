import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

// Structured filters with label and value
const filterData = [
  {
    title: 'Location',
    key: 'location',
    data: [
      { label: 'Delhi', value: 'Delhi' },
      { label: 'Bangalore', value: 'Bangalore' },
      { label: 'Mumbai', value: 'Mumbai' },
      { label: 'Hyderabad', value: 'Hyderabad' },
      { label: 'Chennai', value: 'Chennai' },
    ]
  },
  {
    title: 'Job Type',
    key: 'jobType',
    data: [
      { label: 'Full Time', value: 'Full Time' },
      { label: 'Part Time', value: 'Part Time' },
      { label: 'Internship', value: 'Internship' },
      { label: 'Work From Home', value: 'Work From Home' },
    ]
  },
 
  {
    title: 'Salary',
    key: 'salary',
    data: [
      { label: '4 LPA', value: 4 },
      { label: '6 LPA', value: 6 },
      { label: '8 LPA', value: 8 },
      { label: '10 LPA', value: 10 },
      { label: '12 LPA', value: 12 },
      { label: '15 LPA', value: 15 },
    ]
  }
]

const FilterCard = () => {
  const dispatch = useDispatch()
  const [selectedFilters, setSelectedFilters] = useState({})

  const handleChange = (key, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [key]: value
    }))
  }

  useEffect(() => {
    dispatch(setSearchedQuery(selectedFilters))
  }, [selectedFilters, dispatch])

  return (
    <div className="bg-white p-5 rounded-lg shadow-lg border border-gray-300">
      <h2 className="text-2xl font-semibold mb-5">Filter Jobs</h2>
      <hr className="mb-4" />

      {filterData.map((filterGroup, index) => (
        <div className="mb-6" key={index}>
          <h3 className="text-lg font-medium text-gray-800 mb-2">{filterGroup.title}</h3>

          <RadioGroup
            value={selectedFilters[filterGroup.key]?.toString() || ''}
            onValueChange={(val) => handleChange(filterGroup.key, val)}
          >
            <div className="space-y-3 mt-2">
              {filterGroup.data.map((item, idx) => {
                const itemId = `${filterGroup.title}-${item.label}`
                return (
                  <div key={idx} className="flex items-center gap-2">
                    <RadioGroupItem
                      id={itemId}
                      value={item.value.toString()}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor={itemId} className="text-sm text-gray-700">
                      {item.label}
                    </label>
                  </div>
                )
              })}
            </div>
          </RadioGroup>
        </div>
      ))}
    </div>
  )
}

export default FilterCard
