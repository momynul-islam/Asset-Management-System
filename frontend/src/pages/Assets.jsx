import React from "react";

import { useAssets } from "../features/assets/useAssets";
import AssetTable from "../features/assets/AssetTable";

function Assets() {
  const { assets, isLoading, isError } = useAssets();

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4 text-gray-100">Assets</h1>
      <AssetTable assets={assets} isLoading={isLoading} isError={isError} />
    </>
  );
}

export default Assets;
