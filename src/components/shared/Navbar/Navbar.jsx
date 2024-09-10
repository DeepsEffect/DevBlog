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
  Avatar,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Dropdown,
} from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";
import { TfiWrite } from "react-icons/tfi";
import { LoginModal } from "@/components/Modals/LoginModal/LoginModal";
import { useSession } from "next-auth/react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const session = useSession();
  console.log(session);
  const user = false;

  return (
    <Nav
      maxWidth="2xl"
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>
      {/* title for small view */}
      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Link href="/" className="font-bold text-inherit">
            DevBlog
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* navbar center content */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <Link href="/" className="font-bold text-inherit">
            DevBlog
          </Link>
        </NavbarBrand>
        {/* search bar */}
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

      {/* conditional rendering  */}
      {user ? (
        <>
          {/* show this if user is available*/}
          <NavbarContent justify="end">
            <NavbarItem className="flex justify-center items-center gap-1 cursor-pointer">
              <TfiWrite />
              write
            </NavbarItem>
            <NavbarItem>
              <Dropdown className="bg-background" placement="bottom-start">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="secondary"
                    name="Jason Hughes"
                    size="sm"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">zoey@example.com</p>
                  </DropdownItem>
                  <DropdownItem key="profile">My Profile</DropdownItem>
                  <DropdownItem key="blogs">My Blogs</DropdownItem>
                  <DropdownItem key="logout" color="danger">
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          </NavbarContent>
        </>
      ) : (
        <>
          {/* show this if no user is not available */}
          <NavbarContent justify="end">
            <NavbarItem className="hidden lg:flex">
              <LoginModal btnName={"Log in"} />
            </NavbarItem>
            <NavbarItem>
              <Link href="register">
                <Button color="primary" href="#" variant="flat">
                  Get Started
                </Button>
              </Link>
            </NavbarItem>
          </NavbarContent>
        </>
      )}

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
        <NavbarItem className="text-medium">Our Story</NavbarItem>
        <NavbarItem className="text-medium">
          <div className="flex items-center gap-1 cursor-pointer">
            <TfiWrite />
            write
          </div>
        </NavbarItem>
      </NavbarMenu>
    </Nav>
  );
};
