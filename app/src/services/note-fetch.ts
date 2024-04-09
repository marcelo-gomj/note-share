import { fetchApi } from "./fetch-api";

type NotePostProps = { text: string, is_public: boolean };
type NoteUpdateProps = { id: string, text?: string, is_public?: boolean };

const noteApi = fetchApi('/note');

const createNote = (token: string, body: NotePostProps) => noteApi(
  token,
  body,
  { method: 'POST' }
) as Promise<null | { id: string, is_public: boolean, created_at: string }>

const updateNote = (token: string, body: NoteUpdateProps) => noteApi(
  token,
  body,
  { method: 'PUT' }
) as Promise<null | { id: string }>

const deleteNote = (token: string, id: string) => noteApi(
  token,
  { id },
  { method: 'DELETE' }
) as Promise<null | { id: string }>


export {
  createNote,
  updateNote,
  deleteNote
}