"use client";
import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";

const SanitizeMarkup = ({ htmlContent }) => {
  const [sanitizedContent, setSanitizedContent] = useState("");

  useEffect(() => {
    if (htmlContent) {
      setSanitizedContent(DOMPurify.sanitize(htmlContent));
    }
  }, [htmlContent]);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
};

export default SanitizeMarkup;
