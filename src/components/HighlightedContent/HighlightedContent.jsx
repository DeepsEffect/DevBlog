"use client";

import { useEffect, useRef } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css"; // Use any theme you prefer
import "prismjs/components/prism-python";
import "prismjs/components/prism-c";
import "prismjs/components/prism-java";
import "prismjs/components/prism-ruby";

const HighlightedContent = ({ content }) => {
  const contentRef = useRef(null); // Ref to access the DOM

  useEffect(() => {
    if (contentRef.current) {
      // Apply syntax highlighting after content is rendered
      Prism.highlightAllUnder(contentRef.current);
    }
  }, [content]); // Trigger when the content changes

  return (
    <div
      ref={contentRef} // Attach ref to access the rendered DOM element
      dangerouslySetInnerHTML={{ __html: content }} // Render sanitized content
    />
  );
};

export default HighlightedContent;
