"use client";
import useBlogs from "@/hooks/useBlogs";
import { Avatar, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React from "react";

const MyProfilePage = () => {
  const session = useSession();
  const email = session?.data?.user?.email;
  const { blogs } = useBlogs({ email });
  return (
    <div className="max-w-xl mx-auto lg:mt-20">
      <Card>
        <CardHeader>
          <Avatar
            alt={session?.data?.user?.name}
            src={session?.data?.user?.image}
            className="w-40 h-40 text-large mx-auto"
          />
        </CardHeader>
        <CardBody>
          <form className="">
            <div className="flex justify-between gap-3 mb-3">
              <Input
                name="name"
                variant="bordered"
                type="text"
                value={session?.data?.user?.name}
                label="Username"
                disabled
              />
              <Input
                name="email"
                type="email"
                variant="bordered"
                value={session?.data?.user?.email}
                label="Username"
                disabled
              />
            </div>
            <Input
              name="email"
              type="email"
              variant="bordered"
              value={blogs?.length}
              label="Total blog posted"
              disabled
            />
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default MyProfilePage;
