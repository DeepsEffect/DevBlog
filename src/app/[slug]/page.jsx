import SanitizeMarkup from "@/services/SanitizeMarkup";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Tooltip,
} from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import { BiBookmark, BiComment, BiRocket } from "react-icons/bi";
import { TbShare3 } from "react-icons/tb";

const blogDetailsPage = async ({ params }) => {
  const { slug } = params;

  // fetch the blog data on the slug
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}`, {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });
  if (!res.ok) {
    // TODO: show an actual error page
    return (
      <p className="flex justify-center items-center h-screen text-xl">
        Blog not found
      </p>
    );
  }
  const blog = await res.json();

  const {
    title,
    content,
    coverPhoto,
    postedDate,
    author,
    tags,
    category,
    readingTime,
    reactions,
  } = blog;

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader className="flex flex-col gap-4 items-start ">
          {/* category section */}
          <section>
            <p className="text-gray-400">{category.toUpperCase()}</p>
          </section>

          {/* title and tags section */}
          <section>
            <h2 className="text-2xl lg:text-4xl font-bold">{title}</h2>
            <p className="text-sm mt-2">
              {tags?.map((tag) => (
                <Chip className="mr-1" size="sm" key={tag} variant="bordered">
                  # {tag}
                </Chip>
              ))}
            </p>
          </section>

          {/* avatar and posted date */}
          <section className="flex items-center gap-2">
            <Avatar src={author?.image} name={author?.name} />
            <span className="flex items-start flex-col text-sm">
              <p className="font-bold text-medium">{author?.name}</p>
              <p className="text-sm">
                posted on{" "}
                {new Date(postedDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}{" "}
                . {readingTime} min read
              </p>
            </span>
          </section>

          {/* reactions, comments and bookmark */}
          <section className="flex justify-between items-center w-full gap-2">
            {/* left side icons */}
            <div className="flex items-center gap-2">
              <Tooltip content="pog">
                <div className="flex items-center gap-1">
                  {/* Pog Button */}
                  <Button size="sm" isIconOnly aria-label="pog">
                    <BiRocket className="text-xl" />{" "}
                    {/* A rocket icon for "Pog" */}
                  </Button>
                  {/* Pog Count */}
                  <span className="text-sm font-semibold">
                    {reactions?.pogs}
                  </span>
                </div>
              </Tooltip>

              {/* comments */}
              <Tooltip content="comment">
                <div className="flex items-center gap-1">
                  {/* comment button */}
                  <Button size="sm" isIconOnly aria-level="comments">
                    <BiComment className="text-xl" />
                  </Button>
                  {/* comment count */}
                  <span className="text-sm font-semibold">
                    {reactions?.comments}
                  </span>
                </div>
              </Tooltip>
            </div>

            {/* right side icons */}
            <div className="flex items-center gap-2">
              {/* bookmarks */}
              <Tooltip content="bookmark blog">
                <Button size="sm" isIconOnly className="cursor-pointer">
                  <BiBookmark className="text-2xl" />
                </Button>
              </Tooltip>

              {/* share */}
              <Tooltip content="share blog">
                <Button size="sm" isIconOnly className="cursor-pointer">
                  <TbShare3 className="text-2xl" />
                </Button>
              </Tooltip>
            </div>
          </section>
        </CardHeader>

        <Divider />

        {/* main content */}
        <CardBody>
          {/* cover photo section */}
          <section>
            {coverPhoto && (
              <div className="relative overflow-hidden h-[200px] lg:h-[400px]">
                <Image
                  src={coverPhoto}
                  layout="fill"
                  objectFit="cover"
                  alt={title}
                  sizes="(max-width: 1024px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
              </div>
            )}
          </section>

          {/* blog content section */}
          <section className="leading-relaxed text-text mt-4 mb-4">
            <SanitizeMarkup htmlContent={content} />
          </section>
        </CardBody>
      </Card>
    </div>
  );
};

export default blogDetailsPage;
