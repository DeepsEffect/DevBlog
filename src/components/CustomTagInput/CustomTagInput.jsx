import React, { useState } from "react";
import { Input, Chip, Button } from "@nextui-org/react";

const CustomTagInput = ({ tags, setTags, maxTags = 4 }) => {
  const [inputValue, setInputValue] = useState("");

  const predefinedTags = [
    "JavaScript",
    "React",
    "Node.js",
    "CSS",
    "HTML",
    "TypeScript",
    "Next.js",
    "Vue.js",
    "Angular",
  ];

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && inputValue && tags.length < maxTags) {
      e.preventDefault();
      addTag(inputValue);
    }
  };

  const addTag = (tag) => {
    if (!tags.includes(tag) && tags.length < maxTags) {
      setTags([...tags, tag]);
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="space-y-2">
      <Input
        label="Add tags (max 4)"
        placeholder="Type and press Enter to add a tag"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag) => (
          <Chip key={tag} onClose={() => removeTag(tag)} variant="flat">
            {tag}
          </Chip>
        ))}
      </div>
      <div className="mt-2">
        <p className="text-sm mb-1">Suggested tags:</p>
        <div className="flex flex-wrap gap-1">
          {predefinedTags.map((tag) => (
            <Button
              key={tag}
              size="sm"
              auto
              flat
              onClick={() => addTag(tag)}
              disabled={tags.includes(tag) || tags.length >= maxTags}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomTagInput;
