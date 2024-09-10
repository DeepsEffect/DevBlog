import { Button } from "@nextui-org/react";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function SocialLoginButtons() {
  return (
    <div className="space-y-3">
      {/* google button*/}
      <Button className="w-full">
        <FcGoogle className="text-xl" /> Continue with Google
      </Button>
      {/* GitHub button */}
      <Button className="w-full">
        <FaGithub className="text-xl" /> Continue with GitHub
      </Button>
    </div>
  );
}
