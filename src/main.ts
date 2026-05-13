import { summary, typeTable } from "./algebra";
import { OPS, SIGS } from "./data";
import { heatmapCaption, renderHeatmap } from "./heatmap";
import { renderObjects, renderOperators, renderSummary } from "./panels";
import { renderTypeTable } from "./typetable";
import "./style.css";

const app = document.getElementById("app")!;
app.innerHTML = `
  <header>
    <div class="title">cliffex</div>
    <div class="sub">Operator-type catalog for Clifford algebras. Pick a signature and an operator. Cells show the output grade(s).</div>
  </header>

  <nav id="sig-bar" class="tabs"></nav>
  <nav id="op-bar" class="tabs ops"></nav>

  <section class="op-desc">
    <div id="op-title" class="op-title"></div>
    <div id="op-blurb" class="op-blurb"></div>
  </section>

  <main>
    <section id="table-wrap" class="table-wrap"></section>
    <aside id="thumb">
      <canvas id="cayley" width="256" height="256"></canvas>
      <div id="caption" class="caption"></div>
      <div class="legend">
        <span class="sw pos"></span>+1
        <span class="sw neg"></span>-1
        <span class="sw zero"></span>0
      </div>
      <div class="hint">Cayley sign table for the chosen signature. Row i, col j is the sign of e_i e_j written into output blade i XOR j.</div>
      <div id="summary" class="summary"></div>
    </aside>
  </main>

  <section class="panels">
    <div class="panel">
      <h3>Geometric objects by grade</h3>
      <div id="objects"></div>
    </div>
    <div class="panel">
      <h3>Named operators (act by sandwich)</h3>
      <div id="operators"></div>
    </div>
  </section>

`;

const sigBar = document.getElementById("sig-bar")!;
sigBar.innerHTML = SIGS.map(
  (s, i) =>
    `<button class="tab${i === 0 ? " active" : ""}" data-sig="${s.key}">
       <span class="t-name">${s.name}</span>
       <span class="t-cl">Cl(${s.sig.p},${s.sig.q},${s.sig.r})</span>
       <span class="t-blurb">${s.blurb}</span>
     </button>`,
).join("");

const opBar = document.getElementById("op-bar")!;
opBar.innerHTML = OPS.map(
  (o, i) =>
    `<button class="tab op${i === 0 ? " active" : ""}" data-op="${o.key}">
       <span class="t-name">${o.symbol}</span>
       <span class="t-cl">${o.name}</span>
     </button>`,
).join("");

const tableWrap = document.getElementById("table-wrap")!;
const canvas = document.getElementById("cayley") as HTMLCanvasElement;
const caption = document.getElementById("caption")!;
const summaryEl = document.getElementById("summary")!;
const objectsEl = document.getElementById("objects")!;
const operatorsEl = document.getElementById("operators")!;
const opTitle = document.getElementById("op-title")!;
const opBlurb = document.getElementById("op-blurb")!;

let curSig = SIGS[0].key;
let curOp = OPS[0].key;

const update = (): void => {
  const sig = SIGS.find((s) => s.key === curSig)!;
  const op = OPS.find((o) => o.key === curOp)!;

  for (const b of sigBar.querySelectorAll<HTMLButtonElement>(".tab")) {
    b.classList.toggle("active", b.dataset.sig === curSig);
  }
  for (const b of opBar.querySelectorAll<HTMLButtonElement>(".tab")) {
    b.classList.toggle("active", b.dataset.op === curOp);
  }

  opTitle.textContent = `${op.name}    ${op.symbol}`;
  opBlurb.textContent = op.blurb;

  const t = typeTable(sig.sig, curOp);
  renderTypeTable(tableWrap, t, sig);

  renderHeatmap(canvas, sig.sig);
  caption.textContent = heatmapCaption(sig.sig);
  renderSummary(summaryEl, sig, summary(sig.sig));
  renderObjects(objectsEl, sig);
  renderOperators(operatorsEl, sig);
};

sigBar.addEventListener("click", (e) => {
  const t = (e.target as HTMLElement).closest<HTMLButtonElement>(".tab");
  if (t?.dataset.sig) {
    curSig = t.dataset.sig;
    update();
  }
});

opBar.addEventListener("click", (e) => {
  const t = (e.target as HTMLElement).closest<HTMLButtonElement>(".tab");
  if (t?.dataset.op) {
    curOp = t.dataset.op;
    update();
  }
});

update();
