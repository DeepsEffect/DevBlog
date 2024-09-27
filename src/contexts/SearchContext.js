"use client";
import { createContext, useContext, useState } from "react";

// create context
const SearchContext = createContext();

// hook to use search context
export const useSearch = () => useContext(SearchContext);
// provider component

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
