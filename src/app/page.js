"use client";
import { useRouter } from "next/navigation";

import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";
import photo from "./assets/homeimg.png";

export default function Home() {
  const router = useRouter();

  const handelclick = () => {
    router.push("/Quizarea");
  };
  return (
    <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-16 bg-gradient-to-b from-white to-green-50">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-green-800 drop-shadow-md">
        Welcome to <span className="text-emerald-600">PrepWinz</span>
      </h1>

      <p className="text-md sm:text-md text-gray-700 mt-6 max-w-xl">
        Your go-to platform for mastering quizzes and cracking company
        interviews.
      </p>

      <section className="mt-16 max-w-3xl w-full bg-white rounded-2xl shadow-xl px-8 py-10 flex flex-col  items-center">
        <div className="w-full flex justify-center mb-6">
          <Image
            src={photo}
            alt="PrepWhiaz Logo"
            width={400}
            height={300}
            className="object-contain"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-green-700 mb-6">
            Get Previous Year Questions
          </h2>

          <ul className="space-y-4 text-gray-700 text-base">
            <li className="flex items-start gap-3">
              <FaCheckCircle className="text-green-600 mt-1" />
              Practice real interview questions from companies like Accenture,
              tcs, Wipro,Coginzant and many more.
            </li>
            <li className="flex items-start gap-3">
              <FaCheckCircle className="text-green-600 mt-1" />
              Take timed mock tests to simulate real coding rounds and improve
              speed.
            </li>
            <li className="flex items-start gap-3">
              <FaCheckCircle className="text-green-600 mt-1" />
              Track your performance and identify strengths and weaknesses.
            </li>
          </ul>
        </div>
      </section>

      <div className="mt-12">
        <button
          onClick={handelclick}
          className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold text-lg rounded-full shadow-lg hover:from-green-700 hover:to-emerald-600 transform hover:scale-105 transition duration-300 ease-in-out"
        >
          🚀 Start Practicing Now
        </button>
      </div>
    </main>
  );
}
