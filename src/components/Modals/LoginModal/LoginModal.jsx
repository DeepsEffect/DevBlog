"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Divider,
  Link,
} from "@nextui-org/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export const LoginModal = ({ btnName }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
      <Modal size="md" isOpen={isOpen} onOpenChange={onOpenChange}>
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
                <form>
                  <div className="space-y-4">
                    <Input
                      variant="underlined"
                      name="email"
                      type="email"
                      placeholder="enter your email"
                    />
                    <Input
                      variant="underlined"
                      name="password"
                      type="password"
                      placeholder="enter your password"
                    />
                  </div>
                </form>
                {/* form ends */}

                {/* log in and register toggle options */}
                <span className="text-sm">
                  don't have an account?
                  <Link href="#" underline="hover">
                    register
                  </Link>
                </span>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Log in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
