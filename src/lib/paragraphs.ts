/**
 * Splits a tour/blog description into paragraphs, one per blank line.
 *
 * Robust to how admins actually type text: Windows line endings (\r\n),
 * extra blank lines, or a line with only whitespace on it all count as
 * a single paragraph break. Without this, text saved from a Windows
 * browser (which sends \r\n) silently failed to split at all when the
 * code looked for an exact "\n\n" match, collapsing the whole
 * description into one paragraph and dumping every photo into the
 * "extra gallery" section instead of alongside the text.
 */
export function splitParagraphs(text: string): string[] {
  return text
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

/** Splits admin-entered "one item per line" text (e.g. what's included) into a clean list. */
export function splitLines(text: string): string[] {
  return text
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}
