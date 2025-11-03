import { useEffect } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getAllAssets } from "../../services/apiAssets";
import {
  joinRoom,
  leaveRoom,
  listenEvent,
  removeListener,
} from "../../services/socket";

export function useAssets() {
  const queryClient = useQueryClient();

  const {
    data: assets,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["assets"],
    queryFn: getAllAssets,
  });

  useEffect(() => {
    joinRoom("AssetRoom");

    const handleCreated = (newAsset) => {
      queryClient.setQueryData(["assets"], (old) =>
        old ? [...old, newAsset] : [newAsset]
      );
    };

    const handleUpdated = (updatedAsset) => {
      queryClient.setQueryData(["assets"], (old) =>
        old
          ? old.map((a) => (a._id === updatedAsset._id ? updatedAsset : a))
          : []
      );
    };

    const handleDeleted = (deletedAsset) => {
      queryClient.setQueryData(["assets"], (old) =>
        old ? old.filter((a) => a._id !== deletedAsset._id) : []
      );
    };

    listenEvent("asset_created", handleCreated);
    listenEvent("asset_updated", handleUpdated);
    listenEvent("asset_deleted", handleDeleted);

    return () => {
      leaveRoom("AssetRoom");

      removeListener("asset_created", handleCreated);
      removeListener("asset_updated", handleUpdated);
      removeListener("asset_deleted", handleDeleted);
    };
  }, [queryClient]);

  return { assets, isLoading, isError };
}
