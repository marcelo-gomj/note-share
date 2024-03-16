'use client';
import { NotificationsContext } from "@/contexts/NotificationsContext";
import { useContext, useState } from "react";
import CloseIcon from "@/assets/close.svg"
import NotificationItem from "./NotificationItem";

function NotificationsContainer() {
  const { notifications, closeNotifications, isOpenNotifications } = useContext(NotificationsContext);

  return (

    <section className={`absolute top-0 transition-[right_7s_ease] ${isOpenNotifications ? ' right-[0%]' : ' right-[-25%]'} py-2 pr-4 h-full w-[25%]`}>
      <div className="h-full w-full">
        <div className="flex items-center justify-between px-1">
          <div className="text-[0.8rem] my-2 font-semibold">Notificacões</div>

          <div className="cursor-pointer"
            onClick={closeNotifications}
          >
            <CloseIcon className="w-5 h-5" />

          </div>
        </div>

        <div className="space-y-4 overflow-y-visible">
          {
            isOpenNotifications ?
              notifications.map(
                (notification, index) =>
                  <NotificationItem updated={index === 0} config={notification} />
                , notifications
              ) :
              null
          }
        </div>
      </div>
    </section>
  )
}


export default NotificationsContainer;