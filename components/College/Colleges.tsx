"use client"
import React, { useEffect, useState } from 'react'
import { useDebounce } from '../hooks/useDebounce';
import axios from 'axios';
import { BASE_API_URL } from '@/server';
import { handleRequest } from '@/lib/apiRequest';
import { ChevronDown, ChevronUp, Loader } from 'lucide-react';
import TotalStats from './TotalStats';
import CollegeCard from './CollegeCard';
type SortField = "complaintRate" | "totalReviews";
type SortOrder = "asc" | "desc";
const Colleges = () => {
      const [sortField, setSortField] = useState<SortField>("complaintRate");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [colleges, setColleges] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(6);

  const [totalColleges, setTotalColleges] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearch = useDebounce(searchQuery, 500); 

  const [totalStats, setTotalStats] = useState({
    averageComplaintRate: 0,
    totalColleges: 0,
    totalReviews: 0,
  });
    useEffect(() => {
    const fetchTotalStats = async () => {
      const totalStatesReq = async () =>
        await axios.get(`${BASE_API_URL}/colleges/total-stats`);
      const result = await handleRequest(totalStatesReq);
      if (result) {
        setTotalStats(result?.data?.data.stats);
      }
    };
    fetchTotalStats();
  }, []);

    const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
    useEffect(() => {
    const getCollegeStats = async () => {
      const sortParam =
        sortField === "totalReviews"
          ? `reviews_${sortOrder}`
          : `complaints_${sortOrder}`;

      const collegeStatsReq = async () =>
        await axios.get(`${BASE_API_URL}/colleges/stats`, {
          params: {
            page,
            limit,
            sort: sortParam,
            search: debouncedSearch,
          },
        });
      const result = await handleRequest(collegeStatsReq, setIsLoading);

      if (result) {
        // console.log(result);

        setColleges(result.data.data.colleges);

        setTotalColleges(result.data.totalColleges);
      }
    };

    getCollegeStats();
  }, [limit, page, sortField, sortOrder, debouncedSearch]);

  const getSortIcon = (field: SortField) => {
    if (field !== sortField) return null;
    return sortOrder === "desc" ? (
      <ChevronUp className="w-4 h-4 ml-1" />
    ) : (
      <ChevronDown className="w-4 h-4 ml-1" />
    );
  };

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder(field === "complaintRate" ? "desc" : "desc");
    }
  };
  const isLastPage = page * limit >= totalColleges;
  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-12 mt-16 mb-8">
  <div>
    <h1 className="text-3xl font-bold text-gray-900 mb-1">College Statistics</h1>
    <p className="text-gray-500 text-sm">Detailed performance metrics based on student reviews</p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 mb-8">
    <TotalStats title="Total Colleges" type="colleges" value={totalStats.totalColleges} />
    <TotalStats title="Total Reviews" type="reviews" value={totalStats.totalReviews} />
    <TotalStats title="Average Complaint Rate" type="complaints" value={`${totalStats.averageComplaintRate}%`} />
  </div>

  <div className="mt-12">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">College Performance Rankings</h2>
        <p className="text-gray-500 text-sm">Click on metrics to sort colleges</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Search colleges..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white text-gray-900 placeholder-gray-400 rounded-lg px-4 py-2.5 text-sm outline-none border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
        />
        <button
          onClick={() => handleSort("complaintRate")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            sortField === "complaintRate"
              ? "bg-blue-50 text-blue-600 border border-blue-200"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Complaint Rate {getSortIcon("complaintRate")}
        </button>
        <button
          onClick={() => handleSort("totalReviews")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            sortField === "totalReviews"
              ? "bg-blue-50 text-blue-600 border border-blue-200"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Total Reviews {getSortIcon("totalReviews")}
        </button>
      </div>
    </div>

    {isLoading && (
      <div className="flex justify-center py-12">
        <Loader className="w-6 h-6 animate-spin text-blue-500" />
      </div>
    )}
    {!isLoading && <CollegeCard colleges={colleges} />}

    <div className="mt-8 flex justify-center items-center gap-4">
      <button
        onClick={() => { setPage((prev) => Math.max(prev - 1, 1)); scrollToTop(); }}
        disabled={page === 1}
        className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
      >
        Previous
      </button>
      <span className="text-gray-700 text-sm font-medium">Page {page}</span>
      <button
        onClick={() => { setPage((prev) => prev + 1); scrollToTop(); }}
        disabled={isLastPage}
        className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
</div>
  )
}

export default Colleges