import { db } from "@/db";
import { users } from "@/db/schema";
import { formatToNorwegian } from "@/lib/utils";
import { UserForm } from "./_components/user-form";
import { between, eq, gte } from "drizzle-orm";
import { SearchParams } from "nuqs/server";
import { searchParamsCache } from "./search-params";
import { addDays, format, subDays } from "date-fns";

type HomeProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Home(props: HomeProps) {
  const { datetimeStartDate, datetimeEndDate } = searchParamsCache.parse(
    await props.searchParams
  );
  console.log(
    "datetimeStartDate",
    datetimeStartDate,
    datetimeStartDate ? new Date(datetimeStartDate) : null,
    datetimeStartDate?.toISOString()
  );
  console.log(
    "datetimeEndDate",
    datetimeEndDate,
    datetimeEndDate ? new Date(datetimeEndDate) : null,
    datetimeEndDate?.toISOString()
  );

  const last10Days = subDays(new Date(), 10);

  const _users = await db
    .select({
      datetime: users.datetime,
      datetimeString: users.datetimeString,
      datetimeWithTimeZone: users.datetimeWithTimeZone,
      datetimeStringWithTimeZone: users.datetimeStringWithTimeZone,
    })
    .from(users)
    .where(
      between(
        users.datetime,
        datetimeStartDate ?? last10Days,
        datetimeEndDate ?? new Date()
      )
    )
    .then((users) =>
      users.map((user) => ({
        ...user,
        datetime: format(user.datetime, "yyyy-MM-dd"),
        datetimeString: user.datetimeString,
        datetimeWithTimeZone: format(user.datetimeWithTimeZone, "yyyy-MM-dd"),
        datetimeStringWithTimeZone: user.datetimeStringWithTimeZone,
      }))
    );
  return (
    <main className="p-4 w-full h-screen grid grid-cols-3">
      <div className="col-span-1">
        <UserForm />
      </div>
      <div className="flex flex-col gap-2 col-span-2">
        <h1>Users</h1>
        <pre>{JSON.stringify(_users, null, 2)}</pre>
      </div>
    </main>
  );
}
