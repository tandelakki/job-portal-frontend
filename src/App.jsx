
import './App.css'
import React from 'react'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'



import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './components/Home'
import Jobs from './components/Jobs'

import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from './components/admin/AdminJobs'
import PostJobs from './components/admin/PostJobs'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/protectedRoute'






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
    element:<ProtectedRoute><Companies/></ProtectedRoute>

  },{
    path:"/admin/Companies/create",
    element:<ProtectedRoute><CompanyCreate/></ProtectedRoute>

  }
  ,{
    path:"/admin/Companies/:id",
    element:<ProtectedRoute><CompanySetup/></ProtectedRoute>

  }
  ,{
    path:"/admin/Jobs",
    element:<ProtectedRoute><AdminJobs/></ProtectedRoute>

  }
  ,{
    path:"/admin/jobs/create",
    element:<ProtectedRoute><PostJobs/></ProtectedRoute>

  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<ProtectedRoute><Applicants/></ProtectedRoute>

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
