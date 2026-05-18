"use client";

import { useState } from "react";
import { useStore } from "../lib/store";
import { encodeShareSnapshot, SHARE_HASH_PREFIX, SHARE_VERSION } from "../lib/share";

export default function ShareLinkButton() {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  const copyShareLink = async () => {
    const {
      activeFacultyId,
      activeMajorId,
      activeSubMajorId,
      completedCourses,
      plannedCourses,
      termPlan,
      termPlanEditedByUser,
    } = useStore.getState();

    const encoded = encodeShareSnapshot({
      v: SHARE_VERSION,
      activeFacultyId,
      activeMajorId,
      activeSubMajorId,
      completedCourses: [...completedCourses].sort(),
      plannedCourses: [...plannedCourses].sort(),
      termPlan,
      termPlanEditedByUser,
    });
    const url = `${window.location.origin}${window.location.pathname}#${SHARE_HASH_PREFIX}${encoded}`;

    try {
      await navigator.clipboard.writeText(url);
      setStatus("copied");
      window.setTimeout(() => setStatus("idle"), 1800);
    } catch {
      setStatus("error");
      window.prompt("Copy share link", url);
    }
  };

  return (
    <button
      onClick={copyShareLink}
      title="Copy a link that shares your selected major, completed courses, planned courses, and term plan"
      style={{
        padding:      "5px 12px",
        borderRadius: 6,
        border:       `1px solid ${status === "copied" ? "#4ADE8060" : "#60A5FA45"}`,
        background:   status === "copied" ? "#4ADE8015" : "#60A5FA12",
        color:        status === "copied" ? "#4ADE80" : "#93C5FD",
        fontSize:     10,
        fontFamily:   "inherit",
        cursor:       "pointer",
        transition:   "all 0.15s",
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        whiteSpace:   "nowrap",
      }}
    >
      {status === "copied" ? "Copied" : status === "error" ? "Copy Manually" : "Share Plan"}
    </button>
  );
}

