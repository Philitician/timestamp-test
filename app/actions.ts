"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { revalidatePath } from "next/cache";

type CreateUserParams = {
  datetime: Date;
  datetimeString: string;
  datetimeStringWithTimeZone: string;
};

export async function createUser({
  datetime,
  datetimeString,
  datetimeStringWithTimeZone,
}: CreateUserParams) {
  console.log(
    "server action: ",
    datetime,
    datetimeString,
    datetimeStringWithTimeZone
  );
  await db.insert(users).values({
    name: "test",
    date: datetimeString,
    datetime,
    datetimeString,
    datetimeWithTimeZone: new Date(datetimeStringWithTimeZone),
    datetimeStringWithTimeZone: datetimeStringWithTimeZone,
  });
  revalidatePath("/");
}
