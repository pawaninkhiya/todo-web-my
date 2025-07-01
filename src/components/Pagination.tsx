import { Icons } from "@assets/icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  className = "",
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    // Show fewer pages on mobile (3 vs 5 on desktop)
    const maxVisiblePages = window.innerWidth < 640 ? 3 : 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = startPage + maxVisiblePages - 1;

      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      // Always show first page if not in range
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push('...');
        }
      }

      // Middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Always show last page if not in range
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push('...');
        }
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className={`flex items-center justify-center my-4 ${className}`}>
      <div className="flex items-center gap-1 sm:gap-2">
        {/* First Page Button - Hidden on mobile to save space */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="hidden sm:flex p-2 rounded-full border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 active:bg-gray-100 transition-colors duration-150"
          aria-label="First page"
        >
          <Icons.ChevronsLeft className="w-4 h-4" />
        </button>
        
        {/* Previous Page Button */}
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="p-2 sm:p-3 rounded-full border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 active:bg-gray-100 transition-colors duration-150"
          aria-label="Previous page"
        >
          <Icons.ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => (
            page === '...' ? (
              <span 
                key={`ellipsis-${index}`} 
                className="px-2 py-1 text-gray-500 select-none text-sm sm:text-base"
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(page as number)}
                className={`
                  w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center
                  text-sm sm:text-base font-medium transition-all duration-150
                  ${currentPage === page
                    ? 'bg-cyan-600 text-white border-cyan-600 shadow-sm'
                    : 'border-gray-300 hover:bg-gray-50 text-gray-700 active:bg-gray-100'
                  }
                `}
              >
                {page}
              </button>
            )
          ))}
        </div>

        {/* Next Page Button */}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="p-2 sm:p-3 rounded-full border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 active:bg-gray-100 transition-colors duration-150"
          aria-label="Next page"
        >
          <Icons.ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        
        {/* Last Page Button - Hidden on mobile to save space */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="hidden sm:flex p-2 rounded-full border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 active:bg-gray-100 transition-colors duration-150"
          aria-label="Last page"
        >
          <Icons.ChevronsRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};