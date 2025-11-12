import React from "react";

import Spinner from "../../components/Spinner";
import ActivityDescriptionCell from "./ActivityDescriptionCell";
import { format } from "date-fns";

function ActivityTable({ activities, isLoading, isError }) {
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center py-10">
        Error loading activities.
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-lg shadow-lg bg-gray-900 text-gray-100">
        <table className="min-w-full divide-y divide-gray-700 text-sm">
          <thead className="bg-gray-800 sticky top-0">
            <tr>
              {[
                "Date",
                "Type",
                "Asset Serial",
                "User Id",
                "Department Code",
                "Vendor Code",
                "Performed By",
                "Description",
              ].map((title) => (
                <th
                  key={title}
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-300"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {activities.length === 0 && (
              <tr>
                <td colSpan={10} className="text-center py-10 text-gray-400">
                  No activity records found.
                </td>
              </tr>
            )}

            {activities.map((activity) => (
              <tr key={activity._id} className="hover:bg-gray-800 transition">
                <td className="px-6 py-4 tracking-wider">
                  {activity.date
                    ? format(
                        new Date(activity.date).toISOString().split("T")[0],
                        "dd MMM yy"
                      )
                    : "-"}
                </td>

                <td className="px-6 py-4">
                  {activity.type ? (
                    <span className="px-2 py-1 rounded-full bg-indigo-600 text-xs font-semibold text-white">
                      {activity.type}
                    </span>
                  ) : (
                    "-"
                  )}
                </td>

                <td className="px-6 py-4">
                  {activity.assetSerialNumber || "-"}
                </td>

                <td className="px-6 py-4 ">{activity.userId || "-"}</td>

                <td className="px-6 py-4">{activity.departmentCode || "-"}</td>

                <td className="px-6 py-4">{activity.vendorCode || "-"}</td>

                <td className="px-6 py-4">{activity.performedBy || "-"}</td>

                <td className="px-6 py-4">
                  <ActivityDescriptionCell description={activity.description} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ActivityTable;
