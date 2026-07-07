const state = {
  page: "home",
  reports: { describe: [], compare: [] },
  selectedDescribe: null,
  selectedCompare: null,
  analysisPage: 1,
  comparePage: 1,
  reportsPage: 1,
  reportTypeFilter: "全部类型",
  reportStatusFilter: "全部状态",
  reportCitationFilter: "引用验证",
  yearFilter: "全部年份",
  schoolFilter: "全部学校",
  familyFilter: "全部家族",
  compareLeftFilter: "全部今年作品",
  compareRightFilter: "全部历史作品",
  query: "",
  staticMode: false
};

const COMPARE_LEFT_ALL = "全部今年作品";
const COMPARE_RIGHT_ALL = "全部历史作品";

function $(selector, root = document) {
  return root.querySelector(selector);
}

function $all(selector, root = document) {
  return [...root.querySelectorAll(selector)];
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

function num(value) {
  return Number(value || 0).toFixed(2);
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

function allCompare() {
  const real = state.reports.compare.map((item) => ({
    ...item,
    risk: item.risk || riskByScore(item.score),
    leftYear: item.leftYear || item.year || "待补充",
    rightYear: item.rightYear || item.year || "待补充",
    leftSchool: item.leftSchool || item.school || "待补充",
    rightSchool: item.rightSchool || item.school || "待补充"
  }));
  return real.sort((a, b) => (b.score || 0) - (a.score || 0));
}

function uniq(values) {
  return [...new Set(values.map((value) => String(value || "待补充")).filter(Boolean))].sort((a, b) => {
    if (a === "待补充") return 1;
    if (b === "待补充") return -1;
    return b.localeCompare(a, "zh-CN", { numeric: true });
  });
}

function yearOptions() {
  const values = [
    ...state.reports.describe.map((item) => item.year),
    ...state.reports.compare.flatMap((item) => [item.year, item.leftYear, item.rightYear])
  ];
  return ["全部年份", ...uniq(values)];
}

function schoolOptions() {
  const values = [
    ...state.reports.describe.map((item) => item.school),
    ...state.reports.compare.flatMap((item) => [item.school, item.leftSchool, item.rightSchool])
  ];
  return ["全部学校", ...uniq(values)];
}

function familyOptions() {
  return ["全部家族", ...uniq(state.reports.describe.map((item) => item.family || "待识别"))];
}

function optionList(values, selected) {
  return values.map((value) => selectOption(value, selected)).join("");
}

function matchesYear(item) {
  if (state.yearFilter === "全部年份") return true;
  return [item.year, item.leftYear, item.rightYear].some((value) => String(value || "") === state.yearFilter);
}

function matchesSchool(item) {
  if (state.schoolFilter === "全部学校") return true;
  return [item.school, item.leftSchool, item.rightSchool].some((value) => String(value || "") === state.schoolFilter);
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

function compareLeftOptions() {
  return [COMPARE_LEFT_ALL, ...uniq(allCompare().map((item) => item.left || "待补充"))];
}

function compareRightOptions() {
  const rows = allCompare().filter((item) => state.compareLeftFilter === COMPARE_LEFT_ALL || item.left === state.compareLeftFilter);
  return [COMPARE_RIGHT_ALL, ...uniq(rows.map((item) => item.right || "待补充"))];
}

function syncCompareFilters() {
  const leftOptions = compareLeftOptions();
  if (!leftOptions.includes(state.compareLeftFilter)) {
    state.compareLeftFilter = COMPARE_LEFT_ALL;
  }
  const rightOptions = compareRightOptions();
  if (!rightOptions.includes(state.compareRightFilter)) {
    state.compareRightFilter = COMPARE_RIGHT_ALL;
  }
  return { leftOptions, rightOptions };
}

function matchesComparePair(item) {
  if (state.compareLeftFilter !== COMPARE_LEFT_ALL && item.left !== state.compareLeftFilter) return false;
  if (state.compareRightFilter !== COMPARE_RIGHT_ALL && item.right !== state.compareRightFilter) return false;
  return true;
}

function filterCompareRows() {
  return filterByYearSchool(filterByQuery(allCompare(), ["left", "right", "title", "year", "school", "leftYear", "rightYear", "leftSchool", "rightSchool"])).filter(matchesComparePair);
}

function compareMeta(item) {
  const left = [item.leftYear, item.leftSchool].filter((value) => value && value !== "待补充").join(" · ") || "待补充";
  const right = [item.rightYear, item.rightSchool].filter((value) => value && value !== "待补充").join(" · ") || "待补充";
  return `${left} ↔ ${right}`;
}

function riskByScore(score) {
  if (score >= 0.7) return "高风险";
  if (score >= 0.4) return "中风险";
  return "低风险";
}

function statusClass(status) {
  if (status === "已发布") return "green";
  if (status === "分析中") return "blue";
  return "orange";
}

function riskClass(risk) {
  if (/高/.test(risk)) return "red";
  if (/中|stub|缺口|复核/.test(risk)) return "orange";
  if (/低/.test(risk)) return "blue";
  return "green";
}

function escapeHtml(text) {
  return String(text ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function openPage(page) {
  state.page = page;
  if (location.hash.slice(1) !== page) {
    history.replaceState(null, "", `#${page}`);
  }
  $all(".page").forEach((el) => el.classList.toggle("active", el.id === `page-${page}`));
  $all(".nav-link").forEach((el) => el.classList.toggle("active", el.dataset.page === page));
  render();
}

function assetPath(path) {
  return new URL(path.replace(/^\//, ""), document.baseURI).pathname;
}

async function loadReports() {
  try {
    let res = await fetch("/api/reports");
    if (!res.ok) {
      res = await fetch(assetPath("api/reports.json"));
      state.staticMode = res.ok;
    }
    if (!res.ok) throw new Error("读取报告失败");
    state.reports = await res.json();
  } catch (error) {
    toast(`读取报告索引失败：${error.message}`);
  }
  state.selectedDescribe = state.reports.describe[0] || null;
  state.selectedCompare = state.reports.compare[0] || null;
  render();
}

function render() {
  renderHome();
  renderAnalysis();
  renderCompare();
  renderReports();
}

function renderHome() {
  const describe = allDescribe();
  const compare = allCompare();
  const pending = describe.filter((x) => x.status !== "已发布").length + compare.filter((x) => x.status !== "已发布").length;
  $("#page-home").innerHTML = `
    <section>
      <h1 class="hero-title">2026 内核赛道作品分析平台</h1>
      <p class="subtitle">集中发布今年参赛作品分析、历史作品比对与可信源码引用报告</p>
      <div class="metrics-grid">
        ${metric("▤", "作品分析", describe.length)}
        ${metric("▥", "比对报告", compare.length)}
        ${metric("✓", "引用验证", "99.24", "%")}
        ${metric("!", "待复核", pending)}
      </div>
      <article class="card">
        <div class="card-head">
          <h2 class="card-title">今年作品分析进度</h2>
          <button class="link" data-page-jump="analysis">查看全部 →</button>
        </div>
        ${analysisTable(describe.slice(0, 5), true)}
        <div class="pagination"><span class="spacer"></span><button class="link" data-page-jump="analysis">查看全部作品分析 →</button><span class="spacer"></span></div>
      </article>
    </section>
  `;
}

function metric(icon, label, value, suffix = "") {
  return `
    <div class="metric-card">
      <div class="metric-icon">${icon}</div>
      <div><div class="metric-label">${label}</div><div class="metric-value">${value}<small>${suffix}</small></div></div>
    </div>
  `;
}

function analysisTable(rows, compact = false) {
  const colSpan = compact ? 5 : 8;
  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>作品</th>
            <th>年份</th>
            ${compact ? "" : "<th>学校</th>"}
            <th>内核家族</th>
            <th>状态</th>
            <th>describe 报告</th>
            ${compact ? "" : "<th>引用合法率</th><th>更新时间</th>"}
          </tr>
        </thead>
        <tbody>
          ${rows.length ? rows.map((item) => `
            <tr class="${state.selectedDescribe?.id === item.id ? "selected" : ""}" data-select-describe="${item.id}">
              <td>${escapeHtml(item.project || item.title)}</td>
              <td>${escapeHtml(yearValue(item))}</td>
              ${compact ? "" : `<td>${escapeHtml(schoolValue(item))}</td>`}
              <td>${escapeHtml(item.family || "待识别")}</td>
              <td><span class="status ${statusClass(item.status)}">${escapeHtml(item.status)}</span></td>
              <td>${reportActions(item, "describe")}</td>
              ${compact
                ? ""
                : `<td class="score">${pct(item.citationRate)}</td><td>${fmtDate(item.updatedAt)}</td>`}
            </tr>
          `).join("") : `<tr><td colspan="${colSpan}"><div class="empty">服务器 describe 目录暂无项目分析 Markdown。将报告放入服务器目录后页面会自动读取。</div></td></tr>`}
        </tbody>
      </table>
    </div>
  `;
}

function reportActions(item, type) {
  return `
    <button class="btn btn-ghost btn-sm" data-preview="${type}:${escapeHtml(item.file)}">预览</button>
    <a class="btn btn-ghost btn-sm" href="${downloadUrl(type, item.file)}" download>下载</a>
  `;
}

function staticReportUrl(type, file) {
  return assetPath(`${type}/${encodeURIComponent(file)}`);
}

function downloadUrl(type, file) {
  return state.staticMode
    ? staticReportUrl(type, file)
    : `/download/${type}/${encodeURIComponent(file)}`;
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
      <h1 class="page-title">今年作品分析</h1>
      <p class="subtitle">管理今年参赛作品的 describe 报告、内核家族画像与引用验证结果。</p>
      <div class="toolbar">
        <input class="input" data-search placeholder="搜索作品 / 内核家族 / 学校 / 年份" value="${escapeHtml(state.query)}" />
        <select class="select" data-year-filter>${optionList(yearOptions(), state.yearFilter)}</select>
        <select class="select" data-school-filter>${optionList(schoolOptions(), state.schoolFilter)}</select>
        <select class="select" data-family-filter>${optionList(familyOptions(), state.familyFilter)}</select>
        <button class="btn btn-primary" data-upload="describe"><span class="icon">⇧</span>报告更新说明</button>
      </div>
      <article class="card">
        <div class="card-head"><h2 class="card-title">作品列表</h2></div>
        ${analysisTable(pageRows, false)}
        ${pagination(rows.length, pageSize, state.analysisPage, "data-analysis-page")}
      </article>
      ${uploadStrip("describe", "管理员维护入口：追加项目分析 Markdown 到服务器 describe 目录")}
    </section>
  `;
}

function renderCompare() {
  const { leftOptions, rightOptions } = syncCompareFilters();
  const rows = filterCompareRows();
  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  state.comparePage = Math.min(Math.max(1, state.comparePage || 1), totalPages);
  const pageStart = (state.comparePage - 1) * pageSize;
  const pageRows = rows.slice(pageStart, pageStart + pageSize);
  const selected = rows.find((item) => item.id === state.selectedCompare?.id) || rows[0] || null;
  $("#page-compare").innerHTML = `
    <section>
      <h1 class="page-title">历年作品比对</h1>
      <p class="subtitle">选择今年作品与历史基线，生成结构化 compare 报告。</p>
      <div class="compare-picker">
        <label class="select-card"><span>选择今年作品：</span><select class="select" data-compare-left-filter ${leftOptions.length <= 1 ? "disabled" : ""}>${optionList(leftOptions, state.compareLeftFilter)}</select></label>
        <label class="select-card"><span>选择历史作品：</span><select class="select" data-compare-right-filter ${rightOptions.length <= 1 ? "disabled" : ""}>${optionList(rightOptions, state.compareRightFilter)}</select></label>
        <button class="btn btn-primary" data-upload="compare"><span class="icon">▤</span>报告更新说明</button>
      </div>
      <p style="color:var(--muted); font-weight:700">ⓘ 综合分由函数签名、系统调用、依赖、调用图、目录结构融合。</p>
      <div class="toolbar compact">
        <input class="input" data-search placeholder="搜索作品 / 学校 / 年份" value="${escapeHtml(state.query)}" />
        <select class="select" data-year-filter>${optionList(yearOptions(), state.yearFilter)}</select>
        <select class="select" data-school-filter>${optionList(schoolOptions(), state.schoolFilter)}</select>
      </div>
      <div class="grid-compare">
        <article class="card">
          <div class="card-head"><h2 class="card-title">比对任务</h2></div>
          <div class="table-wrap">
            <table>
              <thead><tr><th>作品 A ↔ 历史作品 B</th><th>状态</th><th>综合分</th><th>报告入口</th></tr></thead>
              <tbody>
                ${rows.length ? pageRows.map((item) => `
                  <tr class="${selected.id === item.id ? "selected" : ""}" data-select-compare="${item.id}">
                    <td>${escapeHtml(item.left)} ↔ ${escapeHtml(item.right)}</td>
                    <td><span class="status ${statusClass(item.status)}">${escapeHtml(item.status)}</span></td>
                    <td class="score">${num(item.score)}</td>
                    <td>${reportActions(item, "compare")}</td>
                  </tr>
                `).join("") : `<tr><td colspan="4"><div class="empty">服务器 compare 目录暂无比对 Markdown。将报告放入服务器目录后页面会自动读取。</div></td></tr>`}
              </tbody>
            </table>
          </div>
          ${comparePagination(rows.length, pageSize, state.comparePage)}
        </article>
        <article class="card card-pad">
          ${selected ? `
          <div style="display:flex; justify-content:space-between; align-items:center; gap:18px">
            <h2 class="card-title">比对详情</h2>
            <span class="risk ${riskClass(selected.risk)}">${escapeHtml(selected.risk)}</span>
          </div>
          <h3 style="font-size:22px">${escapeHtml(selected.left)} ↔ ${escapeHtml(selected.right)} <span class="score" style="float:right; font-size:30px">${num(selected.score)}</span></h3>
          <div class="detail-metrics">
            <div class="detail-metric"><span>A 年份</span><strong>${escapeHtml(selected.leftYear || "待补充")}</strong></div>
            <div class="detail-metric"><span>A 学校</span><strong>${escapeHtml(selected.leftSchool || "待补充")}</strong></div>
            <div class="detail-metric"><span>B 年份</span><strong>${escapeHtml(selected.rightYear || "待补充")}</strong></div>
            <div class="detail-metric"><span>B 学校</span><strong>${escapeHtml(selected.rightSchool || "待补充")}</strong></div>
          </div>
          ${progress("函数签名", selected.signature)}
          ${progress("syscall", selected.syscall)}
          ${progress("依赖", selected.deps)}
          ${progress("调用图", selected.callgraph)}
          ${progress("目录结构", selected.directory)}
          <h3>主要差异点</h3>
          <ol class="diff-list">
            <li><span>内存管理扩展：页表管理与缺页处理机制存在差异。</span></li>
            <li><span>syscall stub 比例：部分系统调用尚未完全实现。</span></li>
            <li><span>文件系统路径差异：目录组织与 VFS 接口实现方式不同。</span></li>
            <li><span>驱动注册方式：显式注册与基线复用程度不同。</span></li>
          </ol>
          <div style="display:flex; justify-content:flex-end; margin-top:22px">${reportActions(selected, "compare")}</div>
          ` : `<h2 class="card-title">比对详情</h2><div class="empty">服务器 compare 目录暂无比对任务。报告入库后，这里会显示综合分、五类指标和主要差异点。</div>`}
        </article>
      </div>
      ${uploadStrip("compare", "管理员维护入口：追加比对 Markdown 到服务器 compare 目录")}
    </section>
  `;
}

function comparePagination(total, pageSize, currentPage) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = total ? (currentPage - 1) * pageSize + 1 : 0;
  const end = Math.min(total, currentPage * pageSize);
  const pageButtons = Array.from({ length: totalPages }, (_, index) => {
    const page = index + 1;
    return `<button class="page-btn ${page === currentPage ? "active" : ""}" data-compare-page="${page}">${page}</button>`;
  }).join("");

  return `
    <div class="pagination">
      <span>共 ${total} 条，显示 ${start}-${end}</span>
      <span class="spacer"></span>
      <button class="page-btn" data-compare-page="prev" ${currentPage <= 1 ? "disabled" : ""}>‹</button>
      ${pageButtons}
      <button class="page-btn" data-compare-page="next" ${currentPage >= totalPages ? "disabled" : ""}>›</button>
      <select class="select" style="width:120px"><option>${pageSize} 条/页</option></select>
    </div>
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

function progress(label, value) {
  const v = Math.max(0, Math.min(1, Number(value || 0)));
  return `<div class="progress-row"><strong>${label}</strong><div class="bar"><span style="width:${v * 100}%"></span></div><span>${num(v)}</span></div>`;
}

function renderReports() {
  const reports = [...state.reports.describe, ...state.reports.compare];
  const filteredReports = filterReports(reports);
  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(filteredReports.length / pageSize));
  state.reportsPage = Math.min(Math.max(1, state.reportsPage || 1), totalPages);
  const pageStart = (state.reportsPage - 1) * pageSize;
  const pageReports = filteredReports.slice(pageStart, pageStart + pageSize);
  $("#page-reports").innerHTML = `
    <section>
      <h1 class="page-title">报告索引</h1>
      <p class="subtitle">统一管理项目分析 Markdown 与比对报告 Markdown，发布给评审与组委会查看。</p>
      <div class="grid-upload">
        ${uploadCard("describe", "项目分析报告更新", "Cloudflare Pages 部署时，报告随 GitHub 仓库一起发布。", "将新的项目分析 Markdown 提交到 describe 目录后重新部署", "查看更新方式")}
        ${uploadCard("compare", "比对报告更新", "Cloudflare Pages 部署时，比对报告随 GitHub 仓库一起发布。", "将新的比对报告 Markdown 提交到 compare 目录后重新部署", "查看更新方式")}
        <aside class="card stat-list">
          ${statLine("▤", "项目分析", allDescribe().length)}
          ${statLine("↔", "比对报告", allCompare().length)}
          ${statLine("□", "草稿", reports.filter((x) => x.status === "分析中").length)}
          ${statLine("➤", "待发布", reports.filter((x) => x.status !== "已发布").length)}
        </aside>
      </div>
      <article class="card" style="margin-top:28px">
        <div class="card-head"><h2 class="card-title">报告库</h2></div>
        <div class="card-pad" style="padding-top:0">
          <div class="toolbar compact">
            <input class="input" data-search placeholder="搜索报告 / 作品 / 类型 / 学校 / 年份" value="${escapeHtml(state.query)}" />
            <select class="select" data-year-filter>${optionList(yearOptions(), state.yearFilter)}</select>
            <select class="select" data-school-filter>${optionList(schoolOptions(), state.schoolFilter)}</select>
            <select class="select" data-report-type-filter>
              ${selectOption("全部类型", state.reportTypeFilter)}
              ${selectOption("项目分析", state.reportTypeFilter)}
              ${selectOption("比对报告", state.reportTypeFilter)}
            </select>
            <select class="select" data-report-status-filter>
              ${selectOption("全部状态", state.reportStatusFilter)}
              ${selectOption("已发布", state.reportStatusFilter)}
              ${selectOption("分析中", state.reportStatusFilter)}
              ${selectOption("待复核", state.reportStatusFilter)}
            </select>
            <select class="select" data-report-citation-filter>
              ${selectOption("引用验证", state.reportCitationFilter)}
              ${selectOption("已验证", state.reportCitationFilter)}
              ${selectOption("待验证", state.reportCitationFilter)}
            </select>
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>报告名称</th><th>类型</th><th>关联作品</th><th>年份</th><th>学校</th><th>引用验证</th><th>状态</th><th>更新时间</th><th>操作</th></tr></thead>
            <tbody>
              ${pageReports.length ? pageReports.map((item) => `
                <tr data-report-row="${item.id}">
                  <td>${item.type === "compare" ? "↔" : "▤"} ${escapeHtml(item.title)}</td>
                  <td>${item.type === "compare" ? "比对报告" : "项目分析"}</td>
                  <td>${item.type === "compare" ? `${escapeHtml(item.left)} ↔ ${escapeHtml(item.right)}` : escapeHtml(item.project || item.title)}</td>
                  <td>${escapeHtml(yearValue(item))}</td>
                  <td>${escapeHtml(schoolValue(item))}</td>
                  <td class="score">${pct(item.citationRate)}</td>
                  <td><span class="status ${statusClass(item.status)}">${escapeHtml(item.status)}</span></td>
                  <td>${fmtDate(item.updatedAt)}</td>
                  <td>${reportActions(item, item.type)}</td>
                </tr>
              `).join("") : `<tr><td colspan="9"><div class="empty">服务器报告库为空。将项目分析 MD 放入 describe、比对报告 MD 放入 compare 后，这里会显示真实报告。</div></td></tr>`}
            </tbody>
          </table>
        </div>
        ${pagination(filteredReports.length, pageSize, state.reportsPage, "data-reports-page")}
      </article>
    </section>
  `;
}

function selectOption(value, selected) {
  return `<option value="${escapeHtml(value)}" ${value === selected ? "selected" : ""}>${escapeHtml(value)}</option>`;
}

function filterReports(reports) {
  let rows = filterByYearSchool(filterByQuery(reports, ["title", "project", "left", "right", "file", "type", "year", "school", "leftYear", "rightYear", "leftSchool", "rightSchool"]));
  if (state.reportTypeFilter === "项目分析") rows = rows.filter((item) => item.type === "describe");
  if (state.reportTypeFilter === "比对报告") rows = rows.filter((item) => item.type === "compare");
  if (state.reportStatusFilter !== "全部状态") rows = rows.filter((item) => item.status === state.reportStatusFilter);
  if (state.reportCitationFilter === "已验证") rows = rows.filter((item) => item.citationRate !== null && item.citationRate !== undefined);
  if (state.reportCitationFilter === "待验证") rows = rows.filter((item) => item.citationRate === null || item.citationRate === undefined);
  return rows;
}

function uploadCard(type, title, desc, prompt, btn) {
  return `
    <article class="card card-pad">
      <h2 class="card-title">${title}</h2>
      <p style="color:var(--muted); font-weight:700">${desc}</p>
      <div class="dropzone" data-drop="${type}">
        <div>
          <div class="upload-cloud">☁</div>
          <h4>${prompt}</h4>
          <button class="btn btn-outline" data-upload="${type}">${btn}</button>
          <p>支持 .md，单文件不超过 20MB</p>
        </div>
      </div>
    </article>
  `;
}

function statLine(icon, label, value) {
  return `<div class="stat-line"><span class="stat-icon">${icon}</span><span>${label}</span><strong>${value}</strong></div>`;
}

function uploadStrip(type, text) {
  return `
    <div class="upload-strip" data-drop="${type}">
      <div class="upload-cloud">☁</div>
      <div><h4>${text}</h4><p>支持 .md 文件，单个文件不超过 20MB</p></div>
      <button class="btn btn-outline" data-upload="${type}">查看更新方式</button>
    </div>
  `;
}

function filterByQuery(items, keys) {
  const q = state.query.trim().toLowerCase();
  if (!q) return items;
  return items.filter((item) => keys.some((key) => String(item[key] || "").toLowerCase().includes(q)));
}

async function uploadFile(type, file) {
  if (state.staticMode) {
    toast("静态部署模式下不能在线写入文件；请把 Markdown 提交到 GitHub 后由 Cloudflare 重新部署。");
    return;
  }
  if (!file) return;
  if (!file.name.toLowerCase().endsWith(".md")) {
    toast("请选择 Markdown (.md) 文件");
    return;
  }
  if (file.size > 20 * 1024 * 1024) {
    toast("单个 Markdown 文件不能超过 20MB");
    return;
  }
  const content = await file.text();
  const res = await fetch("/api/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, fileName: file.name, content })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "上传失败" }));
    toast(err.error || "上传失败");
    return;
  }
  toast(`${file.name} 已保存到 ${type === "compare" ? "compare" : "describe"} 目录`);
  await loadReports();
  openPage(type === "compare" ? "reports" : "analysis");
}

async function previewReport(type, file) {
  let res = await fetch(`/api/report?type=${encodeURIComponent(type)}&name=${encodeURIComponent(file)}`);
  if (!res.ok) {
    res = await fetch(staticReportUrl(type, file));
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
    const nav = event.target.closest("[data-page]");
    if (nav) openPage(nav.dataset.page);

    const jump = event.target.closest("[data-page-jump]");
    if (jump) openPage(jump.dataset.pageJump);

    const upload = event.target.closest("[data-upload]");
    if (upload) {
      if (state.staticMode) {
        toast("Cloudflare 静态站点不能在线上传；更新 Markdown 后推送 GitHub，Cloudflare 会自动重新部署。");
        return;
      }
      const type = upload.dataset.upload;
      $(`#${type}-file`).click();
    }

    const preview = event.target.closest("[data-preview]");
    if (preview) {
      const [type, ...name] = preview.dataset.preview.split(":");
      previewReport(type, name.join(":"));
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

    const rowC = event.target.closest("[data-select-compare]");
    if (rowC && !event.target.closest("button,a")) {
      const id = rowC.dataset.selectCompare;
      state.selectedCompare = allCompare().find((x) => x.id === id) || state.selectedCompare;
      renderCompare();
    }

    const comparePage = event.target.closest("[data-compare-page]");
    if (comparePage) {
      const rows = filterCompareRows();
      const totalPages = Math.max(1, Math.ceil(rows.length / 10));
      const target = comparePage.dataset.comparePage;
      if (target === "prev") state.comparePage -= 1;
      else if (target === "next") state.comparePage += 1;
      else state.comparePage = Number(target);
      state.comparePage = Math.min(Math.max(1, state.comparePage), totalPages);
      renderCompare();
    }

    const reportsPage = event.target.closest("[data-reports-page]");
    if (reportsPage) {
      const reports = [...state.reports.describe, ...state.reports.compare];
      const totalPages = Math.max(1, Math.ceil(filterReports(reports).length / 10));
      const target = reportsPage.dataset.reportsPage;
      if (target === "prev") state.reportsPage -= 1;
      else if (target === "next") state.reportsPage += 1;
      else state.reportsPage = Number(target);
      state.reportsPage = Math.min(Math.max(1, state.reportsPage), totalPages);
      renderReports();
    }

  });

  document.addEventListener("input", (event) => {
    if (event.target.matches("[data-search]")) {
      state.query = event.target.value;
      state.analysisPage = 1;
      state.comparePage = 1;
      state.reportsPage = 1;
      render();
    }
  });

  document.addEventListener("change", (event) => {
    if (event.target.matches("[data-year-filter]")) {
      state.yearFilter = event.target.value;
      state.analysisPage = 1;
      state.comparePage = 1;
      state.reportsPage = 1;
      render();
    }
    if (event.target.matches("[data-school-filter]")) {
      state.schoolFilter = event.target.value;
      state.analysisPage = 1;
      state.comparePage = 1;
      state.reportsPage = 1;
      render();
    }
    if (event.target.matches("[data-family-filter]")) {
      state.familyFilter = event.target.value;
      state.analysisPage = 1;
      renderAnalysis();
    }
    if (event.target.matches("[data-compare-left-filter]")) {
      state.compareLeftFilter = event.target.value;
      state.compareRightFilter = COMPARE_RIGHT_ALL;
      state.selectedCompare = null;
      state.comparePage = 1;
      renderCompare();
    }
    if (event.target.matches("[data-compare-right-filter]")) {
      state.compareRightFilter = event.target.value;
      state.selectedCompare = null;
      state.comparePage = 1;
      renderCompare();
    }
    if (event.target.matches("[data-report-type-filter]")) {
      state.reportTypeFilter = event.target.value;
      state.reportsPage = 1;
      renderReports();
    }
    if (event.target.matches("[data-report-status-filter]")) {
      state.reportStatusFilter = event.target.value;
      state.reportsPage = 1;
      renderReports();
    }
    if (event.target.matches("[data-report-citation-filter]")) {
      state.reportCitationFilter = event.target.value;
      state.reportsPage = 1;
      renderReports();
    }
  });

  $("#describe-file").addEventListener("change", (event) => {
    uploadFile("describe", event.target.files[0]);
    event.target.value = "";
  });

  $("#compare-file").addEventListener("change", (event) => {
    uploadFile("compare", event.target.files[0]);
    event.target.value = "";
  });

  document.addEventListener("dragover", (event) => {
    const dz = event.target.closest("[data-drop]");
    if (!dz) return;
    event.preventDefault();
    dz.classList.add("dragging");
  });

  document.addEventListener("dragleave", (event) => {
    const dz = event.target.closest("[data-drop]");
    if (dz) dz.classList.remove("dragging");
  });

  document.addEventListener("drop", (event) => {
    const dz = event.target.closest("[data-drop]");
    if (!dz) return;
    event.preventDefault();
    dz.classList.remove("dragging");
    uploadFile(dz.dataset.drop, event.dataTransfer.files[0]);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      $("#preview-modal").classList.remove("show");
      $("#preview-modal").setAttribute("aria-hidden", "true");
    }
  });
}

wireEvents();

window.addEventListener("hashchange", () => {
  const page = location.hash.slice(1);
  if (["home", "analysis", "compare", "reports"].includes(page)) {
    openPage(page);
  }
});

const initialPage = location.hash.slice(1);
if (["home", "analysis", "compare", "reports"].includes(initialPage)) {
  state.page = initialPage;
}

loadReports().then(() => openPage(state.page));
