"use client";
import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

const SanitizeMarkup = ({ htmlContent }) => {
  const [sanitizedContent, setSanitizedContent] = useState("");

  useEffect(() => {
    if (htmlContent) {
      // Configure DOMPurify to allow necessary tags and attributes
      const sanitizedHtml = DOMPurify.sanitize(htmlContent, {
        ALLOWED_TAGS: [
          "p",
          "br",
          "b",
          "i",
          "em",
          "strong",
          "a",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "ul",
          "ol",
          "li",
          "code",
          "pre",
        ],
        ALLOWED_ATTR: ["href", "target", "class"],
      });

      setSanitizedContent(sanitizedHtml);
    }
  }, [htmlContent]);

  useEffect(() => {
    // Apply syntax highlighting after the content has been sanitized and rendered
    document.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block);
    });
  }, [sanitizedContent]);

  return (
    <div
      // className="rendered-content"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};

export default SanitizeMarkup;
