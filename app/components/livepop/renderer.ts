// Draws one PopFX surface into a canvas with WebGL 2: the ported shader, its uniforms,
// Glyph Rain's atlas, and the hand's stamps. The React side owns the clock and the hand.
import { VERTEX, fragmentFor } from "./glsl";
import { GLYPHS, expiry, type LiveLook } from "./looks";

export type Stamp = { x: number; y: number; born: number; tx: number; ty: number };

const MAX_STAMPS = 96;
const ATLAS_COLUMNS = 8;
const ATLAS_CELL = 32;

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, source);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(s);
    gl.deleteShader(s);
    throw new Error(`PopFX shader: ${log}`);
  }
  return s;
}

/** GlyphAtlas.swift: the characters in the system monospaced font, white on clear, row 0 at the top. */
function glyphAtlas() {
  const glyphs = Array.from(GLYPHS);
  const rows = Math.max(1, Math.ceil(glyphs.length / ATLAS_COLUMNS));
  const canvas = document.createElement("canvas");
  canvas.width = ATLAS_CELL * ATLAS_COLUMNS;
  canvas.height = ATLAS_CELL * rows;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `500 ${ATLAS_CELL * 0.72}px ui-monospace, "SF Mono", SFMono-Regular, Menlo, monospace`;
  glyphs.forEach((g, i) => {
    const col = i % ATLAS_COLUMNS;
    const row = Math.floor(i / ATLAS_COLUMNS);
    ctx.fillText(g, col * ATLAS_CELL + ATLAS_CELL / 2, row * ATLAS_CELL + ATLAS_CELL / 2 + 1);
  });
  return { canvas, count: glyphs.length };
}

export class PopFXRenderer {
  private gl: WebGL2RenderingContext;
  private program: WebGLProgram;
  private loc: Record<string, WebGLUniformLocation | null> = {};
  private stampA = new Float32Array(MAX_STAMPS * 4);
  private stampB = new Float32Array(MAX_STAMPS * 4);
  private width = 1;
  private height = 1;
  private dpr = 1;

  static supported(canvas: HTMLCanvasElement) {
    return !!canvas.getContext("webgl2", { premultipliedAlpha: true });
  }

  constructor(private canvas: HTMLCanvasElement, private look: LiveLook) {
    const gl = canvas.getContext("webgl2", { alpha: false, antialias: false, premultipliedAlpha: true,
                                             preserveDrawingBuffer: false, powerPreference: "low-power" });
    if (!gl) throw new Error("WebGL 2 unavailable");
    this.gl = gl;
    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, fragmentFor(look.family)));
    gl.bindAttribLocation(program, 0, "aPos");
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(`PopFX program: ${gl.getProgramInfoLog(program)}`);
    }
    this.program = program;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    for (const name of ["uSize", "uDpr", "uTime", "uIntensity", "uSpeed", "uP3", "uP4", "uP5", "uStyle", "uDrift",
                        "uC0", "uC1", "uC2", "uAlpha", "uFalloff", "uTouch", "uTouchSpeed", "uStampA", "uStampB",
                        "uStampCount", "uAtlas", "uAtlasCount", "uAtlasColumns", "uBaseKind", "uBase0", "uBase1",
                        "uBaseAngle"]) {
      this.loc[name] = gl.getUniformLocation(program, name);
    }

    // The look's constants, set once.
    const l = look;
    gl.uniform1f(this.loc.uIntensity, l.intensity);
    gl.uniform1f(this.loc.uSpeed, l.speed);
    gl.uniform1f(this.loc.uP3, l.p3);
    gl.uniform1f(this.loc.uP4, l.p4);
    gl.uniform1f(this.loc.uP5, l.p5);
    gl.uniform1f(this.loc.uStyle, l.style);
    gl.uniform2f(this.loc.uDrift, l.drift[0], l.drift[1]);
    gl.uniform3fv(this.loc.uC0, l.c0);
    gl.uniform3fv(this.loc.uC1, l.c1);
    gl.uniform3fv(this.loc.uC2, l.c2);
    gl.uniform1f(this.loc.uAlpha, 1);       // GlassStack.paneAlpha at Glass Effect 1: solid
    gl.uniform1f(this.loc.uFalloff, 1);     // the PopFX fill takes no Depth falloff at full glass
    gl.uniform4f(this.loc.uTouch, l.touch.radius, l.touch.strength, l.touch.lingers, l.touch.springBack);
    gl.uniform1f(this.loc.uTouchSpeed, l.touch.speed);
    if (!l.base) {
      gl.uniform1i(this.loc.uBaseKind, 0);
    } else if (l.base.kind === "color") {
      gl.uniform1i(this.loc.uBaseKind, 1);
      gl.uniform3fv(this.loc.uBase0, l.base.c);
    } else {
      gl.uniform1i(this.loc.uBaseKind, 2);
      gl.uniform3fv(this.loc.uBase0, l.base.a);
      gl.uniform3fv(this.loc.uBase1, l.base.b);
      gl.uniform1f(this.loc.uBaseAngle, l.base.angle);
    }

    // Glyph Rain samples its atlas; every family binds one so the sampler is valid.
    const tex = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    if (l.family === "glyphRain") {
      const atlas = glyphAtlas();
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, atlas.canvas);
      gl.uniform1f(this.loc.uAtlasCount, atlas.count);
    } else {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(4));
      gl.uniform1f(this.loc.uAtlasCount, 1);
    }
    gl.uniform1i(this.loc.uAtlas, 0);
    gl.uniform1f(this.loc.uAtlasColumns, ATLAS_COLUMNS);
  }

  /** The surface in points, and device pixels per point. */
  resize(width: number, height: number, dpr: number) {
    this.width = width;
    this.height = height;
    this.dpr = dpr;
    this.canvas.width = Math.max(1, Math.round(width * dpr));
    this.canvas.height = Math.max(1, Math.round(height * dpr));
  }

  render(time: number, stamps: Stamp[], now: number) {
    const gl = this.gl;
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    gl.uniform2f(this.loc.uSize, this.width, this.height);
    gl.uniform1f(this.loc.uDpr, this.canvas.width / this.width);
    gl.uniform1f(this.loc.uTime, time);
    const live = stamps.slice(-MAX_STAMPS);
    for (let i = 0; i < live.length; i++) {
      const s = live[i];
      this.stampA.set([s.x, s.y, (now - s.born) / 1000, 0], i * 4);
      this.stampB.set([s.tx, s.ty, 0, 0], i * 4);
    }
    gl.uniform4fv(this.loc.uStampA, this.stampA);
    gl.uniform4fv(this.loc.uStampB, this.stampB);
    gl.uniform1i(this.loc.uStampCount, this.look.touch.radius === 0 ? 0 : live.length);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  /** Stamps a material still reads; the rest are gone (PopFXTouch.expiry). */
  static prune(stamps: Stamp[], look: LiveLook, now: number) {
    const limit = expiry(look.touch) * 1000;
    return stamps.filter((s) => now - s.born < limit);
  }

  dispose() {
    this.gl.getExtension("WEBGL_lose_context")?.loseContext();
  }
}
