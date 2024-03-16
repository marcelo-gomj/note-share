'use client';
import { useNotificationTimeout } from "@/hooks/useTimeout";
import { ReactNode, createContext, useEffect, useRef, useState } from "react";

type NotificationsProviderProps = {
  children: ReactNode
}

export type NotificationsConfig = {
  title: string,
  content: string,
  pathUrl?: string
}

type NotificationsContextProps = {
  notifications: NotificationsConfig[]
  createNotification: (config: NotificationsConfig) => void,
  isOpenNotifications: boolean,
  closeNotifications: () => void
}

const NotificationsContext = createContext({} as NotificationsContextProps)

// const notificationsMock: NotificationsConfig[] = [
//   {
//     title: 'Usuário  longado',
//     content: 'Você longou na conta @exemplo ás 3:00:13.'
//   },
//   {
//     title: 'Como sair?',
//     content: 'É só clicar pra sair na navegacão da esquerda! Mas não se preocupe você pode voltar depois'
//   },
//   {
//     title: 'Acesse seu Perfil',
//     content: 'Veja todas as suas notas. Verificar os estados de seu perfil, excluir conta, ou tornar suas notas privadas.'
//   },
// ]

function NotificationsProvider({ children }: NotificationsProviderProps) {
  // const [isOpenNotifications, setIsOpenNotifications] = useState<boolean>(false);
  const [notificationsQueue, setNotificationsQueue] = useState<NotificationsConfig[]>([])
  const [isOpenNotifications, closeNotifications] = useNotificationTimeout({
    time: 10000,
    dependencies: [notificationsQueue]
  })



  useEffect(() => {
    if (isOpenNotifications) setNotificationsQueue(notificationsQueue.slice(0, 4))
  }, [isOpenNotifications])

  return (
    <NotificationsContext.Provider
      value={{
        notifications: notificationsQueue,
        isOpenNotifications,
        createNotification,
        closeNotifications
      }}
    >
      {children}
    </NotificationsContext.Provider>
  )

  function createNotification(config: NotificationsConfig) {
    setNotificationsQueue((configsQueue) => ([config, ...configsQueue]));
  }
}


export {
  NotificationsContext,
  NotificationsProvider
}