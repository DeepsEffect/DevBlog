import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import React from "react";
import blogs from "../../data/blogs.json";
import BlogCard from "./BlogCard/BlogCard";

export const Homepage = () => {
  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-4 px-4 py-6 ">
      {/* TODO: toggle button for right sidebar for mobile view */}

      {/* left sidebar */}
      <aside className="hidden md:block md:col-span-1 lg:col-span-3 p-4">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold">Blog Categories</h2>
          </CardHeader>

          <CardBody>
            <ul className="text-lg font-semibold space-y-3">
              <Button variant="ghost" className="w-full">
                Most Popular
              </Button>
              <Button variant="ghost" className="w-full">
                Most Recent
              </Button>
              <Button variant="ghost" className="w-full">
                Javascript
              </Button>
              <Button variant="ghost" className="w-full">
                React
              </Button>
              <Button variant="ghost" className="w-full">
                Next.js
              </Button>
              <Button variant="ghost" className="w-full">
                Tailwind CSS
              </Button>
              <Button variant="ghost" className="w-full">
                Fullstack Development
              </Button>
              <Button variant="ghost" className="w-full">
                Front-end Development
              </Button>
            </ul>
          </CardBody>
        </Card>
      </aside>

      {/* main content */}
      <main className="col-span-1 md:col-span-2 lg:col-span-6 p-4 text-center">
        <ButtonGroup>
          <Button>Relevant</Button>
          <Button>Latest</Button>
          <Button>Top</Button>
        </ButtonGroup>

        {/* show blog cards */}
        <div className="grid gird-cols-1 gap-4 p-4">
          {blogs?.map((blog) => (
            <BlogCard blog={blog} key={blog.id} />
          ))}
        </div>
      </main>

      {/* right sidebar content */}
      <aside className=" col-span-1 lg:col-span-3 p-4">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold">Recent Comments</h2>
          </CardHeader>
          <CardHeader>
            <p>recent comments will be show here</p>
          </CardHeader>
          <CardFooter>other banners will be shown here</CardFooter>
        </Card>
      </aside>
    </div>
  );
};
