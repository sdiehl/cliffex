import type { TypeTable } from "./algebra";
import type { SigEntry } from "./data";

const objLabel = (sig: SigEntry, g: number): string => {
  const o = sig.objects.find((x) => x.grade === g);
  return o ? o.name : `grade ${g}`;
};

const gradeChip = (g: number, total: number): string => {
  const hue = total > 1 ? Math.round((g / (total - 1)) * 280) : 200;
  return `<span class="chip" style="background:hsl(${hue} 60% 30%);border-color:hsl(${hue} 70% 45%);color:hsl(${hue} 80% 88%)">${g}</span>`;
};

const cellHtml = (grades: number[], maxGrade: number): string => {
  if (grades.length === 0) return `<span class="zero">0</span>`;
  return grades.map((g) => gradeChip(g, maxGrade + 1)).join("");
};

export const renderTypeTable = (root: HTMLElement, table: TypeTable, sig: SigEntry): string => {
  const maxGrade = table.size - 1;
  let html = "";

  if (table.is1D) {
    html += `<table class="ttable one-d"><thead><tr><th>${table.rowLabel}</th><th>object</th><th>${table.colLabel}</th><th>object</th></tr></thead><tbody>`;
    for (let k = 0; k < table.size; k++) {
      const out = table.cells[k][0];
      html += `<tr>
        <td class="ax">${gradeChip(k, maxGrade + 1)}</td>
        <td class="obj">${objLabel(sig, k)}</td>
        <td>${cellHtml(out, maxGrade)}</td>
        <td class="obj">${out.length === 1 ? objLabel(sig, out[0]) : ""}</td>
      </tr>`;
    }
    html += `</tbody></table>`;
    root.innerHTML = html;
    return "";
  }

  html += `<table class="ttable">`;
  html += `<thead><tr><th class="corner">${table.rowLabel} \\ ${table.colLabel}</th>`;
  for (let k = 0; k < table.size; k++) {
    html += `<th>${gradeChip(k, maxGrade + 1)}<span class="obj-sub">${objLabel(sig, k)}</span></th>`;
  }
  html += `</tr></thead><tbody>`;
  for (let i = 0; i < table.size; i++) {
    html += `<tr><th class="rowhead">${gradeChip(i, maxGrade + 1)}<span class="obj-sub">${objLabel(sig, i)}</span></th>`;
    for (let j = 0; j < table.size; j++) {
      const grades = table.cells[i][j];
      html += `<td>${cellHtml(grades, maxGrade)}</td>`;
    }
    html += `</tr>`;
  }
  html += `</tbody></table>`;
  root.innerHTML = html;
  return "";
};
