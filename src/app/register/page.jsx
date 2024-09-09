"use client";
import { Button, Input, Link } from "@nextui-org/react";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);

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
        `${process.env.NEXT_PUBLIC_API_URL}/register/api`,
        {
          method: "POST",
          body: JSON.stringify(newUser),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await resp.json(); // Parse the response

      if (resp.status === 201) {
        console.log("User created successfully");
        form.reset(); // Reset the form on success
      } else {
        console.log("Error:", data.message); // Handle other status codes
        // TODO: update UI with error message
      }
    } catch (error) {
      console.error("Fetch error:", error); // Handle network errors
      // TODO: update UI with error message
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
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </p>
        </section>

        {/* social sign up section */}
        <section className="space-y-4">
          {/* google button*/}
          <Button className="w-full">
            <FcGoogle className="text-xl" /> Continue with Google
          </Button>
          {/* GitHub button */}
          <Button className="w-full">
            <FaGithub className="text-xl" /> Continue with GitHub
          </Button>
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
              >
                create account
              </Button>
            )}
          </div>
        </form>
        {/* toggle option */}
        {/* <span>
          already have an account?
          <Link href="login" underline="hover">
            log in
          </Link>
        </span> */}
      </div>
    </div>
  );
};

export default RegisterPage;
