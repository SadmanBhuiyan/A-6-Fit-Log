import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ToastProvider from "../components/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FitLog",
  description: "Workout Library",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-black">
        <ToastProvider />

        <div className="mx-10 flex flex-col min-h-screen">
          <div>
            <Navbar />
          </div>

          <div className="divider m-0"></div>

          <div>
            {children}
          </div>

          <div>
            <div className="divider m-0"></div>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}