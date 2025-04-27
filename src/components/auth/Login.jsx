import React, { useEffect, useState } from 'react'
import Navbar from '../ui/shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '../../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { Loader2 } from 'lucide-react'
import { setLoading, setUser } from '@/redux/authSlice'


const Login = () => {
  const [input, setInput] = useState({

    email: "",
    password: "",
    role: "",

  });
  const {loading, user} = useSelector(state => state.auth);
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
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));

        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
    finally {
      dispatch(setLoading(false));
    }
   
  

  

}
useEffect(() => {
  if(user){
    navigate('/')
  }
},[])



return (
  <div><Navbar />
    <div className="flex justify-center items-center mx-w-7xl mx-auto">
      <form onSubmit={submitHandler} className="w-1/2 border border-gray-200 p-5 rounded-md my-10">
        <h1 className="font-bold text-xl mb-5"> Login</h1>

        <div className="my-2">
          <Label>Email</Label>
          <Input type="text"
            value={input.email}
            name="email"
            onChange={changeEventHandler}
            placeholder="patel" />

        </div>

        <div className="my-2">
          <Label>Password</Label>
          <Input type="text"
            value={input.password}
            name="password"
            onChange={changeEventHandler}
            placeholder="patel" />

        </div>
        <div className="flex items-center justify-between">
          <RadioGroup
            className="flex items-center gap-4 my-5">
            <div className="flex items-center space-x-2">
              <input type="radio" name="role" value="student" checked={input.role === 'student'} onChange={changeEventHandler} className="cursor-pointer" />
              <Label htmlFor="option-one">Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="radio" name="role" value="recruiter" checked={input.role === 'recruiter'} onChange={changeEventHandler} className="cursor-pointer" />


              <Label htmlFor="option-two">Recruiter</Label>
            </div>
          </RadioGroup>


        </div>
        {
          loading ? <Button  className="w-full my-4"> <Loader2 className = "mr-2 h-4 w-4 animate-spin "/> Please wait</Button> :  <Button variant="outline" type="submit" className="w-full my-4 bg-black text-white">Login</Button>
        }

       
        <span className="text-sm">Don't have an account?<Link to="/signup" className="text-blue-600">Signup</Link>
        </span>
      </form>
    </div>
  </div>

)
}


export default Login
