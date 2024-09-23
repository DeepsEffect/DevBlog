"use client";

import React, { useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css"; // Import your desired theme

const CodeHighlighter = () => {
  useEffect(() => {
    // Automatically highlight all code blocks when component mounts
    hljs.highlightAll();
  }, []);

  return null; // This component doesn't render anything
};

export default CodeHighlighter;
