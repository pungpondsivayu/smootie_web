import React from "react";
import { IPagin } from "../../@types/global";

type Pagin = {
  currentPage: number;
  pageSize: number;
  totalRows: number;
  totalPages: number;
};

type Props = {
  pagin: IPagin;
  onChange: (newPage: number, newPageSize: number) => void;
};

const Pagination: React.FC<Props> = ({ pagin, onChange }) => {
  const { currentPage, pageSize, totalPages } = pagin;
  const pageSizes = [5, 10, 20, 50];
  const pageWindowSize = 5; // number of page buttons visible

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onChange(newPage, pageSize);
    }
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value, 10);
    onChange(1, newSize); // reset to first page
  };

  const getPageRange = () => {
    const half = Math.floor(pageWindowSize / 2);
    let start = Math.max(1, currentPage - half);
    let end = start + pageWindowSize - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - pageWindowSize + 1);
    }

    const range = [];
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  };

  return (
    <div className="flex items-center justify-between mt-4 flex-wrap gap-4">
      {/* Page Size Selector */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700">Show</span>
        <select
          value={pageSize}
          onChange={handlePageSizeChange}
          className="border border-gray-300 rounded-md px-2 py-1 text-sm"
        >
          {pageSizes.map((size) => (
            <option key={size} value={size}>
              {size} rows
            </option>
          ))}
        </select>
      </div>

      {/* Pagination Buttons */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-1 rounded-md text-sm bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          &lt;
        </button>

        {getPageRange().map((page, idx) => (
          <button
            key={`page-${page}-${idx}`}
            onClick={() => handlePageChange(page)}
            className={`w-8 h-8 rounded-md text-sm ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black hover:bg-blue-100"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 rounded-md text-sm bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;