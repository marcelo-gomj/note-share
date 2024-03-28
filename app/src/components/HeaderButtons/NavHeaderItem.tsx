import CurrentActiveNav from "@/components/HeaderButtons/CurrentNavItemActive";
import Link from "next/link";
import { HTMLAttributes, ReactNode, } from "react";

type IconProps = (props: HTMLAttributes<HTMLDivElement>) => ReactNode;
type NavItemProps = { path?: string, Icon: IconProps, children: ReactNode }

export default function NavItem(
  { children, path, Icon }: NavItemProps
) {
  return (
    <CurrentActiveNav
      path={path}
    >

      <div
        className={`flex px-6 w-full py-3 cursor-pointer gap-10 items-center transition-[background_0.150ms_ease] `}
      >
        <Icon className="shrink-0 h-6 w-6 stroke-[2.5]" />

        {children}
      </div>
    </CurrentActiveNav>
  )
}