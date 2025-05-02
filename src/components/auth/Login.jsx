import React, { useEffect, useState } from 'react'
import Navbar from '../ui/shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Loader2 } from 'lucide-react'
import { setLoading, setUser } from '@/redux/authSlice'

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading, user } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const backendUrl = "http://localhost:8000/api/v1/user/login";

      const res = await axios.post(backendUrl, input, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An unexpected error occurred.");
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-20">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-white rounded-xl shadow-md p-8 space-y-6"
        >
          <h1 className="text-2xl font-semibold text-center text-gray-800">Login to Your Account</h1>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
            <Input
              id="email"
              name="email"
              type="text"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Enter your email"
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Enter your password"
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Select Role</Label>
            <RadioGroup className="flex gap-6 mt-2">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  className="accent-blue-600"
                />
                <Label className="text-gray-600 text-sm">Student</Label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                  className="accent-blue-600"
                />
                <Label className="text-gray-600 text-sm">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            {loading ? (
              <Button disabled className="w-full bg-blue-600 text-white hover:bg-blue-700">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
                Login
              </Button>
            )}
          </div>

          <p className="text-sm text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
