/**
 * Zero-dependency build-time YAML-subset frontmatter & Markdown AST parser (RUL-DEP-02, RUL-SEC-06).
 * Converts Markdown into typed React-renderable blocks without raw HTML string injection.
 */

export type InlineSpan =
  | { type: 'text'; text: string }
  | { type: 'bold'; text: string }
  | { type: 'italic'; text: string }
  | { type: 'code'; text: string }
  | { type: 'link'; label: string; href: string };

export type MarkdownBlock =
  | { type: 'heading3'; id: string; text: string }
  | { type: 'paragraph'; spans: InlineSpan[] }
  | { type: 'list'; ordered: boolean; items: InlineSpan[][] }
  | { type: 'code'; lang: string; code: string }
  | { type: 'blockquote'; spans: InlineSpan[] }
  | {
      type: 'table';
      headers: InlineSpan[][];
      alignments: Array<'left' | 'right' | 'center'>;
      rows: InlineSpan[][][];
    };

export type MarkdownSection = {
  id: string;
  heading: string;
  canonicalKey: CanonicalSectionKey | 'extra';
  blocks: MarkdownBlock[];
};

export type CanonicalSectionKey =
  | 'overview'
  | 'problem'
  | 'objective'
  | 'solution'
  | 'features'
  | 'workflow'
  | 'challenges'
  | 'performance'
  | 'lessonsLearned'
  | 'futureImprovements';

export type ChallengeSolutionPair = {
  challenge: string;
  solution: string;
};

export type ExtractedFeature = {
  title: string;
  description: string;
};

export type ExtractedWorkflowStep = {
  title: string;
  description: string;
};

const HEADING_MAP: Record<string, CanonicalSectionKey> = {
  'project overview': 'overview',
  overview: 'overview',
  'problem statement': 'problem',
  'business problem': 'problem',
  'business objective': 'objective',
  'project objective': 'objective',
  solution: 'solution',
  features: 'features',
  'key features': 'features',
  'development workflow': 'workflow',
  workflow: 'workflow',
  'challenges and solutions': 'challenges',
  performance: 'performance',
  'lessons learned': 'lessonsLearned',
  'future improvements': 'futureImprovements',
};

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function stripInlineComment(line: string): string {
  let inSingle = false;
  let inDouble = false;
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (ch === "'" && !inDouble) inSingle = !inSingle;
    else if (ch === '"' && !inSingle) inDouble = !inDouble;
    else if (ch === '#' && !inSingle && !inDouble && (i === 0 || line[i - 1] === ' ')) {
      return line.slice(0, i).trimEnd();
    }
  }
  return line;
}

function parseScalar(raw: string): unknown {
  const val = raw.trim();
  if (val === '' || val === 'null' || val === '~') return null;
  if (val === 'true') return true;
  if (val === 'false') return false;
  if (/^-?\d+(?:\.\d+)?$/.test(val)) return Number(val);
  if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
    return val.slice(1, -1).replace(/\\"/g, '"').replace(/\\n/g, '\n');
  }
  if (val.startsWith('[') && val.endsWith(']')) {
    const inner = val.slice(1, -1).trim();
    if (!inner) return [];
    const items: unknown[] = [];
    let current = '';
    let quote: '"' | "'" | null = null;
    for (let i = 0; i < inner.length; i += 1) {
      const ch = inner[i];
      if ((ch === '"' || ch === "'") && inner[i - 1] !== '\\') {
        quote = quote === ch ? null : (quote ?? ch);
        current += ch;
      } else if (ch === ',' && !quote) {
        items.push(parseScalar(current));
        current = '';
      } else {
        current += ch;
      }
    }
    if (current.trim() !== '') items.push(parseScalar(current));
    return items;
  }
  return val;
}

function countIndent(line: string): number {
  let count = 0;
  while (count < line.length && line[count] === ' ') count += 1;
  return count;
}

function parseYamlBlock(
  lines: string[],
  startIndex: number,
  baseIndent: number,
): { value: Record<string, unknown>; nextIndex: number } {
  const result: Record<string, unknown> = {};
  let i = startIndex;

  while (i < lines.length) {
    const rawLine = lines[i] ?? '';
    const cleaned = stripInlineComment(rawLine);
    if (cleaned.trim() === '') {
      i += 1;
      continue;
    }

    const indent = countIndent(cleaned);
    if (indent < baseIndent) break;
    if (indent > baseIndent) {
      throw new Error(`Unexpected indentation at frontmatter line ${i + 1}: "${rawLine}"`);
    }

    const trimmed = cleaned.trim();
    if (trimmed.startsWith('- ')) break;

    const colonIdx = trimmed.indexOf(':');
    if (colonIdx === -1) {
      throw new Error(`Expected key: value at frontmatter line ${i + 1}: "${rawLine}"`);
    }

    const key = trimmed.slice(0, colonIdx).trim();
    const rest = trimmed.slice(colonIdx + 1).trim();

    if (rest === '|' || rest === '>') {
      const blockLines: string[] = [];
      let j = i + 1;
      let blockIndent: number | null = null;
      while (j < lines.length) {
        const nextRaw = lines[j] ?? '';
        if (nextRaw.trim() === '') {
          blockLines.push('');
          j += 1;
          continue;
        }
        const nextInd = countIndent(nextRaw);
        if (nextInd <= baseIndent) break;
        if (blockIndent === null) blockIndent = nextInd;
        blockLines.push(nextRaw.slice(Math.min(blockIndent, nextRaw.length)));
        j += 1;
      }
      result[key] = rest === '|' ? blockLines.join('\n').trimEnd() : blockLines.join(' ').trim();
      i = j;
      continue;
    }

    if (rest !== '') {
      result[key] = parseScalar(rest);
      i += 1;
      continue;
    }

    // Look ahead for nested map or list
    let nextNonEmpty = i + 1;
    while (
      nextNonEmpty < lines.length &&
      stripInlineComment(lines[nextNonEmpty] ?? '').trim() === ''
    ) {
      nextNonEmpty += 1;
    }
    if (nextNonEmpty >= lines.length) {
      result[key] = null;
      i = nextNonEmpty;
      continue;
    }
    const nextCleaned = stripInlineComment(lines[nextNonEmpty] ?? '');
    const nextIndent = countIndent(nextCleaned);
    if (nextIndent <= baseIndent) {
      result[key] = null;
      i = nextNonEmpty;
      continue;
    }

    if (nextCleaned.trim().startsWith('- ')) {
      const parsedArray = parseYamlArray(lines, nextNonEmpty, nextIndent);
      result[key] = parsedArray.value;
      i = parsedArray.nextIndex;
    } else {
      const parsedObj = parseYamlBlock(lines, nextNonEmpty, nextIndent);
      result[key] = parsedObj.value;
      i = parsedObj.nextIndex;
    }
  }

  return { value: result, nextIndex: i };
}

function parseYamlArray(
  lines: string[],
  startIndex: number,
  baseIndent: number,
): { value: unknown[]; nextIndex: number } {
  const arr: unknown[] = [];
  let i = startIndex;

  while (i < lines.length) {
    const rawLine = lines[i] ?? '';
    const cleaned = stripInlineComment(rawLine);
    if (cleaned.trim() === '') {
      i += 1;
      continue;
    }

    const indent = countIndent(cleaned);
    if (indent < baseIndent) break;
    if (indent > baseIndent || !cleaned.trim().startsWith('- ')) break;

    const afterDash = cleaned.trim().slice(2);
    const colonIdx = afterDash.indexOf(':');
    const isObjectEntry =
      colonIdx > 0 &&
      !afterDash.startsWith('"') &&
      !afterDash.startsWith("'") &&
      !afterDash.slice(0, colonIdx).includes(' ');

    if (!isObjectEntry) {
      arr.push(parseScalar(afterDash));
      i += 1;
      continue;
    }

    // Parse object list item (first key on '- key: val', remaining indented at indent + 2)
    const obj: Record<string, unknown> = {};
    const firstKey = afterDash.slice(0, colonIdx).trim();
    const firstRest = afterDash.slice(colonIdx + 1).trim();
    if (firstRest !== '') {
      obj[firstKey] = parseScalar(firstRest);
      i += 1;
    } else {
      i += 1;
    }

    const itemChildIndent = baseIndent + 2;
    const restObj = parseYamlBlock(lines, i, itemChildIndent);
    Object.assign(obj, restObj.value);
    i = restObj.nextIndex;
    arr.push(obj);
  }

  return { value: arr, nextIndex: i };
}

export function splitFrontmatterAndBody(source: string): {
  frontmatter: Record<string, unknown>;
  body: string;
} {
  const normalized = source.replace(/\r\n/g, '\n');
  if (!normalized.startsWith('---\n')) {
    throw new Error('Missing starting YAML frontmatter delimiter "---"');
  }
  const endIdx = normalized.indexOf('\n---\n', 4);
  const altEndIdx = endIdx === -1 ? normalized.indexOf('\n---', 4) : endIdx;
  if (altEndIdx === -1) {
    throw new Error('Missing closing YAML frontmatter delimiter "---"');
  }

  const yamlText = normalized.slice(4, altEndIdx);
  const body = normalized.slice(altEndIdx + 5).trim();
  const yamlLines = yamlText.split('\n');
  const parsed = parseYamlBlock(yamlLines, 0, 0);
  return { frontmatter: parsed.value, body };
}

export function parseInlineSpans(text: string): InlineSpan[] {
  const spans: InlineSpan[] = [];
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      spans.push({ type: 'text', text: text.slice(lastIndex, match.index) });
    }
    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      spans.push({ type: 'bold', text: token.slice(2, -2) });
    } else if (token.startsWith('*') && token.endsWith('*')) {
      spans.push({ type: 'italic', text: token.slice(1, -1) });
    } else if (token.startsWith('`') && token.endsWith('`')) {
      spans.push({ type: 'code', text: token.slice(1, -1) });
    } else if (token.startsWith('[')) {
      const sep = token.indexOf('](');
      const label = token.slice(1, sep);
      const href = token.slice(sep + 2, -1).trim();
      const safeHref =
        href.startsWith('https://') || href.startsWith('/') || href.startsWith('#') ? href : '#';
      spans.push({ type: 'link', label, href: safeHref });
    }
    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    spans.push({ type: 'text', text: text.slice(lastIndex) });
  }
  return spans;
}

function splitTableRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((c) => c.trim());
}

function isTableSeparator(line: string): boolean {
  const cells = splitTableRow(line);
  return cells.length > 0 && cells.every((c) => /^:?-{2,}:?$/.test(c));
}

function parseTableAlignments(line: string): Array<'left' | 'right' | 'center'> {
  return splitTableRow(line).map((c) => {
    if (c.startsWith(':') && c.endsWith(':')) return 'center';
    if (c.endsWith(':')) return 'right';
    return 'left';
  });
}

function stripComments(body: string): string {
  return body.replace(/<!--[\s\S]*?-->/g, '');
}

function parseBlocks(sectionBody: string): MarkdownBlock[] {
  const lines = stripComments(sectionBody).split('\n');
  const blocks: MarkdownBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = (lines[i] ?? '').trimEnd();
    if (line.trim() === '') {
      i += 1;
      continue;
    }

    // Fenced code block
    if (line.trim().startsWith('```')) {
      const lang = line.trim().slice(3).trim() || 'text';
      const codeLines: string[] = [];
      i += 1;
      while (i < lines.length && !(lines[i] ?? '').trim().startsWith('```')) {
        codeLines.push(lines[i] ?? '');
        i += 1;
      }
      i += 1;
      blocks.push({ type: 'code', lang, code: codeLines.join('\n').trimEnd() });
      continue;
    }

    // Heading 3
    if (line.startsWith('### ')) {
      const text = line.slice(4).trim();
      blocks.push({ type: 'heading3', id: slugifyHeading(text), text });
      i += 1;
      continue;
    }

    // Blockquote
    if (line.trim().startsWith('> ')) {
      const quoteLines: string[] = [];
      while (i < lines.length && (lines[i] ?? '').trim().startsWith('> ')) {
        quoteLines.push((lines[i] ?? '').trim().slice(2));
        i += 1;
      }
      blocks.push({ type: 'blockquote', spans: parseInlineSpans(quoteLines.join(' ')) });
      continue;
    }

    // GFM Table
    if (line.includes('|') && i + 1 < lines.length && isTableSeparator(lines[i + 1] ?? '')) {
      const headers = splitTableRow(line).map((cell) => parseInlineSpans(cell));
      const alignments = parseTableAlignments(lines[i + 1] ?? '');
      const rows: InlineSpan[][][] = [];
      i += 2;
      while (i < lines.length && (lines[i] ?? '').includes('|') && (lines[i] ?? '').trim() !== '') {
        rows.push(splitTableRow(lines[i] ?? '').map((cell) => parseInlineSpans(cell)));
        i += 1;
      }
      blocks.push({ type: 'table', headers, alignments, rows });
      continue;
    }

    // List (unordered or ordered)
    const unorderedMatch = /^[-*]\s+(.+)$/.exec(line.trim());
    const orderedMatch = /^\d+\.\s+(.+)$/.exec(line.trim());
    if (unorderedMatch || orderedMatch) {
      const ordered = Boolean(orderedMatch);
      const items: InlineSpan[][] = [];
      while (i < lines.length) {
        const cur = (lines[i] ?? '').trim();
        const m = ordered ? /^\d+\.\s+(.+)$/.exec(cur) : /^[-*]\s+(.+)$/.exec(cur);
        if (!m || !m[1]) break;
        items.push(parseInlineSpans(m[1]));
        i += 1;
      }
      blocks.push({ type: 'list', ordered, items });
      continue;
    }

    // Paragraph (consume until blank line or block starter)
    const paraLines: string[] = [];
    while (i < lines.length) {
      const cur = (lines[i] ?? '').trim();
      if (
        cur === '' ||
        cur.startsWith('### ') ||
        cur.startsWith('```') ||
        cur.startsWith('> ') ||
        /^[-*]\s+/.test(cur) ||
        /^\d+\.\s+/.test(cur)
      ) {
        break;
      }
      paraLines.push(cur);
      i += 1;
    }
    if (paraLines.length > 0) {
      blocks.push({ type: 'paragraph', spans: parseInlineSpans(paraLines.join(' ')) });
    }
  }

  return blocks;
}

export function parseMarkdownSections(body: string): MarkdownSection[] {
  const cleaned = stripComments(body).replace(/\r\n/g, '\n');
  const lines = cleaned.split('\n');
  const sections: MarkdownSection[] = [];
  let currentHeading: string | null = null;
  let buffer: string[] = [];

  const flush = () => {
    if (!currentHeading) return;
    const blocks = parseBlocks(buffer.join('\n'));
    if (blocks.length === 0) return;
    const canonicalKey = HEADING_MAP[currentHeading.toLowerCase()] ?? 'extra';
    sections.push({
      id: slugifyHeading(currentHeading),
      heading: currentHeading,
      canonicalKey,
      blocks,
    });
  };

  let inFence = false;
  for (const line of lines) {
    if (line.trim().startsWith('```')) inFence = !inFence;
    if (!inFence && line.startsWith('## ')) {
      flush();
      currentHeading = line.slice(3).trim();
      buffer = [];
    } else if (currentHeading !== null) {
      buffer.push(line);
    }
  }
  flush();

  return sections;
}

export function extractFeatures(section: MarkdownSection | undefined): ExtractedFeature[] {
  if (!section) return [];
  const listBlock = section.blocks.find((b) => b.type === 'list');
  if (!listBlock || listBlock.type !== 'list') return [];

  return listBlock.items.map((spans) => {
    const fullText = spans
      .map((s) => (s.type === 'link' ? s.label : s.text))
      .join('')
      .trim();
    const firstSpan = spans[0];
    if (firstSpan && firstSpan.type === 'bold') {
      const rest = spans
        .slice(1)
        .map((s) => (s.type === 'link' ? s.label : s.text))
        .join('')
        .replace(/^[:\-\s]+/, '')
        .trim();
      return {
        title: firstSpan.text.replace(/:$/, ''),
        description: rest || fullText,
      };
    }
    const colonIdx = fullText.indexOf(':');
    if (colonIdx > 0 && colonIdx < 60) {
      return {
        title: fullText.slice(0, colonIdx).trim(),
        description: fullText.slice(colonIdx + 1).trim(),
      };
    }
    return { title: fullText, description: '' };
  });
}

export function extractWorkflowSteps(
  section: MarkdownSection | undefined,
): ExtractedWorkflowStep[] {
  if (!section) return [];
  return extractFeatures(section);
}

export function extractChallengePairs(
  section: MarkdownSection | undefined,
): ChallengeSolutionPair[] {
  if (!section) return [];
  const pairs: ChallengeSolutionPair[] = [];
  let activeChallenge = '';

  for (const block of section.blocks) {
    if (block.type === 'heading3') {
      activeChallenge = block.text.replace(/^Challenge:\s*/i, '').trim();
    } else if (block.type === 'paragraph' && activeChallenge) {
      const raw = block.spans
        .map((s) => (s.type === 'link' ? s.label : s.text))
        .join('')
        .replace(/^Solution:\s*/i, '')
        .trim();
      if (raw) {
        pairs.push({ challenge: activeChallenge, solution: raw });
        activeChallenge = '';
      }
    }
  }
  return pairs;
}
