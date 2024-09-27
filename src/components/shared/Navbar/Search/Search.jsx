import { Input } from "@nextui-org/react";
import React from "react";
import { SearchIcon } from "./SearchIcon";
import { useSearch } from "@/contexts/SearchContext";

export default function Search() {
  const { setSearchQuery } = useSearch();
  return (
    <div>
      <Input
        classNames={{
          base: "sm:max-w-full md:min-w-[400px] lg:min-w-[500px] h-10",
          mainWrapper: "h-full",
          input: "text-small",
          inputWrapper:
            "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
        }}
        placeholder="search blog..."
        size="sm"
        startContent={<SearchIcon size={18} />}
        type="search"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}
