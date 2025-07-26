import React, { useState } from "react";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    if (query.trim() === "") return; // optional: prevent empty searches
    dispatch(setSearchedQuery(query.trim()));
    navigate("/jobs");
  };

  return (
    <div className="bg-[#f5f7fa] py-20 px-4 md:px-10 text-center relative overflow-hidden">
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
        <div className="mt-8 relative max-w-3xl mx-auto">
          <input
            type="text"
            placeholder="Search job title or keywords"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchJobHandler();
              }
            }}
            className="w-full h-14 pl-4 pr-32 rounded-lg border border-gray-300 shadow-sm text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-[#6A38C2]"
          />

          <button
            onClick={searchJobHandler}
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#6A38C2] hover:bg-[#5530a0] text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-colors duration-200 uppercase tracking-wide"
          >
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              <span>Search</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
