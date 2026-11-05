/**
 * GLSL for the Concept A "Summit" hero (Design.md 11.7). Brand colours only:
 * Summit light faces (#FCFCFC, #E9E9EF, #D7D6E1, #8D8CA4), Peak Violet rim (#8E21FC),
 * Arrow rise ribbon (#480BB4, #6617EA, #8F31F9, #A743F8).
 */

export const ridgeVertex = /* glsl */ `
  varying vec3 vWorldPos;
  varying vec3 vViewPos;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorldPos = world.xyz;
    vec4 view = viewMatrix * world;
    vViewPos = view.xyz;
    gl_Position = projectionMatrix * view;
  }
`;

export const ridgeFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uLightDir;
  varying vec3 vWorldPos;
  varying vec3 vViewPos;

  vec3 summit(float t) {
    vec3 c0 = vec3(0.988, 0.988, 0.988); // #FCFCFC
    vec3 c1 = vec3(0.914, 0.914, 0.937); // #E9E9EF
    vec3 c2 = vec3(0.843, 0.839, 0.882); // #D7D6E1
    vec3 c3 = vec3(0.553, 0.549, 0.643); // #8D8CA4
    if (t < 0.4) return mix(c0, c1, t / 0.4);
    if (t < 0.6) return mix(c1, c2, (t - 0.4) / 0.2);
    return mix(c2, c3, (t - 0.6) / 0.4);
  }

  void main() {
    // Flat facets from screen-space derivatives (faceted peak look)
    vec3 n = normalize(cross(dFdx(vWorldPos), dFdy(vWorldPos)));
    float lit = clamp(dot(n, normalize(uLightDir)) * 0.5 + 0.5, 0.0, 1.0);
    // Light from the upper left (brand lighting); slow sweep keeps it alive
    float sweep = 0.06 * sin(uTime * 0.35 + vWorldPos.x * 0.6);
    vec3 base = summit(clamp(1.0 - lit + sweep, 0.0, 1.0));
    // Peak Violet Fresnel rim
    vec3 viewDir = normalize(-vViewPos);
    vec3 nv = normalize((viewMatrix * vec4(n, 0.0)).xyz);
    float fres = pow(1.0 - abs(dot(nv, viewDir)), 3.0);
    vec3 violet = vec3(0.557, 0.129, 0.988); // #8E21FC
    vec3 col = mix(base, violet, fres * 0.55);
    // Fade the lower edge into the white canvas
    float fade = smoothstep(-1.15, -0.25, vWorldPos.y) * smoothstep(3.7, 2.4, abs(vWorldPos.x));
    gl_FragColor = vec4(col, fade);
  }
`;

export const ribbonVertex = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormalV;
  varying vec3 vViewPos;
  void main() {
    vUv = uv;
    vec4 view = modelViewMatrix * vec4(position, 1.0);
    vViewPos = view.xyz;
    vNormalV = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * view;
  }
`;

export const ribbonFragment = /* glsl */ `
  uniform float uProgress;
  varying vec2 vUv;
  varying vec3 vNormalV;
  varying vec3 vViewPos;

  vec3 arrowRise(float t) {
    vec3 a = vec3(0.282, 0.043, 0.706); // #480BB4
    vec3 b = vec3(0.400, 0.090, 0.918); // #6617EA
    vec3 c = vec3(0.561, 0.192, 0.976); // #8F31F9
    vec3 d = vec3(0.655, 0.263, 0.973); // #A743F8
    if (t < 0.25) return mix(a, b, t / 0.25);
    if (t < 0.6) return mix(b, c, (t - 0.25) / 0.35);
    return mix(c, d, (t - 0.6) / 0.4);
  }

  void main() {
    if (vUv.x > uProgress) discard;
    vec3 col = arrowRise(vUv.x);
    float spec = pow(max(dot(normalize(vNormalV), normalize(vec3(-0.4, 0.8, 0.6))), 0.0), 24.0);
    col += spec * 0.35;
    // Tail fades in (matches the logo arrow's soft tail)
    float alpha = smoothstep(0.0, 0.08, vUv.x);
    gl_FragColor = vec4(col, alpha);
  }
`;

export const dustVertex = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  attribute float aSeed;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    p.y += mod(uTime * 0.05 * (0.4 + aSeed), 3.0) - 1.5;
    p.x += sin(uTime * 0.3 + aSeed * 6.2831) * 0.05;
    vec4 view = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * view;
    gl_PointSize = (2.0 + aSeed * 3.0) * uPixelRatio * (6.0 / -view.z);
    vAlpha = 0.25 + 0.5 * aSeed;
  }
`;

export const dustFragment = /* glsl */ `
  varying float vAlpha;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    vec3 lilac = vec3(0.655, 0.263, 0.973); // #A743F8
    gl_FragColor = vec4(lilac, vAlpha * smoothstep(0.5, 0.0, d));
  }
`;
