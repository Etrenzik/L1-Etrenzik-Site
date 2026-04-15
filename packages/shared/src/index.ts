/**
 * @etrenzik-case/shared
 * Shared utilities, constants, and API types
 * DRAFT WORK PRODUCT — NOT LEGAL ADVICE
 */

import { z } from "zod";

// ── API response wrapper ──
export interface ApiResponse<T> {
  data: T;
  disclaimer?: string;
  meta?: {
    total?: number;
    page?: number;
    pageSize?: number;
  };
}

export interface ApiError {
  error: string | object;
  code?: string;
}

// ── Pagination ──
export const PaginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
});
export type Pagination = z.infer<typeof PaginationSchema>;

// ── Date helpers ──
export function formatDate(date: Date | string): string {
  return new Date(date).toISOString().split("T")[0]!;
}

export function parseDate(dateStr: string): Date {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) throw new Error(`Invalid date: ${dateStr}`);
  return d;
}

// ── Currency helpers ──
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

// ── Disclaimer constants ──
export const DISCLAIMERS = {
  DRAFT: "DRAFT WORK PRODUCT — NOT LEGAL ADVICE — ATTORNEY REVIEW REQUIRED",
  FINANCIAL: "DRAFT WORK PRODUCT — Financial figures require independent verification",
  TIMELINE: "DRAFT WORK PRODUCT — Timeline events are categorized by evidence status",
  SEARCH: "DRAFT WORK PRODUCT — Search results require verification against source documents",
} as const;

// ── Evidence status type (shared across frontend and backend) ──
export type EvidenceStatus = "confirmed" | "alleged" | "disputed" | "missing";
export type JurisdictionTag = "AL" | "GA" | "FEDERAL" | "UNKNOWN";
export type PaymentStatus = "paid" | "unpaid" | "partial" | "disputed";
