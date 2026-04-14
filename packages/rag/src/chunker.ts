import { v4 as uuid } from "uuid";

export interface ChunkResult {
  id: string;
  content: string;
  chunkIndex: number;
  metadata: {
    startOffset: number;
    endOffset: number;
    pageNumber?: number;
  };
}

/**
 * Document-aware chunker with configurable chunk size and overlap.
 * Preserves document structure (headings, paragraphs, tables) when possible.
 */
export class Chunker {
  constructor(
    private readonly chunkSize: number = 1000,
    private readonly overlap: number = 200
  ) {}

  chunk(text: string, documentMetadata?: Record<string, unknown>): ChunkResult[] {
    const chunks: ChunkResult[] = [];

    // Split by paragraphs first to preserve semantic boundaries
    const paragraphs = text.split(/\n\n+/);
    let currentChunk = "";
    let chunkIndex = 0;
    let startOffset = 0;
    let currentOffset = 0;

    for (const paragraph of paragraphs) {
      if (currentChunk.length + paragraph.length > this.chunkSize && currentChunk.length > 0) {
        chunks.push({
          id: uuid(),
          content: currentChunk.trim(),
          chunkIndex,
          metadata: {
            startOffset,
            endOffset: currentOffset,
            ...documentMetadata,
          },
        });
        chunkIndex++;
        // Apply overlap
        const overlapText = currentChunk.slice(-this.overlap);
        startOffset = currentOffset - overlapText.length;
        currentChunk = overlapText;
      }
      currentChunk += (currentChunk ? "\n\n" : "") + paragraph;
      currentOffset += paragraph.length + 2;
    }

    // Final chunk
    if (currentChunk.trim()) {
      chunks.push({
        id: uuid(),
        content: currentChunk.trim(),
        chunkIndex,
        metadata: { startOffset, endOffset: currentOffset },
      });
    }

    return chunks;
  }
}
