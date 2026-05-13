import type { AlgebraSummary } from "./algebra";
import type { SigEntry } from "./data";

export const renderObjects = (root: HTMLElement, sig: SigEntry): void => {
  let html = `<table class="kv"><thead><tr><th>grade</th><th>dim</th><th>object</th><th>note</th></tr></thead><tbody>`;
  for (const o of sig.objects) {
    const dim = binom(sig.objects.length - 1, o.grade);
    html += `<tr>
      <td class="g">${o.grade}</td>
      <td class="d">${dim}</td>
      <td class="n">${o.name}</td>
      <td class="t">${o.note}</td>
    </tr>`;
  }
  html += `</tbody></table>`;
  root.innerHTML = html;
};

export const renderOperators = (root: HTMLElement, sig: SigEntry): void => {
  let html = `<table class="kv"><thead><tr><th>symbol</th><th>type</th><th>note</th></tr></thead><tbody>`;
  for (const op of sig.operators) {
    html += `<tr>
      <td class="sym">${op.symbol}</td>
      <td class="sig">${op.domain} <span class="arrow">-&gt;</span> ${op.codomain}</td>
      <td class="t">${op.note}</td>
    </tr>`;
  }
  html += `</tbody></table>`;
  root.innerHTML = html;
};

export const renderSummary = (root: HTMLElement, sig: SigEntry, s: AlgebraSummary): void => {
  const sparsity = ((1 - s.density) * 100).toFixed(1);
  const grades = s.perGrade.map((d, k) => `<span class="gr"><b>${k}</b>:${d}</span>`).join(" ");
  root.innerHTML = `
    <div class="srow"><span class="k">algebra</span><span>Cl(${sig.sig.p},${sig.sig.q},${sig.sig.r})</span></div>
    <div class="srow"><span class="k">N</span><span>${sig.sig.p + sig.sig.q + sig.sig.r}</span></div>
    <div class="srow"><span class="k">blades</span><span>${s.dim}</span></div>
    <div class="srow"><span class="k">Cayley nonzero</span><span>${s.nonzero} / ${s.dim * s.dim}</span></div>
    <div class="srow"><span class="k">sparsity</span><span>${sparsity}%</span></div>
    <div class="srow tall"><span class="k">grade dims</span><span class="gd">${grades}</span></div>
  `;
};

const binom = (n: number, k: number): number => {
  if (k < 0 || k > n) return 0;
  let num = 1;
  let den = 1;
  for (let i = 1; i <= k; i++) {
    num *= n - i + 1;
    den *= i;
  }
  return num / den;
};
