import ListNotes from "@/components/ListNotes/ListNotes";
import { fetchApi } from "@/services/fetch-api";
import { cookies } from "next/headers";

export default async function Home() {
  const token = cookies().get("jwtToken")?.value
  const listHome = await fetchApi('/notes', token, undefined, {
    method: 'GET',
    cache: "no-store"
  })

  return (
    <main className="flex flex-col leading-5 gap-10 px-6 py-8">
      <ListNotes notes={listHome || []} />
    </main>
  );
}
