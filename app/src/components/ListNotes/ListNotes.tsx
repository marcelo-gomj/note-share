"use client";

import { Notes } from "@/types/database";
import NoteItem from "./NoteItem";
import { useState } from "react";
import OptionsNote from "./OptionsNote";

type ListNotesProps = {
  notes: Notes[]
}

type CallbackStateNotes = (notes: Notes[]) => Notes[];
export type StateNoteFn = (stateFn: CallbackStateNotes) => void;

function ListNotes({ notes }: ListNotesProps) {
  const [listNotes, setListNotes] = useState(notes);

  return (
    <section className="py-10">
      <div className="font-medium px-2 text-dark-text-300">
        Todas as notas
      </div>

      <div className="space-y-8 py-4">
        {
          listNotes.length > 0 ?
            listNotes.map(
              note => (
                <NoteItem
                  key={note.id}
                  note={note}
                >
                  <OptionsNote note={note} controlListNotes={controlListNotes} />
                </NoteItem>
              ))
            : (
              <div className="w-full px-3 py-10 text-[0.9rem]">
                <p>Sem Notas</p>
              </div>
            )
        }
      </div>
    </section>
  )

  function controlListNotes(stateFn: CallbackStateNotes) {
    setListNotes(stateFn(listNotes))
  }
}

export default ListNotes;
