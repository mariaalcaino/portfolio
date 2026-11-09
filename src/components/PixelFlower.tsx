import { useEffect, useRef } from "react";
import "./PixelFlower.css";

/*
 * The site's five-petal flower (see /works/flower.png), redrawn as square pixels on a small grid.
 * Each frame decides, cell by cell, whether the cell is inside a petal or on the stem, so the edges crawl
 * the way pixel art does when it moves. A seed sprouts at the bottom, the stem climbs with a bud at its tip,
 * the bud opens into five petals at the top, and then the whole flower sways in a light breeze.
 */

const GW = 48; // grid size in cells
const GH = 72;
const HEAD_X = 24; // centre of the flower head
const HEAD_Y = 23;
const PETALS = 5;
const PETAL_CENTRE = 10.2; // distance from the head centre to the middle of a petal
const PETAL_LENGTH = 11.4; // semi-axis along the petal
const PETAL_WIDTH = 4.1; // semi-axis across the petal
const HOLE = 2.3; // the little open circle in the middle
const STEM_BOW = 2; // how far the stem leans to one side at its middle
const STEM_HALF = 0.7; // half the stem's width, in cells (a little over a cell, so the steps of the curve stay joined)
const GAP = 0.22; // share of each cell left empty, so the pixels stand apart
const FRAME_MS = 1000 / 30;

// timeline, in seconds
const GROW_START = 0.3;
const GROW_END = 3.6; // the bud reaches the top
const BLOOM_START = 3.4;
const PETAL_STAGGER = 0.2;
const PETAL_TIME = 1.2;
const HOLE_START = 4.9;
const HOLE_TIME = 0.8;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const easeOut = (p: number) => 1 - (1 - p) ** 3;
const easeInOut = (p: number) => (p < 0.5 ? 4 * p ** 3 : 1 - (-2 * p + 2) ** 3 / 2);
const easeOutBack = (p: number) => {
  const c1 = 1.5;
  const c3 = c1 + 1;
  return 1 + c3 * (p - 1) ** 3 + c1 * (p - 1) ** 2;
};

type Pose = {
  tipY: number; // how high the stem has climbed (row, in cells)
  bud: number; // radius of the bud riding the tip
  bloom: number[]; // how far each petal has opened
  hole: number; // how open the centre is
  sway: number;
  wobble: number[];
};

const bow = (y: number) => STEM_BOW * Math.sin(((y - HEAD_Y) / (GH - HEAD_Y)) * Math.PI);

function poseAt(seconds: number, still: boolean): Pose {
  if (still) {
    return { tipY: HEAD_Y, bud: 0, bloom: Array(PETALS).fill(1), hole: 1, sway: 0, wobble: Array(PETALS).fill(0) };
  }
  const growth = easeInOut(clamp01((seconds - GROW_START) / (GROW_END - GROW_START)));
  const breeze = clamp01((seconds - 1) / 4.5); // the plant starts to move early and settles into its sway
  const petalBreeze = clamp01((seconds - 4.8) / 1.5);
  return {
    tipY: GH - 1 - growth * (GH - 1 - HEAD_Y),
    bud: 1 + 1.4 * growth,
    bloom: Array.from({ length: PETALS }, (_, k) => easeOutBack(clamp01((seconds - BLOOM_START - k * PETAL_STAGGER) / PETAL_TIME))),
    hole: easeOut(clamp01((seconds - HOLE_START) / HOLE_TIME)),
    sway: breeze * 0.04 * Math.sin((seconds / 6.5) * Math.PI * 2),
    wobble: Array.from({ length: PETALS }, (_, k) => petalBreeze * 0.07 * Math.sin((seconds / 4.2) * Math.PI * 2 + k * 1.3)),
  };
}

function isOn(x: number, y: number, pose: Pose): boolean {
  // undo the sway: the whole plant leans around the foot of its stem
  const baseX = HEAD_X;
  const baseY = GH;
  const cos = Math.cos(-pose.sway);
  const sin = Math.sin(-pose.sway);
  const rx = x - baseX;
  const ry = y - baseY;
  const px = baseX + rx * cos - ry * sin;
  const py = baseY + rx * sin + ry * cos;

  const dx = px - HEAD_X;
  const dy = py - HEAD_Y;
  if (pose.hole > 0 && dx * dx + dy * dy <= (HOLE * pose.hole) ** 2) return false;

  // the stem, climbing up from the ground, and the bud on its tip
  if (py >= pose.tipY && py <= GH && Math.abs(px - (HEAD_X + bow(py))) <= STEM_HALF) return true;
  if (pose.bud > 0) {
    const bx = px - (HEAD_X + bow(Math.max(pose.tipY, HEAD_Y)));
    const by = py - pose.tipY;
    if (bx * bx + by * by <= pose.bud * pose.bud) return true;
  }

  // petals
  for (let k = 0; k < PETALS; k++) {
    const s = pose.bloom[k];
    if (s <= 0.05) continue;
    const a = -Math.PI / 2 + (k * 2 * Math.PI) / PETALS + pose.wobble[k];
    const u = dx * Math.cos(a) + dy * Math.sin(a); // along the petal
    const v = -dx * Math.sin(a) + dy * Math.cos(a); // across it
    const du = (u - PETAL_CENTRE * s) / (PETAL_LENGTH * s);
    const dv = v / (PETAL_WIDTH * s);
    if (du * du + dv * dv <= 1) return true;
  }
  return false;
}

export default function PixelFlower({ className }: { className?: string }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!frame || !canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cell = 0; // css px per grid cell
    let raf = 0;
    let visible = true;
    let start = performance.now();
    let last = 0;

    const draw = (now: number) => {
      const dpr = window.devicePixelRatio || 1;
      const size = Math.max(2, Math.round(cell * dpr));
      const dot = Math.max(1, Math.round(size * (1 - GAP)));
      const pose = poseAt((now - start) / 1000, reduceMotion.matches);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = getComputedStyle(canvas).color;
      for (let gy = 0; gy < GH; gy++) {
        for (let gx = 0; gx < GW; gx++) {
          if (isOn(gx + 0.5, gy + 0.5, pose)) ctx.fillRect(gx * size, gy * size, dot, dot);
        }
      }
    };

    const loop = (now: number) => {
      raf = 0;
      if (!visible || document.hidden || reduceMotion.matches) return;
      if (now - last >= FRAME_MS) {
        last = now;
        draw(now);
      }
      raf = requestAnimationFrame(loop);
    };
    const run = () => {
      if (!raf && visible && !document.hidden && !reduceMotion.matches) raf = requestAnimationFrame(loop);
    };

    const resize = () => {
      const { width, height } = frame.getBoundingClientRect();
      const next = Math.max(3, Math.min(12, Math.floor(Math.min(width / GW, height / GH))));
      const dpr = window.devicePixelRatio || 1;
      cell = next;
      canvas.style.width = `${GW * next}px`;
      canvas.style.height = `${GH * next}px`;
      canvas.width = Math.round(GW * next * dpr);
      canvas.height = Math.round(GH * next * dpr);
      draw(performance.now());
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(frame);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) run();
    });
    intersection.observe(frame);
    const onVisibility = () => run();
    const onMotion = () => {
      start = performance.now();
      draw(start);
      run();
    };
    document.addEventListener("visibilitychange", onVisibility);
    reduceMotion.addEventListener("change", onMotion);

    resize();
    run();
    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      reduceMotion.removeEventListener("change", onMotion);
    };
  }, []);

  return (
    <div className={`pixel-flower${className ? ` ${className}` : ""}`} aria-hidden="true">
      <div className="pixel-flower-stage" ref={frameRef}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
