'use server';

import { revalidateTag } from "next/cache";

export async function updateA(){
	revalidateTag('notes');
}
