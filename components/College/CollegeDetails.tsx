"use client"
import { handleRequest } from '@/lib/apiRequest';
import { BASE_API_URL } from '@/server';
import { CollegeType } from '@/type';
import axios from 'axios';
import { Building2, Loader, TrendingDown, TrendingUp, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import ReviewCard from '../Review/ReviewCard';
type Props = {
  id: string;
};

const CollegeDetails = ({id}:Props) => {
    const [college, setCollege] = useState<CollegeType>();
  const [isLoading, setIsLoading] = useState(false);

  const total = college?.totalReviews || 0;

  const positivePercent =
    total === 0 ? 0 : ((college?.positiveCount || 0) / total) * 100;

  const neutralPercent =
    total === 0 ? 0 : ((college?.neutralCount || 0) / total) * 100;

  const negativePercent =
    total === 0 ? 0 : ((college?.negativeCount || 0) / total) * 100;

  const getComplaintRateColor = (rate: number) => {
    if (rate > 35) return "text-red-600 bg-red-50 border-red-200";
    if (rate > 25) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-green-600 bg-green-50 border-green-200";
  };

  useEffect(() => {
    const fetchCollegeDetails = async () => {
      const collegeDetailsReq = async () =>
        await axios.get(`${BASE_API_URL}/colleges/${id}`);
      const result = await handleRequest(collegeDetailsReq, setIsLoading);
      if (result) {
        setCollege(result.data.data.college);
      }
    };
    fetchCollegeDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center flex-col">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }
  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-12 mt-16 mb-8">
  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">
    <div className="flex items-center gap-4">
      <div className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-xl">
        <Building2 className="w-6 h-6" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900">{college?.name}</h2>
    </div>
  </div>

  <div>
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Performance Metrics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Total Reviews</span>
          </div>
          <p className="text-2xl font-bold text-blue-900">{college?.totalReviews}</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-800">Positive Reviews</span>
          </div>
          <p className="text-2xl font-bold text-green-900">{college?.positiveCount}</p>
          <p className="text-sm text-green-700">{positivePercent.toFixed(2)}% of total</p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 bg-yellow-400 rounded-full" />
            <span className="text-sm font-medium text-yellow-800">Neutral Reviews</span>
          </div>
          <p className="text-2xl font-bold text-yellow-900">{college?.neutralCount}</p>
          <p className="text-sm text-yellow-700">{neutralPercent.toFixed(2)}% of total</p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-5 h-5 text-red-600" />
            <span className="text-sm font-medium text-red-800">Negative Reviews</span>
          </div>
          <p className="text-2xl font-bold text-red-900">{college?.negativeCount}</p>
          <p className="text-sm text-red-700">{negativePercent}% of total</p>
        </div>
      </div>
    </div>

    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Complaint Rate Analysis</h3>
      <div className={`rounded-xl p-6 border ${getComplaintRateColor(college?.complaintRate || 0)}`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-3xl font-bold">{college?.complaintRate.toFixed(1)}%</p>
            <p className="text-sm font-medium">Current Complaint Rate</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">
              {(college?.complaintRate ?? 0) <= 20 ? "Excellent"
                : (college?.complaintRate ?? 0) <= 30 ? "Good"
                : (college?.complaintRate ?? 0) <= 40 ? "Fair"
                : "Needs Improvement"}
            </p>
            <p className="text-sm">Performance Rating</p>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${
              (college?.complaintRate ?? 0) <= 20 ? "bg-green-500"
                : (college?.complaintRate ?? 0) <= 30 ? "bg-yellow-500"
                : "bg-red-500"
            }`}
            style={{ width: `${Math.min(college?.complaintRate ?? 0, 100)}%` }}
          />
        </div>
        <p className="text-xs text-gray-600">
          Industry average: 25-35% | Excellent: &lt;20% | Good: 20-30% | Fair: 30-40%
        </p>
      </div>
    </div>

    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Distribution</h3>
      <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-4">
        {[
          { label: "Positive Reviews", percent: positivePercent, color: "bg-green-500" },
          { label: "Neutral Reviews", percent: neutralPercent, color: "bg-yellow-400" },
          { label: "Negative Reviews", percent: negativePercent, color: "bg-red-500" },
        ].map(({ label, percent, color }) => (
          <div key={label} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 ${color} rounded-full`} />
              <span className="text-sm font-medium text-gray-700">{label}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32 bg-gray-200 rounded-full h-1.5">
                <div className={`${color} h-1.5 rounded-full transition-all duration-500`} style={{ width: `${percent}%` }} />
              </div>
              <span className="text-sm font-semibold text-gray-900 w-12 text-right">
                {Number(percent).toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">All Reviews</h3>
      {(!college?.reviews || college.reviews.length === 0) && (
        <p className="text-gray-500 text-sm text-center py-12">No reviews available for this college.</p>
      )}
      {college?.reviews && college.reviews.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {college.reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      )}
    </div>
  </div>
</div>
  )
}

export default CollegeDetails