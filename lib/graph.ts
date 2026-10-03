import type { PositionMap, GraphEdge } from "../types";
import { COURSE_DATA } from "../data/courses";
import { getAllRequisiteCourseCodes } from "./requisites";

// ── Constants ─────────────────────────────────────────────────────────────────

const NODE_W  = 180;
const NODE_H  = 80;
const GAP_X   = 60;
const GAP_Y   = 60;
const MIN_H   = 600;

// ── Topological Layer Assignment ──────────────────────────────────────────────

function visiblePrereqs(codes: string[]): Record<string, string[]> {
  const codeSet = new Set(codes);
  const deps: Record<string, string[]> = {};
  for (const code of codes) {
    const course = COURSE_DATA[code];
    deps[code] = course
      ? getAllRequisiteCourseCodes(course.prereqs).filter((c) => c !== code && codeSet.has(c))
      : [];
  }
  return deps;
}

/** Longest-path layering: every course sits one column right of its furthest-right prerequisite. */
function assignLayers(codes: string[], deps: Record<string, string[]>): Record<string, number> {
  const layers: Record<string, number> = {};
  const onStack = new Set<string>();

  // Edges back into the current DFS path are prereq cycles; they're ignored so layering terminates.
  function layerOf(code: string): number {
    if (layers[code] !== undefined) return layers[code];
    onStack.add(code);
    let layer = 0;
    for (const dep of deps[code]) {
      if (!onStack.has(dep)) layer = Math.max(layer, layerOf(dep) + 1);
    }
    onStack.delete(code);
    layers[code] = layer;
    return layer;
  }

  for (const code of codes) layerOf(code);
  return layers;
}

/**
 * Orders each column to reduce edge crossings (barycenter heuristic): alternately sweeps
 * left-to-right placing courses near the average row of their prerequisites, and
 * right-to-left placing them near the average row of the courses they unlock.
 */
function orderColumns(columns: string[][], deps: Record<string, string[]>): void {
  const unlocks: Record<string, string[]> = {};
  for (const col of columns) for (const code of col) unlocks[code] = [];
  for (const col of columns) for (const code of col) for (const dep of deps[code]) unlocks[dep].push(code);

  // Rows are measured from the column's centre because columns are rendered vertically centred.
  const row: Record<string, number> = {};
  const index = (col: string[]) => col.forEach((code, i) => { row[code] = i - (col.length - 1) / 2; });
  columns.forEach(index);

  const sortByNeighbours = (col: string[], neighbours: Record<string, string[]>) => {
    const key: Record<string, number> = {};
    for (const code of col) {
      const ns = neighbours[code];
      key[code] = ns.length ? ns.reduce((sum, n) => sum + row[n], 0) / ns.length : row[code];
    }
    col.sort((a, b) => key[a] - key[b]);
    index(col);
  };

  for (let sweep = 0; sweep < 4; sweep++) {
    for (let l = 1; l < columns.length; l++) sortByNeighbours(columns[l], deps);
    for (let l = columns.length - 2; l >= 0; l--) sortByNeighbours(columns[l], unlocks);
  }
}

// ── Layout Engine ─────────────────────────────────────────────────────────────

export function computeLayout(codes: string[]): PositionMap {
  const deps   = visiblePrereqs(codes);
  const layers = assignLayers(codes, deps);

  const columns: string[][] = [];
  for (const code of [...codes].sort()) {
    (columns[layers[code]] ??= []).push(code);
  }
  orderColumns(columns, deps);

  const positions: PositionMap = {};

  for (const [layer, nodeCodes] of columns.entries()) {
    const x = layer * (NODE_W + GAP_X) + 40;
    const totalH = nodeCodes.length * (NODE_H + GAP_Y) - GAP_Y;
    const startY = Math.max(24, (Math.max(MIN_H, totalH + 24) - totalH) / 2);

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

  for (const prereq of getAllRequisiteCourseCodes(course.prereqs)) {
    getAncestors(prereq, visited);
  }
  return visited;
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

  for (const code of nodeSet) {
    const course = COURSE_DATA[code];
    if (!course) continue;

    // 1. Flatten all levels of prerequisites into a simple list of codes
    const allPrereqCodes = getAllRequisiteCourseCodes(course.prereqs);

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

  for (const code of visibleCodes) {
    const course = COURSE_DATA[code];
    const to = positions[code];
    if (!course || !to) continue;

    // 1. Flatten all levels of logic into a deduplicated list of codes
    const allPrereqCodes = getAllRequisiteCourseCodes(course.prereqs);

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
