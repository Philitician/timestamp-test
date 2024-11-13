"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { revalidatePath } from "next/cache";

type CreateUserParams = {
  datetime: Date;
  datetimeString: string;
};

export async function createUser({
  datetime,
  datetimeString,
}: CreateUserParams) {
  console.log("server action: ", datetime, datetimeString);
  await db.insert(users).values({
    name: "test",
    datetime: new Date(datetimeString),
    datetimeString,
    datetimeWithTimeZone: new Date(datetimeString),
    datetimeStringWithTimeZone: datetimeString,
  });
  revalidatePath("/");
}
