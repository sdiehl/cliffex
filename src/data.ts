import type { Sig } from "./sig";

export interface NamedObject {
  grade: number;
  name: string;
  note: string;
}

export interface NamedOperator {
  symbol: string;
  domain: string;
  codomain: string;
  note: string;
}

export interface SigEntry {
  key: string;
  sig: Sig;
  name: string;
  blurb: string;
  objects: NamedObject[];
  operators: NamedOperator[];
}

export const SIGS: SigEntry[] = [
  {
    key: "pga",
    sig: { p: 3, q: 0, r: 1 },
    name: "PGA",
    blurb: "projective, rigid motions SE(3)",
    objects: [
      { grade: 0, name: "scalar", note: "real number" },
      {
        grade: 1,
        name: "point",
        note: "e0 + x e1 + y e2 + z e3, the e0 is the null projective coord",
      },
      { grade: 2, name: "line", note: "point ^ point" },
      { grade: 3, name: "plane", note: "point ^ point ^ point" },
      { grade: 4, name: "pseudoscalar I", note: "orientation, I^2 = 0 because of the null e0" },
    ],
    operators: [
      {
        symbol: "R",
        domain: "X (any)",
        codomain: "X",
        note: "rotor around an axis bivector, sandwich preserves grade",
      },
      {
        symbol: "T",
        domain: "X",
        codomain: "X",
        note: "translator 1 - 0.5 t e0, needs the null vector to translate",
      },
      { symbol: "M = TR", domain: "X", codomain: "X", note: "motor = full rigid motion in SE(3)" },
      {
        symbol: "v ~ refl(v)",
        domain: "X",
        codomain: "X",
        note: "reflector across a plane v, generator of the Pin group",
      },
    ],
  },
  {
    key: "cga",
    sig: { p: 4, q: 1, r: 0 },
    name: "CGA",
    blurb: "conformal, points/spheres/dilations",
    objects: [
      { grade: 0, name: "scalar", note: "real number" },
      {
        grade: 1,
        name: "point / sphere",
        note: "null vector = point, non-null = sphere/plane in IPNS",
      },
      { grade: 2, name: "point pair", note: "two points or tangent vector" },
      { grade: 3, name: "line / circle", note: "three points wedged" },
      { grade: 4, name: "plane / sphere", note: "OPNS sphere/plane, dual to grade-1 IPNS" },
      { grade: 5, name: "pseudoscalar I", note: "I^2 = -1" },
    ],
    operators: [
      { symbol: "R", domain: "X", codomain: "X", note: "rotor in a Euclidean 2-plane" },
      { symbol: "T", domain: "X", codomain: "X", note: "translator 1 - 0.5 t n_inf" },
      {
        symbol: "D",
        domain: "X",
        codomain: "X",
        note: "dilator exp(lambda/2 (n_0 ^ n_inf)), conformal scaling",
      },
      {
        symbol: "M = D T R",
        domain: "X",
        codomain: "X",
        note: "conformal motor: scale, translate, rotate",
      },
      {
        symbol: "v ~ refl(v)",
        domain: "X",
        codomain: "X",
        note: "reflect across a sphere or plane",
      },
    ],
  },
  {
    key: "sta",
    sig: { p: 1, q: 3, r: 0 },
    name: "STA",
    blurb: "spacetime, Lorentz SO(1,3)",
    objects: [
      { grade: 0, name: "scalar", note: "Lorentz invariant" },
      { grade: 1, name: "4-vector", note: "event, 4-momentum, current" },
      { grade: 2, name: "F (EM bivector)", note: "F = E + I B, six independent components" },
      { grade: 3, name: "trivector", note: "dual to a 4-vector" },
      { grade: 4, name: "pseudoscalar I", note: "I^2 = -1, the chirality element" },
    ],
    operators: [
      {
        symbol: "R",
        domain: "X",
        codomain: "X",
        note: "spatial rotor (timelike bivector excluded)",
      },
      {
        symbol: "B",
        domain: "X",
        codomain: "X",
        note: "boost exp(-w/2 b) with timelike-spatial b",
      },
      { symbol: "L = B R", domain: "X", codomain: "X", note: "general Lorentz transformation" },
      { symbol: "v ~ refl(v)", domain: "X", codomain: "X", note: "reflection across a hyperplane" },
    ],
  },
  {
    key: "hyp",
    sig: { p: 2, q: 1, r: 0 },
    name: "HYP",
    blurb: "hyperbolic, isometries of H^2",
    objects: [
      { grade: 0, name: "scalar", note: "real" },
      { grade: 1, name: "point on H^2", note: "<P,P> = -1 hyperboloid sheet" },
      { grade: 2, name: "bivector", note: "rotation (compact) + boost (non-compact) generator" },
      { grade: 3, name: "pseudoscalar I", note: "I^2 = +1 here" },
    ],
    operators: [
      {
        symbol: "R",
        domain: "X",
        codomain: "X",
        note: "hyperbolic rotation around the timelike axis",
      },
      {
        symbol: "B",
        domain: "X",
        codomain: "X",
        note: "hyperbolic boost, exp on a non-compact bivector",
      },
      { symbol: "v ~ refl(v)", domain: "X", codomain: "X", note: "reflection generator" },
    ],
  },
  {
    key: "cma",
    sig: { p: 2, q: 4, r: 0 },
    name: "CMA",
    blurb: "conformal Minkowski, twistor-flavoured",
    objects: [
      { grade: 0, name: "scalar", note: "real" },
      { grade: 1, name: "point (null lift)", note: "n_0 + x + 0.5 (t^2 - |x|^2) n_inf" },
      { grade: 2, name: "bivector", note: "rotation, boost, or conformal generator" },
      { grade: 3, name: "trivector", note: "" },
      { grade: 4, name: "quadvector", note: "" },
      { grade: 5, name: "5-vector", note: "" },
      { grade: 6, name: "pseudoscalar I", note: "I^2 = -1" },
    ],
    operators: [
      { symbol: "R", domain: "X", codomain: "X", note: "Euclidean rotor" },
      { symbol: "B", domain: "X", codomain: "X", note: "Lorentz boost" },
      { symbol: "T", domain: "X", codomain: "X", note: "translator on null direction" },
      { symbol: "D", domain: "X", codomain: "X", note: "dilator from the n_0 ^ n_inf bivector" },
      { symbol: "M", domain: "X", codomain: "X", note: "full conformal Minkowski motor" },
    ],
  },
];

export interface OpEntry {
  key: string;
  name: string;
  symbol: string;
  arity: 1 | 2;
  blurb: string;
}

export const OPS: OpEntry[] = [
  {
    key: "gp",
    name: "Geometric product",
    symbol: "a b",
    arity: 2,
    blurb:
      "Cell shows all output grades that appear. For grade-k and grade-l inputs, gp produces grades in {|k-l|, |k-l|+2, ..., k+l} that are <= N and non-zero in this signature.",
  },
  {
    key: "wedge",
    name: "Wedge product",
    symbol: "a ^ b",
    arity: 2,
    blurb:
      "Antisymmetric, grade-raising. grade(a ^ b) = grade(a) + grade(b) when bits do not overlap, else 0. In a degenerate signature, some output blades vanish.",
  },
  {
    key: "inner",
    name: "Left contraction",
    symbol: "a . b",
    arity: 2,
    blurb:
      "Grade-lowering. a . b has grade grade(b) - grade(a) when grade(a) <= grade(b) and the blades match, else 0.",
  },
  {
    key: "sandwich",
    name: "Sandwich product",
    symbol: "R a R~",
    arity: 1,
    blurb:
      "Pin-group action. Grade-preserving for any R in Pin(p,q,r). Every named operator below acts on multivectors this way.",
  },
  {
    key: "dual",
    name: "Hodge dual",
    symbol: "a I",
    arity: 1,
    blurb: "Multiplication by the pseudoscalar I. Maps grade k to grade N-k.",
  },
  {
    key: "reverse",
    name: "Reverse",
    symbol: "a~",
    arity: 1,
    blurb:
      "Reverses basis blade order. Preserves grade k, multiplies by (-1)^(k(k-1)/2). Used to invert rotors.",
  },
];
