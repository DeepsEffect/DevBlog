import { Button, Tooltip } from "@nextui-org/react";
import React from "react";
import { TbShare3 } from "react-icons/tb";

export const ShareButton = () => {
  return (
    <div className="flex items-center gap-2">
      <Tooltip content="share blog">
        <Button variant="flat" size="sm" isIconOnly>
          <TbShare3 className="text-2xl" />
        </Button>
      </Tooltip>
    </div>
  );
};
