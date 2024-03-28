import LockerIcon from "@/assets/locker.svg";
import GlobeIcon from "@/assets/global.svg";
import UserIcon from "@/assets/user.svg";
import PointOptions from "@/assets/point-menu.svg";

import getTimeNote from "@/services/moment";
import { Notes } from "@/types/database";

type NoteItemProps = {
  note: Notes
}

function NoteItem({ note }: NoteItemProps) {
  const StatusIcon = note.is_public ? GlobeIcon : LockerIcon;

  return (
    <div className="group my-4 pt-8 pb-10 px-10 cursor-pointer space-y-10 rounded-xl bg-base-dark-250">
      <header className="flex leading-[0] items-center justify-between">
        <div className="">
          <div className="flex items-center gap-8">
            <UserIcon className="w-5 h-5 stroke-[3] opacity-25" />

            <h3 className="text-[1.1rem] font-[800]">{note.userId}</h3>
          </div>

        </div>

        <div className="flex items-center gap-10">
          <div className="flex items-center gap-8 opacity-40">
            <StatusIcon className="h-5 w-5" />
            <p className="text-[0.8rem] font-[600]">
              {getTimeNote(note.created_at)}
            </p>
          </div>

          <PointOptions className=" cursor-pointer group-hover:visible invisible  h-5 w-8" />
        </div>
      </header>

      <div className="px-2">
        <p className="text-[0.875rem] font-normal leading-6">{note.text}</p>
      </div>
    </div>
  )
}

export default NoteItem;