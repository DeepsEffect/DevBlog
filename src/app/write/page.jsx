"use client";
import Tiptap from "@/components/Tiptap/Tiptap";
import usePrivateRoute from "@/hooks/usePrivateRoute";
import { Button, Input, Spinner, Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const WritePage = () => {
  const { session, status } = usePrivateRoute();
  const router = useRouter();
  const [blogTitle, setBlogTitle] = useState(""); // Handle title
  const [blogContent, setBlogContent] = useState(""); // Handle content
  const [coverPhoto, setCoverPhoto] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [readingTime, setReadingTime] = useState("");
  const [loading, setLoading] = useState(false);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen gap-2">
        <Spinner />
        <p>Loading...</p>
      </div>
    );
  }

  if (!session) {
    return null; // Return nothing while redirecting
  }

  // handle posting the blog data
  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // make blog data
    const blogData = {
      title: blogTitle,
      slug: generateSlut(blogTitle),
      content: blogContent,
      coverPhoto: coverPhoto || "",
      author: {
        name: session?.user?.name,
        email: session?.user?.email,
        image: session?.user?.image,
      },
      postedDate: new Date().toISOString(),
      tags: tags || [],
      category: category || "",
      readingTime: readingTime || 0,
      reactions: {
        pogs: 0,
        comments: 0,
      },
    };
    // console.log(blogData);

    try {
      // send the blog data to DB
      const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/write/api`, {
        method: "POST",
        body: JSON.stringify(blogData),
        headers: {
          "Content-type": "application/json",
        },
      });

      const responseData = await resp.json(); // Parse the JSON response

      if (resp.ok) {
        toast.success(responseData.message || "Blog posted successfully!");
        router.push("/");
      } else {
        toast.error(responseData.message || "Failed to post blog.");
      }
    } catch (error) {
      console.log("error during fetch: ", error);
    } finally {
      setLoading(false);
    }
  };

  // generate unique slug from title
  const generateSlut = (title) => {
    const baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const uniquePart = Math.random().toString(36).substring(2, 6); // Generates a 4-character random string

    return `${baseSlug}-${uniquePart}`;
  };

  // category lists
  const catItems = [
    {
      key: "webdev",
      label: "Web Dev",
    },
    {
      key: "frontend",
      label: "Front-end Dev",
    },
    {
      key: "backend",
      label: "Back-end Dev",
    },
    {
      key: "framework",
      label: "Framework",
    },
    {
      key: "js",
      label: "Javascript",
    },
    {
      key: "react",
      label: "React.js",
    },
    {
      key: "nextjs",
      label: "Next.js",
    },
    {
      key: "tailwind",
      label: "Tailwind CSS",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto mt-4 lg:mt-10 p-2 lg:p-0">
      {/* blog form */}
      <form onSubmit={handleBlogSubmit}>
        <div className="space-y-4">
          {/* title section */}
          <section>
            <div>
              <Input
                required
                size="lg"
                className="font-bold text-2xl rounded-none"
                variant="flat"
                type="text"
                placeholder="Write your blog title here..."
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
              />
            </div>
          </section>

          {/* categories and tags section */}
          <section>
            <div>
              <Select
                label="Select a category"
                className="max-w-xs"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                {catItems.map((item) => (
                  <SelectItem key={item.key} value={item.key}>
                    {item.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </section>

          {/* Tiptap editor section */}
          <section>
            <Tiptap setContent={setBlogContent} />
          </section>

          {/* submit button */}
          <Button
            variant="flat"
            color="primary"
            type="submit"
            fullWidth
            className="font-bold"
            isLoading={loading}
          >
            {loading ? "Posting Blog" : "Post Blog"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default WritePage;
