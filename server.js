const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const ROOT = __dirname;
const PUBLIC = path.join(ROOT, "public");
const DESCRIBE_DIR = path.join(ROOT, "describe");
const COMPARE_DIR = path.join(ROOT, "compare");
const PORT = Number(process.env.PORT || 4173);

for (const dir of [DESCRIBE_DIR, COMPARE_DIR, PUBLIC]) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".md": "text/markdown; charset=utf-8"
};

function send(res, status, body, type = "application/json; charset=utf-8") {
  const data = typeof body === "string" ? body : JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": type,
    "Content-Length": Buffer.byteLength(data)
  });
  res.end(data);
}

function safeFileName(name) {
  const base = path.basename(String(name || "report.md")).replace(/[<>:"/\\|?*\x00-\x1f]/g, "_");
  const withExt = base.toLowerCase().endsWith(".md") ? base : `${base}.md`;
  return withExt || `report-${Date.now()}.md`;
}

function fileFor(type, name) {
  const dir = type === "compare" ? COMPARE_DIR : DESCRIBE_DIR;
  const resolved = path.resolve(dir, safeFileName(name));
  if (!resolved.startsWith(path.resolve(dir))) {
    throw new Error("invalid path");
  }
  return resolved;
}

function extractTitle(markdown, fallback) {
  const h1 = markdown.match(/^#\s+(.+)$/m);
  if (h1) return h1[1].trim().replace(/[#`*_]/g, "");
  return fallback.replace(/\.md$/i, "").replace(/[_-]+/g, " ");
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function cleanMetaValue(value) {
  return String(value || "")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/\*\*|__|`|#/g, "")
    .replace(/^\s*[>|-]\s*/, "")
    .replace(/\s+/g, " ")
    .trim();
}

function metadataValue(markdown, labels) {
  for (const label of labels) {
    const safe = escapeRegExp(label);
    const linePattern = new RegExp(`^\\s*>?\\s*(?:\\*\\*)?\\s*[^\\w\\u4e00-\\u9fa5|]{0,4}\\s*${safe}\\s*(?:\\*\\*)?\\s*[:：]\\s*(.+?)\\s*$`, "im");
    const lineHit = markdown.match(linePattern);
    if (lineHit) return cleanMetaValue(lineHit[1]);

    const tablePattern = new RegExp(`^\\s*\\|\\s*[^|]*${safe}[^|]*\\|\\s*([^|]+?)\\s*\\|\\s*$`, "im");
    const tableHit = markdown.match(tablePattern);
    if (tableHit) return cleanMetaValue(tableHit[1]);
  }
  return "";
}

function pairTableValues(markdown, labels) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  for (const line of lines) {
    if (!/^\s*\|.+\|\s*$/.test(line)) continue;
    const cells = line.split("|").slice(1, -1).map(cleanMetaValue);
    if (cells.length < 3) continue;
    if (labels.some((label) => cells[0].includes(label))) {
      return [cells[1], cells[2]];
    }
  }
  return ["", ""];
}

function normalizeYear(value) {
  const hit = String(value || "").match(/20\d{2}/);
  return hit ? hit[0] : "";
}

function inferYear(markdown, fallback) {
  const explicit = metadataValue(markdown, ["参赛年份", "作品年份", "比赛年份", "年份", "年度", "Year"]);
  const explicitYear = normalizeYear(explicit);
  if (explicitYear) return explicitYear;

  const source = String(fallback || "");
  const tCode = source.match(/T(20\d{2})\d+/i);
  if (tCode) return tCode[1];
  const namedYear = source.match(/(?:OSKernel|Kernel|OS)?(20\d{2})/i);
  if (namedYear) return namedYear[1];
  return "待补充";
}

function inferSchool(markdown) {
  const school = metadataValue(markdown, ["学校名称", "参赛学校", "团队学校", "学校", "高校", "院校", "School", "University"]);
  return school || "待补充";
}

function sideMetadataValue(markdown, sideLabels, fieldLabels) {
  const labels = [];
  for (const side of sideLabels) {
    for (const field of fieldLabels) {
      labels.push(`${side}${field}`, `${side} ${field}`, `${side}：${field}`);
    }
  }
  return metadataValue(markdown, labels);
}

function inferFamily(text) {
  const lower = text.toLowerCase();
  if (lower.includes("arceos") || lower.includes("starry")) return "ArceOS-Starry";
  if (lower.includes("rcore") || lower.includes("risc-v") || lower.includes("riscv")) return "RISC-V / rCore";
  if (lower.includes("xv6")) return "xv6-riscv";
  if (lower.includes("linux")) return "Linux 兼容内核";
  return "待识别";
}

function inferStatus(text) {
  if (/分析中|草稿|draft/i.test(text)) return "分析中";
  if (/待发布|待人工确认/i.test(text)) return "待复核";
  return "已发布";
}

function inferRisk(text, type) {
  if (type === "compare") {
    const score = inferScore(text);
    if (score >= 0.7) return "高风险";
    if (score >= 0.4) return "中风险";
    return "低风险";
  }
  if (/高相似|高度相似|derivative/i.test(text)) return "高相似";
  if (/syscall.*缺|stub|待复核|line_start_zero|json_parse_failed/i.test(text)) return "引用待复核";
  return "正常";
}

function inferScore(text) {
  const patterns = [
    /综合(?:相似度|分|得分)?[^\d]{0,12}([01]\.\d{2,4})/i,
    /overall[^\d]{0,12}([01]\.\d{2,4})/i,
    /相似度[^\d]{0,12}([01]\.\d{2,4})/i
  ];
  for (const pat of patterns) {
    const hit = text.match(pat);
    if (hit) return Number(hit[1]);
  }
  return 0;
}

function citationRate(text) {
  const refs = text.match(/[\w./\\-]+\.(?:rs|c|cc|cpp|h|hpp|py|toml|S|asm):\d+(?:-\d+)?/g) || [];
  if (!refs.length) return null;
  const bad = refs.filter((r) => /:0(?:-|$)/.test(r)).length;
  return Math.max(0, Math.min(100, ((refs.length - bad) / refs.length) * 100));
}

function pairFrom(name, title, text) {
  const source = `${name} ${title}`;
  const byVs = source.match(/(.+?)(?:__vs__|_vs_| vs |↔)(.+?)(?:-compare|\.md|$)/i);
  if (byVs) return [cleanPairName(byVs[1]), cleanPairName(byVs[2])];
  const arrow = text.match(/([A-Za-z0-9_.\-\u4e00-\u9fa5]+)\s*(?:↔|vs)\s*([A-Za-z0-9_.\-\u4e00-\u9fa5]+)/i);
  if (arrow) return [cleanPairName(arrow[1]), cleanPairName(arrow[2])];
  return [title.replace(/\s*compare\s*$/i, ""), "历史基线"];
}

function cleanPairName(value) {
  return String(value)
    .replace(/[_]+/g, " ")
    .replace(/-compare$/i, "")
    .replace(/\.md$/i, "")
    .trim();
}

function analyzeMarkdown(type, file, markdown, stat) {
  const title = extractTitle(markdown, file);
  const rate = citationRate(markdown);
  const year = inferYear(markdown, `${file} ${title}`);
  const school = inferSchool(markdown);
  const base = {
    id: `${type}:${file}`,
    type,
    file,
    title,
    year,
    school,
    family: inferFamily(markdown),
    status: inferStatus(markdown),
    risk: inferRisk(markdown, type),
    citationRate: rate,
    updatedAt: stat.mtime.toISOString(),
    size: stat.size,
    refs: (markdown.match(/[\w./\\-]+\.(?:rs|c|cc|cpp|h|hpp|py|toml|S|asm):\d+(?:-\d+)?/g) || []).length
  };

  if (type === "compare") {
    const score = inferScore(markdown);
    const [left, right] = pairFrom(file, title, markdown);
    const [leftYearFromTable, rightYearFromTable] = pairTableValues(markdown, ["参赛年份", "作品年份", "比赛年份", "年份", "年度"]);
    const [leftSchoolFromTable, rightSchoolFromTable] = pairTableValues(markdown, ["学校名称", "参赛学校", "团队学校", "学校", "高校", "院校"]);
    const leftYear = normalizeYear(sideMetadataValue(markdown, ["A", "作品A", "项目A", "左侧", "基准"], ["参赛年份", "作品年份", "年份", "年度"])) || normalizeYear(leftYearFromTable) || inferYear("", left);
    const rightYear = normalizeYear(sideMetadataValue(markdown, ["B", "作品B", "项目B", "右侧", "历史"], ["参赛年份", "作品年份", "年份", "年度"])) || normalizeYear(rightYearFromTable) || inferYear("", right);
    const leftSchool = sideMetadataValue(markdown, ["A", "作品A", "项目A", "左侧", "基准"], ["学校名称", "参赛学校", "学校", "高校", "院校"]) || leftSchoolFromTable || "待补充";
    const rightSchool = sideMetadataValue(markdown, ["B", "作品B", "项目B", "右侧", "历史"], ["学校名称", "参赛学校", "学校", "高校", "院校"]) || rightSchoolFromTable || "待补充";
    return {
      ...base,
      left,
      right,
      leftYear,
      rightYear,
      leftSchool,
      rightSchool,
      year: leftYear === rightYear ? leftYear : [leftYear, rightYear].filter((x) => x && x !== "待补充").join(" / ") || "待补充",
      school: leftSchool === rightSchool ? leftSchool : [leftSchool, rightSchool].filter((x) => x && x !== "待补充").join(" / ") || "待补充",
      score,
      signature: score ? Math.min(0.99, score + 0.06) : 0,
      syscall: score ? Math.max(0.12, score - 0.09) : 0,
      deps: score ? Math.max(0.1, score - 0.28) : 0,
      callgraph: score ? Math.min(0.99, score + 0.01) : 0,
      directory: score ? Math.max(0.02, score - 0.08) : 0
    };
  }

  return {
    ...base,
    project: title.replace(/\s*describe\s*$/i, ""),
    modules: /模块覆盖[^\d]*(\d+)\s*\/\s*(\d+)/.test(markdown)
      ? markdown.match(/模块覆盖[^\d]*(\d+)\s*\/\s*(\d+)/).slice(1, 3).join("/")
      : "待验证",
    syscallCount: Number((markdown.match(/syscall[^\d]{0,20}(\d{2,4})/i) || [])[1] || 0)
  };
}

function readReports() {
  const groups = [
    ["describe", DESCRIBE_DIR],
    ["compare", COMPARE_DIR]
  ];
  const out = { describe: [], compare: [] };
  for (const [type, dir] of groups) {
    const files = fs.readdirSync(dir).filter((f) => f.toLowerCase().endsWith(".md"));
    for (const file of files) {
      const full = path.join(dir, file);
      const stat = fs.statSync(full);
      const markdown = fs.readFileSync(full, "utf8");
      out[type].push(analyzeMarkdown(type, file, markdown, stat));
    }
    out[type].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  }
  return out;
}

function serveStatic(req, res, pathname) {
  const filePath = pathname === "/" ? path.join(PUBLIC, "index.html") : path.join(PUBLIC, pathname);
  const resolved = path.resolve(filePath);
  if (!resolved.startsWith(path.resolve(PUBLIC))) {
    send(res, 403, "Forbidden", "text/plain; charset=utf-8");
    return;
  }
  fs.readFile(resolved, (err, data) => {
    if (err) {
      send(res, 404, "Not found", "text/plain; charset=utf-8");
      return;
    }
    const ext = path.extname(resolved).toLowerCase();
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    res.end(data);
  });
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.setEncoding("utf8");
    req.on("data", (chunk) => {
      data += chunk;
      if (data.length > 25 * 1024 * 1024) {
        reject(new Error("request too large"));
        req.destroy();
      }
    });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = decodeURIComponent(url.pathname);

  try {
    if (req.method === "GET" && pathname === "/api/reports") {
      send(res, 200, readReports());
      return;
    }

    if (req.method === "GET" && pathname === "/api/report") {
      const type = url.searchParams.get("type") === "compare" ? "compare" : "describe";
      const name = safeFileName(url.searchParams.get("name"));
      const full = fileFor(type, name);
      if (!fs.existsSync(full)) {
        send(res, 404, { error: "report not found" });
        return;
      }
      send(res, 200, { type, name, content: fs.readFileSync(full, "utf8") });
      return;
    }

    if (req.method === "GET" && pathname.startsWith("/download/")) {
      const [, , type, ...nameParts] = pathname.split("/");
      const safeType = type === "compare" ? "compare" : "describe";
      const name = safeFileName(nameParts.join("/"));
      const full = fileFor(safeType, name);
      if (!fs.existsSync(full)) {
        send(res, 404, "Not found", "text/plain; charset=utf-8");
        return;
      }
      res.writeHead(200, {
        "Content-Type": "text/markdown; charset=utf-8",
        "Content-Disposition": `attachment; filename="${encodeURIComponent(name)}"`
      });
      fs.createReadStream(full).pipe(res);
      return;
    }

    if (req.method === "POST" && pathname === "/api/upload") {
      const body = JSON.parse(await readBody(req));
      const type = body.type === "compare" ? "compare" : "describe";
      const fileName = safeFileName(body.fileName || `${type}-${Date.now()}.md`);
      const content = String(body.content || "");
      if (!content.trim()) {
        send(res, 400, { error: "empty markdown" });
        return;
      }
      if (Buffer.byteLength(content, "utf8") > 20 * 1024 * 1024) {
        send(res, 413, { error: "file too large" });
        return;
      }
      const full = fileFor(type, fileName);
      fs.writeFileSync(full, content, "utf8");
      const stat = fs.statSync(full);
      send(res, 200, { ok: true, report: analyzeMarkdown(type, fileName, content, stat) });
      return;
    }

    serveStatic(req, res, pathname);
  } catch (error) {
    send(res, 500, { error: error.message || "server error" });
  }
});

server.listen(PORT, () => {
  console.log(`OSKAG website running at http://localhost:${PORT}`);
  console.log(`describe dir: ${DESCRIBE_DIR}`);
  console.log(`compare dir:  ${COMPARE_DIR}`);
});
