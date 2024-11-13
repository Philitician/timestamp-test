import { DateRange } from "react-day-picker";
import { Calendar, CalendarProps } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns/format";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type DateRangePickerProps = Omit<CalendarProps, "required"> & {
  title?: string;
  specificTitle?: string;
  range?: DateRange;
  handleSelectDate: (range?: DateRange) => void;
};

export function DateRangePicker({
  title = "",
  specificTitle,
  handleSelectDate,
  range,
  ...calendarProps
}: DateRangePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={"outline"}
          className={cn(
            "w-[300px] justify-start text-left font-normal",
            !range && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {range?.from ? (
            range.to ? (
              <span className="text-xs">
                {format(range.from, "d. MMM y")} -{" "}
                {format(range.to, "d. MMM y")}
              </span>
            ) : (
              format(range.from, "d. MMM y")
            )
          ) : (
            <span className={cn("truncate", { "text-xs": !!specificTitle })}>
              {specificTitle ?? `Dato fra-til ${title}`}{" "}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          {...calendarProps}
          mode="range"
          defaultMonth={range?.from}
          selected={range}
          onSelect={handleSelectDate}
          numberOfMonths={2}
          weekStartsOn={1}
        />
      </PopoverContent>
    </Popover>
  );
}
