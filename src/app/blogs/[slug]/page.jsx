import AddComment from "@/components/AddComment/AddComment";
import { Bookmark } from "@/components/Bookmark/Bookmark";
import HighlightedContent from "@/components/HighlightedContent/HighlightedContent";
import Reactions from "@/components/Reactions/Reactions";
import { ShareButton } from "@/components/ShareButton/ShareButton";
import ViewComments from "@/components/ViewComments/ViewComments";
import { sanitizeHtml } from "@/services/SanitizeMarkup";
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
} from "@nextui-org/react";
import Image from "next/image";

export const generateMetadata = async ({ params }) => {
  const title = params.slug
    ? `DevBlog | Blog Details - ${params.slug}`
    : "DevBlog | Blog Details";
  return {
    title,
  };
};

const blogDetailsPage = async ({ params, searchParams }) => {
  const { slug } = params;
  const readingTime = searchParams.readingTime;

  // Fetch blog data from API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${slug}`,
    {
      next: { revalidate: 0 },
    }
  );

  if (!res.ok) {
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
    reactions,
  } = blog;

  // Sanitize the content
  const sanitizedContent = sanitizeHtml(content);

  return (
    <div className="max-w-3xl mx-auto">
      <Card radius="none">
        <CardHeader className="flex flex-col gap-4 items-start ">
          {/* category section */}
          <section>
            <p className="text-gray-400">{category?.toUpperCase()}</p>
          </section>

          {/* title and tags section */}
          <section>
            <h2 className="text-2xl lg:text-4xl font-bold">{title}</h2>
            <div className="flex flex-wrap items-center gap-1 mt-2">
              {tags?.map((tag) => (
                <Chip className="mr-1" size="sm" key={tag} variant="bordered">
                  # {tag}
                </Chip>
              ))}
            </div>
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

          {/* pog, comment, bookmark and share */}
          <section className="flex justify-between items-center w-full gap-2">
            <Reactions slug={slug} reactions={reactions} />
            <div className="flex items-center gap-2">
              <Bookmark blog={blog} page={"blogDetails"} />
              <ShareButton blog={blog} readingTime={readingTime} />
            </div>
          </section>
          {/* pog and comment */}
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
          <section className="leading-relaxed text-text text-lg mt-4 mb-4">
            <HighlightedContent content={sanitizedContent} />
          </section>

          <Divider />

          {/* add comment section */}
          <AddComment slug={slug} />
          {/* view comments */}
          <ViewComments slug={slug} />
        </CardBody>
      </Card>
    </div>
  );
};

export default blogDetailsPage;
