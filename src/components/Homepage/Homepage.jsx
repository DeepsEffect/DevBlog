import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import React from "react";
import BlogCard from "./BlogCard/BlogCard";

export const Homepage = async () => {
  // fetch the blogs data
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/api`, {
    cache: "no-store",
    next: {
      revalidate: 0,
    },
  });

  // Handle loading state
  if (!res.ok) {
    return (
      // todo: show an actual error page here
      <div className="flex items-center justify-center h-screen text-xl">
        <p>Failed to load blogs</p>
      </div>
    );
  }
  const blogs = await res.json();
  // console.log(blogs);
  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-4 md:px-4 py-6 ">
      {/* TODO: toggle button for right sidebar for mobile view */}

      {/* left sidebar */}
      <aside className="hidden md:block md:col-span-1 lg:col-span-3 lg:p-4">
        <Card>
          <CardHeader>
            <h2 className="text-xl flex justify-center w-full font-bold">
              Blog Categories
            </h2>
          </CardHeader>

          <CardBody>
            <ul className="text-lg font-semibold space-y-3">
              <Button variant="light" className="w-full">
                Most Popular
              </Button>
              <Button variant="light" className="w-full">
                Most Recent
              </Button>
              <Button variant="light" className="w-full">
                Javascript
              </Button>
              <Button variant="light" className="w-full">
                React
              </Button>
              <Button variant="light" className="w-full">
                Next.js
              </Button>
              <Button variant="light" className="w-full">
                Tailwind CSS
              </Button>
              <Button variant="light" className="w-full">
                Fullstack Development
              </Button>
              <Button variant="light" className="w-full">
                Front-end Development
              </Button>
            </ul>
          </CardBody>
        </Card>
      </aside>

      {/* main content */}
      <main className="col-span-1 md:col-span-2 lg:col-span-6 lg:p-4 text-center">
        <ButtonGroup>
          <Button>Relevant</Button>
          <Button>Latest</Button>
          <Button>Top</Button>
        </ButtonGroup>

        {/* show blog cards */}
        <div className="grid gird-cols-1 gap-4 lg:p-4 mt-4 lg:mt-2">
          {blogs?.length === 0 ? (
            <div className="flex items-center justify-center lg:mt-10">
              <p>No blogs found</p>
            </div>
          ) : (
            blogs?.map((blog) => <BlogCard blog={blog} key={blog.id} />)
          )}
        </div>
      </main>

      {/* right sidebar content */}
      <aside className="col-span-1 lg:col-span-3 lg:p-4">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold">Recent Activity</h2>
          </CardHeader>
          <CardBody>
            <p>Recommended topics will be shown here</p>
            <p>recently saved will be shown here</p>
          </CardBody>
          <CardHeader>
            <p>recent comments will be show here</p>
          </CardHeader>
          <CardFooter>other banners will be shown here</CardFooter>
        </Card>
      </aside>
    </div>
  );
};
