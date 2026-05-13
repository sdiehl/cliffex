export interface Sig {
  p: number;
  q: number;
  r: number;
}

export const N = (s: Sig): number => s.p + s.q + s.r;
export const dim = (s: Sig): number => 1 << N(s);

export const grade = (mask: number): number => {
  let g = 0;
  for (let m = mask; m; m &= m - 1) g++;
  return g;
};

const swapSign = (a: number, b: number): number => {
  let sign = 1;
  let aShift = a >>> 1;
  while (aShift) {
    let bIter = b;
    while (bIter) {
      const lo = bIter & -bIter;
      if (aShift & lo) sign = -sign;
      bIter ^= lo;
    }
    aShift >>>= 1;
  }
  return sign;
};

const metricSign = (mask: number, s: Sig): number => {
  let sign = 1;
  for (let i = 0; i < N(s); i++) {
    if (!(mask & (1 << i))) continue;
    if (i < s.p) continue;
    if (i < s.p + s.q) sign = -sign;
    else return 0;
  }
  return sign;
};

export interface SparseCayley {
  ia: Int32Array;
  ib: Int32Array;
  ic: Int32Array;
  sign: Int8Array;
}

export const sparseCayley = (s: Sig): SparseCayley => {
  const n = dim(s);
  const ia: number[] = [];
  const ib: number[] = [];
  const ic: number[] = [];
  const sign: number[] = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const shared = i & j;
      const m = metricSign(shared, s);
      if (m === 0) continue;
      const sw = swapSign(i, j);
      ia.push(i);
      ib.push(j);
      ic.push(i ^ j);
      sign.push(m * sw);
    }
  }
  return {
    ia: Int32Array.from(ia),
    ib: Int32Array.from(ib),
    ic: Int32Array.from(ic),
    sign: Int8Array.from(sign),
  };
};

export const denseCayleySign = (s: Sig): Int8Array => {
  const n = dim(s);
  const out = new Int8Array(n * n);
  const c = sparseCayley(s);
  for (let k = 0; k < c.ia.length; k++) {
    out[c.ia[k] * n + c.ib[k]] = c.sign[k];
  }
  return out;
};

export const fmtSig = (s: Sig): string => `Cl(${s.p},${s.q},${s.r})`;
