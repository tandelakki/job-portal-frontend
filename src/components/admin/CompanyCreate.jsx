import React, { useState } from 'react';
import Navbar from '../ui/shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState('');
  const [file, setFile] = useState(null);  // File handling (if you need it)
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));  // Dispatch the company to the store
        toast.success(res?.data?.message);  // Show success toast
        navigate(`/admin/companies/${res?.data?.company?._id}`);  // Redirect to the company profile page
      } else {
        toast.error(res?.data?.message || 'Something went wrong.');  // Show error message from backend
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Something went wrong.');  // Error handling from API
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <Navbar />
      <div className="max-w-3xl mx-auto mt-12 bg-white p-8 rounded-lg shadow">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Create Your Company Profile
        </h1>
        <p className="text-gray-600 mb-6">
          Enter your company name to get started with posting jobs.
        </p>

        <div className="space-y-4">
          {/* Company Name Input */}
          <div>
            <Label htmlFor="companyName" className="text-gray-700 font-medium">
              Company Name
            </Label>
            <Input
              id="companyName"
              type="text"
              placeholder="e.g. Infosys, Amazon, etc."
              className="mt-2"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          {/* Buttons for canceling or continuing */}
          <div className="flex justify-end gap-4 mt-6">
            <Button
              variant="outline"
              onClick={() => navigate('/admin/companies')}
              className="border-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={registerNewCompany}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
