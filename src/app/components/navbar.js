"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "../assets/logo.png";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const router = useRouter();
  const [userFirstName, setUserFirstName] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const fetchUserFromLocalStorage = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        // You can update this depending on your backend response structure
        const name = user?.user?.name || user?.user || ""; // Fallbacks
        const firstName = name.split(" ")[0];
        setUserFirstName(firstName);
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
      }
    } else {
      setUserFirstName("");
    }
  };

  useEffect(() => {
    fetchUserFromLocalStorage();
  }, []);

  useEffect(() => {
    const handleUserUpdate = () => {
      fetchUserFromLocalStorage();
    };

    window.addEventListener("user-updated", handleUserUpdate);
    return () => window.removeEventListener("user-updated", handleUserUpdate);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUserFirstName("");
    setIsSidebarOpen(false);
    window.dispatchEvent(new Event("user-updated"));
    router.push("/Login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 left-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-3xl font-bold text-green-800 hidden sm:block">Prep</span>
          <Link href="/">
            <Image src={Logo} alt="PrepWinz Logo" width={55} height={55} />
          </Link>
          <span className="text-3xl font-bold text-black hidden sm:block">Winz</span>
        </div>

        <div className="relative">
          {userFirstName ? (
            <>
              <button
                onClick={toggleSidebar}
                className="px-3 h-10 rounded-full text-black text-[17px] flex items-center gap-2 hover:bg-green-100 transition"
              >
                <FaUser />
                <span>{userFirstName}</span>
              </button>

              {isSidebarOpen && (
                <div
                  ref={sidebarRef}
                  className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl z-50 p-2 border border-gray-100"
                >
                  <Link
                    href="/Admin"
                    onClick={() => setIsSidebarOpen(false)}
                    className="block px-4 py-2 text-gray-800 hover:bg-emerald-100 rounded-lg"
                  >
                    Admin Page
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link href="/Login">
              <button className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-3xl hover:scale-105 transition">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
