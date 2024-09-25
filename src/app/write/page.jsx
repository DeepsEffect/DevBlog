"use client";
import CustomTagInput from "@/components/CustomTagInput/CustomTagInput";
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
  const [tags, setTags] = useState([]);
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
      // readingTime: readingTime || 0, //* doing the reading time calc in the client so don't need this field
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
      .replace(/(^-|-$)/g, "");

    const uniquePart = Math.random().toString(36).substring(2, 6); // Generates a 4-character random string

    return `${baseSlug}-${uniquePart}`;
  };

  // category lists
  const catItems = [
    {
      key: "web-dev",
      label: "Web Dev",
    },
    {
      key: "frontend-dev",
      label: "Front-end Dev",
    },
    {
      key: "backend-dev",
      label: "Back-end Dev",
    },
    {
      key: "fullstack-dev",
      label: "Full-stack Dev",
    },
    {
      key: "framework",
      label: "Framework",
    },
    {
      key: "javascript",
      label: "Javascript",
    },
    {
      key: "typescript",
      label: "TypeScript",
    },
    {
      key: "react",
      label: "React.js",
    },
    {
      key: "next.js",
      label: "Next.js",
    },
    {
      key: "angular",
      label: "Angular",
    },
    {
      key: "vue",
      label: "Vue.js",
    },
    {
      key: "tailwind",
      label: "Tailwind CSS",
    },
    {
      key: "node.js",
      label: "Node.js",
    },
    {
      key: "database",
      label: "Database",
    },
    {
      key: "devops",
      label: "DevOps",
    },
    {
      key: "blockchain",
      label: "Blockchain",
    },
    {
      key: "security",
      label: "Security",
    },
    {
      key: "cloud",
      label: "Cloud Computing",
    },
    {
      key: "testing",
      label: "Testing",
    },
    {
      key: "ai-ml",
      label: "AI/ML",
    },
    {
      key: "open-source",
      label: "Open Source",
    },
    {
      key: "others",
      label: "Others",
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
                isRequired
                type="text"
                label={"Add blog title"}
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
              />
            </div>
          </section>

          {/* cover photo and category section section */}
          <section className="flex flex-col lg:flex-row gap-4">
            {/* cover photo */}
            <div className="w-full">
              <Input
                variant="flat"
                type="url"
                label={"Cover photo link (optional)"}
                value={coverPhoto}
                onChange={(e) => setCoverPhoto(e.target.value)}
              />
            </div>
            {/* category */}
            <div className="w-full">
              <Select
                required
                isRequired
                radius="md"
                variant="flat"
                label="Select a category"
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

          {/* tags section */}
          <section>
            <CustomTagInput tags={tags} setTags={setTags} maxTags={4} />
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
