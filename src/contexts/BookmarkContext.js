"use client";
import { createContext, useContext } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const session = useSession();
  const email = session?.data?.user?.email;

  const { data: bookmarks = [] } = useQuery({
    queryKey: ["bookmarks", email],
    queryFn: async () => {
      if (!email) return [];
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/my-bookmarks/status?email=${email}`
      );
      if (!response.ok) throw new Error("Failed to fetch bookmarks");
      return response.json();
    },
    enabled: !!email,
  });

  const value = {
    bookmarks,
  };

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  );
};

// hook to use bookmark context
export const useBookmarks = () => useContext(BookmarkContext);
