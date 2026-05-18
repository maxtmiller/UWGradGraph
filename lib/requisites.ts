import type { Requisite } from "../types";

export function getRequisiteCourseCodes(req: Requisite): string[] {
  return req.reqs.flatMap((item) => (
    typeof item === "string" ? [item] : getRequisiteCourseCodes(item)
  ));
}

export function getAllRequisiteCourseCodes(reqs: Requisite[] | []): string[] {
  return [...new Set(reqs.flatMap(getRequisiteCourseCodes))];
}

export function isRequisiteSatisfied(req: Requisite, available: ReadonlySet<string>): boolean {
  return req.type === "OR"
    ? req.reqs.some((item) => (
        typeof item === "string" ? available.has(item) : isRequisiteSatisfied(item, available)
      ))
    : req.reqs.every((item) => (
        typeof item === "string" ? available.has(item) : isRequisiteSatisfied(item, available)
      ));
}

export function areRequisitesSatisfied(reqs: Requisite[] | [], available: ReadonlySet<string>): boolean {
  return reqs.every((req) => isRequisiteSatisfied(req, available));
}
