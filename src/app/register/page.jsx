"use client";
import { Button, Input, Link } from "@nextui-org/react";
import React, { useState } from "react";
import SocialLoginButtons from "@/components/shared/SocialLoginButtons/SocialLoginButtons";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoginModal } from "@/components/Modals/LoginModal/LoginModal";
import { toast } from "react-toastify";
import SpinnerCustom from "@/components/shared/SpinnerCustom/SpinnerCustom";

const RegisterPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession(); // Destructure session and status
  const router = useRouter();
  // console.log(session);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // show a spinner if session is loading
  if (status === "loading") {
    return (
      <div>
        <SpinnerCustom />
      </div>
    );
  }

  // redirect if user is already logged in
  if (session) {
    router.replace("/");
    return null;
  }

  const registerUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    const newUser = { name, photo, email, password };
    // console.log(newUser);

    try {
      // Send newUser data to DB
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/register`,
        {
          method: "POST",
          body: JSON.stringify(newUser),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(resp);

      const data = await resp.json(); // Parse the response
      // console.log("Response Status:", resp.status);
      // console.log("Response Data:", data);

      if (resp.status === 201) {
        toast.success("Account Created Successfully! You may now Login");
        router.replace("/login");
        form.reset(); // Reset the form on success
      } else {
        console.error("Error:", data.message);
        toast.error(data.message); // Handle other status codes
      }
    } catch (error) {
      console.error("Fetch error:", error); // Handle network errors
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        background: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)),
                     url('https://i.ibb.co.com/LpBB6RN/techbg.jpg') no-repeat center center/cover`,
        minHeight: "100vh",
      }}
      className="flex justify-center items-center"
    >
      <div className="w-full lg:max-w-lg mx-auto p-4 lg:p-0">
        {/* title section */}
        <section className="text-center space-y-1 p-4">
          <h2 className=" font-bold text-3xl">Join the DevBlog Community</h2>
          <p className="text-medium">
            read how to get started{" "}
            <span>
              <Link href="/guide" className="hover:underline">
                Guide
              </Link>
            </span>
          </p>
        </section>

        {/* google and github login buttons */}
        <section>
          <SocialLoginButtons />
        </section>

        {/* divider */}
        <div className="flex items-center py-4">
          <div className="flex-grow border-t border-gray-500"></div>
          <span className="px-2">or</span>
          <div className="flex-grow border-t border-gray-500"></div>
        </div>
        {/* divider ends */}

        {/* user input section */}
        <form onSubmit={registerUser}>
          <div className="space-y-4">
            <Input
              required
              variant="underlined"
              name="name"
              type="text"
              placeholder="enter your name"
            />
            <Input
              variant="underlined"
              name="photo"
              type="url"
              placeholder="paste your photo url"
            />
            <Input
              required
              variant="underlined"
              name="email"
              type="email"
              placeholder="enter your email"
            />
            <Input
              required
              variant="underlined"
              name="password"
              type="password"
              placeholder="make a password"
            />
            {loading ? (
              <Button
                fullWidth
                variant="flat"
                color="primary"
                type="submit"
                isLoading={true}
              >
                creating account
              </Button>
            ) : (
              <Button
                fullWidth
                variant="flat"
                color="primary"
                type="submit"
                isLoading={false}
                className="font-bold"
              >
                create account
              </Button>
            )}
          </div>
        </form>
        {/* toggle option to login page */}
        <div>
          already have an account?{" "}
          <span onClick={openModal} className="text-primary hover:underline cursor-pointer">
            Login
          </span>
        </div>
      </div>
      <LoginModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default RegisterPage;
