import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Tooltip,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { BiComment } from "react-icons/bi";
import { BiBookmark } from "react-icons/bi";

export default function BlogCard({ blog }) {
  const {
    id,
    title,
    slug,
    author,
    cover_photo,
    content,
    posted_date,
    tags,
    categories,
    reading_time,
    reactions,
  } = blog;
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Avatar />
          <span className="flex items-start flex-col text-sm">
            <p className="font-bold text-medium">{author.username}</p>
            <p>{posted_date}</p>
          </span>
        </div>
      </CardHeader>
      <CardBody>
        <Link
          href="#"
          className="text-xl font-semibold hover:underline cursor-pointer"
        >
          {title}
        </Link>
        <div className="mt-2">
          {cover_photo && (
            <Image
              alt={title}
              className="object-cover rounded-xl "
              src={cover_photo}
              objectFit="cover"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "300px" }} // optional
            />
          )}
        </div>
      </CardBody>

      <CardFooter className="flex justify-between">
        {/* upvotes and downvotes and comments section */}
        <section className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Button isIconOnly aria-label="upvote">
              <BiUpvote className="text-xl" />
            </Button>
            <span className="text-sm font-semibold">{reactions.upvotes}</span>
          </div>

          <div className="flex items-center gap-1">
            <Button isIconOnly aria-label="upvote">
              <BiDownvote className="text-xl" />
            </Button>
            <span className="text-sm font-semibold">{reactions.downvotes}</span>
          </div>

          <div className="flex items-center gap-1">
            <Button isIconOnly aria-level="comments">
              <BiComment className="text-xl" />
            </Button>
            <span className="text-sm font-semibold">{reactions.comments}</span>
          </div>
        </section>

        {/* bookmark section */}
        <section>
          <Tooltip content="bookmark blog">
            <Button isIconOnly variant="light" className="cursor-pointer">
              <BiBookmark className="text-2xl" />
            </Button>
          </Tooltip>
        </section>
      </CardFooter>
    </Card>
  );
}
