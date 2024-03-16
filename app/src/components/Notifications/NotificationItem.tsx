import { NotificationsConfig } from "@/contexts/NotificationsContext";
import CloseIcon from "@/assets/close.svg";
import { useEffect, useState } from "react";

function NotificationItem({ config, updated }: { config: NotificationsConfig, updated: boolean }) {

  return (
    updated ? <div key={config.title} className={`flex ${updated ? 'opacity-100' : 'opacity-25'} animate-[all_200ms_ease] flex-col group w-full gap-2 rounded-md bg-base-dark-200 p-3 cursor-pointer hover:bg-base-dark-250`}>
      <div className="flex items-center justify-between w-full">
        <h2 className="font-medium text-[0.88rem]">
          {config.title}
        </h2>

        <div
        >
          <CloseIcon className="w-4 h-4 hidden group-hover:block" />

        </div>
      </div>

      <div className="text-[0.8rem] text-dark-text-200">
        {config.content}
      </div>
    </div> : null
  )

}

export default NotificationItem