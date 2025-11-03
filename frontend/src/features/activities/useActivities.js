import { useEffect } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getAllActivities } from "../../services/apiActivities";
import {
  joinRoom,
  leaveRoom,
  listenEvent,
  removeListener,
} from "../../services/socket";

export function useActivities() {
  const queryClient = useQueryClient();

  const {
    data: activities,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["activities"],
    queryFn: getAllActivities,
  });

  useEffect(() => {
    joinRoom("ActivityRoom");

    const handleCreated = (newActivity) => {
      queryClient.setQueryData(["activities"], (old) =>
        old ? [...old, newActivity] : [newActivity]
      );
    };

    listenEvent("activity_created", handleCreated);

    return () => {
      leaveRoom("ActivityRoom");

      removeListener("activity_created", handleCreated);
    };
  }, [queryClient]);

  return { activities, isLoading, isError };
}
