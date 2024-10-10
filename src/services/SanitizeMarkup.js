import DOMPurify from "dompurify";

export const sanitizeHtml = (html) => {
  if (typeof window !== "undefined") {
    try {
      return DOMPurify.sanitize(html, {
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
    } catch (error) {
      console.error("Error sanitizing content:", error);
      return "";
    }
  }
  return html;
};
