"use client";

import { NavbarItem } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Games", href: "/games" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Another Link", href: "/" },
  ];

  return (
    <>
      {links.map((link) => (
        <NavbarItem>
          <Link
            // className={`${link.href === currentPath ? "text-zinc-100" : "nav-link"}`}
            href={link.href}
          >
            {link.label}
          </Link>
        </NavbarItem>
      ))}
    </>
  );
};

export default NavLinks;
