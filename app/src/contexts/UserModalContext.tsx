'use client';
import { FC, ReactNode, createContext, useState } from "react";


type ModalStateProps = {
  title?: string,
  content?: FC
};

type InitialStateContext = null | ModalStateProps;

type setModalContent = ({ }: InitialStateContext) => void;

type UserModalProps = {
  userModal: InitialStateContext,
  setModalContent: setModalContent
};

type UserModalProviderProps = {
  children: ReactNode,
}

const UserModalContext = createContext({} as UserModalProps);


function UserModalProvider({ children }: UserModalProviderProps) {
  const [userModal, setUserModal] = useState<InitialStateContext>(null);

  return (
    <UserModalContext.Provider value={{ userModal, setModalContent }}>
      {children}
    </UserModalContext.Provider>
  )

  function setModalContent(modalState: InitialStateContext) {
    setUserModal(modalState)
  }
}

export {
  UserModalProvider,
  UserModalContext
};