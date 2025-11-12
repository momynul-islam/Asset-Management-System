import React from "react";

function StatCard({ title, value }) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-gray-50 dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow">
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
        {title}
      </div>
      <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        {value ?? 0}
      </div>
    </div>
  );
}

export default StatCard;
