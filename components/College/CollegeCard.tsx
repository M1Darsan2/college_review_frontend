import {CollegeType} from "@/type"
import { TrendingDown, TrendingUp, Users } from "lucide-react";
import { useRouter } from "next/navigation";
type Props = {
  colleges: CollegeType[];
};
const CollegeCard = ({colleges}:Props) => {
      const getComplaintRateColor = (rate: number) => {
    if (rate > 35) return "text-red-600 bg-red-50";
    if (rate > 25) return "text-yellow-600 bg-yellow-50";
    return "text-green-600 bg-green-50";
  };
  const router = useRouter();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
  {colleges.map((college, index) => {
    return (
      <div
        key={college._id}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300 hover:border-blue-200 group"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full font-semibold text-base">
              {index + 1}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {college.name}
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Total Reviews
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {college.totalReviews}
            </p>
          </div>

          <div className={`rounded-lg p-3 ${getComplaintRateColor(college.complaintRate)}`}>
            <div className="flex items-center gap-2 mb-1">
              <TrendingDown className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-wide">
                Complaint Rate
              </span>
            </div>
            <p className="text-2xl font-bold">
              {college.complaintRate.toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-xs font-medium text-gray-700">Positive</span>
            </div>
            <span className="text-sm font-semibold text-green-600">{college.positiveCount}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-400 rounded-full" />
              <span className="text-xs font-medium text-gray-700">Neutral</span>
            </div>
            <span className="text-sm font-semibold text-yellow-600">{college.neutralCount}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-red-500" />
              <span className="text-xs font-medium text-gray-700">Negative</span>
            </div>
            <span className="text-sm font-semibold text-red-600">{college.negativeCount}</span>
          </div>

          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Positive Ratio</span>
              <span>
                {college.totalReviews > 0
                  ? `${((college.positiveCount / college.totalReviews) * 100).toFixed(1)}%`
                  : "0.0%"}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-green-500 h-1.5 rounded-full transition-all duration-500"
                style={{
                  width: college.totalReviews > 0
                    ? `${(college.positiveCount / college.totalReviews) * 100}%`
                    : "0%",
                }}
              />
            </div>
          </div>
        </div>

        <div
          onClick={() => router.push(`/colleges/${college._id}`)}
          className="mt-6 pt-4 border-t border-gray-100"
        >
          <button className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors">
            View Details
          </button>
        </div>
      </div>
    );
  })}
</div>
  )
}

export default CollegeCard