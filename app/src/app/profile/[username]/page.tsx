import ListNotes from "@/components/ListNotes/ListNotes";
import UserIconProfile from "@/components/UserIconProfile";
import { fetchApi } from "@/services/fetch-api";
import { cookies } from "next/headers";

export default async function ProfilePage({ params }: { params: { username: 'string ' } }) {
  const token = cookies().get('jwtToken')?.value
  const list = await fetchApi('/notes?user=novo.user', token, undefined, {
    method: 'GET',
    cache: "no-store",
    next: {
      tags: ["notes"]
    }
  })

  return (
    <div>
      <header className="flex items-center gap-14 mt-8 mb-4 font-bold">
        <div className="flex border-base-dark-500 rounded-full items-center justify-center h-36 w-36">
          <UserIconProfile
            username={params.username}
            size={6}
            weight={500}
          />
        </div>

        <div className="text-[1.5rem]">{params.username}</div>
      </header>

        <ListNotes notes={list || []} />
    </div>
  )
}
