'use client';
import LogOutIcon from "@/assets/log-out.svg";
import NavItem from "./NavHeaderItem";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";

function LogOutUser() {
  const { user, logOutUser } = useContext(UserContext);
  return (
    user ?
      <div
        onClick={logOutUser}
      >
        <NavItem
          path=""
          Icon={LogOutIcon}
        >
          Sair
        </NavItem>
      </div> :
      null
  )
}


export default LogOutUser