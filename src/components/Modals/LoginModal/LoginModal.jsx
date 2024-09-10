"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Link,
} from "@nextui-org/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export const LoginModal = ({ btnName }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
    console.log(resp);
    if (resp.status === 200) {
      // Redirect on success
      setLoading(false);
      onclose;
      router.push("/");
    } else {
      console.log("Login failed:", resp.error);
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="light"
        className="text-text text-sm"
        href="#"
        onPress={onOpen}
      >
        {btnName}
      </Button>
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
                {/* google button*/}
                <Button className="w-full">
                  <FcGoogle className="text-xl" /> Continue with Google
                </Button>

                {/* GitHub button */}
                <Button className="w-full">
                  <FaGithub className="text-xl" /> Continue with GitHub
                </Button>

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
                    >
                      {loading ? "Login In" : "Log in"}
                    </Button>
                  </div>
                </form>
                {/* form ends */}

                {/* log in and register toggle options */}
                <span className="text-sm">
                  don't have an account?
                  <Link href="register" underline="hover">
                    register
                  </Link>
                </span>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
