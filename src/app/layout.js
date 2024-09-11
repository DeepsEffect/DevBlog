import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar/Navbar";
import { NextUIProvider } from "@nextui-org/react";
import AuthProvider from "@/services/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DevBlog",
  description:
    "DevBlog is a collaborative project designed to create a simple yet functional blog platform where users can sign up, create and manage blog posts,",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <NextUIProvider className="dark text-foreground bg-background">
            <Navbar />
            {children}
          </NextUIProvider>
        </AuthProvider>
        <ToastContainer
          position="top-center"
          autoClose={3500}
          hideProgressBar={true}
          closeOnClick={true}
          pauseOnHover={false}
          draggable={true}
          theme="dark"
        />
      </body>
    </html>
  );
}
