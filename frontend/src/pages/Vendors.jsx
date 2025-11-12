import React from "react";

import { useVendors } from "../features/vendors/useVendors";
import VendorTable from "../features/vendors/VendorTable";

function Vendors() {
  const { vendors, isLoading, isError } = useVendors();

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4 text-gray-100">Vendors</h1>
      <VendorTable vendors={vendors} isLoading={isLoading} isError={isError} />
    </>
  );
}

export default Vendors;
