import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import {
  MdNavigateNext,
  MdNavigateBefore,
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from "react-icons/md";

interface PaginationProps {
  pageCount: number;
  onPageChange: (selected: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pageCount, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (data: { selected: number }) => {
    setCurrentPage(data.selected);
    onPageChange(data.selected);
  };

  const isAtStart = currentPage === 0;
  const isAtEnd = currentPage === pageCount - 1;

  return (
    pageCount > 1 && (
      <div className="pagination-container">
        {/* Nút chuyển về trang đầu */}
        <button
          onClick={() => handlePageChange({ selected: 0 })}
          className={`pagination__link first-page ${
            isAtStart ? "text-[#a4a4a4]" : "text-customBlue"
          }`}
          disabled={isAtStart}
        >
          <MdKeyboardDoubleArrowLeft />
        </button>

        {/* Nút Previous */}
        <button
          onClick={() => handlePageChange({ selected: currentPage - 1 })}
          className={`pagination__link prev-pagination ${
            isAtStart ? "text-[#a4a4a4]" : "text-customBlue"
          }`}
          disabled={isAtStart}
        >
          <MdNavigateBefore />
        </button>

        <ReactPaginate
          previousLabel={""}
          nextLabel={""}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          forcePage={currentPage} // Đảm bảo trang hiện tại luôn được cập nhật
          containerClassName={"pagination"}
          activeClassName={"active"}
          previousClassName={`pagination__link prev-pagination ${
            isAtStart ? "disabled" : ""
          }`}
          nextClassName={`pagination__link next-pagination ${
            isAtEnd ? "disabled" : ""
          }`}
          pageClassName={"pagination__page"}
        />

        {/* Nút Next */}
        <button
          onClick={() => handlePageChange({ selected: currentPage + 1 })}
          className={`pagination__link next-pagination ${
            isAtEnd ? "text-[#a4a4a4]" : "text-customBlue"
          }`}
          disabled={isAtEnd}
        >
          <MdNavigateNext />
        </button>

        {/* Nút chuyển đến trang cuối */}
        <button
          onClick={() => handlePageChange({ selected: pageCount - 1 })}
          className={`pagination__link last-page ${
            isAtEnd ? "text-[#a4a4a4]" : "text-customBlue" 
          }`}
          disabled={isAtEnd}
        >
          <MdKeyboardDoubleArrowRight />
        </button>
      </div>
    )
  );
};

export default Pagination;
