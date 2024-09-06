"use client";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tooltip,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { BiComment } from "react-icons/bi";
import { BiBookmark } from "react-icons/bi";
import { FiMoreHorizontal } from "react-icons/fi";

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
      <CardHeader className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Avatar />
          <span className="flex items-start flex-col text-sm">
            <p className="font-bold text-medium">{author.username}</p>
            <p>{posted_date}</p>
          </span>
        </div>

        <div>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="light" isIconOnly>
                <FiMoreHorizontal className="text-xl" />
              </Button>
            </DropdownTrigger>

            <DropdownMenu aria-label="Dynamic Actions">
              <DropdownItem key={"report"}>Report Blog</DropdownItem>
              <DropdownItem key={"hide"}>Hide Blog</DropdownItem>
              <DropdownItem key={"share"}>Share Blog</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </CardHeader>

      <CardBody className="flex flex-row items-center gap-2 py-0">
        {/* title and description */}
        <div className="space-y-1">
          <Link
            href="#"
            className="text-xl font-semibold hover:underline cursor-pointer"
          >
            {title}
          </Link>
          <p className="text-sm text-gray-400">
            {`${content.body.slice(0, 100)}`}...
          </p>
        </div>
        {/* cover photo */}
        <div className="mt-2 relative w-[400px] lg:w-[300px] h-[100px] lg:h-[200px]">
          {cover_photo && (
            <Image
              alt={title}
              className="object-cover rounded-xl "
              src={cover_photo}
              objectFit="cover"
              fill
              sizes="100vw"
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

        {/* bookmark and minute read section */}
        <section className="flex items-center gap-2">
          <div className="hidden lg:flex">
            <p className="text-sm">{reading_time} min read</p>
          </div>

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
