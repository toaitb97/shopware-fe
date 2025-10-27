"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import CustomSelect from "./CustomSelect";
import { useAppSelector } from "@/redux/store";
import { useSelector } from "react-redux";
import { selectTotalPrice } from "@/redux/features/cart-slice";
import { useCartModalContext } from "@/app/context/CartSidebarModalContext";
import Image from "next/image";
import { useFilter } from "@/app/context/FilterContext";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { openCartModal } = useCartModalContext();

  const product = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useSelector(selectTotalPrice);
  const { isFilterOpen, toggleFilter } = useFilter();

  const handleOpenCartModal = () => {
    openCartModal();
  };


  useEffect(() => {
  }, []);


  const options = [
    { label: "tất cả độ tuổi", value: "0" },
    { label: "12 tháng", value: "1" },
    { label: "18 tháng", value: "2" },
    { label: "2 tuổi", value: "3" },
    { label: "2/3 tuổi", value: "4" },
    { label: "3/4 tuổi", value: "5" },
    { label: "4/5 tuổi", value: "6" },
    { label: "6/7 tuổi", value: "7" },
    { label: "7/8 tuổi", value: "8" },
  ];

  return (
    <>
      <header
        className={"fixed left-0 top-0 w-full z-[9999] bg-white transition-all ease-in-out shadow"}
      >
        <div className="container">
          {/* <!-- header top start --> */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center xl:justify-between gap-6 py-6">
            {/* <!-- header top left --> */}
            <div className="flex flex-col sm:flex-row w-full md:w-1/2 sm:justify-between sm:items-center gap-5 sm:gap-10">
              <Link className="flex-shrink-0" href="/">
                <Image
                  src="/images/logo/logo2.svg"
                  alt="Logo"
                  width={219}
                  height={36}
                  className="object-contain !h-[36px] !w-auto"
                />
              </Link>

              <div className="max-w-[475px] w-full">
                <form>
                  <div className="flex items-center" style={{ fontFamily: 'Arial, sans-serif'}}>
                    <CustomSelect options={options} />

                    <div className="relative max-w-[333px] min-w-[233px]">
                      {/* <!-- divider --> */}
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 inline-block w-px h-5.5 bg-gray-4"></span>
                      <input
                        onChange={(e) => setSearchQuery(e.target.value)}
                        value={searchQuery}
                        type="search"
                        name="search"
                        id="search"
                        placeholder="I am shopping for..."
                        autoComplete="off"
                        className="custom-search w-full rounded-r-[5px] bg-gray-1 !border-l-0 border border-gray-3 py-2.5 pl-4 pr-10 outline-none ease-in duration-200"
                      />

                      <button
                        id="search-btn"
                        aria-label="Search"
                        className="flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2 ease-in duration-200 hover:text-blue"
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.2687 15.6656L12.6281 11.8969C14.5406 9.28123 14.3437 5.5406 11.9531 3.1781C10.6875 1.91248 8.99995 1.20935 7.19995 1.20935C5.39995 1.20935 3.71245 1.91248 2.44683 3.1781C-0.168799 5.79373 -0.168799 10.0687 2.44683 12.6844C3.71245 13.95 5.39995 14.6531 7.19995 14.6531C8.91558 14.6531 10.5187 14.0062 11.7843 12.8531L16.4812 16.65C16.5937 16.7344 16.7343 16.7906 16.875 16.7906C17.0718 16.7906 17.2406 16.7062 17.3531 16.5656C17.5781 16.2844 17.55 15.8906 17.2687 15.6656ZM7.19995 13.3875C5.73745 13.3875 4.38745 12.825 3.34683 11.7844C1.20933 9.64685 1.20933 6.18748 3.34683 4.0781C4.38745 3.03748 5.73745 2.47498 7.19995 2.47498C8.66245 2.47498 10.0125 3.03748 11.0531 4.0781C13.1906 6.2156 13.1906 9.67498 11.0531 11.7844C10.0406 12.825 8.66245 13.3875 7.19995 13.3875Z"
                            fill=""
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* <!-- header top right --> */}
            <div className="flex w-full lg:w-auto items-center gap-7.5">
              <div className="flex items-center gap-2.5">
                <img src="/images/header/contact.svg" alt="Contact" className="w-7 h-7" />
                <div>
                  {/* Chỉ hiện “Tư vấn 24/7” trên xl */}
                  <span className="hidden xl:block text-2xs text-dark-4 uppercase">
                    Tư vấn 24/7
                  </span>

                  {/* SĐT luôn hiện, nhưng font nhỏ trên mobile */}
                  <p className="font-medium text-custom-sm text-dark text-[10px] sm:text-custom-sm whitespace-nowrap">
                    0971 688 677
                  </p>
                </div>
              </div>

              {/* <!-- divider --> */}
              <span className="hidden xl:block w-px h-7.5 bg-gray-4"></span>

              <div className="flex w-full lg:w-auto justify-between items-center gap-5">
                <div className="flex items-center gap-5">
                  <Link href="" className="flex items-center gap-2.5">
                    <img src="/images/header/account.svg" alt="Account" className="w-7 h-7" />

                    <div>
                      <span className="block text-2xs text-dark-4 uppercase">
                        account
                      </span>
                      <p className="font-medium text-custom-sm text-dark">
                        Sign In
                      </p>
                    </div>
                  </Link>

                  <button
                    onClick={handleOpenCartModal}
                    className="flex items-center gap-2.5"
                  >
                    <span className="inline-block relative">
                      <img src="/images/header/cart.svg" alt="Cart" className="w-8 h-8" />
                      <span className="flex items-center justify-center font-medium text-2xs absolute -right-2 -top-2.5 bg-blue w-4.5 h-4.5 rounded-full text-white">
                        {product.length}
                      </span>
                    </span>

                    <div>
                      <span className="block text-2xs text-dark-4 uppercase">
                        GIỎ HÀNG
                      </span>
                      <p className="font-medium text-custom-sm text-dark">
                        {totalPrice.toLocaleString("vi-VN")}đ
                      </p>
                    </div>
                  </button>
                </div>

                {/* <!-- Hamburger Toggle BTN --> */}
                <button
                  id="Toggle"
                  aria-label="Toggler"
                  className="lg:hidden block"
                  onClick={() => toggleFilter()}
                >
                  <span className="block relative cursor-pointer w-5.5 h-5.5">
                    <span className="du-block absolute right-0 w-full h-full">
                      <span
                        className={`block relative top-0 left-0 bg-dark rounded-sm w-0 h-0.5 my-1 ease-in-out duration-200 delay-[0] ${
                          !isFilterOpen && "!w-full delay-300"
                        }`}
                      ></span>
                      <span
                        className={`block relative top-0 left-0 bg-dark rounded-sm w-0 h-0.5 my-1 ease-in-out duration-200 delay-150 ${
                          !isFilterOpen && "!w-full delay-400"
                        }`}
                      ></span>
                      <span
                        className={`block relative top-0 left-0 bg-dark rounded-sm w-0 h-0.5 my-1 ease-in-out duration-200 delay-200 ${
                          !isFilterOpen && "!w-full delay-500"
                        }`}
                      ></span>
                    </span>

                    <span className="block absolute right-0 w-full h-full rotate-45">
                      <span
                        className={`block bg-dark rounded-sm ease-in-out duration-200 delay-300 absolute left-2.5 top-0 w-0.5 h-full ${
                          !isFilterOpen && "!h-0 delay-[0] "
                        }`}
                      ></span>
                      <span
                        className={`block bg-dark rounded-sm ease-in-out duration-200 delay-400 absolute left-0 top-2.5 w-full h-0.5 ${
                          !isFilterOpen && "!h-0 dealy-200"
                        }`}
                      ></span>
                    </span>
                  </span>
                </button>
                {/* //   <!-- Hamburger Toggle BTN --> */}
              </div>
            </div>
          </div>
          {/* <!-- header top end --> */}
        </div>
      </header>
    </>
  );
};

export default Header;
