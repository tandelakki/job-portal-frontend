import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData = [
  {
    title: 'Location',
    data: ['Delhi', 'Bangalore', 'Mumbai', 'Hyderabad', 'Chennai']
  },
  {
    title: 'Job Type',
    data: ['Full Time', 'Part Time', 'Internship', 'Work From Home']
  },
  {
    title: 'Experience',
    data: ['0-1 Years', '1-3 Years', '3-5 Years', '5-10 Years']
  },
  {
    title: 'Salary',
    data: ['0-3 LPA', '3-6 LPA', '6-10 LPA', '10-15 LPA']
  }
]

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('')
  const dispatch = useDispatch()

  const changeHandler = (value) => {
    setSelectedValue(value)
  }

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue))
  }, [selectedValue, dispatch])

  return (
    <div className="bg-white p-5 rounded-lg shadow-lg border border-gray-300">
      <h2 className="text-2xl font-semibold mb-5">Filter Jobs</h2>
      <hr className="mb-4" />

      <RadioGroup onValueChange={(value) => changeHandler(value)} value={selectedValue}>
        {filterData.map((item, index) => (
          <div className="mb-6" key={index}>
            <h3 className="text-lg font-medium text-gray-800">{item.title}</h3>
            <div className="mt-3 space-y-3">
              {item.data.map((data, idx) => {
                const itemId = `${item.title}-${data}`
                return (
                  <div key={idx} className="flex items-center gap-2">
                    <RadioGroupItem value={data} id={itemId} className="text-indigo-600 focus:ring-indigo-500" />
                    <label htmlFor={itemId} className="text-sm text-gray-700">{data}</label>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export default FilterCard
