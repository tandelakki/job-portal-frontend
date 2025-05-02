import React, { useEffect, useState } from 'react';
import Navbar from '../ui/shared/Navbar';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetCompanyById from '@/hooks/useGetCompanyById';

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: '',
    description: '',
    location: '',
    website: '',
    file: null,
  });

  const { singleCompany } = useSelector((state) => state.company);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', input.name);
    formData.append('description', input.description);
    formData.append('location', input.location);
    formData.append('website', input.website);
    formData.append('file', input.file);

    try {
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/admin/companies');
      } else {
        toast.error(res.data.message || 'Error updating company.');
      }
    } catch (error) {
      toast.error('Error updating company.');
      console.error(error);
    }
  };

  useEffect(() => {
    if (singleCompany && singleCompany.name) {
      setInput({
        name: singleCompany.name || '',
        description: singleCompany.description || '',
        location: singleCompany.location || '',
        website: singleCompany.website || '',
        file: singleCompany.file || null,
      });
    }
  }, [singleCompany]);

  if (!singleCompany || !singleCompany.name) {
    return <p className="text-center mt-10 text-lg">Loading company data...</p>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8 mt-10">
      <Navbar />
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        <div className="flex items-center mb-8">
          <Button
            variant="outline"
            className="flex items-center gap-2 text-gray-600"
            onClick={() => navigate('/admin/companies')}
          >
            <ArrowLeft />
            <span>Back to Companies</span>
          </Button>
          <h1 className="ml-4 text-3xl font-semibold text-gray-900">Company Setup</h1>
        </div>

        <form onSubmit={submitHandler} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Company Name Input */}
            <div>
              <Label className="text-lg font-medium">Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                placeholder="Enter company name"
                className="mt-2"
              />
            </div>

            {/* Description Input */}
            <div>
              <Label className="text-lg font-medium">Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Enter company description"
                className="mt-2"
              />
            </div>

            {/* Website Input */}
            <div>
              <Label className="text-lg font-medium">Website</Label>
              <Input
                type="url"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
                placeholder="Enter company website URL"
                className="mt-2"
              />
            </div>

            {/* Location Input */}
            <div>
              <Label className="text-lg font-medium">Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                placeholder="Enter company location"
                className="mt-2"
              />
            </div>

            {/* File Upload (Logo) */}
            <div>
              <Label className="text-lg font-medium">Company Logo</Label>
              <Input
                type="file"
                name="file"
                accept="image/*"
                onChange={(e) => setInput({ ...input, file: e.target.files[0] })}
                className="mt-2"
              />
            </div>
          </div>

          <div className="flex justify-center">
            {loading ? (
              <Button className="w-full max-w-xs flex items-center justify-center gap-2 bg-gray-800 text-white">
                <Loader2 className="h-4 w-4 animate-spin" />
                Please wait...
              </Button>
            ) : (
              <Button type="submit" className="w-full max-w-xs bg-blue-600 text-white hover:bg-blue-700">
                Update Company
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
