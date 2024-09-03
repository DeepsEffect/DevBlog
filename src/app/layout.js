import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar/Navbar";
import { NextUIProvider } from "@nextui-org/react";

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
        <NextUIProvider className="dark text-foreground bg-background">
          <Navbar />
          {children}
        </NextUIProvider>
      </body>
    </html>
  );
}
