'use client'
import Link from "next/link"
import { usePathname } from "next/navigation";
import React from "react";
interface Props {
    path: string;
    text: string;
    icon: React.ReactNode;

}

export const SidebarItem = ({path, text, icon}:Props) => {
    const pathName = usePathname()
  return (
    <li>
        <Link href={path} className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl ${(pathName===path)&& 'text-white bg-gradient-to-r from-sky-600 to-cyan-400'}`}>
        {icon}
        <span className="-mr-1 font-medium">{text}</span>
        </Link>
    </li>
  )
}
