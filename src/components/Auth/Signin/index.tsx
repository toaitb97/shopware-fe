"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "../../../services/auth";
import Breadcrumb from "@/components/Common/Breadcrumb";

const Signin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const res = await authService.login({ email, password });
    console.log("Login success:", res.data);

    const { accessToken, refreshToken, expiresIn, tokenType } = res.data;

    // Lưu token vào localStorage
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("tokenType", tokenType);
    localStorage.setItem(
      "tokenExpiry",
      (Date.now() + expiresIn * 1000).toString()
    );

    // Chuyển hướng sang trang admin
    router.push("/admin");
  } catch (err) {
    console.error("Login error:", err);
    setError("Sai email hoặc mật khẩu");
  } finally {
    setLoading(false);
  }
};



  return (
    <>
      <Breadcrumb title={"Signin"} pages={["Signin"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
            <div className="text-center mb-11">
              <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark mb-1.5">
                Sign In to Your Account
              </h2>
              <p>Enter your detail below</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label htmlFor="email" className="block mb-2.5">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                  required
                />
              </div>

              <div className="mb-5">
                <label htmlFor="password" className="block mb-2.5">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="on"
                  className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                  required
                />
              </div>

              {error && <p className="text-red-500 text-center mb-3">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center font-medium text-white bg-dark py-3 px-6 rounded-lg ease-out duration-200 hover:bg-blue mt-7.5"
              >
                {loading ? "Signing in..." : "Sign in to account"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
