import HomeIcon from "@/assets/home.svg";
import SearchIcon from "@/assets/search.svg";
import Link from "next/link";
import NavItem from "./HeaderButtons/NavHeaderItem";
import UserButton from "./HeaderButtons/UserButton";
import LogOutUser from "./HeaderButtons/LogOutButton";
import SearchButton from "./HeaderButtons/SearchButton";


export default function SideHeader() {
  return (
    <header
      className="flex select-none items-center pl-2 pr-2 w-[25%] font-medium border-r-[1px] border-neutral-900"
    >
      <nav
        className="flex flex-col w-full py-10 gap-6 text-[0.96rem]"
      >
        <Link
          href={'/'}
        >
          <NavItem
            path="/"
            Icon={HomeIcon}
          >
            <p>Inicio</p>
          </NavItem>
        </Link>

        <SearchButton>
          <NavItem
            path="/fafa"
            Icon={SearchIcon}
          >
            <p>Pesquisar</p>
          </NavItem>
        </SearchButton>

        <UserButton />

        <LogOutUser />
      </nav>
    </header >
  )
}

