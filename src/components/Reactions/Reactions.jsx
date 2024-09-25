"use client";

import { Button, Tooltip } from "@nextui-org/react";
import { useState } from "react";
import { BiBookmark, BiComment, BiRocket } from "react-icons/bi";
import { TbShare3 } from "react-icons/tb";
import { toast } from "react-toastify";

const Reactions = ({ slug, reactions }) => {
  const [pogs, setPogs] = useState(reactions.pogs);
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
    <section className="flex justify-between items-center w-full gap-2">
      <div className="flex items-center gap-2">
        <Tooltip content="pog">
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              isIconOnly
              aria-label="pog"
              onClick={handlePogClick}
            >
              <BiRocket className="text-xl" />
            </Button>
            <span className="text-sm font-semibold">{pogs}</span>
          </div>
        </Tooltip>

        <Tooltip content="comment">
          <div className="flex items-center gap-1">
            <Button size="sm" isIconOnly aria-label="comments">
              <BiComment className="text-xl" />
            </Button>
            <span className="text-sm font-semibold">{reactions?.comments}</span>
          </div>
        </Tooltip>
      </div>

      <div className="flex items-center gap-2">
        <Tooltip content="bookmark blog">
          <Button size="sm" isIconOnly>
            <BiBookmark className="text-2xl" />
          </Button>
        </Tooltip>

        <Tooltip content="share blog">
          <Button size="sm" isIconOnly>
            <TbShare3 className="text-2xl" />
          </Button>
        </Tooltip>
      </div>
    </section>
  );
};

export default Reactions;
