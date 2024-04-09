'use client';
import { assoc, dissoc } from "ramda";
import { FC, ReactNode, createContext, useState } from "react";


type ModalStateProps = {
  title?: string,
  content: FC<{ finallyFn: (() => void) | undefined }>,
  typeSize?: 'md' | 'lg',
  finallyFn?: () => void
};

type InitialStateContext = { [id: string]: ModalStateProps };

type setModalContent = (id: string, state?: ModalStateProps) => void;

type UserModalProps = {
  modals: InitialStateContext,
  setModalContent: setModalContent
};

type UserModalProviderProps = {
  children: ReactNode,
}

const ModalContext = createContext({} as UserModalProps);


function ModalProvider({ children }: UserModalProviderProps) {
  const [modals, setModals] = useState<InitialStateContext>({});

  return (
    <ModalContext.Provider value={{ modals, setModalContent }}>
      {children}
    </ModalContext.Provider>
  )

  function setModalContent(id: string, modalState?: ModalStateProps) {
    if (!modalState) {
      setModals(dissoc(id, modals));
      return;
    }

    setModals(assoc(id, modalState, modals))
  }
}

export {
  ModalProvider,
  ModalContext
};