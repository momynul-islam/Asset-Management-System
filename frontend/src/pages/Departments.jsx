import React from "react";

import { useDepartments } from "../features/departments/useDepartments";
import DepartmentTable from "../features/departments/DepartmentTable";

function Departments() {
  const { departments, isLoading, isError } = useDepartments();

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4 text-gray-100">Departments</h1>
      <DepartmentTable
        departments={departments}
        isLoading={isLoading}
        isError={isError}
      />
    </>
  );
}

export default Departments;
