import React from "react";
import { useActivities } from "../features/activities/useActivities";
import ActivityTable from "../features/activities/ActivityTable";

function Activities() {
  const { activities, isLoading, isError } = useActivities();

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4 text-gray-100">Activites</h1>
      <ActivityTable
        activities={activities}
        isLoading={isLoading}
        isError={isError}
      />
    </>
  );
}

export default Activities;
