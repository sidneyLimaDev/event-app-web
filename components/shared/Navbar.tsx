"use client";
import { headerLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <ul className="justfy-between flex w-full gap-5 md:flex-row flex-col">
      {headerLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <li
            key={link.href}
            className={`${
              isActive ? "text-primary" : ""
            } flex items-center p-medium-16 whitespace-nowrap `}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Navbar;
