"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Orders from "@/components/Orders";

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const expiry = localStorage.getItem("tokenExpiry");

    if (!token || !expiry || Date.now() > Number(expiry)) {
      router.push("/signin");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) return null; // tránh render Orders khi chưa xác thực

  return (
    <Orders />
  );
}
