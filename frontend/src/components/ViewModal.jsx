import React from "react";

function getNestedValue(obj, path) {
  return path.split(".").reduce((acc, key) => acc?.[key], obj) || "—";
}

function formatLabel(field) {
  // Take only the part before the dot
  const mainField = field.split(".")[0];
  // Convert camelCase to spaced
  return mainField.replace(/([A-Z])/g, " $1");
}

const ViewModal = ({
  title = "Details",
  data = {},
  fields = [],
  closeModal,
}) => {
  if (!data) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
      <div className="bg-gray-900 text-gray-100 rounded-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-700 sticky top-0 bg-gray-900">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-200 text-2xl font-bold"
          >
            &times;
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {fields.map((field) => (
            <div
              key={field}
              className="border border-gray-700 rounded-md p-4 bg-gray-800"
            >
              <p className="text-sm text-gray-400 capitalize">
                {formatLabel(field)}
              </p>
              <p className="text-base font-medium mt-1 wrap-break-word">
                {getNestedValue(data, field)}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-end p-6 border-t border-gray-700 sticky bottom-0 bg-gray-900">
          <button
            onClick={closeModal}
            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
