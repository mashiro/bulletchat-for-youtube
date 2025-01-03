import { type ClassValue, clsx } from "clsx";
import Color from "color";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isTopFrame(): boolean {
  return window === window.top;
}

export function isBlankString(value: string | null | undefined): value is "" {
  if (value == null) {
    return true;
  }
  return value.trim() === "";
}

export function tryParseColor(value: string | null | undefined): Color | undefined {
  if (value == null) return undefined;
  if (isBlankString(value)) return undefined;

  try {
    return Color(value);
  } catch {
    return undefined;
  }
}
