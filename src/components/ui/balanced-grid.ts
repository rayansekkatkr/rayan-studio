// Three-column card grids that never end on a lonely card next to an empty slot.
// Use with `lg:grid-cols-6`: rows of three cards span 2 columns each; a remainder of
// two cards fills the last row (span 3), a remainder of one turns the last four cards
// into two rows of two. Kept under src/components so Tailwind picks up the classes.
export const BALANCED_GRID = "lg:grid-cols-6";

export function balancedSpan(index: number, count: number): string {
  const remainder = count % 3;
  if (remainder === 2 && index >= count - 2) return "lg:col-span-3";
  if (remainder === 1 && count >= 4 && index >= count - 4) return "lg:col-span-3";
  if (remainder === 1 && count === 1) return "lg:col-span-6";
  return "lg:col-span-2";
}
