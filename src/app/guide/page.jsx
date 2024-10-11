"use client";
import React, { useEffect } from "react";
import {
  Card,
  CardBody,
  Accordion,
  AccordionItem,
  Divider,
} from "@nextui-org/react";
import {
  BookOpen,
  Bookmark,
  LogIn,
  Search,
  Edit,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const GuidePage = () => {
    // dynamic title
    useEffect(() => {
      document.title = "DevBlog | Guide";
    }, []);

  const guideItems = [
    {
      title: "Getting Started",
      subtitle: "Learn how to create an account and log in",
      icon: <LogIn className="text-primary" />,
      content: [
        {
          step: "Create an Account",
          description:
            "You don't need an account for normal browsing. However, if you want to write blogs, bookmark content, or simply try out the authentication system, you can create an account following the guide below.",
        },
        {
          step: "Login with Google",
          description:
            "You can log in using your Google account. The site implements OAuth and NextAuth for secure authentication.",
        },
        {
          step: "Use a Demo Account",
          description:
            "When you click on login, a modal will appear with a demo account. Simply click the Login button to use this pre-made account.",
        },
      ],
    },
    {
      title: "Writing Blog Posts",
      subtitle: "Create and manage your blogs easily",
      icon: <BookOpen className="text-primary" />,
      content: [
        {
          step: "Start Writing",
          description:
            "Click the Write button in the navigation bar to begin creating your blog post.",
        },
        {
          step: "Add a Cover Photo",
          description:
            "To add a cover photo to your blog, you can either use an image hosted on any image hosting service and paste its URL, or use an image link from stock photo sites like Unsplash.",
        },
        {
          step: "Choose a Category",
          description:
            "Select a category that best fits your post content. If none of the existing categories match, you can choose 'Other'.",
        },
        {
          step: "Add Tags",
          description:
            "You can add up to 4 tags to your post. Choose from the suggested tags or create your own to help readers find your content.",
        },
        {
          step: "Write Your Content",
          description:
            "Compose your blog content in the editor area. The site uses the TipTap text editor package, allowing you to format and style your content as needed.",
        },
        {
          step: "Publish Your Blog",
          description:
            "Once you're satisfied with your post, click Publish. Your blog will be saved to the MongoDB database, and you can edit or delete it later from your dashboard.",
        },
      ],
    },
    {
      title: "Managing Your Blogs",
      subtitle: "Edit, delete, and organize your posts",
      icon: <Edit className="text-primary" />,
      content: [
        {
          step: "Access Your Blogs",
          description:
            "Click on your avatar in the navigation bar and select 'My Blogs' to view all your published posts.",
        },
        {
          step: "Edit or Delete Options",
          description:
            "Each blog post in your 'My Blogs' section has a three-dot menu icon. Click it to reveal options for editing or deleting the post.",
        },
        {
          step: "Editing a Post",
          description:
            "Selecting 'Edit' will reopen the writing interface with your original content loaded. Make your changes and save them to update your post.",
        },
        {
          step: "Deleting a Post",
          description:
            "If you choose 'Delete', you'll need to confirm your decision. Once confirmed, the post will be permanently removed from the database.",
        },
      ],
    },
    {
      title: "Managing Bookmarks",
      subtitle: "Save and organize your favorite posts",
      icon: <Bookmark className="text-primary" />,
      content: [
        {
          step: "Save a Post",
          description:
            "Click the bookmark icon on any post to save it to your bookmarks.",
        },
        {
          step: "Access Bookmarks",
          description:
            "Find your saved posts in the 'Bookmarks' section of your profile.",
        },
        {
          step: "Remove Bookmarks",
          description:
            "To remove a bookmark, simply click the bookmark icon again on the saved post.",
        },
      ],
    },
    {
      title: "Exploring Content",
      subtitle: "Discover and share content you love",
      icon: <Search className="text-primary" />,
      content: [
        {
          step: "Browse by Category",
          description:
            "The Left sidebar on the homepage features different category sections. Click on any category to view all blogs within that topic.",
        },
        {
          step: "Search for Content",
          description:
            "Use the search bar in the navigation to find specific blogs by title. Results update in real-time as you type.",
        },
        {
          step: "Sort and Filter",
          description:
            "Sort blogs by newest, Random and  most pogged(reactions)",
        },
        {
          step: "Share Posts",
          description:
            "Click on the 3 dots of any blog card, and select share. You can either copy the link or share it directly to a platform.",
        },
      ],
    },
    {
      title: "Social Interactions",
      subtitle: "Engage with content through pogs and comments",
      icon: <MessageSquare className="text-primary" />,
      content: [
        {
          step: "Pog Reactions",
          description:
            "Pog is this site's version of 'likes'. Unlike traditional likes, you can give as many pogs as you want to show your appreciation for a post. Click the pog button on any blog post to add your reactions.",
        },
        {
          step: "View Pog Count",
          description:
            "The total number of pogs a post has received is displayed next to the pog button. This helps identify popular and well-received content.",
        },
        {
          step: "Comments",
          description:
            "The comment feature is not currently functional and isn't planned for this demo blog site. This project is just a part of my portfolio, so stay tuned for future updates!",
        },
      ],
    },
  ];

  return (
    <Card radius="none" className="max-w-3xl mx-auto">
      <CardBody>
        <h1 className="text-2xl font-bold mb-4">How to Use This Site</h1>
        <p className="text-gray-400 mb-6">
          Let's explore what you can do on this site and how to do it.
        </p>

        <Accordion selectionMode="multiple">
          {guideItems.map((item, index) => (
            <AccordionItem
              key={index}
              title={
                <div className="flex items-center gap-2">
                  {item.icon}
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.subtitle}</p>
                  </div>
                </div>
              }
            >
              <ol className="list-decimal pl-5 space-y-4">
                {item.content.map((step, stepIndex) => (
                  <li key={stepIndex}>
                    <h4 className="font-medium mb-1">{step.step}</h4>
                    <p className="text-gray-400">{step.description}</p>
                  </li>
                ))}
              </ol>
            </AccordionItem>
          ))}
        </Accordion>

        <Divider className="my-8" />

        <div className="space-y-2">
          <p className="text-sm text-gray-400">
            This site is a part of my portfolio project. You can reach me for
            any queries or suggestions from the links below:
          </p>
          <div className="flex gap-4 text-sm">
            <Link
              href="https://github.com/DeepsEffect"
              target="_blank"
              className=" hover:underline flex items-center gap-1"
            >
              <FaGithub size={18} />
              GitHub
            </Link>
            <Link
              href="https://x.com/JalalAhmed7845"
              target="_blank"
              className=" hover:underline flex items-center gap-1"
            >
              <FaTwitter size={18} />
              Twitter
            </Link>
            <Link
              href="https://www.linkedin.com/in/jalal-ahmed-dev"
              target="_blank"
              className=" hover:underline flex items-center gap-1"
            >
              <FaLinkedin size={18} />
              LinkedIn
            </Link>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default GuidePage;
