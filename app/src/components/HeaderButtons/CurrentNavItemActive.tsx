'use client';
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type CurrentActiveNavProps = { path?: string, children: ReactNode };

export default function CurrentActiveNav({ path, children }: CurrentActiveNavProps) {
  const isActive = usePathname() === path;


  return (
    <div
      className={isActive ? '' : 'opacity-30 hover:opacity-100 transition-opacity duration-100 active:bg-base-dark-300 rounded-full'}
    >
      {children}
    </div>
  )
}
