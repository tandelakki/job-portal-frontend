import { PopoverTrigger } from '@radix-ui/react-popover'

import React from 'react'
import { Popover, PopoverContent } from '../popover'
import { Avatar } from '../avatar'
import { AvatarImage } from '../avatar'
import { Button } from '../button'
import { LogOut, User, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { setUser } from '@/redux/authSlice'
import { USER_API_END_POINT } from '@/utils/constant'

const Navbar = () => {

    
    const {user} = useSelector(store=>store.auth);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logOutHandler =async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, {
                withCredentials: true
            })
            if (res.data.success) {
                toast.success(res.data.message)
                dispatch(setUser(null))
                navigate("/")
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
            
        }
    }
    return (
        <div className="bg-white">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
                <div>
                    <h1 className="text-2xl font-bold">job<span className="text-[#f83002]">portalS</span></h1>
                </div>
                <div className="flex items-center gap-5">
                    <ul className="flex font-medium items-center gap-5">
                        {
                            user && user.role === "recruiter" ? (
                                <>
                                    <li><Link to="/admin/companies">companies</Link></li>
                                    <li><Link to="/admin/jobs">jobs</Link></li>
                                </>
                            ) : (
                                <>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/jobs">Jobs</Link></li>
                                <li><Link to="/browse">Browse</Link></li>
        
                                </>
                            )
                        }
                       
                    </ul>
                    {
                        !user ? (
                            <div className="flex gap-5 ">
                              <Link to="/login"> <Button variant="outline"className="cursor-pointer">Login</Button></Link> 
                                <Link to="/signup"><Button variant="solid" className="bg-[#6A38C2] hover:bg-[#5b38a6] cursor-pointer">Sign Up</Button></Link>
                            </div>
                        ) : (  <Popover >
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9SRRmhH4X5N2e4QalcoxVbzYsD44C-sQv-w&s" alt="@shadcn" />
    
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div className="flex gap-4 space-y-2">
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9SRRmhH4X5N2e4QalcoxVbzYsD44C-sQv-w&s" alt="@shadcn" />
                                    </Avatar>
    
                                    <div>
                                        <h4 className="font-medium">{user?.fullname}</h4>
                                        <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                                    </div>
    
                                </div>
                                <div className="flex flex-col text-grey-600 my-2">
                                    {
                                        user && user.role === "student" &&  (
                                            <div className="flex w-fit items-center gap-2 cursor-pointer">
                                            <User2 />
                                            <Button variant="link"><Link to="/profile"> View Profile</Link></Button>
        
                                        </div>

                                        )  


                                    }
                                   
                                    
                                    <div  className="flex w-fit items-center gap-2 cursor-pointer">
                                        <LogOut />
                                        <Button variant="link" onClick={logOutHandler}> Log Out</Button>
    
    
                                    </div>
    
    
    
                                </div>
    
    
                            </PopoverContent>
                        </Popover>)
                    }
                  
                </div>
            </div>

        </div>
    )
}

export default Navbar