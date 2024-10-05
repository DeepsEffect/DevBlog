"use client";
import React from "react";
import {
  Navbar as Nav,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Button,
  Avatar,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Dropdown,
} from "@nextui-org/react";
import { BsCardText, BsChatRightText, BsChatSquareText } from "react-icons/bs";
import { LoginModal } from "@/components/Modals/LoginModal/LoginModal";
import { useSession, signOut } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Search from "./Search/Search";
import { LeftSidebar } from "@/components/Homepage/LeftSidebar/LeftSidebar";
import { useCategory } from "@/contexts/CategoryContext";
import { RxPencil2 } from "react-icons/rx";

export const Navbar = () => {
  const { selectedCategory, handleSelectedCategory } = useCategory();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const session = useSession();
  const router = useRouter();
  // console.log(session);

  // handle sign out
  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      toast.success("Logged out successfully");

      // Navigate to the home page
      router.push("/");
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

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
          <Search />
        </NavbarItem>
      </NavbarContent>

      {/* conditional rendering  */}
      {session?.status === "loading" ? (
        // Show loading state while the session is being fetched
        <NavbarContent justify="end">
          <NavbarItem>Loading...</NavbarItem>
        </NavbarContent>
      ) : session?.data ? (
        <>
          {/* show this if user is available */}
          <NavbarContent justify="end">
            {/* write button */}
            <NavbarItem>
              <Link href="/write" className="flex gap-1 items-center">
                <RxPencil2 className="text-xl" />
                Write
              </Link>
            </NavbarItem>

            {/* guide  */}
            <NavbarItem className="hidden lg:flex">
              <Link href={"/guide"} className="flex gap-1 items-center ">
                <BsCardText className="text-xl" />
                Guide
              </Link>
            </NavbarItem>

            {/* avatar */}
            <NavbarItem>
              <Dropdown className="bg-background" placement="bottom-start">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="secondary"
                    name={session.data?.user?.name}
                    size="sm"
                    src={session.data?.user?.image}
                    textValue={session.data?.user?.name || "User Avatar"}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem
                    textValue="signed in as"
                    key="profile"
                    className="h-14 gap-2"
                  >
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">
                      {session?.data?.user?.name || session.data?.user?.email}
                    </p>
                  </DropdownItem>
                  <DropdownItem textValue="my profile" key="profile2">
                    <Link
                      href={"/my-profile"}
                      className="w-full h-full flex items-center"
                    >
                      My Profile
                    </Link>
                  </DropdownItem>
                  <DropdownItem key="blogs" textValue="My Blogs">
                    <Link
                      href={`/my-blogs?email=${encodeURIComponent(
                        session?.data?.user?.email
                      )}`}
                      className="w-full h-full flex items-center"
                    >
                      My Blogs
                    </Link>
                  </DropdownItem>
                  <DropdownItem key="bookmarks" textValue="My Bookmarks">
                    <Link
                      href="/my-bookmarks"
                      className="w-full h-full flex items-center"
                    >
                      My Bookmarks
                    </Link>
                  </DropdownItem>
                  <DropdownItem
                    textValue="logout"
                    onClick={handleSignOut}
                    key="logout"
                    color="danger"
                  >
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          </NavbarContent>
        </>
      ) : (
        <>
          {/* show this if user is not available */}
          <NavbarContent justify="end">
            {/* login */}
            <NavbarItem className="hidden lg:flex">
              <LoginModal btnName={"Log in"} />
            </NavbarItem>
            {/* register */}
            <NavbarItem>
              <Button
                onClick={() => router.push("/register")}
                color="primary"
                variant="flat"
              >
                Get Started
              </Button>
            </NavbarItem>
          </NavbarContent>
        </>
      )}

      {/* mobile view */}
      <NavbarMenu>
        <Search />
        <NavbarItem key="our-story" className="text-medium">
          <LeftSidebar
            onCategorySelect={handleSelectedCategory}
            selectedCategory={selectedCategory}
          />
        </NavbarItem>
      </NavbarMenu>
    </Nav>
  );
};
