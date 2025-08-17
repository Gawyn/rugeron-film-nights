import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Parses a European date format (DD-MM-YYYY) to a Date object
 * @param dateString - Date string in DD-MM-YYYY format
 * @returns Date object
 */
export function parseEuropeanDate(dateString: string): Date {
  const [day, month, year] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day); // month is 0-indexed in Date constructor
}
