"use client";

import {
  NavbarContent,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
  Button,
  DropdownSection,
} from "@heroui/react";
import React from "react";
import ThemeSwitcherSkeleton from "./ThemeSwitcherSkeleton";
import { IoIosArrowDown } from "react-icons/io";
import { TiUpload } from "react-icons/ti";
import { FaHouseUser, FaGamepad } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import dynamic from "next/dynamic";
import { signOut, useSession } from "next-auth/react";

const ThemeSwitcher = dynamic(() => import("./ThemeSwitcher"), {
  ssr: false,
  loading: () => <ThemeSwitcherSkeleton />,
});

const UserPanel = () => {
  const { data: session } = useSession();

  return (
    <NavbarContent justify="end" className="gap-2">
      <div className="flex items-center gap-2 group">
        <Avatar
          isBordered
          radius="full"
          as="button"
          color="success"
          name="username"
          className="w-8 h-8"
          size="sm"
          src={session!.user.image || "https://i.pravatar.cc/300"}
        />
        <div className="text-sm font-medium group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {session!.user.username}
        </div>
      </div>

      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button isIconOnly variant="light" className="w-8 h-8 min-w-8">
            <IoIosArrowDown className="text-lg" />
          </Button>
        </DropdownTrigger>

        <DropdownMenu
          aria-label="Profile Actions"
          variant="flat"
          className="bg-content2 dark:bg-content2 border border-content3"
        >
          <DropdownItem
            key="color_mode"
            variant="light"
            className="h-8"
            endContent={
              <div className="absolute top-0 right-0 h-full z-10">
                <ThemeSwitcher />
              </div>
            }
          >
            {" "}
          </DropdownItem>
          <DropdownSection title="Explore" showDivider>
            <DropdownItem
              key="my_library"
              endContent={<FaGamepad />}
              className="text-content1"
            >
              My Library
            </DropdownItem>
          </DropdownSection>
          <DropdownSection title="Create" showDivider>
            <DropdownItem
              key="upload_game"
              endContent={<TiUpload />}
              className="text-content1"
            >
              Upload Game
            </DropdownItem>
          </DropdownSection>
          <DropdownSection title="Account" showDivider>
            <DropdownItem
              key="view_profile"
              endContent={<FaHouseUser />}
              className="text-content1"
            >
              View Profile
            </DropdownItem>
            <DropdownItem
              key="logout"
              endContent={<BiLogOut />}
              onPress={() => signOut({ callbackUrl: "/" })}
              className="text-content1"
            >
              Log Out
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </NavbarContent>
  );
};

export default UserPanel;
