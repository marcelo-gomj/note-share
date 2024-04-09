"use client";

import LockerIcon from "@/assets/locker.svg";
import GlobeIcon from "@/assets/global.svg";
import UserIcon from "@/assets/user.svg";

import getTimeNote from "@/services/moment";
import { Notes } from "@/types/database";
import OptionsNote from "./OptionsNote";
import { StateNoteFn } from "./ListNotes";

type NoteItemProps = {
  note: Notes,
}

function NoteItem({ note }: NoteItemProps) {
  const StatusIcon = note.is_public ? GlobeIcon : LockerIcon;

  return (
    <div key={note.id} className="group my-4 px-5 py-3 space-y-2 rounded-xl bg-base-dark-250">
      <header className="flex h-10 leading-[0] items-center justify-between">
        <div className="">
          <div className="flex items-center gap-8">
            <UserIcon className="w-5 h-5 stroke-[3] opacity-25" />

            <h3 className="text-[1.05rem] font-[500] text-dark-text-300">{note.userId}</h3>
          </div>

        </div>

        <div className="flex items-center gap-10 h-full">
          <div className="flex items-center gap-8 opacity-40">
            <p className="text-[0.8rem] font-[600]">
              {getTimeNote(note.created_at)}
            </p>

            <StatusIcon className="h-5 w-5" />
          </div>

          <OptionsNote
            note={note}
          />
        </div>
      </header>

      <div className="py-2 px-2">
        <p className="text-[0.875rem] font-normal leading-6">{note.text}</p>
      </div>
    </div>
  )


}

export default NoteItem;
