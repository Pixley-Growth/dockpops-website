// PopFX, ported from DockPops/Shaders/PopFX.metal to GLSL ES 3.0 (WebGL 2) — the same
// functions, the same numbers, line for line where the languages allow. Each family is one
// fragment program; FAMILY selects it. Positions are in points with the origin top left, as
// SwiftUI hands them to the Metal shader.
//
// The hand's stamps arrive as two vec4 arrays (x, y, age, 0) and (tx, ty, 0, 0) — the Metal
// stroke's six floats per stamp, split so the array fits WebGL's uniform budget.

export const VERTEX = `#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const COMMON = `#version 300 es
precision highp float;
out vec4 outColor;

uniform vec2 uSize;        // the surface, points
uniform float uDpr;        // device pixels per point
uniform float uTime;
uniform float uIntensity;
uniform float uSpeed;
uniform float uP3;         // the family's third control (blur, size, density, hair length)
uniform float uP4;         // glyph size
uniform float uP5;         // trail
uniform float uStyle;
uniform vec2 uDrift;
uniform vec3 uC0;
uniform vec3 uC1;
uniform vec3 uC2;
uniform float uAlpha;
uniform float uFalloff;
uniform vec4 uTouch;
uniform float uTouchSpeed;
uniform vec4 uStampA[96];
uniform vec4 uStampB[96];
uniform int uStampCount;
uniform sampler2D uAtlas;
uniform float uAtlasCount;
uniform float uAtlasColumns;
// The base an overlay effect is drawn over: 0 none, 1 a colour, 2 a linear gradient.
uniform int uBaseKind;
uniform vec3 uBase0;
uniform vec3 uBase1;
uniform float uBaseAngle;

const float PI = 3.14159265;

vec2 popfx_respond(vec2 uv, vec2 size, vec4 touch, float speed) {
  if (uStampCount <= 0) { return uv; }
  vec2 scale = size / max(min(size.x, size.y), 1.0);
  vec2 pa = uv * scale;
  vec2 disp = vec2(0.0);
  float lingers = max(touch.z, 0.02);
  float expiry = touch.w >= 1.0 ? lingers : 4.0 * lingers;
  for (int i = 0; i < 96; i++) {
    if (i >= uStampCount) { break; }
    float age = uStampA[i].z;
    if (age >= expiry) { continue; }
    vec2 sp = uStampA[i].xy;
    vec2 rel = pa - sp;
    float dist = length(rel);
    float w = exp(-age / lingers);
    w *= mix(1.0, cos(min(age * 3.1415927 / lingers, 3.1415927)), touch.w * 0.5);
    float ring = age * speed;
    float band = exp(-pow((dist - ring) / (touch.x * 0.5), 2.0));
    disp += normalize(rel + vec2(1e-5, 0.0)) * band * w * touch.y;
  }
  return uv - disp / scale;
}

vec4 popfx_finish(vec3 rgb, float alpha, float falloffBottom, float v) {
  float a = alpha * mix(1.0, falloffBottom, clamp(v, 0.0, 1.0));
  return vec4(rgb * a, a);
}

float popfx_hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 popfx_hash2(vec2 p) { return vec2(popfx_hash(p), popfx_hash(p + vec2(41.3, 17.7))); }

float popfx_vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = popfx_hash(i);
  float b = popfx_hash(i + vec2(1.0, 0.0));
  float c = popfx_hash(i + vec2(0.0, 1.0));
  float d = popfx_hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float popfx_fbm(vec2 p, int octaves) {
  float v = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 4; i++) {
    if (i >= octaves) { break; }
    v += amp * popfx_vnoise(p);
    p = p * 2.03 + vec2(17.1, 9.7);
    amp *= 0.5;
  }
  return v;
}

vec3 baseColor(vec2 uv) {
  if (uBaseKind == 1) { return uBase0; }
  // The linear endpoints of DockIconCompositor.linearEndpoints: 0 degrees left to right,
  // 90 top to bottom, across the surface's own rectangle.
  float r = uBaseAngle * PI / 180.0;
  vec2 d = vec2(cos(r), sin(r));
  vec2 p = uv * uSize;
  vec2 c = uSize * 0.5;
  vec2 start = c - d * c;
  vec2 end = c + d * c;
  vec2 se = end - start;
  float t = clamp(dot(p - start, se) / max(dot(se, se), 1e-5), 0.0, 1.0);
  return mix(uBase0, uBase1, t);
}
`;

const BANDS = `
vec4 effect(vec2 position) {
  vec2 size = max(uSize, vec2(1.0));
  vec2 uv0 = position / size;
  float aspect = size.x / max(size.y, 1.0);
  vec2 uv = popfx_respond(uv0, size, uTouch, uTouchSpeed);
  float k = mix(0.25, 1.4, uIntensity);
  float t = uTime * (0.15 + 1.6 * uSpeed);
  float f;
  if (uStyle < 0.5) {
    float a = sin((uv.x * 3.0 * aspect + uv.y * 1.5) * PI * k + t);
    f = 0.5 + 0.5 * sin(a * PI * 0.8 + uv.y * 5.0 * k - t * 0.7);
  } else if (uStyle < 1.5) {
    vec2 origin = vec2(0.5, 1.25);
    float d = distance(vec2(uv.x * aspect, uv.y), vec2(origin.x * aspect, origin.y));
    f = 0.5 + 0.5 * sin(d * 9.0 * k - t);
  } else {
    float x = uv.x * 5.0 * aspect * k + 0.5 * sin(uv.y * 2.5 * PI + t * 0.6);
    f = 0.5 + 0.5 * sin(x * PI - t * 0.4);
  }
  f = 0.2 + 0.6 * f;
  vec3 rgb = mix(uC0, uC1, f);
  return popfx_finish(rgb, uAlpha, uFalloff, uv0.y);
}
`;

const BLOBS = `
vec4 effect(vec2 position) {
  vec2 safeSize = max(uSize, vec2(1.0));
  vec2 uv0 = position / safeSize;
  float aspect = safeSize.x / safeSize.y;
  vec2 uv = popfx_respond(uv0, safeSize, uTouch, uTouchSpeed);
  vec2 p = vec2(uv.x * aspect, uv.y);
  float t = uTime * (0.05 + 0.45 * uSpeed);
  float radius = mix(0.08, 0.18, clamp(uIntensity, 0.0, 1.0));
  float field = 0.0;
  for (int i = 0; i < 6; i++) {
    float fi = float(i);
    vec2 c = vec2(0.5 * aspect + 0.42 * aspect * sin(t * (0.6 + 0.13 * fi) + fi * 1.7),
                  0.5 + 0.42 * cos(t * (0.5 + 0.11 * fi) + fi * 2.3));
    vec2 dp = p - c;
    field += radius * radius / max(dot(dp, dp), 1e-4);
  }
  float edge = mix(0.02, 0.6, clamp(uP3, 0.0, 1.0));
  float m = smoothstep(1.0 - edge, 1.0 + edge, field);
  vec3 rgb = mix(uC1, uC0, m);
  return popfx_finish(rgb, uAlpha, uFalloff, uv0.y);
}
`;

const GLYPH_RAIN = `
float popfx_rain_layer(vec2 p, float cell, float t, float time, float down, float density,
                       float trail, float lit, vec2 seed, float weight, out vec3 rgb) {
  vec2 g = p / cell + seed;
  float col = floor(g.x);
  float scale = 1.0 + 0.3 * (popfx_hash(vec2(col, 5.9)) - 0.5);
  float rowF = g.y / scale;
  float row = floor(rowF);
  vec2 local = vec2(clamp((fract(g.x) - 0.5) / scale + 0.5, 0.0, 1.0), fract(rowF));
  float isActive = step(popfx_hash(vec2(col, 3.1)), mix(0.7, 1.0, clamp(density, 0.0, 1.0)));
  float colSpeed = 0.6 + 0.9 * popfx_hash(vec2(col, 7.7));
  float phase = popfx_hash(vec2(col, 1.3)) * 1000.0;
  float dropLen = mix(8.0, 36.0, clamp(trail, 0.0, 1.0));
  float along = down > 0.0 ? row : -row;
  float rainTime = (phase + t * colSpeed * 9.0 - along) / dropLen;
  rainTime += 0.3 * sin(1.41421356 * rainTime) + 0.2 * sin(2.23606798 * rainTime);
  float bright = 1.0 - fract(rainTime);
  float rainTimeAhead = (phase + t * colSpeed * 9.0 - (along + 1.0)) / dropLen;
  rainTimeAhead += 0.3 * sin(1.41421356 * rainTimeAhead) + 0.2 * sin(2.23606798 * rainTimeAhead);
  float brightAhead = 1.0 - fract(rainTimeAhead);
  float cursor = step(0.5, bright - brightAhead);
  bright = isActive * pow(clamp((bright - 0.25) / 0.75, 0.0, 1.0), 1.2);
  float cycle = floor(time * 1.6 + popfx_hash(vec2(col + 0.5, row + 0.5)) * 7.0);
  float index = floor(popfx_hash(vec2(col * 1.7 + row * 0.3, cycle)) * max(uAtlasCount, 1.0));
  vec2 atlasCell = vec2(mod(index, uAtlasColumns), floor(index / uAtlasColumns));
  float atlasRows = ceil(max(uAtlasCount, 1.0) / uAtlasColumns);
  vec2 auv = (atlasCell + vec2(1.0 - local.x, local.y)) / vec2(uAtlasColumns, atlasRows);
  float mask = texture(uAtlas, auv).a;
  vec3 glyph = mix(uC0, vec3(1.0), cursor * 0.85);
  vec3 colour = mix(uC1, glyph, min(1.0, mask * 2.0));
  float coverage = max(mask * bright, bright * 0.10) * lit * weight;
  coverage = max(coverage, mask * cursor * isActive * lit * weight);
  rgb = colour;
  return coverage;
}

vec4 effect(vec2 position) {
  vec2 safeSize = max(uSize, vec2(1.0));
  vec2 uv0 = position / safeSize;
  float aspect = safeSize.x / safeSize.y;
  vec2 p = vec2(uv0.x * aspect, uv0.y);   // the rain ignores the hand (PopFXTouch.still)
  float t = uTime * (0.15 + 1.2 * uSpeed);
  float cell = mix(0.028, 0.085, clamp(uP4, 0.0, 1.0));
  float down = uDrift.y < 0.0 ? -1.0 : 1.0;
  float lit = 0.5 + 0.5 * clamp(uIntensity, 0.0, 1.0);
  vec3 nearRGB = vec3(0.0), farRGB = vec3(0.0);
  float far = popfx_rain_layer(p, cell * 0.62, t * 0.55, uTime * 0.7, down, uP3, uP5, lit * 0.5,
                               vec2(37.0, 11.0), 1.0, farRGB);
  float near = popfx_rain_layer(p, cell, t, uTime, down, uP3, uP5, lit, vec2(0.0), 1.0, nearRGB);
  float coverage = clamp(near + far * (1.0 - near), 0.0, 1.0);
  vec3 rgb = coverage > 0.001 ? (nearRGB * near + farRGB * (far * (1.0 - near))) / max(coverage, 1e-3) : uC0;
  return popfx_finish(rgb, uAlpha * coverage, uFalloff, uv0.y);
}
`;

const FUR = `
vec2 popfx_comb(vec2 pa, vec4 comb) {
  vec2 disp = vec2(0.0);
  float lingers = max(comb.z, 0.02);
  float expiry = comb.w >= 1.0 ? lingers : 4.0 * lingers;
  for (int i = 0; i < 96; i++) {
    if (i >= uStampCount) { break; }
    float age = uStampA[i].z;
    if (age >= expiry) { continue; }
    vec2 sp = uStampA[i].xy;
    vec2 tn = uStampB[i].xy;
    vec2 nrm = vec2(-tn.y, tn.x);
    vec2 rel = pa - sp;
    float w = exp(-age / lingers);
    w *= mix(1.0, cos(min(age * 3.1415927 / lingers, 3.1415927)), comb.w * 0.5);
    float bell = exp(-dot(rel, rel) / (comb.x * comb.x));
    float side = dot(rel, nrm) >= 0.0 ? 1.0 : -1.0;
    disp += nrm * side * bell * w * comb.y;
  }
  return disp;
}

vec2 popfx_fur_pattern(vec2 p, float amount, float patternScale) {
  vec2 q = vec2(popfx_fbm(p * 2.2, 3), popfx_fbm(p * 2.2 + vec2(5.2, 1.3), 3));
  vec2 sp = vec2(p.x * patternScale + q.x * 1.4, p.y * patternScale * 0.33 + q.y * 1.4);
  float field = popfx_fbm(sp, 4);
  float th = mix(0.66, 0.46, clamp(amount, 0.0, 1.0));
  float mask = smoothstep(th - 0.03, th + 0.03, field);
  mask *= smoothstep(1.02, 0.86, p.y);
  return vec2(mask, 0.0);
}

vec4 effect(vec2 position) {
  vec2 safeSize = max(uSize, vec2(1.0));
  vec2 uv0 = position / safeSize;
  float aspect = safeSize.x / safeSize.y;
  vec2 pa = vec2(uv0.x * aspect, uv0.y);
  const float patternScale = 12.0;
  const float fineness = 0.84;
  const float sheen = 0.5;
  float wind = clamp(uSpeed, 0.0, 1.0);
  float sway = wind * 0.03 * sin(uTime * 0.8 + pa.y * 6.0);
  float cellSize = mix(0.030, 0.010, fineness);
  float lengthCells = mix(1.2, 4.0, clamp(uP3, 0.0, 0.8) / 0.8);
  vec2 baseDir = normalize(vec2(0.10 + sway * 6.0, 1.0));
  vec3 tan = vec3(0.78, 0.66, 0.50);
  float mottle0 = popfx_fbm(pa * 3.0 + vec2(4.1, 2.3), 3);
  vec3 coat0 = mix(uC0, uC1, smoothstep(0.35, 1.05, uv0.y + (mottle0 - 0.5) * 0.35));
  vec3 result = coat0 * 0.45;
  for (int layer = 0; layer < 3; layer++) {
    float seed = float(layer) * 37.7;
    float c = cellSize * (1.0 + float(layer) * 0.18);
    vec2 q = pa / c;
    vec2 cell = floor(q);
    float bestCover = 0.0, bestT = 0.0;
    vec2 bestRoot = vec2(0.0);
    for (int dy = -4; dy <= 1; dy++) {
      for (int dx = -2; dx <= 2; dx++) {
        vec2 nn = cell + vec2(float(dx), float(dy));
        vec2 h = vec2(popfx_hash(nn + seed), popfx_hash(nn + seed + vec2(31.3, 7.1)));
        vec2 root = nn + h;
        vec2 rootPa = root * c;
        vec2 rootTouch = vec2(rootPa.x / aspect, rootPa.y) * safeSize / min(safeSize.x, safeSize.y);
        vec2 dispAtRoot = uStampCount > 0 ? popfx_comb(rootTouch, uTouch) : vec2(0.0);
        vec2 dir = normalize(baseDir + (h - 0.5) * 0.45 + dispAtRoot * 18.0);
        float len = lengthCells * (0.7 + 0.6 * popfx_hash(nn + seed + vec2(3.3, 9.9)));
        vec2 tip = root + dir * len;
        vec2 paq = q - root, ba = tip - root;
        float t = clamp(dot(paq, ba) / max(dot(ba, ba), 1e-5), 0.0, 1.0);
        float d = length(paq - ba * t);
        float width = 0.16 * (1.0 - 0.75 * t);
        float cover = smoothstep(width, width * 0.35, d);
        if (cover > bestCover) { bestCover = cover; bestT = t; bestRoot = rootPa; }
      }
    }
    float rm = popfx_fbm(bestRoot * 3.0 + vec2(4.1, 2.3), 3);
    vec3 rbase = mix(uC0, uC1, smoothstep(0.35, 1.05, bestRoot.y + (rm - 0.5) * 0.35));
    vec2 pat = popfx_fur_pattern(bestRoot, uIntensity, patternScale);
    vec3 patternCol = mix(uC2, tan, pat.y);
    vec3 hairCol = mix(rbase, patternCol, pat.x * 0.92);
    hairCol *= mix(0.55, 1.25, bestT);
    hairCol *= 1.0 - 0.28 * float(2 - layer);
    result = mix(result, hairCol, bestCover);
  }
  float light = smoothstep(0.9, 0.0, length(uv0 - vec2(0.15, 0.1))) * sheen;
  result += vec3(light * 0.3);
  return popfx_finish(clamp(result, vec3(0.0), vec3(1.0)), uAlpha, uFalloff, uv0.y);
}
`;

const PARTICLES = `
void popfx_particles_layer(vec2 p, float cells, float t, float tPerSecond, vec2 drift, float style,
                           float radius, float weight, vec3 c0, vec3 c1, vec2 size, vec4 touch,
                           inout vec3 col, inout float cov) {
  float aspect = size.x / size.y;
  vec2 scale = size / max(min(size.x, size.y), 1.0);
  vec2 toLattice = vec2(aspect / scale.x, 1.0 / scale.y) * cells;
  float lingers = max(touch.z, 0.02);
  vec2 lattice = p * cells;
  vec2 across = vec2(abs(drift.y), abs(drift.x));
  float lane = floor(dot(lattice, across));
  for (int dy = -1; dy <= 1; dy++) {
    for (int dx = -1; dx <= 1; dx++) {
      vec2 stp = vec2(float(dx), float(dy));
      float neighbourLane = lane + dot(stp, across);
      float rate = 0.55 + 0.9 * popfx_hash(vec2(neighbourLane, 7.3));
      vec2 q = lattice - drift * t * cells * 0.35 * rate;
      vec2 cell = floor(q);
      vec2 local = q - cell;
      vec2 n = cell + stp;
      vec2 h = popfx_hash2(n);
      float phase = h.x * 6.2831853;
      vec2 c = stp + 0.15 + 0.7 * h;
      float r = radius * (0.55 + 0.45 * h.y);
      float glow = 1.0;
      // Snow (style 0): small flakes in many sizes, each swaying at its own rate.
      r = radius * 0.85 * (0.3 + 0.7 * h.y * h.y);
      c.x += (0.16 + 0.12 * h.y) * sin(t * (0.9 + 0.8 * h.x) + phase);
      c.y += 0.05 * sin(t * 0.7 + phase * 2.0);
      if (uStampCount > 0) {
        vec2 centreLattice = cell + c + drift * t * cells * 0.35 * rate;
        vec2 fallPerSecond = drift * cells * 0.35 * rate * tPerSecond;
        vec2 shove = vec2(0.0);
        for (int i = 0; i < 96; i++) {
          if (i >= uStampCount) { break; }
          float age = uStampA[i].z;
          if (age >= lingers) { continue; }
          vec2 sp = uStampA[i].xy;
          vec2 tangent = uStampB[i].xy;
          vec2 thenLattice = centreLattice - fallPerSecond * age;
          vec2 thenTouch = vec2(thenLattice.x / cells / aspect, thenLattice.y / cells) * scale;
          vec2 rel = thenTouch - sp;
          float dist = length(rel);
          float reach = touch.x;
          float near = exp(-(dist * dist) / (reach * reach));
          float w = 1.0 - smoothstep(lingers * 0.6, lingers, age);
          w *= smoothstep(0.0, 0.25, age);
          vec2 away = rel / max(dist, 1e-4);
          shove += (away * 0.7 + tangent * 0.6) * near * w;
        }
        shove = across * dot(shove, across);
        vec2 shoveLattice = shove * touch.y * toLattice;
        float len = length(shoveLattice);
        if (len > 0.6) { shoveLattice *= 0.6 / len; }
        c += shoveLattice;
      }
      float d = length(local - c);
      vec2 dl = local - c;
      float ang = atan(dl.y, dl.x);
      float spin = t * (0.4 + 0.6 * h.y) * (h.x < 0.5 ? 1.0 : -1.0);
      float lobes = 0.76 + 0.24 * cos(6.0 * ang + spin);
      float core = smoothstep(r, r * 0.4, d / lobes);
      float halo = smoothstep(r * 1.5, r * 0.7, d) * 0.3;
      core *= glow; halo *= glow;
      float a = max(core, halo) * weight;
      col += (c0 * core + c1 * max(halo - core, 0.0)) * weight;
      cov += a;
    }
  }
}

vec4 effect(vec2 position) {
  vec2 safeSize = max(uSize, vec2(1.0));
  vec2 uv0 = position / safeSize;
  float aspect = safeSize.x / safeSize.y;
  vec2 uv = uv0;
  vec2 p = vec2(uv.x * aspect, uv.y);
  float tPerSecond = 0.06 + 0.5 * uSpeed;
  float t = uTime * tPerSecond;
  float cells = mix(2.5, 7.0, clamp(uIntensity, 0.0, 1.0));
  float radius = mix(0.06, 0.30, clamp(uP3, 0.0, 1.0));
  vec3 col = vec3(0.0);
  float cov = 0.0;
  popfx_particles_layer(p, cells, t, tPerSecond, uDrift, 0.0, radius, 1.0, uC0, uC1, safeSize, uTouch, col, cov);
  popfx_particles_layer(p + vec2(3.7, 1.9), cells * 1.6, t * 0.7, tPerSecond * 0.7, uDrift, 0.0, radius * 0.7, 0.55, uC0, uC1, safeSize, uTouch, col, cov);
  if (uDrift.y > 0.5) {
    float depth = 0.065 * (1.0 - exp(-uTime / 30.0));
    float surface = 1.0 - depth * (0.55 + 0.45 * popfx_vnoise(vec2(p.x * 4.0 + 2.7, 0.0)))
                        - depth * 0.18 * popfx_vnoise(vec2(p.x * 18.0, 1.0));
    float pile = smoothstep(surface - 0.006, surface + 0.006, uv.y);
    col += uC0 * pile;
    cov += pile;
  }
  float coverage = clamp(cov, 0.0, 1.0);
  vec3 rgb = coverage > 0.001 ? col / max(cov, 1e-3) : uC0;
  return popfx_finish(rgb, uAlpha * coverage, uFalloff, uv0.y);
}
`;

const MAIN = `
void main() {
  // Points, origin top left (gl_FragCoord is device pixels from the bottom left).
  vec2 sizePx = uSize * uDpr;
  vec2 position = vec2(gl_FragCoord.x, sizePx.y - gl_FragCoord.y) / uDpr;
  vec4 fx = effect(position);   // premultiplied
  vec3 rgb;
  if (uBaseKind == 0) {
    rgb = fx.rgb;   // an opaque effect: alpha 1, nothing under it
  } else {
    // An overlay over its own base, blended plus-lighter (PopFXLayer.overlayBlend).
    rgb = min(baseColor(position / max(uSize, vec2(1.0))) + fx.rgb, vec3(1.0));
  }
  outColor = vec4(rgb, 1.0);
}
`;

export type Family = "bands" | "blobs" | "particles" | "glyphRain" | "fur";

const BODIES: Record<Family, string> = {
  bands: BANDS,
  blobs: BLOBS,
  particles: PARTICLES,
  glyphRain: GLYPH_RAIN,
  fur: FUR,
};

export const fragmentFor = (family: Family) => COMMON + BODIES[family] + MAIN;
