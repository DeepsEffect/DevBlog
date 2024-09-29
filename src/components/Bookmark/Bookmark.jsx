import { Button, Tooltip } from "@nextui-org/react";
import React from "react";
import { BiBookmark } from "react-icons/bi";

export const Bookmark = ({ blog, page }) => {
  return (
    <div>
      <Tooltip content="bookmark blog">
        <Button
          variant={page === "blogDetails" ? "flat" : "light"}
          size={page === "blogDetails" ? "sm" : "md"}
          isIconOnly
        >
          <BiBookmark className="text-2xl" />
        </Button>
      </Tooltip>
    </div>
  );
};
