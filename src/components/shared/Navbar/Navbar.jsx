"use client";
import React from "react";
import {
  Navbar as Nav,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Input,
} from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Nav isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>
      {/* title for small view */}
      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <p className="font-bold text-inherit">DevBlog</p>
        </NavbarBrand>
      </NavbarContent>

      {/* navbar center content */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <p className="font-bold text-inherit">DevBlog</p>
        </NavbarBrand>
        <NavbarItem>
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
          />
        </NavbarItem>
      </NavbarContent>

      {/* show this if no user found */}
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link className="text-text text-sm" href="#">
            Sign In
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Get Started
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* mobile view */}
      <NavbarMenu>
        <NavbarItem>
          <Input
            classNames={{
              base: "max-w-full h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="search blog..."
            size="sm"
            startContent={<SearchIcon size={18} />}
            type="search"
          />
        </NavbarItem>
        <NavbarItem className="text-sm">Our Story</NavbarItem>
        <NavbarItem className="text-sm">Write</NavbarItem>
      </NavbarMenu>
    </Nav>
  );
};
