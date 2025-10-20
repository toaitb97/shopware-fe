import Home from "@/components/Home";
import ShopWithSidebar from "@/components/ShopWithSidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "taphoaxuatdu",
  description: "taphoaxuatdu",
  // other metadata
};

export default function HomePage() {
  return (
    <>
      <ShopWithSidebar/>
    </>
  );
}
