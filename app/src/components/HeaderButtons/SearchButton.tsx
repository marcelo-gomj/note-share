'use client';

import { ReactNode, useContext, useState } from "react";
import { NotificationsContext } from "@/contexts/NotificationsContext";

type SearchButtonProps = {
  children: ReactNode
}

function SearchButton({ children }: SearchButtonProps) {
  const { createNotification } = useContext(NotificationsContext);
  const [nNotification, setNNotification] = useState(0);

  return (
    <div
      onClick={handleClickSearchButton}
    >
      {children}
    </div>
  )

  function handleClickSearchButton() {
    setNNotification(nNotification + 1)
    createNotification({
      title: 'Notificacão de teste' + nNotification,
      content: 'Essa notificacão é apenas um teste pra provar que está funcionando o sistema de criacão de notificacão.'
    })
  }
}

export default SearchButton;