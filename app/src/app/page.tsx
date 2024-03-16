import { Notes, NotesResult } from "@/types/database";

export default async function Home() {
  const reslist = { notes: [{ text: '', userId: '' }] };

  return (
    <main className="flex flex-col leading-5 gap-10 px-6 py-8">
      {
        reslist.notes.map(note => (
          <div className="bg-[rgb(15,15,15)] px-8 pb-10 pt-4 rounded-2xl text-[0.94rem]">
            <p className="font-bold py-4">{note.userId}</p>
            <p>{note.text}</p>
          </div>
        ))
      }
    </main>
  );
}
