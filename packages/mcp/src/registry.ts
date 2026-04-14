import type { MCPTool } from "./types.js";

/**
 * MCP Tool Registry — central registration and lookup for all MCP tools/agents.
 * Each tool declares input schema, output schema, permissions, and failure modes.
 */
export class MCPRegistry {
  private tools = new Map<string, MCPTool>();

  register(tool: MCPTool): void {
    if (this.tools.has(tool.id)) {
      throw new Error(`Tool already registered: ${tool.id}`);
    }
    this.tools.set(tool.id, tool);
  }

  get(id: string): MCPTool | undefined {
    return this.tools.get(id);
  }

  getAll(): MCPTool[] {
    return Array.from(this.tools.values());
  }

  has(id: string): boolean {
    return this.tools.has(id);
  }

  async execute(id: string, input: unknown): Promise<unknown> {
    const tool = this.tools.get(id);
    if (!tool) throw new Error(`Tool not found: ${id}`);

    const parsed = tool.inputSchema.safeParse(input);
    if (!parsed.success) {
      return {
        success: false,
        error: `Input validation failed: ${parsed.error.message}`,
        disclaimer: "DRAFT WORK PRODUCT — NOT LEGAL ADVICE",
      };
    }

    return tool.execute(parsed.data);
  }

  list(): Array<{ id: string; name: string; description: string; version: string }> {
    return this.getAll().map((t) => ({
      id: t.id,
      name: t.name,
      description: t.description,
      version: t.version,
    }));
  }
}
