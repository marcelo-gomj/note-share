'use client'
import { verifyToken } from "@/services/fetch-api";
import { User } from "@/types/database";
import { ReactNode, createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie"

type UserContextProps = User | null | undefined;

export const UserContext = createContext(undefined as UserContextProps);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(undefined as UserContextProps);
  const [cookies, setCookies] = useCookies(["jwtToken"]);

  useEffect(verifyUserAuthentification, []);

  return (
    <UserContext.Provider
      value={user}
    >
      {
        children
      }
    </UserContext.Provider>
  )

  function verifyUserAuthentification() {
    const token = cookies.jwtToken;

    if (token) {
      verifyToken(token).then(user => {
        console.log("RETURNING USER", user)
        setUser(user)
      })

      return;
    }

    setUser(null);

  }
}