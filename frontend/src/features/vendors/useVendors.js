import { useEffect } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getAllVendors } from "../../services/apiVendors";
import {
  joinRoom,
  leaveRoom,
  listenEvent,
  removeListener,
} from "../../services/socket";

export function useVendors() {
  const queryClient = useQueryClient();

  const {
    data: vendors,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["vendors"],
    queryFn: getAllVendors,
  });

  useEffect(() => {
    joinRoom("VendorRoom");

    const handleCreated = (newVendor) => {
      queryClient.setQueryData(["vendors"], (old) =>
        old ? [...old, newVendor] : [newVendor]
      );
    };

    const handleUpdated = (updatedVendor) => {
      queryClient.setQueryData(["vendors"], (old) =>
        old
          ? old.map((v) => (v._id === updatedVendor._id ? updatedVendor : v))
          : []
      );
    };

    const handleDeleted = (deletedVendor) => {
      queryClient.setQueryData(["vendors"], (old) =>
        old ? old.filter((v) => v._id !== deletedVendor._id) : []
      );
    };

    listenEvent("vendor_created", handleCreated);
    listenEvent("vendor_updated", handleUpdated);
    listenEvent("vendor_deleted", handleDeleted);

    return () => {
      leaveRoom("VendorRoom");

      removeListener("vendor_created", handleCreated);
      removeListener("vendor_updated", handleUpdated);
      removeListener("vendor_deleted", handleDeleted);
    };
  }, [queryClient]);

  return { vendors, isLoading, isError };
}
