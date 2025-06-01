"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "../assets/logo.png";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const Navbar = () => {
  const router = useRouter();
  const [userInitial, setUserInitial] = useState("");
  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user?.name) {
          setUserInitial(user.name.charAt(0).toUpperCase());
        }
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
      }
    }
  }, []);

  // Optional logout function: clears user and reloads page
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUserInitial("");
    router.push("/Login"); // redirect to login after logout
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

        <div className="flex items-center">
          {userInitial ? (
            // Show user initial with a logout on click
            <button
              onClick={handleLogout}
              title="Logout"
              className="w-10 h-10 rounded-full bg-green-600 text-white text-xl font-bold flex items-center justify-center select-none cursor-pointer hover:bg-green-700 transition"
            >
              {userInitial}
            </button>
          ) : (
            // Show login button when no user
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
