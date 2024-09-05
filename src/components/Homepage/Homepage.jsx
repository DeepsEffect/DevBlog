import { Card, CardHeader } from "@nextui-org/react";
import React from "react";

export const Homepage = () => {
  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-4 px-4 py-6 ">
      {/* TODO: toggle button for right sidebar for mobile view */}

      {/* left sidebar */}
      <aside className="hidden md:block md:col-span-1 lg:col-span-3 p-4">
        <Card>
          <CardHeader>left sidebar content</CardHeader>
        </Card>
      </aside>

      {/* main content */}
      <main className="col-span-1 md:col-span-2 lg:col-span-6 p-4 text-center">
        <div>main blog content</div>
      </main>

      {/* right sidebar content */}
      <aside className=" col-span-1 lg:col-span-3 p-4">
        <Card>
          <CardHeader>right sidebar content</CardHeader>
        </Card>
      </aside>
    </div>
  );
};
