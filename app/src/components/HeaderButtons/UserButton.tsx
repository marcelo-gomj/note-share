'use client';

import { UserContext } from "@/contexts/UserContext";
import { head } from "ramda";
import { HTMLAttributes, ReactNode, useContext } from "react";
import NavItem from "./NavHeaderItem";
import UserIcon from "@/assets/user.svg";
import { ModalContext } from "@/contexts/ModalContext";
import ModalLogin from "../UserModalAccess/ModalLoginAndRegister";
import Link from "next/link";
import UserIconProfile from "../UserIconProfile";


export default function UserButton() {
  const { user } = useContext(UserContext);
  const { setModalContent } = useContext(ModalContext);


  return (
    <div>
      {handleUserState(user)}
    </div>
  )

  function handleUserState(userState: typeof user) {
    if (userState) {

      return (
        <Link href={'/profile/' + userState.username}>
          <NavItem
            path={'/profile/' + userState.username}
            Icon={iconProfileComponent(userState.username)}
          >
            Perfil
          </NavItem>
        </Link >
      )
    }

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
      <UserIconProfile
        username={username}
        size={1.5}
        weight={500}
      />
    )
  }

  function handleClickRegisterButton() {
    setModalContent('session-user', {
      title: "Cadastrar / Entrar",
      content: ModalLogin
    })
  }
}