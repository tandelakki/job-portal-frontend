import React from 'react'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { Popover, PopoverContent } from '../popover'
import { Avatar, AvatarImage } from '../avatar'
import { Button } from '../button'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { setUser } from '@/redux/authSlice'

const Navbar = () => {
  const { user } = useSelector(store => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logOutHandler = async () => {
    const logoutUrl = "http://localhost:8000/api/v1/user/logout"

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

  return (
    <div className="sticky top-0 left-0 w-full bg-white z-30 shadow-md backdrop-blur-md transition-all duration-300">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          job<span className="text-[#f83002]">portal</span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <ul className="flex gap-6 text-sm font-medium text-gray-700">
            {user && user.role === 'recruiter' ? (
              <>
                <li><Link to="/admin/companies" className="hover:text-[#6A38C2]">Companies</Link></li>
                <li><Link to="/admin/jobs" className="hover:text-[#6A38C2]">Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/" className="hover:text-[#6A38C2]">Home</Link></li>
                <li><Link to="/jobs" className="hover:text-[#6A38C2]">Jobs</Link></li>
               {/* <li><Link to="/browse" className="hover:text-[#6A38C2]">Browse</Link></li> */}
              </>
            )}
          </ul>

          {/* Auth Buttons */}
          {!user ? (
            <div className="flex gap-3">
              <Link to="/login">
                <Button variant="outline" className="border-[#6A38C2] text-[#6A38C2] hover:bg-[#f1eaff]">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b38a6] text-white">Sign Up</Button>
              </Link>
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
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md transition"
                    >
                      <User2 className="text-gray-600 w-4 h-4" />
                      <span className="text-sm text-gray-800">View Profile</span>
                    </Link>
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
