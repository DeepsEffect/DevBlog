"use client";
const { useState, createContext, useContext } = require("react");

// create context
const CategoryContext = createContext();

// hook to use the category context
export const useCategory = () => useContext(CategoryContext);

// provider
export const CategoryProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // function to set the category to the selectedCategory state
  const handleSelectedCategory = (category) => {
    setSelectedCategory(category === "all" ? null : category);
  };

  return (
    <CategoryContext.Provider
      value={{ setSelectedCategory, handleSelectedCategory, selectedCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
