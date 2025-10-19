const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const delta = 1;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) rangeWithDots.push(l + 1);
        else if (i - l > 2) rangeWithDots.push("...");
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center mt-2">
      <ul className="flex items-center gap-1 flex-wrap">
        <li>
          <button
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50 hover:bg-blue hover:text-white"
          >
            {"<"}
          </button>
        </li>

        {pageNumbers.map((num, idx) => (
          <li key={idx}>
            {num === "..." ? (
              <span className="px-3 py-1">...</span>
            ) : (
              <button
                onClick={() => onPageChange(num)}
                className={`px-3 py-1 rounded-md ${
                  typeof num === "number" && num === currentPage
                    ? "bg-blue text-white"
                    : "bg-gray-200 hover:bg-blue hover:text-white"
                }`}
              >
                {num}
              </button>
            )}
          </li>
        ))}

        <li>
          <button
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50 hover:bg-blue hover:text-white"
          >
            {">"}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
