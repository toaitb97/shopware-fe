"use client";
import React, { useEffect, useState } from "react";
import { ordersService } from "../../services/orders";

interface OrderItem {
  imgUrl: string;
  title: string;
  discountedPrice: number;
  quantity: number;
  subTotal: number;
}

interface Order {
  id: number;
  status: string;
  totalAmount: number;
  shippingAddress: string;
  phoneNumber: string;
  createdAt: string;
  orderItems: OrderItem[];
}

interface ApiResponse {
  items: Order[];
  totalItems: number;
  page: number;
  totalPages: number;
  pageSize: number;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);


  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await ordersService.updateOrderStatus(orderId, newStatus);
      fetchOrders();
    } catch (error) {
      console.error("Failed to update order:", error);
    }
  };
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response: ApiResponse = await ordersService.getPagedOrders(
        page,
        pageSize
      );
      console.log("Orders API response:", response);

      setOrders(response.items || []);
      setTotalPages(response.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, [page, pageSize]);

  if (loading)
    return (
      <p className="p-8 text-gray-500 text-center">Loading orders...</p>
    );

  if (!orders.length)
    return (
      <p className="p-8 text-gray-500 text-center">
        You don&apos;t have any orders.
      </p>
    );

  return (
    
    <section className="overflow-hidden relative pb-20 pt-55 sm:pt-40 md:pt-40 lg:pt-25 bg-[#f3f4f6]">
      <div className="container">
        <div className="flex gap-7.5">
          <div className="space-y-6 p-6 min-h-screen">

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
            Quản lý đơn hàng
          </h1>
            {orders.map((order) => (
              <div
                key={order.id}
                className="border border-gray-200 rounded-2xl shadow-sm p-6 bg-white"
              >
                {/* ===== Cấp 1: Thông tin đơn hàng ===== */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-2">
                  {/* Thông tin order */}
                  <div className="flex flex-col">
                    <p className="text-lg font-semibold text-gray-800">Order #{order.id}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleString("vi-VN")}
                    </p>
                  </div>

                  {/* Status + Total */}
                  <div className="flex flex-col sm:text-left gap-1">
                    <p className="text-sm text-gray-700">
                      <strong>Trạng thái:</strong>{" "}
                      <span
                        style={{
                          color:
                            order.status === "Pending"
                              ? "#ffbf00ff"
                              : order.status === "Completed"
                              ? "#0ba845ff"
                              : "#dc2626",
                        }}
                      >
                        {order.status}
                      </span>
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Tổng đơn hàng :</strong>{" "}
                      <span className="font-semibold text-blue-700">
                        {order.totalAmount.toLocaleString("vi-VN")}₫
                      </span>
                    </p>
                  </div>

                  {/* Buttons */}
                  {order.status === "Pending" && (
                    <div className="flex gap-2 mt-2 sm:mt-0 flex-wrap">
                      <button
                        style={{ backgroundColor: "#09b347ff", color: "white" }}
                        className="px-3 py-1 rounded-md hover:opacity-90 transition"
                        onClick={() => handleUpdateStatus(order.id, "Completed")}
                      >
                        Hoàn thành
                      </button>
                      <button
                        style={{ backgroundColor: "#f80505ff", color: "white" }}
                        className="px-3 py-1 rounded-md hover:opacity-90 transition"
                        onClick={() => handleUpdateStatus(order.id, "Cancelled")}
                      >
                        Hủy bỏ
                      </button>
                    </div>
                  )}
                </div>


                <div className="text-sm text-gray-600 mb-4">
                  <p>
                    <strong>Phone:</strong> {order.phoneNumber}
                  </p>
                  <p>
                    <strong>Address:</strong> {order.shippingAddress}
                  </p>
                </div>

                {/* ===== Cấp 2: Danh sách sản phẩm ===== */}
                <div className="border-t border-gray-100 pt-4 mt-4">
                  <p className="font-semibold mb-3 text-gray-800">Order Items</p>

                  {/* Hiển thị dạng grid nhiều sản phẩm / hàng */}
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl-plus:grid-cols-4 gap-x-7.5 gap-y-9">
                    {order.orderItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col bg-gray-50 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow duration-200"
                      >
                        {/* Hình ảnh sản phẩm */}
                        <div className="w-full h-[150px] md:h-[250px] lg:h-[170px] xl:h-[250px] flex items-center justify-center bg-white">
                          <img
                            src={item.imgUrl}
                            alt={item.title}
                            className="h-full w-full object-cover rounded-md"
                          />
                        </div>

                        {/* Thông tin sản phẩm */}
                        <div className="mt-3">
                          <p className="text-sm font-medium text-gray-800 truncate">
                            {item.title} : {item.quantity}
                          </p>
                          <div className="mt-1">
                            <p className="text-sm text-gray-700">
                              Đơn Giá: {item.discountedPrice.toLocaleString("vi-VN")}₫
                            </p>
                            <p className="text-sm font-semibold text-gray-900">
                              Tổng Tiền: {item.subTotal.toLocaleString("vi-VN")}₫
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}

            {/* ===== Pagination ===== */}
            <div className="flex justify-center items-center space-x-4 mt-6">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className={`px-4 py-2 rounded-lg border ${
                  page === 1
                    ? "text-gray-400 border-gray-200 cursor-not-allowed"
                    : "text-blue-600 border-blue-300 hover:bg-blue-50"
                }`}
              >
                Previous
              </button>
              <span className="text-gray-600">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className={`px-4 py-2 rounded-lg border ${
                  page === totalPages
                    ? "text-gray-400 border-gray-200 cursor-not-allowed"
                    : "text-blue-600 border-blue-300 hover:bg-blue-50"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Orders;
