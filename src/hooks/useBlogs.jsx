import { useQuery } from "@tanstack/react-query";

const useBlogs = ({ email }) => {
  const fetchBlogs = async () => {
    if (!email) {
      return [];
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/my-blogs?email=${email}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch blogs");
    }
    return res.json();
  };

  const {
    data: blogs = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["my-blogs", email],
    queryFn: fetchBlogs,
    enabled: !!email, // Only run query if email exists
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    retry: 2, // Retry failed requests
  });

  return {
    blogs,
    loading: isLoading,
    error: error?.message,
    refetch,
  };
};
export default useBlogs;
