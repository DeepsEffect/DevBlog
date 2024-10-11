"use client";
import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";

const BriefContent = ({ htmlContent }) => {
  const [briefText, setBriefText] = useState("");

  useEffect(() => {
    if (htmlContent) {
      // Sanitize HTML and create brief content
      const plainText = DOMPurify.sanitize(htmlContent, { ALLOWED_TAGS: [] });
      setBriefText(plainText.slice(0, 150));
    }
  }, [htmlContent]);

  return <p className="text-sm text-gray-400">{briefText}...</p>;
};

export default BriefContent;
