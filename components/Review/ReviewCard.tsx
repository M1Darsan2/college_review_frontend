"use client"
import {Reviews} from "@/type"
import { Calendar, ChevronDown, ChevronUp, User } from "lucide-react"
import React, { useState } from 'react'
type Props = {
    review:Reviews
}
const ReviewCard = ({review}:Props) => {
      const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 50;
  const shouldShowSeeMore = review?.story?.length > maxLength;
  // console.log(review);
  const getVibeColor = (vibe: string) => {
    switch (vibe) {
      case "positive":
        return "text-green-700 bg-green-100 border-green-200";
      case "negative":
        return "text-red-700 bg-red-100 border-red-200";
      default:
        return "text-yellow-700 bg-yellow-100 border-yellow-200";
    }
  };

  const displayContent =
    shouldShowSeeMore && !isExpanded
      ? review.story.substring(0, maxLength) + "..."
      : review.story;
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300 hover:border-blue-200">
  
  {/* Header */}
  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-3">
    <div className="flex items-center gap-3 flex-wrap">
      <h3 className="text-lg font-semibold text-gray-900">
        {review.collegeName}
      </h3>
      <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getVibeColor(review.vibe)}`}>
        {review.vibe}
      </span>
    </div>
  </div>

  {/* Review Title */}
  <h4 className="text-base font-semibold text-gray-800 mb-3 leading-relaxed">
    {review.title}
  </h4>

  {/* Review Content */}
  <div className="mb-5">
    <p className="text-gray-600 text-sm leading-relaxed">
      {displayContent}
    </p>
    {shouldShowSeeMore && (
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-3 flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
      >
        <span>{isExpanded ? "See Less" : "See More"}</span>
        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
    )}
  </div>

  {/* Footer */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-100 gap-2">
    <div className="flex items-center gap-2 text-gray-600">
      <User className="w-4 h-4 text-blue-500" />
      <span className="text-sm font-medium">
        {review?.name || review?.anonymousId}
      </span>
    </div>
    <div className="flex items-center gap-2 text-gray-400 text-sm">
      <Calendar className="w-4 h-4" />
      <span>
        {new Date(review.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </span>
    </div>
  </div>

  {/* Actions */}
  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
    <div className="hidden sm:flex items-center gap-4">
      <button className="flex items-center gap-1.5 text-gray-500 hover:text-blue-600 transition-colors text-sm font-medium">
        <span>👍</span> Helpful
      </button>
      <button className="flex items-center gap-1.5 text-gray-500 hover:text-red-500 transition-colors text-sm font-medium">
        <span>🚩</span> Report
      </button>
    </div>
    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
      View College Profile
    </button>
  </div>

</div>
  )
}

export default ReviewCard

