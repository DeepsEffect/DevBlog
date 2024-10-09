"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Input,
  Link,
} from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import SocialLoginButtons from "@/components/shared/SocialLoginButtons/SocialLoginButtons";
import { toast } from "react-toastify";

export const LoginModal = ({ isOpen, onClose }) => {
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
    // console.log(resp);
    if (resp.status === 200) {
      setLoading(false);
      toast.success("logged In successfully!");
      onclose;
      router.push("/");
    } else {
      console.log("Login failed:", resp.error);
      toast.error(resp.error);
      setLoading(false);
    }
  };

  return (
    <Modal size="md" backdrop="blur" isOpen={isOpen} onClose={onClose}>
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
  );
};
