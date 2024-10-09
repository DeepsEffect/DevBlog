"use client";
import React from "react";
import { LoginModal } from "@/components/Modals/LoginModal/LoginModal";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SpinnerCustom from "@/components/shared/SpinnerCustom/SpinnerCustom";

export default function () {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (status === "loading") {
    return <SpinnerCustom />;
  }
  // redirect if user is already logged in
  if (session) {
    router.replace("/");
    return null;
  }

  return (
    <div className="flex items-center justify-center mt-5 lg:mt-10">
      <Button onClick={openModal} variant="flat">
        Click here to Login
      </Button>
      <LoginModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
