import { denseCayleySign, dim, fmtSig, grade, N, type Sig } from "./sig";

const ZERO = "#1a1a1a";
const GRADE_LINE = "rgba(255,255,255,0.06)";

export const renderHeatmap = (canvas: HTMLCanvasElement, sig: Sig): void => {
  const n = dim(sig);
  const c = canvas.getContext("2d")!;
  const px = canvas.width;
  const cell = px / n;
  const sgn = denseCayleySign(sig);

  c.fillStyle = ZERO;
  c.fillRect(0, 0, px, px);

  const img = c.createImageData(px, px);
  for (let y = 0; y < px; y++) {
    const i = Math.min(n - 1, Math.floor(y / cell));
    for (let x = 0; x < px; x++) {
      const j = Math.min(n - 1, Math.floor(x / cell));
      const s = sgn[i * n + j];
      const o = (y * px + x) * 4;
      if (s > 0) {
        img.data[o] = 79;
        img.data[o + 1] = 140;
        img.data[o + 2] = 255;
      } else if (s < 0) {
        img.data[o] = 255;
        img.data[o + 1] = 93;
        img.data[o + 2] = 93;
      } else {
        img.data[o] = 26;
        img.data[o + 1] = 26;
        img.data[o + 2] = 26;
      }
      img.data[o + 3] = 255;
    }
  }
  c.putImageData(img, 0, 0);

  c.strokeStyle = GRADE_LINE;
  c.lineWidth = 1;
  for (let k = 1; k < n; k++) {
    if (grade(k) === grade(k - 1)) continue;
    const p = Math.round(k * cell) + 0.5;
    c.beginPath();
    c.moveTo(p, 0);
    c.lineTo(p, px);
    c.moveTo(0, p);
    c.lineTo(px, p);
    c.stroke();
  }
};

export const heatmapCaption = (sig: Sig): string => {
  const n = dim(sig);
  return `${fmtSig(sig)}, N=${N(sig)}, ${n} blades`;
};
