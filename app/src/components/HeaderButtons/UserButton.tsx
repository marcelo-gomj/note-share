'use client';

import { UserContext } from "@/contexts/UserContext";
import { head } from "ramda";
import { HTMLAttributes, ReactNode, useContext } from "react";
import NavItem from "./NavHeaderItem";
import UserIcon from "@/assets/user.svg";
import { UserModalContext } from "@/contexts/UserModalContext";
import ModalLogin from "../UserModalAccess/ModalLoginAndRegister";


export default function UserButton() {
  const { user } = useContext(UserContext);
  const { setModalContent } = useContext(UserModalContext);

  return (
    <div>
      {handleUserState(user)}
    </div>
  )

  function handleUserState(userState: typeof user) {
    if (userState) return (
      <NavItem
        path={'/profile/' + userState.username}
        Icon={iconProfileComponent(userState.username)}
      >
        <p>Perfil</p>
      </NavItem>
    )

    if (userState === null) return (
      <div onClick={handleClickRegisterButton}>
        <NavItem
          path={''}
          Icon={UserIcon}
        >
          <p>Cadastrar / Entrar </p>
        </NavItem>
      </div>
    )

    return (
      <NavItem
        path=""
        Icon={() => (
          <div className="w-6 h-6 rounded-full bg-base-dark-600 animate-pulse"></div>
        )}
      >
        <div className="w-[50%] h-6 bg-base-dark-600 rounded-md animate-pulse" />
      </NavItem>
    )
  }

  function iconProfileComponent(username: string) {
    return () => (
      <div>
        <div className="w-6 h-6 flex justify-center items-center font-bold leading-[0] text-[1.5rem] rounded-full border-base-dark-500">
          {head(username).toUpperCase()}
        </div>
      </div>
    )
  }

  function handleClickRegisterButton() {
    setModalContent({
      title: "Cadastrar / Entrar",
      content: ModalLogin
    })
  }
}