"use client";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import React from "react";

export const LeftSidebar = ({ onCategorySelect, selectedCategory }) => {
  // category lists
  const catItems = [
    {
      key: "web-dev",
      label: "Web Dev",
    },
    {
      key: "frontend-dev",
      label: "Front-end Dev",
    },
    {
      key: "backend-dev",
      label: "Back-end Dev",
    },
    {
      key: "fullstack-dev",
      label: "Full-stack Dev",
    },
    {
      key: "framework",
      label: "Framework",
    },
    {
      key: "javascript",
      label: "Javascript",
    },
    {
      key: "typescript",
      label: "TypeScript",
    },
    {
      key: "react",
      label: "React.js",
    },
    {
      key: "next.js",
      label: "Next.js",
    },
    {
      key: "angular",
      label: "Angular",
    },
    {
      key: "vue",
      label: "Vue.js",
    },
    {
      key: "tailwind",
      label: "Tailwind CSS",
    },
    {
      key: "node.js",
      label: "Node.js",
    },
    {
      key: "database",
      label: "Database",
    },
    {
      key: "devops",
      label: "DevOps",
    },
    {
      key: "blockchain",
      label: "Blockchain",
    },
    {
      key: "security",
      label: "Security",
    },
    {
      key: "cloud",
      label: "Cloud Computing",
    },
    {
      key: "testing",
      label: "Testing",
    },
    {
      key: "ai-ml",
      label: "AI/ML",
    },
    {
      key: "open-source",
      label: "Open Source",
    },
    {
      key: "others",
      label: "Others",
    },
  ];
  return (
    <div>
      <Card>
        <CardHeader>
          <h2 className="text-xl flex justify-center w-full font-bold">
            Blog Categories
          </h2>
        </CardHeader>

        <CardBody className="flex flex-col gap-3">
          {catItems?.map((item) => (
            <Button
              onClick={() => onCategorySelect(item.key)}
              variant={selectedCategory ? "solid" : "light"}
              key={item.key}
            >
              {item.label}
            </Button>
          ))}
        </CardBody>
      </Card>
    </div>
  );
};
