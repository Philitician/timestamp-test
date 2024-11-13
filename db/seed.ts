import { db } from ".";
import { users } from "./schema";
import { startOfDay } from "@/lib/utils";

/* ------------------------------- Create user ------------------------------ */
const today = startOfDay();
const main = async () => {
  await db.insert(users).values({
    name: "Philip",
    datetime: today,
    datetimeString: today.toUTCString(),
    datetimeWithTimeZone: today,
    datetimeStringWithTimeZone: today.toUTCString(),
  });
};

main().catch(console.error);
