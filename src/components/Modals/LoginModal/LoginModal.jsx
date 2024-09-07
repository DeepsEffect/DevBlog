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
} from "@nextui-org/react";

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
              <ModalHeader className="flex flex-col gap-1">
                Please Log in
              </ModalHeader>
              <ModalBody>
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
