# 10PeakStudio brand logo system

Rebuilt from the supplied 3D logo (1536 × 1024 raster). Open `10PeakStudio_Brand_Guidelines.html` in a browser for the visual guide.

## Folders
01-Primary · 02-Logomark · 03-Construction · 04-ClearSpace · 05-Variations · 06-Color · 07-Typography · 08-Misuse · 09-Tokens

## Exact versus approximate
- Exact to the source within tracing tolerance: outlines of the "1", the P stem, the bowl and leg, and the violet band (traced at 4× supersampling; white-shape overlap with the source 99.6%).
- Close approximation: the arrow (rebuilt as two fitted Bézier curves plus a measured head; max deviation 1.35 px), gradients (sampled stops), the fold shadow, the arrow halo and the ambient glow (gradient approximations, no filters).
- Not in the source, added by me: the wordmark (proposed, Sora), the light-theme colourway, flat and one-colour versions, Ink (#14111E).
- Hero file versus source: mean pixel difference 7.05/255 (2.76%) across the logo area.

## Quality check
- SVG files: 48 parse and render without errors; none use <text>, <image>, <filter>, <style>, font-family or external links; all have a viewBox.
- PDF files: 6 open correctly. PNG files: 10 verified.
- Fonts: every wordmark and sheet label is outlined to paths, so nothing depends on installed fonts.
- 16 px: favicon reads as the 1P shape with the violet band; the gaps between letters (0.35 px) close up. 32 px: gaps are faint (0.7 px). 64 px: fully legible (1.64 px).
- Contrast of the logo on background demos (worst case): Light 18.61:1, Dark 20.48:1, Photo 4.01:1, Gradient 6.3:1.

## Honest limitations
- The source is a soft, compressed raster, so edges are accurate to about ±0.5–1 source px, not to an original vector file.
- The ambient glow is a background effect; it lives in files that include a background (hero, tiles, app icon). Transparent files carry only the arrow halo.
- Pantone values are nearest estimates; the screen violets are outside the coated Pantone gamut. CMYK values are formula conversions; use a profiled conversion (FOGRA39 or GRACoL) for print.
- Sora has no ₹ glyph; set rupee amounts in Inter.
- SVG gradients are standard linear and radial gradients and import into Figma, Illustrator and browsers; Canva may simplify gradients on import — use the PNG or the flat SVG there.
