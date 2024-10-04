"use client";
import Tiptap from "@/components/Tiptap/Tiptap";
import { Button, Input, Select, SelectItem, Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { toast } from "react-toastify";

const EditBlogForm = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const [blogContent, setBlogContent] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");
  const [category, setCategory] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  //   fetch the blog data
  const fetchBlog = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/my-blogs/blog?id=${id}`
    );
    const data = await res.json();
    return data;
  };
  const {
    data: blog = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: fetchBlog,
    enabled: !!id,
  });

  // Update state when blog data is available
  useEffect(() => {
    if (blog) {
      setBlogTitle(blog.title || "");
      setCoverPhoto(blog.coverPhoto || "");
      setCategory(blog.category || "");
      setBlogContent(blog.content || "");
    }
  }, [blog]);

  //   handle update blog
  const handleUpdateBlog = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    const updateDoc = {
      title: blogTitle,
      coverPhoto: coverPhoto,
      content: blogContent,
      category: category,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/my-blogs/edit?id=${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateDoc),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update blog");
      }

      const updatedBlog = await response.json();
      toast.success("Blog updated successfully!");
      refetch();
      router.push(`/my-blogs?email=${blog?.author?.email}`);
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error(error.message || "Failed to update blog");
    } finally {
      setIsUpdating(false);
    }
  };

  // spinner while fetching
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="max-w-3xl mx-auto mt-4 lg:mt-10 p-2 lg:p-0">
      {/* blog form */}
      <form onSubmit={handleUpdateBlog}>
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
                selectedKeys={new Set([category])}
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
            <Tiptap setContent={setBlogContent} content={blog?.content} />
          </section>

          {/* submit button */}
          <Button
            variant="flat"
            color="primary"
            type="submit"
            fullWidth
            className="font-bold"
            isDisabled={isUpdating}
            isLoading={isUpdating}
          >
            {isUpdating ? "Updating Blog" : "Update Blog"}
          </Button>
        </div>
      </form>
    </div>
  );
};

const Edit = () => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    }
  >
    <EditBlogForm />
  </Suspense>
);

export default Edit;
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
