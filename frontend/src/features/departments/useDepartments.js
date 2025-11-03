import { useEffect } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getAllDepartments } from "../../services/apiDepartments";
import {
  joinRoom,
  leaveRoom,
  listenEvent,
  removeListener,
} from "../../services/socket";

export function useDepartments() {
  const queryClient = useQueryClient();

  const {
    data: departments,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["departments"],
    queryFn: getAllDepartments,
  });

  useEffect(() => {
    joinRoom("DepartmentRoom");

    const handleCreated = (newDept) => {
      queryClient.setQueryData(["departments"], (old) =>
        old ? [...old, newDept] : [newDept]
      );
    };

    const handleUpdated = (updatedDept) => {
      queryClient.setQueryData(["departments"], (old) =>
        old ? old.map((d) => (d._id === updatedDept._id ? updatedDept : d)) : []
      );
    };

    const handleDeleted = (deletedDepartment) => {
      queryClient.setQueryData(["departments"], (old) =>
        old ? old.filter((d) => d._id !== deletedDepartment._id) : []
      );
    };

    listenEvent("department_created", handleCreated);
    listenEvent("department_updated", handleUpdated);
    listenEvent("department_deleted", handleDeleted);

    return () => {
      leaveRoom("DepartmentRoom");

      removeListener("department_created", handleCreated);
      removeListener("department_updated", handleUpdated);
      removeListener("department_deleted", handleDeleted);
    };
  }, [queryClient]);

  return { departments, isLoading, isError };
}
