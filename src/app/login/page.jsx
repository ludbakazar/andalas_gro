"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ErrorNotification from "../components/errorNotif";
import Swal from "sweetalert2";

export default function LoginPage() {
  const router = useRouter();
  const [formLogin, setFormLogin] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormLogin({
      ...formLogin,
      [name]: value,
    });
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formLogin),
      });

      const data = await response.json();
      if (!response.ok) {
        return router.push(`/login?error=${data.message}`);
      }
      localStorage.setItem("access_token", data.access_token);
      router.push("/");
    } catch (error) {
      console.log(error);
      await Swal.fire({
        title: "Terjadi Kesalahan",
        text: "Tidak dapat memproses login. Silakan coba lagi nanti.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <fieldset className="fieldset bg-white border-gray-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-black text-3xl">Login</legend>
        <ErrorNotification />

        <label className="label">Username</label>
        <input
          type="text"
          name="username"
          className="input bg-white border-gray-300"
          placeholder="Username"
          value={formLogin.username}
          onChange={handleChange}
        />

        <label className="label">Password</label>
        <input
          type="password"
          name="password"
          className="input bg-white border-gray-300"
          placeholder="Password"
          value={formLogin.password}
          onChange={handleChange}
        />

        <button
          className="btn btn-neutral mt-4"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <div className="flex justify-center items-center gap-2">
              <div
                className="inline-block w-6 h-6 animate-spin rounded-full border-4 border-solid border-t-teal-600 border-r-teal-600 border-b-transparent border-l-transparent"
                style={{
                  borderWidth: "3px",
                  borderTopColor: "#0d9488",
                  borderRightColor: "#0d9488",
                  borderBottomColor: "transparent",
                  borderLeftColor: "transparent",
                }}
              ></div>
              <span className="text-black">Loading...</span>
            </div>
          ) : (
            "Login"
          )}
        </button>
      </fieldset>
    </div>
  );
}
