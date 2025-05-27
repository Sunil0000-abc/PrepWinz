"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "../assets/logo.png";
import { useRouter } from "next/navigation";



const Navbar = () => {

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
              className="object-contain"
            />
          </Link>
          <span className="text-3xl font-bold text-black hidden sm:block">
            Winz
          </span>
        </div>

        <div className="flex items-center">
          <Link href="/Login" passHref>
            <button
              type="button"
              className="px-6 py-2 cursor-pointer bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold rounded-3xl shadow-lg hover:from-green-700 hover:to-emerald-600 transform hover:scale-105 transition duration-300 ease-in-out"
            >
              Login
            </button >
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
