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
        <Link href={path} className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl
            hover:bg-gradient-to-r hover:from-sky-600 hover:to-cyan-400 hover:text-white ${(pathName===path)&& 'text-white bg-gradient-to-r from-sky-600 to-cyan-400'}`}>
        {icon}
        <span className="-mr-1 font-medium group-hover:text-white-700 text-sm">{text}</span>
        </Link>
    </li>
  )
}
