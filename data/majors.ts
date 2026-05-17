import type { Major, MajorId, MajorMap, FacultyId } from "../types";
import { ARTS_MAJORS }                               from "./generated/majors/arts";
import { MATHEMATICS_MAJORS as GEN_MATH_MAJORS, MATHEMATICS_SUB_MAJORS as GEN_MATH_SUB_MAJORS } from "./generated/majors/mathematics";
import { MATHEMATICS_MAJORS as MAN_MATH_MAJORS, MATHEMATICS_SUB_MAJORS as MAN_MATH_SUB_MAJORS } from "./manual/majors/mathematics";
import { ENGINEERING_MAJORS as GEN_ENG_MAJORS }      from "./generated/majors/engineering";
import { ENGINEERING_MAJORS as MAN_ENG_MAJORS }      from "./manual/majors/engineering";

const MATHEMATICS_MAJORS     = { ...GEN_MATH_MAJORS,              ...MAN_MATH_MAJORS };
const MATHEMATICS_SUB_MAJORS = Object.fromEntries(
  Object.entries({ ...(GEN_MATH_SUB_MAJORS ?? {}), ...(MAN_MATH_SUB_MAJORS ?? {}) })
    .sort(([, a], [, b]) => a.name.localeCompare(b.name))
);
const ENGINEERING_MAJORS     = { ...GEN_ENG_MAJORS,               ...MAN_ENG_MAJORS };
import { SCIENCE_MAJORS }                            from "./generated/majors/science";
import { ENVIRONMENT_MAJORS }                        from "./generated/majors/environment";
import { HEALTH_MAJORS }                             from "./generated/majors/health";
import { FACULTIES }                                 from "./faculties";

// ── Core data ─────────────────────────────────────────────────────────────────

export const MAJORS: MajorMap = Object.fromEntries(
  Object.entries({
    ...ARTS_MAJORS,
    ...MATHEMATICS_MAJORS,
    ...ENGINEERING_MAJORS,
    ...SCIENCE_MAJORS,
    ...ENVIRONMENT_MAJORS,
    ...HEALTH_MAJORS,
  }).sort(([, a], [, b]) => a.name.localeCompare(b.name))
);

export const MAJOR_LIST: Major[] = Object.values(MAJORS);

export const SUB_MAJOR_REGISTRY: Record<string, Record<string, Major>> = {
  mathematics: MATHEMATICS_SUB_MAJORS ?? {},
};

export const DEFAULT_MAJOR_ID: MajorId =
  "mathematics" in MAJORS ? "mathematics" : (Object.keys(MAJORS)[0] ?? "mathematics");

// ── Derived lookups ───────────────────────────────────────────────────────────

export const MAJOR_TO_FACULTY: Record<MajorId, FacultyId> = {};
for (const [facultyId, faculty] of Object.entries(FACULTIES)) {
  for (const majorId of faculty.majorIds) {
    MAJOR_TO_FACULTY[majorId] = facultyId;
  }
}

// Backward-compat shape expected by MajorSelector, WelcomeOverlay, ProgressAudit
export const MAJOR_META: Record<string, {
  label:       string;
  fullName:    string;
  color:       string;
  description: string;
  subjects:    string;
  facultyId:   FacultyId;
}> = Object.fromEntries(
  Object.entries(MAJORS).map(([id, m]) => [id, {
    label:       m.name,
    fullName:    m.name,
    color:       m.color,
    description: "",
    subjects:    "",
    facultyId:   MAJOR_TO_FACULTY[id] ?? (m.faculty as FacultyId),
  }])
);

// Flat list for AI context (ChatPanel)
export const ALL_DEGREES = MAJOR_LIST.map(m => ({
  id:          m.id,
  major:       m,
  parentLabel: m.name,
}));
