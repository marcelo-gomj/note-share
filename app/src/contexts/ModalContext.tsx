'use client';
import { assoc, dissoc } from "ramda";
import { FC, ReactNode, createContext, useState } from "react";


type ModalStateProps <T> = {
  title?: string,
  content: FC<{ finallyFn: ((data: T) => void) | undefined }>,
  typeSize?: 'md' | 'lg',
  finallyFn?: (data: T) => void
};

type InitialStateContext = { [id: string]: ModalStateProps<any> };

type setModalContentFn <T> = (id: string, state?: ModalStateProps<T>) => void;

type UserModalProps <T> = {
  modals: InitialStateContext,
  setModalContent: setModalContentFn<T>
};

type UserModalProviderProps = {
  children: ReactNode,
}

const ModalContext = createContext({} as UserModalProps<any>);


function ModalProvider({ children }: UserModalProviderProps) {
  const [modals, setModals] = useState<InitialStateContext>({});

  return (
    <ModalContext.Provider value={{ modals, setModalContent }}>
      {children}
    </ModalContext.Provider>
  )

  function setModalContent<T>(id: string, modalState?: ModalStateProps<T>) {
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
