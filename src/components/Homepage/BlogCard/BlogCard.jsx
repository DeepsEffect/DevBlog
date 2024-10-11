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
import React, { useEffect, useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { useRouter } from "next/navigation";
import BriefContent from "./BriefContent/BriefContent";
import { Bookmark } from "@/components/Bookmark/Bookmark";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { MdOutlineReport } from "react-icons/md";
import { IoShareSocial } from "react-icons/io5";
import { MessageSquare, Zap } from "lucide-react";

export default function BlogCard({ blog, pageType, bookmarkRefetch }) {
  const router = useRouter();
  const [readingTime, setReadingTime] = useState(0);
  const session = useSession();
  const queryClient = useQueryClient();
  const email = session?.data?.user?.email;

  const {
    title,
    slug,
    content,
    coverPhoto,
    postedDate,
    author,
    tags,
    reactions,
  } = blog;

  // navigation function
  const handleCardClick = () => {
    router.push(`/blogs/${slug}?readingTime=${readingTime}`);
  };

  // reading time calculation function
  const readingTimeCalc = () => {
    const wordsPerMin = 200;
    const plainText = content.replace(/<[^>]+>/g, ""); // remove html tags
    const wordCount = plainText.split(/\s+/).length; // split by whitespace
    const timeToRead = Math.ceil(wordCount / wordsPerMin);
    return timeToRead;
  };

  // set reading time when the component mounts
  useEffect(() => {
    const time = readingTimeCalc();
    setReadingTime(time);
  }, [readingTime]);

  // handle delete bookmark
  const deleteBookmarkMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/my-bookmarks/delete?email=${email}&bookmarkId=${id}`,
        {
          method: "DELETE",
        }
      );
      const data = res.json();
      if (!res.ok) {
        toast.error("Failed to delete bookmark");
        throw new Error(data?.message || "Failed to delete bookmark");
      }
    },
    onSuccess: () => {
      toast.success("Bookmark deleted");
      bookmarkRefetch();
    },
  });

  // mutation for deleting blogs
  const deleteBlogMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/my-blogs/delete?id=${id}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error("Failed to delete blog");
        throw new Error(data?.message || "Failed to delete blog");
      }
    },
    onSuccess: () => {
      toast.success("Blog deleted");
      queryClient.invalidateQueries("my-blogs");
    },
  });

  // handle report blog
  const handleReportBlog = () => {
    setTimeout(() => {
      toast.warning("Report has been sent");
    }, 500);
  };

  const handleShareBlog = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: `Check out this blog: ${blog.title}`,
        url: `${window.location.origin}/blogs/${blog.slug}?readingTime=${readingTime}`,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard
        .writeText(
          `${window.location.origin}/blogs/${blog.slug}?readingTime=${readingTime}`
        )
        .then(() => {
          toast.success("Blog link copied to clipboard!");
        })
        .catch((error) => {
          toast.error("Failed to copy link");
          console.error("Error copying to clipboard", error);
        });
    }
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
                {" "}
                Posted {""}
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
                {pageType === "my-blogs" ? (
                  email === author?.email ? (
                    <DropdownSection>
                      <DropdownItem
                        variant="flat"
                        onClick={() =>
                          router.push(`/my-blogs/edit?id=${blog?._id}`)
                        }
                      >
                        <div className="flex items-center gap-1">
                          <RiEdit2Fill className="text-xl" />
                          Edit Blog
                        </div>
                      </DropdownItem>
                      <DropdownItem
                        color="danger"
                        variant="flat"
                        onClick={() => deleteBlogMutation.mutate(blog?._id)}
                      >
                        <div className="flex items-center gap-1">
                          <MdDelete className="text-xl" />
                          Delete Blog
                        </div>
                      </DropdownItem>
                    </DropdownSection>
                  ) : (
                    <DropdownSection>
                      <DropdownItem
                        onClick={handleShareBlog}
                        variant="flat"
                        color="success"
                      >
                        <div className="flex items-center gap-2">
                          <IoShareSocial className="text-xl" />
                          Share Blog
                        </div>
                      </DropdownItem>
                    </DropdownSection>
                  )
                ) : null}

                {pageType === "my-bookmarks" && (
                  <DropdownSection>
                    <DropdownItem
                      onClick={() => deleteBookmarkMutation.mutate(blog?._id)}
                      variant="flat"
                      color="danger"
                    >
                      <div className="flex items-center gap-1">
                        <MdDelete className="text-xl" />
                        Delete Bookmark
                      </div>
                    </DropdownItem>
                  </DropdownSection>
                )}

                {pageType === "homepage" && (
                  <DropdownSection>
                    <DropdownItem
                      onClick={handleReportBlog}
                      variant="flat"
                      color="warning"
                    >
                      <div className="flex items-center gap-2">
                        <MdOutlineReport className="text-xl" />
                        Report Blog
                      </div>
                    </DropdownItem>
                    {/* <DropdownItem variant="flat">
                      <div className="flex items-center gap-2">
                        <BiHide className="text-xl" />
                        Hide Blog
                      </div>
                    </DropdownItem> */}
                    <DropdownItem
                      onClick={handleShareBlog}
                      variant="flat"
                      color="success"
                    >
                      <div className="flex items-center gap-2">
                        <IoShareSocial className="text-xl" />
                        Share Blog
                      </div>
                    </DropdownItem>
                  </DropdownSection>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>
        </CardHeader>

        <CardBody className="flex flex-row items-center justify-between gap-2 lg:gap-4 py-0">
          {/* title and description */}
          <div className="space-y-1 min-w-[75%] lg:w-full">
            <Link href={`/blogs/${slug}?readingTime=${readingTime}`}>
              <h2 className="text-xl lg:text-2xl font-semibold hover:underline cursor-pointer">
                {title}
              </h2>
              <BriefContent htmlContent={content} />
            </Link>
            <div className="flex flex-wrap items-center gap-1 mt-2">
              {tags?.map((tag) => (
                <p className="mr-1 text-sm text-gray-500" key={tag}>
                  #{tag}
                </p>
              ))}
            </div>
          </div>

          {/* Render cover photo only if it's provided */}
          {coverPhoto && (
            <div className="mt-2 relative w-full lg:max-w-[150px] h-[100px] ">
              <Link href={`/blogs/${slug}?readingTime=${readingTime}`}>
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
            <Tooltip content={`pog count: ${reactions?.pogs}`}>
              <div className="flex items-center gap-1">
                {/* Pog Button */}
                <Button
                  variant="flat"
                  size="sm"
                  onClick={handleCardClick}
                  isIconOnly
                  aria-label="pog"
                >
                  <Zap
                    size={21}
                    strokeWidth={2}
                    className="hover:fill-cyan-300 hover:stroke-none"
                  />
                  {/* A rocket icon for "Pog" */}
                </Button>
                {/* Pog Count */}
                <span className="text-sm font-semibold">{reactions?.pogs}</span>
              </div>
            </Tooltip>

            {/* comments */}
            <Tooltip content={`comment count: ${reactions?.comments}`}>
              <div className="flex items-center gap-1">
                {/* comment button */}
                <Button
                  variant="flat"
                  size="sm"
                  isIconOnly
                  aria-level="comments"
                >
                  <MessageSquare size={21} strokeWidth={2} />
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
            {/* reading time */}
            <Tooltip content={`${readingTime} minute read`}>
              <div>
                <p className="text-sm">{readingTime} min read</p>
              </div>
            </Tooltip>

            {/* bookmark  */}
            <Bookmark pageType={pageType} blog={blog} page={"homePage"} />
          </section>
        </CardFooter>
      </div>
    </Card>
  );
}
