import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const startOfDay = (date = new Date()) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export const formatToNorwegian = (date = new Date()) => {
  return date.toLocaleDateString("nb-NO", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};
