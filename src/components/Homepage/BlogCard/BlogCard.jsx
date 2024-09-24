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
  DropdownSection,
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
import { useRouter } from "next/navigation";
import BriefContent from "./BriefContent/BriefContent";

export default function BlogCard({ blog, pageType }) {
  const router = useRouter();

  const {
    title,
    slug,
    content,
    coverPhoto,
    postedDate,
    author,
    tags,
    categories,
    readingTime,
    reactions,
  } = blog;

  // navigation function
  const handleCardClick = () => {
    router.push(slug);
  };

  return (
    <Card>
      <div onClick={handleCardClick}>
        <CardHeader className="flex justify-between items-center">
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2"
          >
            <Avatar src={author?.image} name={author?.name} />
            <span className="flex items-start flex-col text-sm">
              <p className="font-bold text-medium">{author?.name}</p>
              <p className="text-sm">
                {new Date(postedDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </span>
          </div>

          <div onClick={(e) => e.stopPropagation()}>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="light" isIconOnly>
                  <FiMoreHorizontal className="text-xl" />
                </Button>
              </DropdownTrigger>

              <DropdownMenu aria-label="Dynamic Actions">
                {/* show different options based on pageType */}
                {pageType === "my-blogs" ? (
                  <DropdownSection title={"author actions"}>
                    <DropdownItem>Edit Blog</DropdownItem>
                    <DropdownItem>Delete Blog</DropdownItem>
                  </DropdownSection>
                ) : (
                  <DropdownSection title={"general actions"}>
                    <DropdownItem>Report Blog</DropdownItem>
                    <DropdownItem>Hide Blog</DropdownItem>
                    <DropdownItem>Share Blog</DropdownItem>
                  </DropdownSection>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>
        </CardHeader>

        <CardBody className="flex flex-row items-center justify-between gap-2 lg:gap-4 py-0">
          {/* title and description */}
          <div className="space-y-1 min-w-[75%] lg:w-full">
            <Link href={slug}>
              <h2 className="text-xl lg:text-2xl font-semibold hover:underline cursor-pointer">
                {title}
              </h2>
              <BriefContent htmlContent={content} />
            </Link>
          </div>

          {/* Render cover photo only if it's provided */}
          {coverPhoto && (
            <div className="mt-2 relative w-full lg:max-w-[150px] h-[100px] ">
              <Link href={slug}>
                <Image
                  alt={title}
                  className="object-cover rounded-xl"
                  src={coverPhoto}
                  fill
                  sizes="(max-width: 150px) 100vw, 150px"
                />
              </Link>
            </div>
          )}
        </CardBody>

        <CardFooter className="flex justify-between">
          {/* pog and comments section */}
          <section
            // onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2"
          >
            <Tooltip content="pogs count">
              <div className="flex items-center gap-1">
                {/* Pog Button */}
                <Button onClick={handleCardClick} isIconOnly aria-label="pog">
                  <BiRocket className="text-xl" />{" "}
                  {/* A rocket icon for "Pog" */}
                </Button>
                {/* Pog Count */}
                <span className="text-sm font-semibold">{reactions?.pogs}</span>
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
                  {reactions?.comments}
                </span>
              </div>
            </Tooltip>
          </section>

          {/* bookmark and minute read section */}
          <section
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2"
          >
            <div className="hidden lg:flex">
              <p className="text-sm">{readingTime} min read</p>
            </div>

            <Tooltip content="bookmark blog">
              <Button isIconOnly variant="light" className="cursor-pointer">
                <BiBookmark className="text-2xl" />
              </Button>
            </Tooltip>
          </section>
        </CardFooter>
      </div>
    </Card>
  );
}
