"use client"; // Đảm bảo sử dụng client-side rendering

import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination"; // Thành phần phân trang của bạn
import { MdOutlineEdit, MdOutlineDelete } from "react-icons/md";
import UpdateStockModal from "@/components/dashboard/UpdateStockModel";
import { Stock } from "@/types/stock";
import { token } from "../../utils/getToken";
import AddStockForm from "@/components/dashboard/AddStockForm";

export default function StockPage() {
  const [stocks, setStocks] = useState<Stock[]>([]); // Dữ liệu stocks
  const [searchTerm, setSearchTerm] = useState(""); // Tìm kiếm theo tên sản phẩm hoặc ID sản phẩm
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái modal thêm stock
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [editingStockId, setEditingStockId] = useState<number | null>(null); // Trạng thái chỉnh sửa stock

  // Fetch danh sách stocks
  const fetchStocks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/stocks",
        {
          headers: {
                      "Authorization": `Bearer ${token}`,
                      "Content-Type": "application/json",
                    },
                    next: { revalidate: 60 },
        }
      ); // Thay đổi URL API của bạn
      if (!response.ok) throw new Error("Failed to fetch stocks");
      const data: Stock[] = await response.json();
      setStocks(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  
  // Lọc stock theo tên sản phẩm hoặc ID sản phẩm
  const filteredStocks = stocks.filter(
    (stock) =>
      stock.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.product_id.toString().includes(searchTerm.toLowerCase())
  );

  // Số trang phân trang
  const pageCount = Math.ceil(filteredStocks.length / 10);

  const handlePageClick = (selected: number) => setCurrentPage(selected);

  // Lấy stocks hiển thị cho trang hiện tại
  const displayedStocks = filteredStocks.slice(
    currentPage * 10,
    (currentPage + 1) * 10
  );

  // Xử lý xóa stock
  const handleDelete = async (stockId: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/stocks/${stockId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        next: { revalidate: 60 },
      });
      if (response.ok) {
        setStocks(stocks.filter((stock) => stock.stock_id !== stockId));
      } else {
        console.error("Failed to delete stock");
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="rounded-sm relative border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5 flex justify-between items-center">
        <h4 className="text-2xl font-semibold text-black dark:text-white">Stocks</h4>
        <button
          onClick={() => {
            setIsModalOpen(true);
          }}
          className="bg-[#1c2434] text-white px-4 py-2 rounded-md hover:opacity-95 transition"
        >
          Add New Stock
        </button>
      </div>

      {/* Tìm kiếm */}
      <div className="px-4 py-2">
        <label>Search by Product Name or ID</label>
        <input
          type="text"
          placeholder="Search stock..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-lg p-2 w-full"
        />
      </div>

      {/* Bảng danh sách stocks */}
      <div className="grid grid-cols-12 border-t bg-[#1c2434] text-[#fff] border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-10 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center font-medium">No.</div>
        <div className="col-span-4 flex items-center font-medium">Product Name</div>
        <div className="col-span-3 flex items-center font-medium">Location</div>
        <div className="col-span-2 flex items-center font-medium">Available Stock</div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Update</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Delete</p>
        </div>
      </div>

      {/* Hiển thị danh sách stock */}
      {displayedStocks.map((stock, index) => (
        <div
          key={stock.stock_id}
          className="grid grid-cols-12 border-t border-stroke px-4 py-8 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5"
        >
          <div className="col-span-1 flex items-center text-sm text-black dark:text-white">
            {index + 1 + currentPage * 10}
          </div>
          <div className="col-span-4 flex items-center text-sm text-black dark:text-white truncate w-[200px]">
            {stock.product_name}
          </div>
          <div className="col-span-3 flex items-center text-sm text-black dark:text-white">
            {stock.location}
          </div>
          <div className="col-span-2 flex items-center text-sm text-black dark:text-white">
            {stock.available_stock}
          </div>
          <div className="col-span-1 flex items-center">
            <button
              className="text-[#4250cf] border border-[#4250cf] px-2 py-1 rounded-md hover:opacity-90 text-[22px]"
              onClick={() => {
                setEditingStockId(stock.stock_id);
                setIsUpdateModalOpen(true);
              }}
            >
              <MdOutlineEdit />
            </button>
          </div>
          <div className="col-span-1 flex items-center">
            <button
              className="text-[#fa3232] border border-[#fa3232] px-2 py-1 rounded-md hover:opacity-90 text-[22px]"
              onClick={() => handleDelete(stock.stock_id)}
            >
              <MdOutlineDelete />
            </button>
          </div>
        </div>
      ))}

      <Pagination pageCount={pageCount} onPageChange={handlePageClick} />


      {/* Modal thêm stock */}
      {isModalOpen && (
          <AddStockForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onStockAdded={() => {
                  fetchStocks();
                  setIsModalOpen(false);
                }}
              />
            )}
      {/* Modalcập nhật stock */}
      {isUpdateModalOpen && (
        <UpdateStockModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          onStockUpdated={() => {
            fetchStocks();
            setIsUpdateModalOpen(false);
          }} 
          stockIdToUpdate={editingStockId} 
        />
      )}
    </div>
  );
}
