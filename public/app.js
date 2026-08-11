const state = {
  reports: { describe: [] },
  selectedDescribe: null,
  analysisPage: 1,
  yearFilter: "全部年份",
  schoolFilter: "全部学校",
  familyFilter: "全部家族",
  query: "",
  staticMode: false
};

function $(selector, root = document) {
  return root.querySelector(selector);
}

function fmtDate(value) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "待更新";
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function pct(value) {
  return value === null || value === undefined ? "待验证" : `${Number(value).toFixed(1)}%`;
}

function fieldValue(item, key) {
  return String(item?.[key] || "待补充");
}

function yearValue(item) {
  return fieldValue(item, "year");
}

function schoolValue(item) {
  return fieldValue(item, "school");
}

function allDescribe() {
  return [...state.reports.describe];
}

function uniq(values) {
  return [...new Set(values.map((value) => String(value || "待补充")).filter(Boolean))].sort((a, b) => {
    if (a === "待补充") return 1;
    if (b === "待补充") return -1;
    return b.localeCompare(a, "zh-CN", { numeric: true });
  });
}

function yearOptions() {
  return ["全部年份", ...uniq(state.reports.describe.map((item) => item.year))];
}

function schoolOptions() {
  return ["全部学校", ...uniq(state.reports.describe.map((item) => item.school))];
}

function familyOptions() {
  return ["全部家族", ...uniq(state.reports.describe.map((item) => item.family || "待识别"))];
}

function optionList(values, selected) {
  return values.map((value) => selectOption(value, selected)).join("");
}

function matchesYear(item) {
  if (state.yearFilter === "全部年份") return true;
  return String(item.year || "") === state.yearFilter;
}

function matchesSchool(item) {
  if (state.schoolFilter === "全部学校") return true;
  return String(item.school || "") === state.schoolFilter;
}

function matchesFamily(item) {
  if (state.familyFilter === "全部家族") return true;
  return String(item.family || "待识别") === state.familyFilter;
}

function filterByYearSchool(items) {
  return items.filter((item) => matchesYear(item) && matchesSchool(item));
}

function filterAnalysisRows() {
  return filterByYearSchool(filterByQuery(allDescribe(), ["project", "title", "family", "year", "school"])).filter(matchesFamily);
}

function statusClass(status) {
  if (status === "已发布") return "green";
  if (status === "分析中") return "blue";
  return "orange";
}

function escapeHtml(text) {
  return String(text ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function assetPath(path) {
  return new URL(path.replace(/^\//, ""), document.baseURI).pathname;
}

async function loadReports() {
  try {
    let res = await fetch("/api/reports");
    if (!res.ok) {
      res = await fetch(assetPath("api/reports.json"));
    }
    if (!res.ok) throw new Error("读取报告失败");
    const data = await res.json();
    state.staticMode = data.staticMode === true;
    state.reports = { describe: Array.isArray(data.describe) ? data.describe : [] };
  } catch (error) {
    toast(`读取报告数据失败：${error.message}`);
  }
  state.selectedDescribe = state.reports.describe[0] || null;
  render();
}

function render() {
  renderAnalysis();
}

function analysisTable(rows) {
  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>作品</th>
            <th>年份</th>
            <th>学校</th>
            <th>内核家族</th>
            <th>状态</th>
            <th>摘要 PDF</th>
            <th>开发过程分析 MD</th>
            <th>作品描述 MD</th>
            <th>对比报告 MD</th>
            <th>引用合法率</th>
            <th>更新时间</th>
          </tr>
        </thead>
        <tbody>
          ${rows.length ? rows.map((item) => `
            <tr class="${state.selectedDescribe?.id === item.id ? "selected" : ""}" data-select-describe="${item.id}">
              <td>${escapeHtml(item.project || item.title)}</td>
              <td>${escapeHtml(yearValue(item))}</td>
              <td>${escapeHtml(schoolValue(item))}</td>
              <td>${escapeHtml(item.family || "待识别")}</td>
              <td><span class="status ${statusClass(item.status)}">${escapeHtml(item.status)}</span></td>
              <td>${fileActions(reportFile(item, "summary"))}</td>
              <td>${fileActions(reportFile(item, "development"))}</td>
              <td>${fileActions(reportFile(item, "description"))}</td>
              <td>${fileActions(reportFile(item, "comparison"))}</td>
              <td class="score">${pct(item.citationRate)}</td>
              <td>${fmtDate(item.updatedAt)}</td>
            </tr>
          `).join("") : `<tr><td colspan="11"><div class="empty">服务器 describe 目录暂无项目分析 Markdown。将报告放入服务器目录后页面会自动读取。</div></td></tr>`}
        </tbody>
      </table>
    </div>
  `;
}

function reportFile(item, key) {
  if (item.files?.[key]) return item.files[key];
  const base = String(item.file || "report.md").replace(/-describe\.md$/i, "").replace(/\.md$/i, "");
  const defaults = {
    summary: { kind: "summary", format: "pdf", file: `${base}-summary.pdf`, available: false },
    development: { kind: "development", format: "md", file: `${base}-development.md`, available: false },
    description: { kind: "describe", format: "md", file: item.file, available: Boolean(item.file) },
    comparison: { kind: "compare", format: "md", file: `${base}-compare.md`, available: false }
  };
  return defaults[key];
}

function fileActions(report) {
  if (!report?.available) {
    return `<span class="file-missing">待补充</span>`;
  }
  const url = downloadUrl(report.kind, report.file);
  if (report.format === "pdf") {
    return `
      <span class="file-actions">
        <a class="btn btn-ghost btn-sm" href="${reportUrl(report.kind, report.file)}" target="_blank" rel="noopener">查看</a>
        <a class="btn btn-ghost btn-sm" href="${url}" download>下载</a>
      </span>
    `;
  }
  return `
    <span class="file-actions">
      <button class="btn btn-ghost btn-sm" data-preview="${report.kind}:${escapeHtml(report.file)}">预览</button>
      <a class="btn btn-ghost btn-sm" href="${url}" download>下载</a>
    </span>
  `;
}

function staticReportUrl(kind, file) {
  return assetPath(`${kind}/${encodeURIComponent(file)}`);
}

function reportUrl(kind, file) {
  return state.staticMode
    ? staticReportUrl(kind, file)
    : `/files/${encodeURIComponent(kind)}/${encodeURIComponent(file)}`;
}

function downloadUrl(kind, file) {
  return state.staticMode
    ? staticReportUrl(kind, file)
    : `/download/${encodeURIComponent(kind)}/${encodeURIComponent(file)}`;
}

function renderAnalysis() {
  const rows = filterAnalysisRows();
  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  state.analysisPage = Math.min(Math.max(1, state.analysisPage || 1), totalPages);
  const pageStart = (state.analysisPage - 1) * pageSize;
  const pageRows = rows.slice(pageStart, pageStart + pageSize);
  $("#page-analysis").innerHTML = `
    <section>
      <h1 class="page-title">作品分析</h1>
      <p class="subtitle">浏览参赛作品的分析报告、内核家族画像与引用验证结果。</p>
      <div class="toolbar">
        <input class="input" data-search placeholder="搜索作品 / 内核家族 / 学校 / 年份" value="${escapeHtml(state.query)}" />
        <select class="select" data-year-filter>${optionList(yearOptions(), state.yearFilter)}</select>
        <select class="select" data-school-filter>${optionList(schoolOptions(), state.schoolFilter)}</select>
        <select class="select" data-family-filter>${optionList(familyOptions(), state.familyFilter)}</select>
      </div>
      <article class="card">
        <div class="card-head"><h2 class="card-title">作品列表</h2></div>
        ${analysisTable(pageRows)}
        ${pagination(rows.length, pageSize, state.analysisPage, "data-analysis-page")}
      </article>
    </section>
  `;
}

function pagination(total, pageSize, currentPage, dataAttr) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = total ? (currentPage - 1) * pageSize + 1 : 0;
  const end = Math.min(total, currentPage * pageSize);
  const pageButtons = Array.from({ length: totalPages }, (_, index) => {
    const page = index + 1;
    return `<button class="page-btn ${page === currentPage ? "active" : ""}" ${dataAttr}="${page}">${page}</button>`;
  }).join("");

  return `
    <div class="pagination">
      <span>共 ${total} 条，显示 ${start}-${end}</span>
      <span class="spacer"></span>
      <button class="page-btn" ${dataAttr}="prev" ${currentPage <= 1 ? "disabled" : ""}>‹</button>
      ${pageButtons}
      <button class="page-btn" ${dataAttr}="next" ${currentPage >= totalPages ? "disabled" : ""}>›</button>
      <select class="select" style="width:120px"><option>${pageSize} 条/页</option></select>
    </div>
  `;
}

function selectOption(value, selected) {
  return `<option value="${escapeHtml(value)}" ${value === selected ? "selected" : ""}>${escapeHtml(value)}</option>`;
}

function filterByQuery(items, keys) {
  const q = state.query.trim().toLowerCase();
  if (!q) return items;
  return items.filter((item) => keys.some((key) => String(item[key] || "").toLowerCase().includes(q)));
}

async function previewReport(kind, file) {
  let res = await fetch(`/api/report?kind=${encodeURIComponent(kind)}&name=${encodeURIComponent(file)}`);
  if (!res.ok) {
    res = await fetch(staticReportUrl(kind, file));
  }
  if (!res.ok) {
    toast("无法读取报告");
    return;
  }
  const contentType = res.headers.get("Content-Type") || "";
  const content = contentType.includes("application/json")
    ? (await res.json()).content
    : await res.text();
  showPreview(file, content);
}

function showPreview(title, markdown) {
  $("#preview-title").textContent = title;
  $("#preview-content").innerHTML = markdownToHtml(markdown);
  $("#preview-modal").classList.add("show");
  $("#preview-modal").setAttribute("aria-hidden", "false");
}

function markdownToHtml(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  let html = "";
  let inCode = false;
  let table = [];

  const flushTable = () => {
    if (!table.length) return;
    const rows = table.map((line) => line.split("|").slice(1, -1).map((cell) => cell.trim()));
    const head = rows[0] || [];
    const body = rows.slice(2);
    html += `<table><thead><tr>${head.map((c) => `<th>${inline(c)}</th>`).join("")}</tr></thead><tbody>${body.map((row) => `<tr>${row.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
    table = [];
  };

  for (const line of lines) {
    if (line.startsWith("```")) {
      flushTable();
      if (!inCode) {
        inCode = true;
        html += "<pre><code>";
      } else {
        inCode = false;
        html += "</code></pre>";
      }
      continue;
    }
    if (inCode) {
      html += `${escapeHtml(line)}\n`;
      continue;
    }
    if (/^\|.+\|$/.test(line.trim())) {
      table.push(line.trim());
      continue;
    }
    flushTable();
    if (!line.trim()) continue;
    const h = line.match(/^(#{1,4})\s+(.+)$/);
    if (h) {
      const level = h[1].length;
      html += `<h${level}>${inline(h[2])}</h${level}>`;
    } else if (/^-\s+/.test(line)) {
      html += `<p>• ${inline(line.replace(/^-\s+/, ""))}</p>`;
    } else {
      html += `<p>${inline(line)}</p>`;
    }
  }
  flushTable();
  if (inCode) html += "</code></pre>";
  return html;
}

function inline(text) {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

function toast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove("show"), 2600);
}

function wireEvents() {
  document.addEventListener("click", (event) => {
    const preview = event.target.closest("[data-preview]");
    if (preview) {
      const [kind, ...fileParts] = preview.dataset.preview.split(":");
      previewReport(kind, fileParts.join(":"));
    }

    const close = event.target.closest("[data-close-modal]");
    if (close) {
      $("#preview-modal").classList.remove("show");
      $("#preview-modal").setAttribute("aria-hidden", "true");
    }

    const rowD = event.target.closest("[data-select-describe]");
    if (rowD && !event.target.closest("button,a")) {
      const id = rowD.dataset.selectDescribe;
      state.selectedDescribe = allDescribe().find((x) => x.id === id) || state.selectedDescribe;
      renderAnalysis();
    }

    const analysisPage = event.target.closest("[data-analysis-page]");
    if (analysisPage) {
      const rows = filterAnalysisRows();
      const totalPages = Math.max(1, Math.ceil(rows.length / 10));
      const target = analysisPage.dataset.analysisPage;
      if (target === "prev") state.analysisPage -= 1;
      else if (target === "next") state.analysisPage += 1;
      else state.analysisPage = Number(target);
      state.analysisPage = Math.min(Math.max(1, state.analysisPage), totalPages);
      renderAnalysis();
    }

  });

  document.addEventListener("input", (event) => {
    if (event.target.matches("[data-search]")) {
      state.query = event.target.value;
      state.analysisPage = 1;
      render();
    }
  });

  document.addEventListener("change", (event) => {
    if (event.target.matches("[data-year-filter]")) {
      state.yearFilter = event.target.value;
      state.analysisPage = 1;
      render();
    }
    if (event.target.matches("[data-school-filter]")) {
      state.schoolFilter = event.target.value;
      state.analysisPage = 1;
      render();
    }
    if (event.target.matches("[data-family-filter]")) {
      state.familyFilter = event.target.value;
      state.analysisPage = 1;
      renderAnalysis();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      $("#preview-modal").classList.remove("show");
      $("#preview-modal").setAttribute("aria-hidden", "true");
    }
  });
}

wireEvents();
loadReports();
