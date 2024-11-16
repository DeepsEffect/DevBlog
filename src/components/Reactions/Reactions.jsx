"use client";

import { Button, Tooltip } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import { Cat, MessageSquare } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const Reactions = ({ slug, reactions }) => {
  const queryClient = useQueryClient();
  const [pogs, setPogs] = useState(reactions?.pogs);

  // handle pog click
  const handlePogClick = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reactions/pogs`,
        {
          method: "PUT",
          body: JSON.stringify({ slug }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        queryClient.invalidateQueries("blogs");
        setPogs((prevPogs) => prevPogs + 1);
        toast.success("pogged +1", {
          autoClose: 100,
        });
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error updating pog", error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* pog button */}
      <Tooltip content="pog">
        <div className="flex items-center gap-1">
          <Button
            variant="flat"
            size="sm"
            isIconOnly
            aria-label="pog"
            onClick={handlePogClick}
          >
            <Cat strokeWidth={2} size={21} className="hover:stroke-primary" />
          </Button>
          <span className="text-sm font-semibold">{pogs}</span>
        </div>
      </Tooltip>

      {/* comment button */}
      <Tooltip content="comment">
        <div className="flex items-center gap-1">
          <Button variant="flat" size="sm" isIconOnly aria-label="comments">
            <MessageSquare size={21} strokeWidth={2} className="hover:stroke-primary"/>
          </Button>
          <span className="text-sm font-semibold">{reactions?.comments}</span>
        </div>
      </Tooltip>
    </div>
  );
};

export default Reactions;
