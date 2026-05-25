"use client"
import { navigation } from "@/constant";
import { X } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  showNav: boolean;
  closeNav: () => void;
};

const MobileNav = ({ closeNav, showNav }: Props) => {
  const navOpen = showNav ? "translate-x-0" : "translate-x-[-200%]";

  return (
    <div>
      <div
        className={`fixed ${navOpen} top-0 inset-0 transform transition-all duration-500 z-[100002] bg-black opacity-70 w-full h-screen`}
      />
      <div
        className={`fixed top-0 ${navOpen} flex flex-col h-full transform transition-all duration-500 delay-300 w-[80%] sm:w-[60%] bg-white z-[1000050] px-6 py-8 gap-2`}
      >
        <Link href="/" className="flex items-center gap-2 text-blue-600 font-semibold text-lg mb-6">
          <span>CollegeReview</span>
        </Link>

        {navigation.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              onClick={closeNav}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <Icon size={18} />
              <span>{link.name}</span>
            </Link>
          );
        })}

        <Link
          href="/want-to-know"
          onClick={closeNav}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 text-sm font-medium transition-colors mt-2"
        >
          <span>Want to Know</span>
        </Link>

        <X
          onClick={closeNav}
          className="absolute top-4 right-4 w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-900 transition-colors"
        />
      </div>
    </div>
  );
};

export default MobileNav;