"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Building2, HelpCircle, MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navigation } from "@/constant";

type Props = {
  openNav: () => void;
};

const Nav = ({ openNav }: Props) => {
  const pathname = usePathname();
  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-blue-600 font-semibold text-lg">
            <Building2 size={22} />
            <span className="text-gray-900">CollegeReview</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    ${isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/want-to-know"
              className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 text-sm font-medium transition-colors"
            >
              <HelpCircle size={18} />
              <span>Want to Know</span>
            </Link>
            <Button size="lg" className="cursor-pointer">
              SignUp
            </Button>
            <MenuIcon
              onClick={openNav}
              className="w-6 h-6 cursor-pointer lg:hidden text-gray-600"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Nav;