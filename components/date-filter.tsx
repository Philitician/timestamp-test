"use client";

import { useQueryStates } from "nuqs";

import { format, parse } from "date-fns";
import { createParser, parseAsIsoDate } from "nuqs";
import { DateRangePicker } from "./date-range-picker";

export type DateFilterProps = {
  id: string;
  label: string;
};

const parseAsDate = createParser<Date | null>({
  parse(queryValue) {
    if (!queryValue) return null;
    return parse(queryValue, "yyyy-MM-dd", new Date());
  },
  serialize(value) {
    if (!value) return "";
    return format(value, "yyyy-MM-dd");
  },
});

export default function DateFilter({ id, label }: DateFilterProps) {
  const [{ startDate, endDate }, setRange] = useQueryStates(
    {
      startDate: parseAsDate,
      endDate: parseAsDate,
    },
    {
      shallow: false,
      urlKeys: {
        startDate: `${String(id)}StartDate`,
        endDate: `${String(id)}EndDate`,
      },
    }
  );

  return (
    <DateRangePicker
      title={label}
      range={
        startDate && endDate
          ? {
              from: startDate,
              to: endDate,
            }
          : undefined
      }
      handleSelectDate={(range) => {
        console.log("range", range);
        void setRange(
          range
            ? {
                startDate: range.from,
                endDate: range.to,
              }
            : null
        );
      }}
    />
  );
}
