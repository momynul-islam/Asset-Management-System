import { useState } from "react";

import { FaExchangeAlt } from "react-icons/fa";

function ActivityDescriptionCell({ description }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="relative group cursor-pointer">
        <span
          onClick={() => setOpen(true)}
          className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-500"
        >
          <FaExchangeAlt className="text-indigo-600" />
        </span>

        {/* <div className="absolute right-0 top-full z-10 hidden w-64 rounded-md bg-gray-800 text-white text-xs p-2 group-hover:block shadow-lg">
          {description}
        </div> */}
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-[450px] shadow-lg">
            <h3 className="text-lg font-semibold mb-3">Change Details</h3>
            <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line max-h-[300px] overflow-y-auto">
              {description}
            </div>
            <div className="mt-4 text-right">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ActivityDescriptionCell;
