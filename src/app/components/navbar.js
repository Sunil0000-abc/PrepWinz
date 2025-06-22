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

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user?.name) {
          const firstName = user.name.split(" ")[0];
          setUserFirstName(firstName);
        }
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
      }
    }
  }, []);

  // Close sidebar when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
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
    router.push("/Login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 left-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-3xl font-bold text-green-800 hidden sm:block">
            Prep
          </span>
          <Link href="/">
            <Image
              src={Logo}
              alt="PrepWhiaz Logo"
              width={55}
              height={55}
              className="object-contain cursor-pointer"
            />
          </Link>
          <span className="text-3xl font-bold text-black hidden sm:block">
            Winz
          </span>
        </div>

        <div className="relative">
          {userFirstName ? (
            <>
              <button
                onClick={toggleSidebar}
                title="Menu"
                className="px-3 h-10 rounded-full text-black text-[17px] flex items-center gap-2 select-none cursor-pointer hover:bg-green-100 transition"
              >
                <FaUser />
                <span>{userFirstName}</span>
              </button>

              {isSidebarOpen && (
                <div
                  ref={sidebarRef}
                  className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl z-50 p-2 animate-dropdown border border-gray-100"
                >
                  <Link
                    href="/Admin"
                    className="flex items-center gap-2 px-4 py-2 text-gray-800 rounded-lg hover:bg-emerald-100 active:bg-emerald-200 focus:bg-emerald-100 transition duration-200"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-emerald-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M13 5v6m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Admin Page
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5"
                      />
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link href="/Login" passHref>
              <button
                type="button"
                className="px-6 py-2 cursor-pointer bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold rounded-3xl shadow-lg hover:from-green-700 hover:to-emerald-600 transform hover:scale-105 transition duration-300 ease-in-out"
              >
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
