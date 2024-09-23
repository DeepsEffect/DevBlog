"use client";

import { memo, useEffect, useMemo } from "react";
import DOMPurify from "dompurify";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

const ALLOWED_TAGS = [
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
];
const ALLOWED_ATTR = ["href", "target", "class"];

const sanitizeHtml = (html) => {
  try {
    return DOMPurify.sanitize(html, { ALLOWED_TAGS, ALLOWED_ATTR });
  } catch (error) {
    console.error("Error sanitizing content:", error);
    return "";
  }
};

const highlightCode = () => {
  try {
    document.querySelectorAll("pre code").forEach((block) => {
      if (
        block.textContent.trim() &&
        block.getAttribute("data-highlighted") !== "true"
      ) {
        hljs.highlightElement(block);
        block.setAttribute("data-highlighted", "true"); // Mark as highlighted
      }
    });
  } catch (error) {
    console.error("Error applying syntax highlighting:", error);
  }
};

const SanitizeMarkup = memo(({ htmlContent }) => {
  const sanitizedContent = useMemo(
    () => sanitizeHtml(htmlContent),
    [htmlContent]
  );

  useEffect(() => {
    if (sanitizedContent) {
      highlightCode();
    }
  }, [sanitizedContent]);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
});

SanitizeMarkup.displayName = "SanitizeMarkup";

export default SanitizeMarkup;
