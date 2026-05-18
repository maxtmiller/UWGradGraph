import type { TermKey, TermPlan } from "../types";

export const SHARE_HASH_PREFIX = "share=";
export const SHARE_VERSION = 1;
export const SHARE_TERMS: TermKey[] = ["1A", "1B", "2A", "2B", "3A", "3B", "4A", "4B"];

export type ShareSnapshotV1 = {
  v: typeof SHARE_VERSION;
  activeFacultyId: string;
  activeMajorId: string;
  activeSubMajorId: string | null;
  completedCourses: string[];
  plannedCourses: string[];
  termPlan: TermPlan;
  termPlanEditedByUser: boolean;
};

function base64UrlEncode(value: string) {
  return btoa(value)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function base64UrlDecode(value: string) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  return atob(padded);
}

export function encodeShareSnapshot(snapshot: ShareSnapshotV1) {
  return base64UrlEncode(JSON.stringify(snapshot));
}

export function decodeShareSnapshot(value: string): ShareSnapshotV1 | null {
  try {
    const parsed = JSON.parse(base64UrlDecode(value)) as Partial<ShareSnapshotV1>;

    if (parsed.v !== SHARE_VERSION) return null;
    if (typeof parsed.activeFacultyId !== "string") return null;
    if (typeof parsed.activeMajorId !== "string") return null;
    if (parsed.activeSubMajorId !== null && typeof parsed.activeSubMajorId !== "string") return null;
    if (!Array.isArray(parsed.completedCourses)) return null;
    if (!Array.isArray(parsed.plannedCourses)) return null;
    if (!parsed.termPlan || typeof parsed.termPlan !== "object") return null;

    return {
      v: SHARE_VERSION,
      activeFacultyId: parsed.activeFacultyId,
      activeMajorId: parsed.activeMajorId,
      activeSubMajorId: parsed.activeSubMajorId,
      completedCourses: parsed.completedCourses.filter((code): code is string => typeof code === "string"),
      plannedCourses: parsed.plannedCourses.filter((code): code is string => typeof code === "string"),
      termPlan: parsed.termPlan as TermPlan,
      termPlanEditedByUser: Boolean(parsed.termPlanEditedByUser),
    };
  } catch {
    return null;
  }
}

