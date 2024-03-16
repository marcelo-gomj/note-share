import { DependencyList, useEffect, useRef, useState } from "react"

type UseTimeoutProps = {
  time: number,
  IsOpenDefault?: boolean,
  dependencies?: DependencyList
}

export function useNotificationTimeout({ time, IsOpenDefault, dependencies }: UseTimeoutProps)
  : [boolean, () => void] {
  const [openNotification, setOpenNotification] = useState(IsOpenDefault ?? true);
  const NotificationsTimeout = useRef<any>(null);

  useEffect(startNotificationTimeout, dependencies ?? []);

  return [openNotification, closeNotification];

  function startNotificationTimeout() {
    if (!openNotification) setOpenNotification(true);
    clearTimeout(NotificationsTimeout.current);

    NotificationsTimeout.current = setTimeout(() => {
      setOpenNotification(false);
    }, time)

    return () => {
      clearTimeout(NotificationsTimeout.current);
    }
  }

  function closeNotification() {
    setOpenNotification(false);
    clearTimeout(NotificationsTimeout.current);
  }
}