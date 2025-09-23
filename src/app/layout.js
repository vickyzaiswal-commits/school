import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "St. Columba's School - An Edmund Rice Educational Institution",
  description: "St. Columba's School, New Delhi - Providing quality education since 1927. An Edmund Rice Educational Institution committed to excellence in learning.",
  keywords: "St. Columba's School, New Delhi, Edmund Rice, Education, School Admissions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <Navbar />
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        {/* <Footer/> */}
        {/* Footer can be added here */}
        <footer className="bg-green-800 text-white py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-sm">© 2025 St. Columba's School. All rights reserved.</p>
            <p className="text-xs text-green-200 mt-1">An Edmund Rice Educational Institution</p>
          </div>
        </footer>
      </body>
    </html>
  );
}