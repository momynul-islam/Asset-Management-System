import { useEffect } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getAllUsers } from "../../services/apiUsers";
import {
  joinRoom,
  leaveRoom,
  listenEvent,
  removeListener,
} from "../../services/socket";

export function useUsers() {
  const queryClient = useQueryClient();

  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  useEffect(() => {
    joinRoom("UserRoom");

    const handleCreated = (newUser) => {
      queryClient.setQueryData(["users"], (old) =>
        old ? [...old, newUser] : [newUser]
      );
    };

    const handleUpdated = (updatedUser) => {
      queryClient.setQueryData(["users"], (old) =>
        old ? old.map((u) => (u._id === updatedUser._id ? updatedUser : u)) : []
      );
    };

    const handleDeleted = (deletedUser) => {
      queryClient.setQueryData(["users"], (old) =>
        old ? old.filter((u) => u._id !== deletedUser._id) : []
      );
    };

    listenEvent("user_created", handleCreated);
    listenEvent("user_updated", handleUpdated);
    listenEvent("user_deleted", handleDeleted);

    return () => {
      leaveRoom("UserRoom");

      removeListener("user_created", handleCreated);
      removeListener("user_updated", handleUpdated);
      removeListener("user_deleted", handleDeleted);
    };
  }, [queryClient]);

  return {
    users,
    isLoading,
    isError,
  };
}
