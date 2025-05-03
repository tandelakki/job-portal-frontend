
import './App.css'
import React from 'react'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'



import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './components/Home'
import Jobs from './components/Jobs'

import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/companySetup'
import AdminJobs from './components/admin/AdminJobs'
import PostJobs from './components/admin/PostJobs'
import Applicants from './components/admin/Applicants'






const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/login",
    element:<Login/>
  },

 {
    path:"/signup",
    element:<Signup/>
  },
  {
    path:"/jobs",
    element:<Jobs/>

  },
  {
    path:"/jobs/description/:id",
    element:<JobDescription/>

  },
 
  {
    path:"/profile",
    element:<Profile/>

  },
  {
    path:"/admin/Companies",
    element:<protectedRoute><Companies/></protectedRoute>

  },{
    path:"/admin/companies/create",
    element:<protectedRoute><CompanyCreate/></protectedRoute>

  }
  ,{
    path:"/admin/companies/:id",
    element:<protectedRoute><CompanySetup/></protectedRoute>

  }
  ,{
    path:"/admin/jobs",
    element:<protectedRoute><AdminJobs/></protectedRoute>

  }
  ,{
    path:"/admin/jobs/create",
    element:<protectedRoute><PostJobs/></protectedRoute>

  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<protectedRoute><Applicants/></protectedRoute>

  }
])

function App() {
  

  return (
    <>
      
      <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
