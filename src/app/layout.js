import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Abc School - An Edmund Rice Educational Institution",
  description: "Abc School, Birgunj - Providing quality education since 1927. An Edmund Rice Educational Institution committed to excellence in learning.",
  keywords: "Abc School, Birgunj, Edmund Rice, Education, School Admissions",
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
       <Footer />
      </body>
    </html>
  );
}