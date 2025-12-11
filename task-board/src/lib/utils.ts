import { createClassed } from "@tw-classed/react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const { classed } = createClassed({ merger: twMerge });
