"use client"

import { Reviews } from "@/type";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react"
import { useDebounce } from "../hooks/useDebounce";
import { handleRequest } from "@/lib/apiRequest";
import { BASE_API_URL } from "@/server";
import axios from "axios";
import { Filter, Loader } from "lucide-react";
import ReviewCard from "@/components/Review/ReviewCard"

const Review = () => {
  const [college, setCollege] = useState("");
  const [vibe, setVibe] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [reviews, setReviews] = useState<Reviews[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const debouncedCollege = useDebounce(college, 500);
  const debouncedSearch = useDebounce(search, 500);

  const fetchReviews = useCallback(async () => {
    const reviewReq = async () =>
      await axios.get(`${BASE_API_URL}/reviews/all`, {
        params: {
          collegeName: debouncedCollege,
          vibe,
          search: debouncedSearch,
          sort,
          page,
        },
      });
    const result = await handleRequest(reviewReq, setIsLoading);
    if (result?.data.status === "success") {
      setReviews(result.data.data.reviews);
      setTotalPages(result.data.totalPages);
    }
  }, [debouncedCollege, vibe, debouncedSearch, sort, page]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);
//   console.log(search)
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reviews</h1>
          <p className="text-gray-500 mt-1 text-sm">Feedback and Experiences</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-sm font-medium text-gray-700">College</label>
            <input
              type="text"
              value={college}
              onChange={(e) => { setCollege(e.target.value); setPage(1); }}
              placeholder="College name"
              className="w-full bg-white text-gray-900 placeholder-gray-400 rounded-lg px-4 py-2.5 text-sm outline-none border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-sm font-medium text-gray-700">Vibe</label>
            <select
              value={vibe}
              onChange={(e) => { setVibe(e.target.value); setPage(1); }}
              className="w-full bg-white text-gray-700 rounded-lg px-4 py-2.5 text-sm outline-none border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="">All</option>
              <option value="positive">Positive</option>
              <option value="neutral">Neutral</option>
              <option value="negative">Negative</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-sm font-medium text-gray-700">Search</label>
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search reviews..."
              className="w-full bg-white text-gray-900 placeholder-gray-400 rounded-lg px-4 py-2.5 text-sm outline-none border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Public Reviews</h2>
            <p className="text-sm text-gray-500">Showing {reviews.length} reviews</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={sort}
                onChange={(e) => { setSort(e.target.value); setPage(1); }}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
            <button
              onClick={() => router.push("/share-story")}
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
            >
              Write Review
            </button>
          </div>
        </div>
        {isLoading && (
          <div className="flex justify-center py-12">
            <Loader className="w-6 h-6 animate-spin text-blue-500" />
          </div>
        )}
        {!isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reviews.length === 0 ? (
              <p className="text-gray-500 text-sm col-span-2 text-center py-12">No reviews found.</p>
            ) : (
              reviews.map((review) => (
                <ReviewCard key={review._id} review={review}/>
              ))
            )}
          </div>
        )}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mb-8">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  page === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Review;