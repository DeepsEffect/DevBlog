import React from "react";
import { LoginModal } from "@/components/Modals/LoginModal/LoginModal";

export default function () {
  return (
    <div className="flex items-center justify-center lg:mt-10">
      <LoginModal btnName={"Press here to Login"} />
    </div>
  );
}
