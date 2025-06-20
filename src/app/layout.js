import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footes";
import ProgressBar from "./components/progressbar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Quiz App | Practice Company-Based Questions",
  description: "Test your skills with MCQs for Accenture, TCS, Infosys, and more!",
  keywords: ["quiz", "MCQ", "aptitude", "Accenture", "TCS", "Infosys", "technical quiz,product Base ,Free mock test,Resoning,"],
  authors: [{ name: "Sunil Das" }],
  openGraph: {
    title: "Quiz App - Company-Wise Interview Practice",
    description: "Sharpen your preparation with real-world company quiz questions.",
    url: "https://prep-winz.vercel.app/",
    siteName: "QuizApp",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Quiz App Preview",
      },
    ],
    locale: "India",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quiz App - Crack Company Interviews",
    description: "MCQ practice platform for top company exams.",
    images: ["/quiz-preview.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar/>
        
        {children}
        <ProgressBar/>
        <Footer/>
      </body>
    </html>
  );
}
