"use client";

import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import Link from "next/link";
import { AiOutlineDown } from "react-icons/ai";
import ActiveLink from "../components/ActiveLink";

interface NavLink {
  label: string;
  href?: string;
  subLinks?: { label: string; href: string }[];
}

const navLinks: NavLink[] = [
  { label: "Projects", href: "/dashboard" },
  { label: "Analytics", href: "/dashboard/analytics" },
  {
    label: "Earnings",
    subLinks: [
      { label: "Payments", href: "/dashboard/purchases" },
      { label: "Payout", href: "/dashboard/payouts" },
    ],
  },
  { label: "Posts", href: "/dashboard/posts" },
];

export default function DashboardNavbar() {
  return (
    <Navbar className="text-white" height="2rem">
      <NavbarContent className="h-full">
        {navLinks.map((navItem) =>
          navItem.subLinks ? (
            <Dropdown key={navItem.label} className="rounded-sm">
              <DropdownTrigger>
                <Button
                  radius="none"
                  className="group capitalize min-w-fit h-full px-2 text-inherit text-md bg-transparent"
                >
                  <div className="hover:text-primary">{navItem.label}</div>
                  <AiOutlineDown />
                </Button>
              </DropdownTrigger>
              <DropdownMenu className="p-0.5">
                {navItem.subLinks.map((subLink) => (
                  <DropdownItem
                    key={subLink.label}
                    className="rounded-none bg-background"
                  >
                    <Link href={subLink.href} className="w-full block">
                      {subLink.label}
                    </Link>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          ) : (
            <NavbarItem
              key={navItem.label}
              className="h-full px-2 pointer-events-none"
            >
              <ActiveLink href={navItem.href!}>
                {({ isActive }) => (
                  <div
                    className={`h-full px-1 content-center hover:text-primary hover:bg-content1 hover:bg-opacity-25 pointer-events-auto ${
                      isActive
                        ? "shadow-[inset_0_-4px_0_hsl(var(--nextui-primary))]"
                        : ""
                    }`}
                  >
                    {navItem.label}
                  </div>
                )}
              </ActiveLink>
            </NavbarItem>
          )
        )}
      </NavbarContent>
    </Navbar>
  );
}
