import React, { useEffect, useState } from 'react';
import Navbar from '../ui/shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '../../utils/constant';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';

const Signup = () => {
  const [input, setInput] = useState({
    fullname: '',
    email: '',
    password: '',
    role: '',
    phoneNumber: '',
    file: ''
  });

  const navigate = useNavigate();
  const { loading, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(input).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/login');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate('/');
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex justify-center items-center py-12">
        <form onSubmit={submitHandler} className="bg-white rounded-xl shadow-lg w-full max-w-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Your Account</h2>

          <div className="space-y-4">
            <div>
              <Label className="block mb-1">Full Name</Label>
              <Input
                type="text"
                name="fullname"
                value={input.fullname}
                onChange={changeEventHandler}
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label className="block mb-1">Email</Label>
              <Input
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <Label className="block mb-1">Phone Number</Label>
              <Input
                type="text"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                placeholder="+91 9876543210"
              />
            </div>
            <div>
              <Label className="block mb-1">Password</Label>
              <Input
                type="password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                placeholder="••••••••"
              />
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 my-4">
              <div className="flex items-center gap-4">
                <Label className="mr-2">You are a</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="role"
                      value="student"
                      checked={input.role === 'student'}
                      onChange={changeEventHandler}
                      className="accent-blue-600"
                    />
                    <span>Student</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="role"
                      value="recruiter"
                      checked={input.role === 'recruiter'}
                      onChange={changeEventHandler}
                      className="accent-blue-600"
                    />
                    <span>Recruiter</span>
                  </label>
                </div>
              </div>

              <div>
                <Label className="block mb-1">Profile Picture</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                  className="cursor-pointer"
                />
              </div>
            </div>

            {loading ? (
              <Button className="w-full mt-4" disabled>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating account...
              </Button>
            ) : (
              <Button type="submit" className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                Sign Up
              </Button>
            )}

            <p className="text-center text-sm mt-4">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
