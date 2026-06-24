const state = {
  page: "home",
  reports: { describe: [], compare: [] },
  selectedDescribe: null,
  selectedCompare: null,
  comparePage: 1,
  rankFilter: "全部",
  query: "",
  staticMode: false
};

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

function allDescribe() {
  return [...state.reports.describe];
}

function allCompare() {
  const real = state.reports.compare.map((item) => ({
    ...item,
    risk: item.risk || riskByScore(item.score)
  }));
  return real.sort((a, b) => (b.score || 0) - (a.score || 0));
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

async function loadReports() {
  try {
    let res = await fetch("/api/reports");
    if (!res.ok) {
      res = await fetch("/api/reports.json");
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
  renderRanking();
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
      <div class="grid-2">
        <article class="card">
          <div class="card-head">
            <h2 class="card-title">今年作品分析进度</h2>
            <button class="link" data-page-jump="analysis">查看全部 →</button>
          </div>
          ${analysisTable(describe.slice(0, 5), true)}
          <div class="pagination"><span class="spacer"></span><button class="link" data-page-jump="analysis">查看全部作品分析 →</button><span class="spacer"></span></div>
        </article>
        <article class="card">
          <div class="card-head">
            <div><h2 class="card-title">实时相似度排名</h2><p class="eyebrow">Top 5</p></div>
            <button class="link" data-page-jump="ranking">查看全部 →</button>
          </div>
          ${rankingList(compare.slice(0, 5))}
          <div class="pagination"><span class="spacer"></span><button class="link" data-page-jump="ranking">查看完整排名 →</button><span class="spacer"></span></div>
        </article>
      </div>
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
  const colSpan = compact ? 5 : 6;
  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>作品</th>
            <th>内核家族</th>
            <th>状态</th>
            <th>describe 报告</th>
            ${compact ? "<th>风险提示</th>" : "<th>引用合法率</th><th>更新时间</th>"}
          </tr>
        </thead>
        <tbody>
          ${rows.length ? rows.map((item) => `
            <tr class="${state.selectedDescribe?.id === item.id ? "selected" : ""}" data-select-describe="${item.id}">
              <td>${escapeHtml(item.project || item.title)}</td>
              <td>${escapeHtml(item.family || "待识别")}</td>
              <td><span class="status ${statusClass(item.status)}">${escapeHtml(item.status)}</span></td>
              <td>${reportActions(item, "describe")}</td>
              ${compact
                ? `<td><span class="risk ${riskClass(item.risk)}">${escapeHtml(item.risk)}</span></td>`
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
  return `/${type}/${encodeURIComponent(file)}`;
}

function downloadUrl(type, file) {
  return state.staticMode
    ? staticReportUrl(type, file)
    : `/download/${type}/${encodeURIComponent(file)}`;
}

function rankingList(items) {
  if (!items.length) {
    return `<div class="empty">服务器 compare 目录暂无比对报告。报告写入服务器目录后会自动生成实时排名。</div>`;
  }
  return `
    <div class="ranking-list">
      ${items.map((item, index) => `
        <div class="rank-row">
          <span class="rank-no ${index > 2 ? "low" : ""}">${String(index + 1).padStart(2, "0")}</span>
          <strong>${escapeHtml(item.left)}</strong>
          <span>↔</span>
          <span>${escapeHtml(item.right)}</span>
          <span>${num(item.score)}</span>
          <span class="risk ${riskClass(item.risk)}">${riskLabel(item.risk)}</span>
        </div>
      `).join("")}
    </div>
  `;
}

function riskLabel(risk) {
  if (/高/.test(risk)) return "高";
  if (/中/.test(risk)) return "中";
  return "低";
}

function renderAnalysis() {
  const rows = filterByQuery(allDescribe(), ["project", "title", "family"]);
  const selected = state.selectedDescribe || rows[0] || null;
  $("#page-analysis").innerHTML = `
    <section>
      <h1 class="page-title">今年作品分析</h1>
      <p class="subtitle">管理今年参赛作品的 describe 报告、内核家族画像与引用验证结果。</p>
      <div class="toolbar">
        <input class="input" data-search placeholder="搜索作品 / 内核家族" value="${escapeHtml(state.query)}" />
        <select class="select"><option>全部状态</option><option>已发布</option><option>分析中</option><option>待复核</option></select>
        <select class="select"><option>全部家族</option><option>ArceOS-Starry</option><option>RISC-V / rCore</option></select>
        <select class="select"><option>引用验证</option><option>已验证</option><option>待验证</option></select>
        <button class="btn btn-primary" data-upload="describe"><span class="icon">⇧</span>报告更新说明</button>
      </div>
      <div class="grid-detail">
        <article class="card">
          <div class="card-head"><h2 class="card-title">作品列表</h2></div>
          ${analysisTable(rows.slice(0, 8), false)}
          <div class="pagination"><span>共 ${rows.length} 项</span><span class="spacer"></span><button class="page-btn">‹</button><button class="page-btn active">1</button><button class="page-btn">›</button><select class="select" style="width:120px"><option>10 条/页</option></select></div>
        </article>
        <aside class="card card-pad">
          ${selected ? `
          <div style="display:flex; justify-content:space-between; gap:12px; align-items:center">
            <h2 class="card-title">作品摘要</h2>
            <span class="status blue">当前选中</span>
          </div>
          <h3 style="font-size:24px">${escapeHtml(selected.project || selected.title)}</h3>
          <div class="detail-metrics">
            <div class="detail-metric"><span>内核家族</span><strong>${escapeHtml(selected.family)}</strong></div>
            <div class="detail-metric"><span>模块覆盖</span><strong>${escapeHtml(selected.modules || "待验证")}</strong></div>
            <div class="detail-metric"><span>syscall</span><strong>${selected.syscallCount || "待确认"}</strong></div>
            <div class="detail-metric"><span>风险提示</span><strong><span class="risk ${riskClass(selected.risk)}">${escapeHtml(selected.risk)}</span></strong></div>
          </div>
          <h3>关键模块</h3>
          <ul class="module-list">
            ${["boot", "mm", "syscall", "fs"].map((m, i) => `<li><span>${m}</span><span class="${i < 3 ? "score" : ""}">${i < 3 ? "已分析" : "部分验证"}</span></li>`).join("")}
          </ul>
          <h3>开放问题</h3>
          <ul class="issue-list">
            <li>引用待复核</li>
            <li>驱动章节需补充</li>
            <li>syscall stub 比例待确认</li>
          </ul>
          ` : `<h2 class="card-title">作品摘要</h2><div class="empty">服务器 describe 目录暂无可展示作品。报告入库后，这里会显示作品摘要、关键模块和开放问题。</div>`}
        </aside>
      </div>
      ${uploadStrip("describe", "管理员维护入口：追加项目分析 Markdown 到服务器 describe 目录")}
    </section>
  `;
}

function renderCompare() {
  const rows = filterByQuery(allCompare(), ["left", "right", "title"]);
  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  state.comparePage = Math.min(Math.max(1, state.comparePage || 1), totalPages);
  const pageStart = (state.comparePage - 1) * pageSize;
  const pageRows = rows.slice(pageStart, pageStart + pageSize);
  const selected = state.selectedCompare || rows[0] || null;
  $("#page-compare").innerHTML = `
    <section>
      <h1 class="page-title">历年作品比对</h1>
      <p class="subtitle">选择今年作品与历史基线，生成结构化 compare 报告。</p>
      <div class="compare-picker">
        <div class="select-card"><span>选择今年作品：</span><strong>${escapeHtml(selected?.left || "等待入库")}</strong></div>
        <div class="select-card"><span>选择历史作品：</span><strong>${escapeHtml(selected?.right || "等待入库")}</strong></div>
        <button class="btn btn-primary" data-upload="compare"><span class="icon">▤</span>报告更新说明</button>
      </div>
      <p style="color:var(--muted); font-weight:700">ⓘ 综合分由函数签名、系统调用、依赖、调用图、目录结构融合。</p>
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

function progress(label, value) {
  const v = Math.max(0, Math.min(1, Number(value || 0)));
  return `<div class="progress-row"><strong>${label}</strong><div class="bar"><span style="width:${v * 100}%"></span></div><span>${num(v)}</span></div>`;
}

function renderRanking() {
  const all = allCompare();
  const filtered = state.rankFilter === "全部" ? all : all.filter((x) => x.risk === state.rankFilter);
  $("#page-ranking").innerHTML = `
    <section>
      <h1 class="page-title">实时相似度排名</h1>
      <p class="subtitle">按综合相似度动态排序，快速发现需要复核的作品与历史基线。</p>
      <div style="display:flex; justify-content:space-between; align-items:end; gap:24px; flex-wrap:wrap">
        <div class="segment">
          ${["全部", "高风险", "中风险", "低风险"].map((x) => `<button class="${state.rankFilter === x ? "active" : ""}" data-rank-filter="${x}">${x}</button>`).join("")}
        </div>
        <div class="panel-stats">
          <div class="panel-stat"><span>最高分</span><strong style="color:var(--teal)">${num(all[0]?.score || 0)}</strong></div>
          <div class="panel-stat"><span>高风险</span><strong style="color:var(--red)">${all.filter((x) => x.risk === "高风险").length}</strong></div>
          <div class="panel-stat"><span>中风险</span><strong style="color:var(--orange)">${all.filter((x) => x.risk === "中风险").length}</strong></div>
          <div class="panel-stat"><span>低风险</span><strong style="color:var(--blue)">${all.filter((x) => x.risk === "低风险").length}</strong></div>
        </div>
      </div>
      <div class="toolbar compact">
        <input class="input" data-search placeholder="搜索作品或历史基线" value="${escapeHtml(state.query)}" />
        <select class="select"><option>全部家族</option></select>
      </div>
      <div class="grid-ranking">
        <article class="card">
          <div class="table-wrap" style="padding-top:20px">
            <table>
              <thead><tr><th>Rank</th><th>今年作品</th><th>最相似历史作品</th><th>综合分</th><th>syscall</th><th>调用图</th><th>目录</th><th>风险等级</th><th>报告</th></tr></thead>
              <tbody>
                ${filterByQuery(filtered, ["left", "right"]).length ? filterByQuery(filtered, ["left", "right"]).slice(0, 10).map((item, i) => `
                  <tr>
                    <td style="font-weight:900; color:${i < 3 ? "var(--red)" : "var(--ink)"}">${String(i + 1).padStart(2, "0")}</td>
                    <td>${escapeHtml(item.left)}</td>
                    <td>${escapeHtml(item.right)}</td>
                    <td class="score">${num(item.score)}</td>
                    <td>${num(item.syscall)}</td>
                    <td>${num(item.callgraph)}</td>
                    <td>${num(item.directory)}</td>
                    <td><span class="risk ${riskClass(item.risk)}">${riskLabel(item.risk)}</span></td>
                    <td>${reportActions(item, "compare")}</td>
                  </tr>
                `).join("") : `<tr><td colspan="9"><div class="empty">服务器 compare 目录暂无实时排名数据。报告入库后会自动按综合分排序。</div></td></tr>`}
              </tbody>
            </table>
          </div>
          <div class="pagination"><span>共 ${filtered.length} 条</span><span class="spacer"></span><button class="page-btn">‹</button><button class="page-btn active">1</button><button class="page-btn">›</button><select class="select" style="width:120px"><option>10 条/页</option></select></div>
        </article>
        <aside>
          <article class="card card-pad">
            <h2 class="card-title">ⓘ 排名说明</h2>
            <p style="line-height:1.8; color:var(--muted); font-weight:700">综合分由函数签名、系统调用、依赖、调用图、目录结构五类指标融合计算。</p>
            <div class="explain-icons">
              <div class="explain-icon"><strong>{}</strong>函数签名</div>
              <div class="explain-icon"><strong>▹</strong>系统调用</div>
              <div class="explain-icon"><strong>◇</strong>依赖</div>
              <div class="explain-icon"><strong>┬</strong>调用图</div>
              <div class="explain-icon"><strong>□</strong>目录结构</div>
            </div>
          </article>
          <article class="card card-pad" style="margin-top:20px">
            <h2 class="card-title">✓ 复核建议</h2>
            <ul class="issue-list">
              <li>高风险优先人工复核</li>
              <li>中风险检查模块差异</li>
              <li>低风险抽样验证引用</li>
            </ul>
          </article>
        </aside>
      </div>
    </section>
  `;
}

function renderReports() {
  const reports = [...state.reports.describe, ...state.reports.compare];
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
            <input class="input" data-search placeholder="搜索报告 / 作品 / 类型" value="${escapeHtml(state.query)}" />
            <select class="select"><option>全部类型</option><option>项目分析</option><option>比对报告</option></select>
            <select class="select"><option>全部状态</option></select>
            <select class="select"><option>引用验证</option></select>
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>报告名称</th><th>类型</th><th>关联作品</th><th>引用验证</th><th>状态</th><th>更新时间</th><th>操作</th></tr></thead>
            <tbody>
              ${filterByQuery(reports, ["title", "project", "left", "right", "file"]).length ? filterByQuery(reports, ["title", "project", "left", "right", "file"]).map((item) => `
                <tr>
                  <td>${item.type === "compare" ? "↔" : "▤"} ${escapeHtml(item.title)}</td>
                  <td>${item.type === "compare" ? "比对报告" : "项目分析"}</td>
                  <td>${item.type === "compare" ? `${escapeHtml(item.left)} ↔ ${escapeHtml(item.right)}` : escapeHtml(item.project || item.title)}</td>
                  <td class="score">${pct(item.citationRate)}</td>
                  <td><span class="status ${statusClass(item.status)}">${escapeHtml(item.status)}</span></td>
                  <td>${fmtDate(item.updatedAt)}</td>
                  <td>${reportActions(item, item.type)}</td>
                </tr>
              `).join("") : `<tr><td colspan="7"><div class="empty">服务器报告库为空。将项目分析 MD 放入 describe、比对报告 MD 放入 compare 后，这里会显示真实报告。</div></td></tr>`}
            </tbody>
          </table>
        </div>
        <div class="pagination"><span>共 ${reports.length} 条</span><span class="spacer"></span><button class="page-btn">‹</button><button class="page-btn active">1</button><button class="page-btn">2</button><button class="page-btn">3</button><button class="page-btn">›</button><select class="select" style="width:120px"><option>10 条/页</option></select></div>
      </article>
    </section>
  `;
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

    const rowC = event.target.closest("[data-select-compare]");
    if (rowC && !event.target.closest("button,a")) {
      const id = rowC.dataset.selectCompare;
      state.selectedCompare = allCompare().find((x) => x.id === id) || state.selectedCompare;
      renderCompare();
    }

    const comparePage = event.target.closest("[data-compare-page]");
    if (comparePage) {
      const rows = filterByQuery(allCompare(), ["left", "right", "title"]);
      const totalPages = Math.max(1, Math.ceil(rows.length / 10));
      const target = comparePage.dataset.comparePage;
      if (target === "prev") state.comparePage -= 1;
      else if (target === "next") state.comparePage += 1;
      else state.comparePage = Number(target);
      state.comparePage = Math.min(Math.max(1, state.comparePage), totalPages);
      renderCompare();
    }

    const filter = event.target.closest("[data-rank-filter]");
    if (filter) {
      state.rankFilter = filter.dataset.rankFilter;
      renderRanking();
    }
  });

  document.addEventListener("input", (event) => {
    if (event.target.matches("[data-search]")) {
      state.query = event.target.value;
      state.comparePage = 1;
      render();
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
  if (["home", "analysis", "compare", "ranking", "reports"].includes(page)) {
    openPage(page);
  }
});

const initialPage = location.hash.slice(1);
if (["home", "analysis", "compare", "ranking", "reports"].includes(initialPage)) {
  state.page = initialPage;
}

loadReports().then(() => openPage(state.page));
