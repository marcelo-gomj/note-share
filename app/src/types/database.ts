export type Notes = {
  id: string,
  text: string,
  is_public: boolean,
  created_at: Date,
  updated_at: Date,
  userId: string
}

export type NotesResult = {
  notes: Notes[]
}

export type User = {
  id?: string,
  roles?: "USER" | "ADMIN"
  username: string,
  notes?: Notes[]
}
