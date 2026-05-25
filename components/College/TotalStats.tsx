import { BarChart3, Building2, TrendingDown } from 'lucide-react';
import React from 'react'
type Props = {
  type: "colleges" | "reviews" | "complaints";
  title: string;
  value: string | number;
};
const TotalStats = ({ type, title, value }: Props)=> { const getIcon = () => {
    switch (type) {
      case "colleges":
        return <Building2 className="w-8 h-8 text-blue-600" />;
      case "reviews":
        return <BarChart3 className="w-8 h-8 text-green-600" />;
      case "complaints":
        return <TrendingDown className="w-8 h-8 text-red-600" />;
      default:
        return null;
    }
  };
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
  <div className="flex items-start justify-between">
    <div>
      <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
    <div className="shrink-0">{getIcon()}</div>
  </div>
</div>
  )
}

export default TotalStats