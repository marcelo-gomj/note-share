"use client";

import PointOptions from "@/assets/point-menu.svg";
import { Notes } from "@/types/database";
import { filter, reduce, toPairs } from "ramda";
import { useContext, useState } from "react";
import EditIcon from "@/assets/edit.svg";
import ShareIcon from "@/assets/share.svg";
import DeleteIcon from "@/assets/delete.svg";
import { deleteNote, updateNote } from "@/services/note-fetch";
import { UserContext } from "@/contexts/UserContext";
import { ModalContext } from "@/contexts/ModalContext";
import CreateNoteForm from "../Forms/CreateNoteForm";
import { StateNoteFn } from "./ListNotes";
import { useRouter } from "next/navigation";

type OptionsNoteProps = {
  note: Notes,
  controlListNotes: StateNoteFn
}

function OptionsNote({ note, controlListNotes }: OptionsNoteProps) {
  const { token } = useContext(UserContext);
  const { setModalContent } = useContext(ModalContext);
  const [openOptions, setOpenOptions] = useState(false);

  const optionsNote = toPairs({
    'edit': { Icon: EditIcon, title: 'Editar', handler: handleEditNote },
    'forward': { Icon: ShareIcon, title: 'Encaminhar', handler: handleForwardNote },
    'delete': { Icon: DeleteIcon, title: 'Apagar', handler: handleDeletNote }
  })

  return (
    <div className="relative h-full"
      onMouseLeave={() => {
        setOpenOptions(false)
      }}
    >
      <div className="flex items-center px-0.5 h-full rounded-md"
        onClick={showOptionsNote}
      >
        <PointOptions className={`cursor-pointer invisible group-hover:visible h-5 w-8`} />
      </div>

      <ul className={`flex-col ${openOptions ? 'flex' : 'hidden'} text-[0.9rem] py-3 rounded-xl absolute right-0 top-0 bg-base-dark-400 z-50`}
        onMouseEnter={showOptionsNote}
      >
        {
          optionsNote.map(
            ([key, { Icon, title, handler }]) => (
              <li key={key} className="flex gap-10 pl-6 pr-12 items-center py-3 cursor-pointer hover:bg-base-dark-600"
                onClick={() => handler()}
              >
                <Icon className="w-[1.1rem] h-[1.1rem] stroke-[2.5]" />
                {title}
              </li>
            ))
        }
      </ul>
    </div>
  )


  // open optins one turn
  function showOptionsNote() {
    setOpenOptions(true);
  }

  // open create note modal in edition mode
  function handleEditNote() {
    setModalContent('create-note', {
      title: 'Editar Nota',
      content: ({ finallyFn }) => <CreateNoteForm note={note} createdNoteFn={finallyFn} />,
      typeSize: "md",
      finallyFn: finallyEditionMode
    })
}

async function handleDeletNote() {
  const deletedNote = await deleteNote(token, note.id);

  if (deletedNote) {
    controlListNotes((notes) => filter(note => note.id !== deletedNote?.id, notes))
  }
}

function handleForwardNote() {}

function finallyEditionMode(note: Notes) {
  return controlListNotes(notes =>
    reduce((notesAcc, CurrentNote) => {
      if (CurrentNote.id === note.id) {
        CurrentNote.text = note.text;
        CurrentNote.is_public = note.is_public
      }

      return [...notesAcc, CurrentNote]
    }, [] as Notes[], notes)
  )
}


}

export default OptionsNote;
