import { z } from "zod";

export function typeZ(schema: any) {
  return schema as z.infer<typeof schema>
}