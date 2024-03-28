import { listNotesByUser } from "@/services/fetch-api";
import { Notes, NotesResult } from "@/types/database";
import NoteItem from "./NoteItem";

type ListNotesProps = {
  notes?: Notes[]
}

async function ListNotes({ notes }: ListNotesProps) {
  return (
    <section className="py-10">
      <div className="font-medium px-2 text-dark-text-300">
        Todas as notas
      </div>

      <div className="space-y-8 py-4">
        {
          notes?.length ?
            notes?.map(
              note => <NoteItem note={note} />
            )
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