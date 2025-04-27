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
//{ type: 'SET_SELECTED_VALUE', payload: selectedValue }
const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('')
  const dispatch = useDispatch()

  const changeHandler = (value) => {
    setSelectedValue(value)
    

  }
 useEffect(() => {
   dispatch(setSearchedQuery(selectedValue))
 }, [selectedValue])


  return (
    <div>
      <h1>Filter Jobs</h1>
      <hr className="mt-3 "/> 
      <RadioGroup onValueChange={(value) => changeHandler(value)} value={selectedValue}>
        {
          filterData.map((item, index) => (
            <div  className="mt-4"  key={index}>
              <h1 className="text-lg font-bold">{item.title}</h1>
              <div className="mt-2">
                {
                  item.data.map((data, idx) => {
                    const itemId = `${item.title}-${data}`
                  return (
                    <div  key={idx} className="flex items-center gap-2">
                    <RadioGroupItem value={data} id={itemId} />
                      <label htmlFor={itemId}>{data}</label>
                    </div>
                  )
                  }


                   
                  )
                }
                
                
              </div>
            </div>
          ))
        }
      </RadioGroup>

    </div>
  )
}

export default FilterCard