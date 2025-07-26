import React from 'react'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { Popover, PopoverContent } from '../popover'
import { Avatar, AvatarImage } from '../avatar'
import { Button } from '../button'
import { LogOut, User2 } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { setUser } from '@/redux/authSlice'

const Navbar = () => {
  const { user } = useSelector(store => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logOutHandler = async () => {
    const logoutUrl = "https://job-portal-backend-1-grrb.onrender.com/api/v1/user/logout"

    try {
      const res = await axios.get(logoutUrl, { withCredentials: true })
      if (res.data.success) {
        toast.success(res.data.message)
        dispatch(setUser(null))
        navigate('/')
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Something went wrong during logout'
      toast.error(errorMessage)
    }
  }

  const navLinkClass = ({ isActive }) =>
    `relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-[#6A38C2] after:transition-all after:duration-300
     ${isActive ? 'text-[#6A38C2] after:w-full' : 'text-gray-700 after:w-0 hover:after:w-full'} px-2 py-1 transition`;

  return (
    <div className="sticky top-0 left-0 w-full bg-white z-30 shadow-md backdrop-blur-md transition-all duration-300">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold text-gray-800">
          job<span className="text-[#f83002]">portal</span>
        </NavLink>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <ul className="flex gap-6 text-sm font-medium">
            {user && user.role === 'recruiter' ? (
              <>
                <li><NavLink to="/admin/Companies" className={navLinkClass}>Companies</NavLink></li>
                <li><NavLink to="/admin/Jobs" className={navLinkClass}>Jobs</NavLink></li>
              </>
            ) : (
              <>
                <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
                <li><NavLink to="/jobs" className={navLinkClass}>Jobs</NavLink></li>
              </>
            )}
          </ul>

          {/* Auth Buttons */}
          {!user ? (
            <div className="flex gap-3">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-[#6A38C2] 
                   ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`
                }
              >
                <Button className="cursor-pointer">
                  Login
                </Button>
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-[#6A38C2] 
                   ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`
                }
              >
                <Button className="cursor-pointer">
                  Sign Up
                </Button>
              </NavLink>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9SRRmhH4X5N2e4QalcoxVbzYsD44C-sQv-w&s"
                    alt={user?.fullname}
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-72 bg-white rounded-xl shadow-lg border p-4 space-y-4">
                <div className="flex gap-3 items-center border-b pb-3">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9SRRmhH4X5N2e4QalcoxVbzYsD44C-sQv-w&s"
                      alt={user?.fullname}
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-base text-gray-800">{user?.fullname}</h4>
                    <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {user.role === "student" && (
                    <NavLink
                      to="/profile"
                      className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md transition"
                    >
                      <User2 className="text-gray-600 w-4 h-4" />
                      <span className="text-sm text-gray-800">View Profile</span>
                    </NavLink>
                  )}
                  <button
                    onClick={logOutHandler}
                    className="flex items-center gap-2 text-sm text-red-600 hover:bg-red-50 p-2 rounded-md w-full text-left transition"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
