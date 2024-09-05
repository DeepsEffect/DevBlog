import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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
      </CardBody>
      <CardFooter>
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
      </CardFooter>
    </Card>
  );
}
