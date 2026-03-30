import type { PositionMap, GraphEdge, Requisite } from "../types";
import { COURSE_DATA } from "../data/courses";

// ── Constants ─────────────────────────────────────────────────────────────────

const NODE_W  = 180;
const NODE_H  = 80;
const GAP_X   = 60;
const GAP_Y   = 60;
const MIN_H   = 600;

// ── Topological Layer Assignment ──────────────────────────────────────────────

function assignLayers(codes: string[]): Record<string, number> {
  const codeSet = new Set(codes);
  const layers: Record<string, number> = {};
  const visited = new Set<string>();
  const queue: string[] = [];

  // Seed roots (courses with no prerequisites in the visible set)
  const extractFromTree = (item: Requisite): string[] => {
    return item.reqs.flatMap((sub) => {
      if (typeof sub === "string") return [sub];
      return extractFromTree(sub);
    });
  };

  // 2. Main layering loop
  for (const code of codes) {
    const course = COURSE_DATA[code];
    if (!course) continue;

    // Use the recursive helper to get ALL prerequisite codes
    const allPrereqs = course.prereqs.flatMap((r) => extractFromTree(r));

    // Filter to only those that are actually in the current visible set (codes)
    const deps = allPrereqs.filter((c) => codeSet.has(c));

    if (deps.length === 0) {
      layers[code] = 0;
      queue.push(code);
    }
  }

  // BFS layer propagation
  while (queue.length > 0) {
    const cur = queue.shift()!;
    if (visited.has(cur)) continue;
    visited.add(cur);

    const course = COURSE_DATA[cur];
    if (!course) continue;

    for (const next of course.leadsTo.filter((c) => codeSet.has(c))) {
      layers[next] = Math.max(layers[next] ?? 0, (layers[cur] ?? 0) + 1);
      queue.push(next);
    }
  }

  // Fallback for any disconnected nodes
  for (const code of codes) {
    if (layers[code] === undefined) layers[code] = 0;
  }

  return layers;
}

// ── Layout Engine ─────────────────────────────────────────────────────────────

export function computeLayout(codes: string[]): PositionMap {
  const layers = assignLayers(codes);

  // Group nodes by layer column
  const byLayer: Record<number, string[]> = {};
  for (const [code, layer] of Object.entries(layers)) {
    if (!byLayer[layer]) byLayer[layer] = [];
    byLayer[layer].push(code);
  }

  const positions: PositionMap = {};

  for (const [layerStr, nodeCodes] of Object.entries(byLayer)) {
    const layer = Number(layerStr);
    const x = layer * (NODE_W + GAP_X) + 40;
    const totalH = nodeCodes.length * (NODE_H + GAP_Y) - GAP_Y;
    const startY = Math.max(100, (Math.max(MIN_H, totalH + 100) - totalH) / 2);

    nodeCodes.forEach((code, i) => {
      positions[code] = { x, y: startY + i * (NODE_H + GAP_Y) };
    });
  }

  return positions;
}

// ── Pathfinding ───────────────────────────────────────────────────────────────

/** Returns all transitive prerequisites of a course (inclusive). */
export function getAncestors(code: string, visited = new Set<string>()): Set<string> {
  // 1. Guard against cycles or redundant checks
  if (visited.has(code)) return visited;
  visited.add(code);

  const course = COURSE_DATA[code];
  if (!course || !course.prereqs) return visited;

  // 2. Process the top-level Requisite array
  for (const req of course.prereqs) {
    // 3. Process each item in the 'reqs' array
    for (const item of req.reqs) {
      if (typeof item === "string") {
        // It's a course code: recurse normally
        getAncestors(item, visited);
      } else {
        // It's a nested Requisite object: 
        // Use a helper to find all course codes inside it and recurse on them
        handleNestedRequisite(item, visited);
      }
    }
  }
  return visited;
}

function handleNestedRequisite(req: Requisite, visited: Set<string>) {
  for (const item of req.reqs) {
    if (typeof item === "string") {
      getAncestors(item, visited);
    } else {
      handleNestedRequisite(item, visited);
    }
  }
}

/** Returns all transitive dependants of a course (inclusive). */
export function getDescendants(code: string, visited = new Set<string>()): Set<string> {
  if (visited.has(code)) return visited;
  visited.add(code);

  const course = COURSE_DATA[code];
  if (!course) return visited;

  for (const next of course.leadsTo) {
    getDescendants(next, visited);
  }
  return visited;
}

/** Returns the union of ancestors and descendants for highlight set. */
export function getConnectedNodes(code: string): Set<string> {
  const ancestors   = getAncestors(code);
  const descendants = getDescendants(code);
  return new Set([...ancestors, ...descendants]);
}

/** Returns the set of edge keys (dep->code) within a highlighted node set. */
export function getHighlightedEdges(nodeSet: Set<string>): Set<string> {
  const edges = new Set<string>();

  // Helper to extract all course codes from a single Requisite tree
  const extractFromTree = (item: Requisite): string[] => {
    return item.reqs.flatMap((sub) => {
      if (typeof sub === "string") return [sub];
      return extractFromTree(sub);
    });
  };

  for (const code of nodeSet) {
    const course = COURSE_DATA[code];
    if (!course) continue;

    // 1. Flatten all levels of prerequisites into a simple list of codes
    const allPrereqCodes = course.prereqs.flatMap((req) => extractFromTree(req));

    // 2. Now 'dep' is strictly a string
    for (const dep of allPrereqCodes) {
      // 3. If the dependency is also in our highlight set, draw the edge
      if (nodeSet.has(dep)) {
        edges.add(`${dep}->${code}`);
      }
    }
  }
  
  return edges;
}

// ── Edge Builder ──────────────────────────────────────────────────────────────

export function buildEdges(
  visibleCodes: Set<string>,
  positions: PositionMap,
  highlightedEdges: Set<string>,
  selectedNode: string | null,
  highlightedNodes: Set<string>
): GraphEdge[] {
  const result: GraphEdge[] = [];

  // Reusable flattening helper
  const extractFromTree = (item: Requisite): string[] => {
    return item.reqs.flatMap((sub) => {
      if (typeof sub === "string") return [sub];
      return extractFromTree(sub);
    });
  };

  for (const code of visibleCodes) {
    const course = COURSE_DATA[code];
    const to = positions[code];
    if (!course || !to) continue;

    // 1. Flatten all levels of logic into a simple list of codes
    const allPrereqCodes = course.prereqs.flatMap((req) => extractFromTree(req));

    for (const dep of allPrereqCodes) {
      // 2. Now 'dep' is strictly a string (e.g., "MATH 135")
      const from = positions[dep];
      if (!from) continue;

      const edgeKey = `${dep}->${code}`;
      
      // Determine if this specific edge is part of the highlighted path
      const isSelected =
        !!selectedNode &&
        highlightedNodes.has(dep) &&
        highlightedNodes.has(code) &&
        highlightedEdges.has(edgeKey);

      result.push({
        key: edgeKey,
        x1: from.x + NODE_W,
        y1: from.y + NODE_H / 2,
        x2: to.x,
        y2: to.y + NODE_H / 2,
        mx: (from.x + NODE_W + to.x) / 2,
        isSelected,
      });
    }
  }

  return result;
}

// ── Canvas Dimensions ─────────────────────────────────────────────────────────

export function getCanvasDimensions(positions: PositionMap): { width: number; height: number } {
  const xs = Object.values(positions).map((p) => p.x);
  const ys = Object.values(positions).map((p) => p.y);
  return {
    width:  (xs.length ? Math.max(...xs) : 0) + NODE_W + 120,
    height: (ys.length ? Math.max(...ys) : 0) + NODE_H + 120,
  };
}
