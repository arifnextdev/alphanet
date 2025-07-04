import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


 export const formateDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'long', // Display the full month name
      day: 'numeric', // Display the day of the month
    });
  };