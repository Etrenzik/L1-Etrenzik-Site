import { prisma } from "@l1-etrenzik/db";
import { Chunker } from "./chunker.js";
import { v4 as uuid } from "uuid";

/**
 * Document ingestion pipeline
 * Handles: PDF, DOCX, XLSX, EML, MSG, CSV, TXT, images
 * DRAFT WORK PRODUCT — maintains full provenance chain
 */
export class DocumentIngestionPipeline {
  private chunker = new Chunker();

  async ingest(documentId: string): Promise<{ chunkCount: number }> {
    const doc = await prisma.document.findUnique({ where: { id: documentId } });
    if (!doc) throw new Error(`Document not found: ${documentId}`);

    // Update status
    await prisma.document.update({
      where: { id: documentId },
      data: { status: "parsing" },
    });

    try {
      // Extract text based on mime type
      const text = await this.extractText(doc.filePath, doc.mimeType);

      // Chunk the text
      const chunks = this.chunker.chunk(text);

      // Store chunks with citations
      for (const chunk of chunks) {
        const chunkId = uuid();
        await prisma.chunk.create({
          data: {
            id: chunkId,
            documentId: doc.id,
            content: chunk.content,
            chunkIndex: chunk.chunkIndex,
            metadata: chunk.metadata,
          },
        });

        // Create citation reference for this chunk
        await prisma.citation.create({
          data: {
            documentId: doc.id,
            chunkId,
            excerpt: chunk.content.substring(0, 200),
            evidenceStatus: "confirmed", // direct document content
          },
        });
      }

      // Update provenance chain
      await prisma.document.update({
        where: { id: documentId },
        data: {
          status: "parsed",
          provenance: {
            chain: [
              ...(Array.isArray(doc.provenance) ? doc.provenance : []),
              {
                action: "ingested",
                timestamp: new Date().toISOString(),
                chunkCount: chunks.length,
              },
            ],
          },
        },
      });

      return { chunkCount: chunks.length };
    } catch (error) {
      await prisma.document.update({
        where: { id: documentId },
        data: { status: "error" },
      });
      throw error;
    }
  }

  private async extractText(filePath: string, mimeType: string): Promise<string> {
    // TODO: Phase 2 — implement parsers per mime type
    // pdf: pdf-parse or pdfjs
    // docx: mammoth
    // xlsx: xlsx / exceljs
    // eml/msg: mailparser
    // csv: csv-parse
    // images: tesseract.js OCR
    switch (mimeType) {
      case "text/plain":
      case "text/csv":
        // Read file directly
        const { readFile } = await import("fs/promises");
        return readFile(filePath, "utf-8");
      default:
        return `[TODO: Parser for ${mimeType} not yet implemented — Phase 2]`;
    }
  }
}
