"use client";

import { Notes } from "@/types/database";
import NoteItem from "./NoteItem";

type ListNotesProps = {
  notes: Notes[]
}

type CallbackStateNotes = (notes: Notes[]) => Notes[];
export type StateNoteFn = (stateFn: CallbackStateNotes) => void;

async function ListNotes({ notes }: ListNotesProps) {

  return (
    <section key={notes[0].id} className="py-10">
      <div className="font-medium px-2 text-dark-text-300">
        Todas as notas
      </div>

      <div className="space-y-8 py-4">
        {
          notes.length ?
            notes.map(
              note => (
                <NoteItem
                  note={note}
                />
              ))
            : notFoundNotes()
        }
      </div>
    </section>
  )

  function notFoundNotes() {
    return (
      <div className="w-full px-3 py-10 text-[0.9rem]">
        <p>Sem Notas</p>
      </div>
    )
  }


}

export default ListNotes;
