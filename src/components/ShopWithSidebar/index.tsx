"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Breadcrumb from "../Common/Breadcrumb";
import CustomSelect from "./CustomSelect";
import AgegroupDropdown from "./AgegroupDropdown";
import GenderDropdown from "./GenderDropdown";
import PriceDropdown from "./PriceDropdown";
import SingleGridItem from "../Shop/SingleGridItem";
import { homeService } from "../../services/home";
import Pagination from "./Pagination";
import { useFilter } from "@/app/context/FilterContext";

const ShopWithSidebar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isFilterOpen } = useFilter();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedAgegroups, setSelectedAgegroups] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedProductTypes, setSelectedProductTypes] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState({ from: 30000, to: 500000 });

  const options = [
    { label: "Latest Products", value: "0" },
    { label: "Best Selling", value: "1" },
    { label: "Old Products", value: "2" },
  ];

  const agegroups = [
    { name: "12 tháng (6-10kg, 74-80cm)", id: 1, isRefined: true },
    { name: "18 tháng (11-12kg, 80-86cm)", id: 2, isRefined: false },
    { name: "2 tuổi (12-13kg, 86-92cm)", id: 3, isRefined: false },
    { name: "2-3 tuổi (13-15kg, 92-98cm)", id: 4, isRefined: false },
    { name: "3-4 tuổi (16-18kg, 98-104cm)", id: 5, isRefined: false },
    { name: "4-5 tuổi (18-20kg, 104-110cm)", id: 6, isRefined: false },
    { name: "5-6 tuổi (21-24kg, 110-116cm)", id: 7, isRefined: false },
    { name: "6-7 tuổi (24-27kg, 116-122cm)", id: 8, isRefined: false },
  ];

  const genders = [
    { name: "Bé trai", id: 2 },
    { name: "Bé gái", id: 3 },
  ];

  const productTypes = [
    { name: "Bộ", id: 1 },
    { name: "Combo", id: 2 },
    { name: "Áo", id: 3 },
    { name: "Quần", id: 4 },
  ];

  const pageSize = 12;

  // Fetch products từ API
  const fetchProducts = async (page = 1) => {
    try {
      setLoading(true);
      const res = await homeService.getPagedProducts(
        selectedGenders,
        selectedProductTypes,
        [],
        selectedAgegroups,
        selectedPrice.from,
        selectedPrice.to,
        page,
        pageSize
      );
      setProducts(res.items || []);
      setTotalPages(res.totalPages || 1);
    } catch (err) {
      console.error("❌ Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  // Khi load trang lần đầu, đọc params từ URL
  useEffect(() => {
    const gendersParam = (searchParams.get("genders") || "")
      .split(",")
      .filter(Boolean)
      .map(Number);
    const productTypesParam = (searchParams.get("productTypes") || "")
      .split(",")
      .filter(Boolean)
      .map(Number);
    const agegroupsParam = (searchParams.get("agegroups") || "")
      .split(",")
      .filter(Boolean)
      .map(Number);
    const minPriceParam = parseInt(searchParams.get("minPrice")) || 30000;
    const maxPriceParam = parseInt(searchParams.get("maxPrice")) || 500000;
    const pageParam = parseInt(searchParams.get("page")) || 1;

    setSelectedGenders(gendersParam);
    setSelectedProductTypes(productTypesParam);
    setSelectedAgegroups(agegroupsParam);
    setSelectedPrice({ from: minPriceParam, to: maxPriceParam });
    setCurrentPage(pageParam);

    fetchProducts(pageParam);
  }, []);

  // Khi đổi page
  const handlePageChange = (page) => {
    setCurrentPage(page);
    pushUrl(page, selectedGenders, selectedProductTypes, selectedAgegroups, selectedPrice);
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchProducts(page);
  };

  // Khi click "Tìm kiếm"
  const handleSearch = () => {
    setCurrentPage(1);
    pushUrl(1, selectedGenders, selectedProductTypes, selectedAgegroups, selectedPrice);
    fetchProducts(1);
  };

  // Khi click "Xóa lọc"
  const handleResetFilter = () => {
    setSelectedGenders([]);
    setSelectedProductTypes([]);
    setSelectedAgegroups([]);
    setSelectedPrice({ from: 30000, to: 500000 });
    setCurrentPage(1);
    pushUrl(1, [], [], [], { from: 30000, to: 500000 });
    fetchProducts(1);
  };

  // Helper push URL
  const pushUrl = (page, genders, productTypes, agegroups, price) => {
    const genderParam = genders.filter(Boolean).join(",");
    const agegroupParam = agegroups.filter(Boolean).join(",");
    router.push(
      `?page=${page}&genders=${genderParam}&productTypes=${productTypes}&agegroups=${agegroupParam}&minPrice=${price.from}&maxPrice=${price.to}`,
      { scroll: false }
    );
  };

  return (
    <section className="overflow-hidden relative pb-20 pt-5 lg:pt-20 xl:pt-28 bg-[#f3f4f6]">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="flex gap-7.5">
          {/* Sidebar */}
          <div
            className={`sidebar-content fixed xl:z-1 z-9999 left-0 top-0 xl:translate-x-0 xl:static max-w-[310px] xl:max-w-[270px] w-full ease-out duration-200 ${
              isFilterOpen
                ? "translate-x-0 bg-white p-5 h-screen overflow-y-auto"
                : "-translate-x-full"
            }`}
          >
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-6">
                <div className="bg-white shadow-1 rounded-lg py-4 px-5">
                  <div className="flex items-center justify-between">
                    <p style={{ fontFamily: "Arial, sans-serif" }}>Bộ lọc:</p>
                    <button
                      type="button"
                      className="text-blue text-sm"
                      style={{ fontFamily: "Arial, sans-serif" }}
                      onClick={handleSearch}
                    >
                      Tìm kiếm
                    </button>
                    <button
                      type="button"
                      className="text-red text-sm"
                      style={{ fontFamily: "Arial, sans-serif" }}
                      onClick={handleResetFilter}
                    >
                      Xóa lọc
                    </button>
                  </div>
                </div>
                <AgegroupDropdown
                  agegroups={agegroups}
                  selectedAgegroups={selectedAgegroups}
                  setSelectedAgegroups={setSelectedAgegroups}
                />
                <GenderDropdown
                  name="Phân loại"
                  genders={productTypes}
                  selectedGenders={selectedProductTypes}
                  setSelectedGenders={setSelectedProductTypes}
                />
                <GenderDropdown
                  name="Giới tính"
                  genders={genders}
                  selectedGenders={selectedGenders}
                  setSelectedGenders={setSelectedGenders}
                />
                <PriceDropdown
                  selectedPrice={selectedPrice}
                  setSelectedPrice={setSelectedPrice}
                />
              </div>
            </form>
          </div>

          {/* Content */}
          <div className="xl:max-w-[870px] w-full">
            <div className="rounded-lg bg-white shadow-1 pl-3 pr-2.5 py-2.5 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap items-center gap-4">
                  <CustomSelect options={options} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-7.5 gap-y-9 pt-30 lg:pt-0">
              {products.map((item, key) => (
                <SingleGridItem item={item} key={key} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-10">
              <div className="bg-white shadow-1 rounded-md p-2">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopWithSidebar;
