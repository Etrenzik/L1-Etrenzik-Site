import type { WorkflowDefinition } from "@etrenzik-case/core";

/**
 * Timeline Reconstruction Workflow
 * Steps: gather events → sort → gap detection → contradiction scan → output
 */
export const timelineReconstructionWorkflow: WorkflowDefinition = {
  id: "timeline-reconstruction",
  name: "Timeline Reconstruction",
  description: "Build chronological timeline from all case events, detect gaps and contradictions",
  version: "1.0.0",
  steps: [
    {
      id: "gather-events",
      name: "Gather All Events",
      onSuccess: "build-timeline",
    },
    {
      id: "build-timeline",
      name: "Build Sorted Timeline",
      toolId: "timeline_builder",
      onSuccess: "detect-gaps",
    },
    {
      id: "detect-gaps",
      name: "Detect Timeline Gaps",
      onSuccess: "scan-contradictions",
    },
    {
      id: "scan-contradictions",
      name: "Scan for Contradictions",
      onSuccess: "output",
    },
    {
      id: "output",
      name: "Generate Timeline Output",
      requiresReview: true,
    },
  ],
};
