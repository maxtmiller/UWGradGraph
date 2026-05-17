/**
 * Manual unit overrides for courses where the auto-detected value is wrong.
 * The refresh script auto-assigns 0.25 for catalog numbers ending in L,
 * 1.0 for those ending in R, and 0.5 otherwise.
 * Add entries here only when the auto-detection produces the wrong value.
 */
export const UNITS_OVERRIDE: Record<string, number> = {
  // 499T is a thesis write-up (not an R suffix) but counts as 1.0
  "CS 499T":  1.0,
  "MATH 499": 1.0,
};
