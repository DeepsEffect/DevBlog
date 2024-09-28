import Reactions from "@/components/Reactions/Reactions";
import SanitizeMarkup from "@/services/SanitizeMarkup";
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
} from "@nextui-org/react";
import Image from "next/image";

const blogDetailsPage = async ({ params, searchParams }) => {
  const { slug } = params;
  const readingTime = searchParams.readingTime;

  // Fetch blog data from API
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${slug}`, {
    next: { revalidate: 0 },
  });

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

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader className="flex flex-col gap-4 items-start ">
          {/* category section */}
          <section>
            <p className="text-gray-400">{category?.toUpperCase()}</p>
          </section>

          {/* title and tags section */}
          <section>
            <h2 className="text-2xl lg:text-4xl font-bold">{title}</h2>
            <div className="flex items-center gap-1 mt-2">
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

          {/* Client-side reactions (buttons, pogs) */}
          <Reactions slug={slug} reactions={reactions} />
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
