import React, { use, useEffect, useState } from 'react'
import Navbar from '../ui/shared/Navbar'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'


const CompanySetup = () => {

    const params = useParams()
    useGetCompanyById(params.id)
    const [input, setInput] = useState({
        name: "",
        description: "",
        location: "",
        website: "",
        file: null
    });
     
    const {singleCompany} = useSelector((state) => state.company)
    const [loading, setLoading] = useState(false)
    
    const navigate = useNavigate()
    const changeEventHandler = (e) => {
       
        setInput({ ...input, [e.target.name]: e.target.value })
        console.log(input);
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(input)
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("location", input.location);
        formData.append("website", input.website);
        formData.append("file", input.file);

        try {
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData,{
              
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });
           
            if (res.data.success) {
               toast.success(res.data.message)
               navigate("/admin/companies")
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if(singleCompany  && singleCompany.name) {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            location: singleCompany.location || "",
            website: singleCompany.website || "",
            file: singleCompany.file || null
        })
           
    }}
    , [singleCompany])

    if (!singleCompany || !singleCompany.name) {
        return <p className="text-center mt-10">Loading company data...</p>;
      }
      
    

    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto my-10">
                <form onSubmit={submitHandler} >
                    <div className="flex items-center gap-5 p-8">
                        <Button variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold">
                            <ArrowLeft className="" />
                            <span>Back</span>
                        </Button>
                        <h1 className="text-bold text-xl">Company Setup</h1>



                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                             <Label className="text-lg font-semibold">Company Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                            />
                            </div>
                        <div> 
                            <Label className="text-lg font-semibold">Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                            />
                            </div>
                        <div> 
                            <Label className="text-lg font-semibold">Website</Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                            />
                            </div>
                        <div>
                             <Label className="text-lg font-semibold">Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                            </div>
                            <div>
                                <Label className="text-lg font-semibold">Logo</Label>
                            <Input
                                type="file"
                                name="file"
                                accept="image/*"
                                onChange={(e) => setInput({ ...input, file: e.target.files[0] })}
                            
                            />
                            </div>
                            

                    </div>
                     {
                              loading ? <Button  className="w-full my-4"> <Loader2 className = "mr-2 h-4 w-4 animate-spin "/> Please wait</Button> :  <Button variant="outline" type="submit" className="w-full my-4 bg-black text-white">update</Button>
                            }
                    

                </form>
            </div>
        </div>
    )
}

export default CompanySetup