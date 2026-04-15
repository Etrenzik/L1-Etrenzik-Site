import { v4 as uuid } from "uuid";
import { prisma } from "@etrenzik-case/db";
import { MCPRegistry } from "@etrenzik-case/mcp";
import type { WorkflowDefinition, WorkflowEvent } from "@etrenzik-case/core";

/**
 * Central workflow orchestrator — routes tasks to tools/agents.
 * Supports deterministic workflows and agentic branching.
 * Every step emits structured events and logs.
 */
export class Orchestrator {
  private registry: MCPRegistry;

  constructor(registry: MCPRegistry) {
    this.registry = registry;
  }

  async execute(
    workflowRunId: string,
    definition: WorkflowDefinition,
    input: Record<string, unknown>
  ): Promise<{ events: WorkflowEvent[]; output: unknown }> {
    const events: WorkflowEvent[] = [];
    let currentStepId = definition.steps[0]?.id;
    let stepInput = input;

    await prisma.workflowRun.update({
      where: { id: workflowRunId },
      data: { status: "running" },
    });

    while (currentStepId) {
      const step = definition.steps.find((s) => s.id === currentStepId);
      if (!step) break;

      const eventId = uuid();
      const startTime = Date.now();

      events.push({
        id: eventId,
        workflowRunId,
        stepId: step.id,
        status: "started",
        timestamp: new Date().toISOString(),
        input: stepInput,
      });

      try {
        let output: unknown;

        if (step.toolId && this.registry.has(step.toolId)) {
          output = await this.registry.execute(step.toolId, stepInput);
        } else {
          // Stub for steps without a registered tool
          output = { status: "stub", stepId: step.id };
        }

        const duration = Date.now() - startTime;

        events.push({
          id: uuid(),
          workflowRunId,
          stepId: step.id,
          status: "completed",
          timestamp: new Date().toISOString(),
          output: output as Record<string, unknown>,
          durationMs: duration,
        });

        // Advance to next step
        stepInput = { ...stepInput, ...((output as Record<string, unknown>) ?? {}) };
        currentStepId = step.onSuccess;
      } catch (error) {
        const duration = Date.now() - startTime;

        events.push({
          id: uuid(),
          workflowRunId,
          stepId: step.id,
          status: "failed",
          timestamp: new Date().toISOString(),
          error: error instanceof Error ? error.message : String(error),
          durationMs: duration,
        });

        if (step.onFailure) {
          currentStepId = step.onFailure;
        } else {
          await prisma.workflowRun.update({
            where: { id: workflowRunId },
            data: {
              status: "failed",
              error: error instanceof Error ? error.message : String(error),
              completedAt: new Date(),
              events: events as unknown as Record<string, unknown>[],
            },
          });
          return { events, output: { error: true } };
        }
      }
    }

    await prisma.workflowRun.update({
      where: { id: workflowRunId },
      data: {
        status: "completed",
        completedAt: new Date(),
        events: events as unknown as Record<string, unknown>[],
        output: stepInput,
      },
    });

    return { events, output: stepInput };
  }
}
