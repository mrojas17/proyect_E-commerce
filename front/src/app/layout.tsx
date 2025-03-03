import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NavBar from "../components/Navbar/NavBar";
import Footer from "../components/Footer";
import "../styles/globals.css";
import {VisibleWrapper, VisibleWrapperFooter} from "@/components/VisibleWrapper";
import { AuthProvider } from "@/context/authContext";
import { CardProvider } from "@/context/CardContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-Commerce",
  description: "Applicación e-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <AuthProvider>
          <CardProvider>
          <VisibleWrapper>
            <div className="md:fixed md:top-0 md:right-0 md:left-0 md:z-50 md:h-16 md:w-full">
              <NavBar />
            </div> 
          </VisibleWrapper>
          <div className="md:min-h-screen">
            {children}
          </div>
          <div>
            <VisibleWrapperFooter>
              <Footer/>
            </VisibleWrapperFooter>
          </div>
              </CardProvider>
            </AuthProvider>
      </body>
    </html>
  );
}
