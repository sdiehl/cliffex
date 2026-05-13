import { grade, N, sparseCayley, type Sig } from "./sig";

export interface TypeTable {
  size: number;
  is1D: boolean;
  cells: number[][][];
  rowLabel: string;
  colLabel: string;
}

const empty2D = (n: number): number[][][] => {
  const out: number[][][] = [];
  for (let i = 0; i < n; i++) {
    const row: number[][] = [];
    for (let j = 0; j < n; j++) row.push([]);
    out.push(row);
  }
  return out;
};

const addGrade = (xs: number[], g: number): void => {
  if (!xs.includes(g)) xs.push(g);
};

export const typeTable = (sig: Sig, opKey: string): TypeTable => {
  const n = N(sig) + 1;

  if (opKey === "dual") {
    const cells: number[][][] = [];
    for (let k = 0; k < n; k++) cells.push([[N(sig) - k]]);
    return { size: n, is1D: true, cells, rowLabel: "grade k", colLabel: "k I" };
  }
  if (opKey === "reverse") {
    const cells: number[][][] = [];
    for (let k = 0; k < n; k++) cells.push([[k]]);
    return { size: n, is1D: true, cells, rowLabel: "grade k", colLabel: "k~" };
  }
  if (opKey === "sandwich") {
    const cells: number[][][] = [];
    for (let k = 0; k < n; k++) cells.push([[k]]);
    return { size: n, is1D: true, cells, rowLabel: "grade k", colLabel: "R k R~" };
  }

  const c = sparseCayley(sig);
  const cells = empty2D(n);
  for (let k = 0; k < c.ia.length; k++) {
    const ia = c.ia[k];
    const ib = c.ib[k];
    const ic = c.ic[k];
    const ka = grade(ia);
    const kb = grade(ib);
    const kc = grade(ic);
    if (opKey === "wedge") {
      if ((ia & ib) !== 0) continue;
    } else if (opKey === "inner") {
      if ((ia & ib) !== ia) continue;
    }
    addGrade(cells[ka][kb], kc);
  }
  for (const row of cells) for (const cell of row) cell.sort((a, b) => a - b);
  return { size: n, is1D: false, cells, rowLabel: "grade(a)", colLabel: "grade(b)" };
};

export interface AlgebraSummary {
  dim: number;
  nonzero: number;
  density: number;
  perGrade: number[];
}

export const summary = (sig: Sig): AlgebraSummary => {
  const n = 1 << N(sig);
  const c = sparseCayley(sig);
  const perGrade = new Array(N(sig) + 1).fill(0);
  for (let i = 0; i < n; i++) perGrade[grade(i)]++;
  return {
    dim: n,
    nonzero: c.ia.length,
    density: c.ia.length / (n * n),
    perGrade,
  };
};
