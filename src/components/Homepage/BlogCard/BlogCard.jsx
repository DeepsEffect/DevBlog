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
import { BiComment } from "react-icons/bi";
import { BiBookmark } from "react-icons/bi";
import { FiMoreHorizontal } from "react-icons/fi";
import { BiRocket } from "react-icons/bi";

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
        <div className="mt-2 relative w-full lg:w-[300px] h-[100px] lg:h-[200px]">
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
        {/* pog and comments section */}
        <section className="flex items-center gap-2">
          <Tooltip content="pogs count">
            <div className="flex items-center gap-1">
              {/* Pog Button */}
              <Button isIconOnly aria-label="pog">
                <BiRocket className="text-xl" /> {/* A rocket icon for "Pog" */}
              </Button>
              {/* Pog Count */}
              <span className="text-sm font-semibold">{reactions.upvotes}</span>
            </div>
          </Tooltip>

          {/* comments */}
          <Tooltip content="comments count">
            <div className="flex items-center gap-1">
              {/* comment button */}
              <Button isIconOnly aria-level="comments">
                <BiComment className="text-xl" />
              </Button>
              {/* comment count */}
              <span className="text-sm font-semibold">
                {reactions.comments}
              </span>
            </div>
          </Tooltip>
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
