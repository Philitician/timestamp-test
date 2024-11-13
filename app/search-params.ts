import { createSearchParamsCache, parseAsIsoDateTime } from "nuqs/server";

export const searchParams = {
  datetimeStartDate: parseAsIsoDateTime,
  datetimeEndDate: parseAsIsoDateTime,
};

export const searchParamsCache = createSearchParamsCache(searchParams);
