// Extract the brand system embedded in 10PeakStudio_Brand_Guidelines.html (Architecture.md 3).
// - public/brand/**      : original files, unmodified (C2PA metadata kept) + manifest.json
// - public/icons/**, public/favicon.ico : favicon / app icons (Design.md 3.6)
// - src/components/brand/svg/*.tsx      : inline logo components (metadata removed,
//   gradient IDs namespaced per instance, parts tagged with data-part for the loader)
// Idempotent: safe to re-run. Never edits the logo geometry or colours (misuse M1 to M9).
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const SRC = '10PeakStudio_Brand_Guidelines.html';
const html = await readFile(SRC, 'utf8');
const line = html.split('\n').find((l) => l.startsWith('const A={'));
if (!line) throw new Error('Asset blob "const A={...}" not found in brand HTML');
const assets = JSON.parse(line.slice('const A='.length).trim().replace(/;$/, ''));

const manifest = [];
for (const [path, [mime, b64]] of Object.entries(assets)) {
  const buf = Buffer.from(b64, 'base64');
  const dest = join('public', 'brand', path);
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, buf);
  let dimensions = null;
  if (mime === 'image/svg+xml') {
    const svg = buf.toString('utf8').match(/<svg[^>]*>/)?.[0] ?? '';
    const w = svg.match(/\swidth="([\d.]+)"/)?.[1];
    const h = svg.match(/\sheight="([\d.]+)"/)?.[1];
    if (w && h) dimensions = `${w}x${h}`;
  } else if (mime === 'image/png') {
    dimensions = `${buf.readUInt32BE(16)}x${buf.readUInt32BE(20)}`;
  }
  manifest.push({ file: path, mime, bytes: buf.length, dimensions });
}
await writeFile(join('public', 'brand', 'manifest.json'), JSON.stringify(manifest, null, 2));

// Icons (Design.md 3.6)
const raw = (p) => Buffer.from(assets[p][1], 'base64');
await mkdir(join('public', 'icons'), { recursive: true });
await writeFile(join('public', 'favicon.ico'), raw('02-Logomark/favicon.ico'));
await writeFile(
  join('public', 'icons', 'favicon.svg'),
  stripMetadata(raw('02-Logomark/10PeakStudio_Favicon.svg').toString('utf8')),
);
await writeFile(
  join('public', 'icons', 'apple-touch-icon.png'),
  raw('02-Logomark/10PeakStudio_Icon_180.png'),
);
await writeFile(
  join('public', 'icons', 'icon-512.png'),
  raw('02-Logomark/10PeakStudio_Icon_512.png'),
);
await sharp(raw('02-Logomark/10PeakStudio_AppIcon.svg'), { density: 192 })
  .resize(192, 192)
  .png()
  .toFile(join('public', 'icons', 'icon-192.png'));

// Web copies for <img> logos: identical artwork, C2PA <metadata> removed to save bytes
const WEB_LOGOS = {
  'horizontal-3d-light.svg': '01-Primary/10PeakStudio_Primary_Horizontal_Light.svg',
  'horizontal-flat-light.svg': '01-Primary/10PeakStudio_Primary_Horizontal_Flat_Light.svg',
  'horizontal-3d-dark.svg': '01-Primary/10PeakStudio_Primary_Horizontal_Dark.svg',
  'mark-3d-light.svg': '02-Logomark/10PeakStudio_Logomark_3D_Light.svg',
};
await mkdir(join('public', 'logos'), { recursive: true });
for (const [name, path] of Object.entries(WEB_LOGOS)) {
  await writeFile(join('public', 'logos', name), stripMetadata(raw(path).toString('utf8')));
}

// Inline logo components
const COMPONENTS = [
  ['LogoHorizontal3DLight', '01-Primary/10PeakStudio_Primary_Horizontal_Light.svg'],
  ['LogoHorizontalFlatLight', '01-Primary/10PeakStudio_Primary_Horizontal_Flat_Light.svg'],
  ['LogoHorizontal3DDark', '01-Primary/10PeakStudio_Primary_Horizontal_Dark.svg'],
  ['LogoMark3DLight', '02-Logomark/10PeakStudio_Logomark_3D_Light.svg'],
];
const PART_BY_GRADIENT = {
  lv: 'band',
  lb: 'ribbon',
  lf: 'fold',
  ls: 'stem',
  l1: 'one',
  la: 'arrow',
};
const ATTR_MAP = {
  'stop-color': 'stopColor',
  'stop-opacity': 'stopOpacity',
  'stroke-width': 'strokeWidth',
  'stroke-opacity': 'strokeOpacity',
  'stroke-linejoin': 'strokeLinejoin',
  'stroke-linecap': 'strokeLinecap',
  'fill-rule': 'fillRule',
  'clip-rule': 'clipRule',
  'fill-opacity': 'fillOpacity',
};

function stripMetadata(svg) {
  return svg.replace(/<metadata>[\s\S]*?<\/metadata>/g, '').replace(/\sxmlns:c2pa="[^"]*"/g, '');
}

function toJsx(svgText) {
  let svg = stripMetadata(svgText);
  const viewBox = svg.match(/viewBox="([^"]+)"/)?.[1];
  const width = svg.match(/<svg[^>]*\swidth="([\d.]+)"/)?.[1];
  const height = svg.match(/<svg[^>]*\sheight="([\d.]+)"/)?.[1];
  let inner = svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
  inner = inner.replace(/<title>[\s\S]*?<\/title>/g, '');
  // Tag parts for the loader / motion (read-only hooks; geometry untouched)
  inner = inner.replace(/<path fill="url\(#(\w+)\)"/g, (m, id) =>
    PART_BY_GRADIENT[id] ? `<path data-part="${PART_BY_GRADIENT[id]}" fill="url(#${id})"` : m,
  );
  inner = inner.replace(
    /<g transform="translate\(784 228\.5\)">/g,
    '<g data-part="wordmark" transform="translate(784 228.5)">',
  );
  inner = inner.replace(/<g fill="none" stroke=/g, '<g data-part="halo" fill="none" stroke=');
  // Namespace gradient IDs per instance
  inner = inner.replace(/\sid="(\w+)"/g, ' id={`${uid}-$1`}');
  inner = inner.replace(/url\(#(\w+)\)/g, '{`url(#${uid}-$1)`}');
  inner = inner.replace(/="\{`url\(#\$\{uid\}-(\w+)\)`\}"/g, '={`url(#${uid}-$1)`}');
  for (const [from, to] of Object.entries(ATTR_MAP))
    inner = inner.replaceAll(` ${from}=`, ` ${to}=`);
  return { viewBox, width, height, inner: inner.trim() };
}

await mkdir(join('src', 'components', 'brand', 'svg'), { recursive: true });
const index = [];
for (const [name, path] of COMPONENTS) {
  const { viewBox, width, height, inner } = toJsx(raw(path).toString('utf8'));
  const usesIds = inner.includes('${uid}');
  const code = `// AUTO-GENERATED by scripts/extract-brand-assets.mjs from ${path}
// in 10PeakStudio_Brand_Guidelines.html. Do not edit by hand (brand misuse rules M1 to M9).
${usesIds ? "import { useId } from 'react';\n" : ''}import type { SVGProps } from 'react';

export const ${name}Ratio = ${width} / ${height};

export function ${name}(props: SVGProps<SVGSVGElement>) {
${usesIds ? "  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');\n" : ''}  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" focusable="false" {...props}>
      ${inner}
    </svg>
  );
}
`;
  await writeFile(join('src', 'components', 'brand', 'svg', `${name}.tsx`), code);
  index.push(name);
}

console.log(`[brand] extracted ${manifest.length} assets to public/brand/`);
console.log(
  '[brand] icons: favicon.ico, icons/favicon.svg, apple-touch-icon.png, icon-192.png, icon-512.png',
);
console.log(`[brand] components: ${index.join(', ')}`);
