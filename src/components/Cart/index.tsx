"use client";
import React, { useState } from "react";
import Discount from "./Discount";
import OrderSummary from "./OrderSummary";
import { useAppSelector } from "@/redux/store";
import SingleItem from "./SingleItem";
import Breadcrumb from "../Common/Breadcrumb";
import Link from "next/link";
import { selectTotalPrice } from "@/redux/features/cart-slice";
import { useSelector } from "react-redux";
import { homeService } from "@/services/home";
import { useRouter } from "next/navigation";

const Cart = () => {
  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useSelector(selectTotalPrice);

  const [phoneNumber, setphoneNumber] = useState("");
  const [shippingAddress, setshippingAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phoneNumber || !shippingAddress) {
      alert("Vui lòng nhập đầy đủ số điện thoại và địa chỉ.");
      return;
    }

    try {
      setIsSubmitting(true);

      // 👇 Chuẩn bị payload gửi lên API
      const payload = {
        phoneNumber,
        shippingAddress,
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          ageGroup: item.ageGroup || item.ages?.[0] || "", // 👈 lấy size đã chọn (nếu có)
        }))
      };

      // 👇 Gửi request lên backend
      const res = await homeService.createOrder(payload);
      
      if (res.status !== 200 && res.status !== 201) {
        throw new Error(`Checkout failed: ${res.status}`);
      }

      alert("Đặt hàng thành công!");

      router.push("/");
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Có lỗi xảy ra khi đặt hàng!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section>
        <Breadcrumb title={"Giỏ hàng"} pages={["Cart"]} />
      </section>

      {cartItems.length > 0 ? (
        <section className="overflow-hidden py-1 bg-gray-2">
          <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
            <div className="bg-white rounded-[10px] shadow-1">
              <div className="w-full overflow-x-auto">
                <div className="min-w-[1170px]">
                  <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_0.5fr] items-center bg-gray-1 py-4 px-6 font-medium text-dark border-b border-gray-3">
                    <div>Sản phẩm</div>
                    <div className="text-center font-semibold">Đơn giá</div>
                    <div className="text-center font-semibold">Số lượng</div>
                    <div className="text-center font-semibold">Size</div>
                    <div className="text-center font-semibold">Thành tiền</div>
                    <div className="text-right"></div>
                  </div>

                  {cartItems.map((item, key) => (
                    <SingleItem item={item} key={key} />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-11 mt-9">
              <div className="lg:max-w-[670px] w-full">
                <form onSubmit={handleCheckout}>
                  <div className="bg-white shadow-1 rounded-[10px]">
                    <div className="border-b border-gray-3 py-5 px-4 sm:px-5.5 font-bold">
                      <h3>Thông tin giao hàng</h3>
                    </div>
                    <div className="py-8 px-4 sm:px-8.5">
                      <div className="flex flex-wrap gap-4 xl:gap-5.5 py-1">
                        <input
                          type="number"
                          placeholder="Số điện thoại"
                          value={phoneNumber}
                          onChange={(e) => setphoneNumber(e.target.value)}
                          className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:shadow-input focus:ring-2 focus:ring-blue/20"
                        />
                      </div>
                      <div className="flex flex-wrap gap-4 xl:gap-5.5 py-2">
                        <input
                          type="text"
                          placeholder="Địa chỉ"
                          value={shippingAddress}
                          onChange={(e) => setshippingAddress(e.target.value)}
                          className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:shadow-input focus:ring-2 focus:ring-blue/20"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full flex justify-center font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5 ${
                          isSubmitting ? "opacity-60 cursor-not-allowed" : ""
                        }`}
                      >
                        {isSubmitting ? "Đang xử lý..." : "Chốt đơn"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="lg:max-w-[455px] w-full">
                <div className="bg-white shadow-1 rounded-[10px]">
                  <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
                    <h3 className="font-medium text-xl text-dark">
                      Tóm tắt đơn hàng
                    </h3>
                  </div>

                  <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
                    {cartItems.map((item, key) => (
                      <div
                        key={key}
                        className="flex items-center justify-between py-5 border-b border-gray-3"
                      >
                        <p className="text-dark">{item.title}</p>
                        <p className="text-dark text-right">
                          {(item.discountedPrice * item.quantity).toLocaleString(
                            "vi-VN"
                          )}
                          <span className="text-sm align-top">đ</span>
                        </p>
                      </div>
                    ))}

                    <div className="flex items-center justify-between pt-5">
                      <p className="font-medium text-lg text-dark">Tổng tiền</p>
                      <p className="font-medium text-lg text-dark text-right">
                        {totalPrice.toLocaleString("vi-VN")}
                        <span className="text-sm align-top">đ</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
          <div className="text-center mt-8">
            <p className="pb-6">Giỏ hàng của bạn trống!</p>
            <Link
              href="/"
              className="w-96 mx-auto flex justify-center font-medium text-white bg-dark py-[13px] px-6 rounded-md hover:bg-opacity-95"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
