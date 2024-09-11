"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Input,
  Link,
  Spinner,
} from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SocialLoginButtons from "@/components/shared/SocialLoginButtons/SocialLoginButtons";
import { toast } from "react-toastify";

export const LoginModal = ({ btnName }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  // show a spinner if session is loading
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  // redirect if user is already logged in
  if (session) {
    router.replace("/");
    return null;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);
    const resp = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    // Handle response
    // console.log(resp);
    if (resp.status === 200) {
      setLoading(false);
      toast.success("logged In successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
      });
      onclose;
      router.push("/");
    } else {
      console.log("Login failed:", resp.error);
      toast.error(resp.error);
      setLoading(false);
    }
  };

  return (
    <>
      {/* modal open button */}
      {btnName ? (
        <Button
          variant="light"
          className="text-text text-sm"
          href="#"
          onPress={onOpen}
        >
          {btnName}
        </Button>
      ) : (
        <Link
          color="primary"
          underline="hover"
          className="ml-1 text-medium cursor-pointer"
          onPress={onOpen}
        >
          Login
        </Link>
      )}
      <Modal
        size="md"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center">
                Please Log in
              </ModalHeader>
              <ModalBody>
                {/* google and github login buttons */}
                <SocialLoginButtons />
                {/* divider */}
                <div className="flex items-center">
                  <div className="flex-grow border-t border-gray-500"></div>
                  <span className="px-2">or</span>
                  <div className="flex-grow border-t border-gray-500"></div>
                </div>
                {/* divider ends */}

                {/* Log in form */}
                <form onSubmit={handleLogin}>
                  <div className="space-y-4">
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
                      placeholder="enter your password"
                    />
                    <Button
                      fullWidth
                      type="submit"
                      variant="flat"
                      color="primary"
                      isDisabled={loading}
                      isLoading={loading}
                      className="font-bold"
                    >
                      {loading ? "Login In" : "Log in"}
                    </Button>
                  </div>
                </form>
                {/* form ends */}

                {/* log in and register toggle options */}
                <div className="text-sm ">
                  don't have an account?
                  <Link
                    className="ml-1 text-medium"
                    href="register"
                    underline="hover"
                  >
                    register
                  </Link>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
