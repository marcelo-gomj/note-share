'use client'
import { verifyToken } from "@/services/fetch-api";
import { User } from "@/types/database";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie"

type CallbackStateAuth = (user: User | null) => void;
type UserState = User | null | undefined;

type setUserAuthentificationFunction = (
  token: string, callbackAuth?: CallbackStateAuth
) => Promise<void>;

type UserContextProps = {
  user: UserState,
  setUserAuthByToken: setUserAuthentificationFunction,
  token: string,
  logOutUser: () => void
};


export const UserContext = createContext({} as UserContextProps);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(undefined as UserState);
  const [cookies, setCookies] = useCookies(["jwtToken"]);

  useEffect(verifyUserAuthentification, []);

  return (
    <UserContext.Provider
      value={{ user, setUserAuthByToken, logOutUser, token: cookies.jwtToken }}
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
        setUser(user)
      })

      return;
    }

    setUser(null);
  }

  async function setUserAuthByToken(
    token: string,
    callbackAuth?: CallbackStateAuth
  ) {
    const user = await verifyToken(token);
    setCookies('jwtToken', token);
    setUser(user);

    if (callbackAuth) callbackAuth(user);
  }

  function logOutUser() {
    setCookies("jwtToken", null);
    setUser(null)
  }

}