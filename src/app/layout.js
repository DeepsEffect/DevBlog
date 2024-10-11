import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar/Navbar";
import { NextUIProvider } from "@nextui-org/react";
import AuthProvider from "@/services/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SearchProvider } from "@/contexts/SearchContext";
import { CategoryProvider } from "@/contexts/CategoryContext";
import { QueryProvider } from "@/services/QueryProvider";
import { BookmarkProvider } from "@/contexts/BookmarkContext";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
});

export const metadata = {
  title: "DevBlog",
  description:
    "DevBlog is a platform for developers to browse, search, and create blogs across various development categories.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>
        <AuthProvider>
          <NextUIProvider className="dark text-foreground bg-background">
            <QueryProvider>
              <CategoryProvider>
                <SearchProvider>
                  <BookmarkProvider>
                    <Navbar />
                    {children}
                  </BookmarkProvider>
                </SearchProvider>
              </CategoryProvider>
            </QueryProvider>
          </NextUIProvider>
        </AuthProvider>
        <ToastContainer
          position="bottom-left"
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
