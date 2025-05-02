import { setSearchedQuery } from "@/redux/jobSlice";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="bg-[#f5f7fa] py-20 px-4 md:px-10 text-center relative overflow-hidden">
      {/* Background Shape (optional) */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#e0ecff] to-[#f5f7fa] -z-10"></div>

      <div className="max-w-5xl mx-auto">
        <span className="inline-block px-6 py-2 rounded-full bg-white shadow text-[#F83002] text-lg font-semibold mb-4">
          India’s No. 1 Job Portal
        </span>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
          Find Your <span className="text-[#6A38C2]">Dream Job</span> Now
        </h1>

        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Search from thousands of jobs from top companies. Apply now and build your career with confidence.
        </p>

        {/* Search Bar */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4">
          <input
            type="text"
            placeholder="Search job title or keywords"
            onChange={(e) => setQuery(e.target.value)}
            className="w-full md:w-[400px] px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6A38C2]"
          />
          <button
            onClick={searchJobHandler}
            className="flex items-center gap-2 px-6 py-3 bg-[#6A38C2] text-white rounded-lg hover:bg-[#5530a0] transition"
          >
            <Search className="h-5 w-5" />
            <span>Search</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
