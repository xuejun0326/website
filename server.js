const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const ROOT = __dirname;
const REPORT_ROOT = process.env.REPORT_ROOT ? path.resolve(process.env.REPORT_ROOT) : ROOT;
const PUBLIC = path.join(ROOT, "public");
const SUMMARY_DIR = path.join(REPORT_ROOT, "summary");
const DEVELOPMENT_DIR = path.join(REPORT_ROOT, "development");
const DESCRIBE_DIR = path.join(REPORT_ROOT, "describe");
const COMPARE_DIR = path.join(REPORT_ROOT, "compare");
const REPORT_DIRS = {
  summary: SUMMARY_DIR,
  development: DEVELOPMENT_DIR,
  describe: DESCRIBE_DIR,
  compare: COMPARE_DIR
};
const PORT = Number(process.env.PORT || 4173);

for (const dir of [...Object.values(REPORT_DIRS), PUBLIC]) {
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

function safeFileName(name, kind = "describe") {
  const extension = kind === "summary" ? ".pdf" : ".md";
  const fallback = `report${extension}`;
  const base = path.basename(String(name || fallback)).replace(/[<>:"/\\|?*\x00-\x1f]/g, "_");
  const withExt = base.toLowerCase().endsWith(extension) ? base : `${base}${extension}`;
  return withExt || `report-${Date.now()}${extension}`;
}

function fileFor(kind, name) {
  const dir = REPORT_DIRS[kind];
  if (!dir) throw new Error("invalid report kind");
  const resolved = path.resolve(dir, safeFileName(name, kind));
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

function inferRisk(text) {
  if (/高相似|高度相似|derivative/i.test(text)) return "高相似";
  if (/syscall.*缺|stub|待复核|line_start_zero|json_parse_failed/i.test(text)) return "引用待复核";
  return "正常";
}

function sendReportFile(res, kind, name, download = false) {
  if (!REPORT_DIRS[kind]) {
    send(res, 400, { error: "invalid report kind" });
    return;
  }
  const safeName = safeFileName(name, kind);
  const full = fileFor(kind, safeName);
  if (!fs.existsSync(full)) {
    send(res, 404, "Not found", "text/plain; charset=utf-8");
    return;
  }
  const contentType = kind === "summary" ? "application/pdf" : "text/markdown; charset=utf-8";
  const headers = { "Content-Type": contentType };
  if (download) {
    headers["Content-Disposition"] = `attachment; filename*=UTF-8''${encodeURIComponent(safeName)}`;
  }
  res.writeHead(200, headers);
  fs.createReadStream(full).pipe(res);
}

function citationRate(text) {
  const refs = text.match(/[\w./\\-]+\.(?:rs|c|cc|cpp|h|hpp|py|toml|S|asm):\d+(?:-\d+)?/g) || [];
  if (!refs.length) return null;
  const bad = refs.filter((r) => /:0(?:-|$)/.test(r)).length;
  return Math.max(0, Math.min(100, ((refs.length - bad) / refs.length) * 100));
}

function reportFilesFor(file) {
  const base = file.replace(/-describe\.md$/i, "").replace(/\.md$/i, "");
  const entry = (kind, format, name) => ({
    kind,
    format,
    file: name,
    available: fs.existsSync(path.join(REPORT_DIRS[kind], name))
  });
  return {
    summary: entry("summary", "pdf", `${base}-summary.pdf`),
    development: entry("development", "md", `${base}-development.md`),
    description: entry("describe", "md", file),
    comparison: entry("compare", "md", `${base}-compare.md`)
  };
}

function analyzeMarkdown(file, markdown, stat) {
  const title = extractTitle(markdown, file);
  const rate = citationRate(markdown);
  const year = inferYear(markdown, `${file} ${title}`);
  const school = inferSchool(markdown);
  return {
    id: `describe:${file}`,
    type: "describe",
    file,
    title,
    year,
    school,
    family: inferFamily(markdown),
    status: inferStatus(markdown),
    risk: inferRisk(markdown),
    citationRate: rate,
    updatedAt: stat.mtime.toISOString(),
    size: stat.size,
    refs: (markdown.match(/[\w./\\-]+\.(?:rs|c|cc|cpp|h|hpp|py|toml|S|asm):\d+(?:-\d+)?/g) || []).length,
    files: reportFilesFor(file),
    project: title.replace(/\s*describe\s*$/i, ""),
    modules: /模块覆盖[^\d]*(\d+)\s*\/\s*(\d+)/.test(markdown)
      ? markdown.match(/模块覆盖[^\d]*(\d+)\s*\/\s*(\d+)/).slice(1, 3).join("/")
      : "待验证",
    syscallCount: Number((markdown.match(/syscall[^\d]{0,20}(\d{2,4})/i) || [])[1] || 0)
  };
}

function readReports() {
  const describe = [];
  const files = fs.readdirSync(DESCRIBE_DIR).filter((file) => file.toLowerCase().endsWith(".md"));
  for (const file of files) {
    const full = path.join(DESCRIBE_DIR, file);
    const stat = fs.statSync(full);
    const markdown = fs.readFileSync(full, "utf8");
    describe.push(analyzeMarkdown(file, markdown, stat));
  }
  describe.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  return { staticMode: false, describe };
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
      const kind = url.searchParams.get("kind") || "describe";
      if (!REPORT_DIRS[kind]) {
        send(res, 400, { error: "invalid report kind" });
        return;
      }
      if (kind === "summary") {
        send(res, 400, { error: "PDF reports use the file URL directly" });
        return;
      }
      const name = safeFileName(url.searchParams.get("name"), kind);
      const full = fileFor(kind, name);
      if (!fs.existsSync(full)) {
        send(res, 404, { error: "report not found" });
        return;
      }
      send(res, 200, { kind, name, content: fs.readFileSync(full, "utf8") });
      return;
    }

    if (req.method === "GET" && (pathname.startsWith("/files/") || pathname.startsWith("/download/"))) {
      const [, action, kind, ...nameParts] = pathname.split("/");
      sendReportFile(res, kind, nameParts.join("/"), action === "download");
      return;
    }

    if (req.method === "POST" && pathname === "/api/upload") {
      const body = JSON.parse(await readBody(req));
      const fileName = safeFileName(body.fileName || `describe-${Date.now()}.md`, "describe");
      const content = String(body.content || "");
      if (!content.trim()) {
        send(res, 400, { error: "empty markdown" });
        return;
      }
      if (Buffer.byteLength(content, "utf8") > 20 * 1024 * 1024) {
        send(res, 413, { error: "file too large" });
        return;
      }
      const full = fileFor("describe", fileName);
      fs.writeFileSync(full, content, "utf8");
      const stat = fs.statSync(full);
      send(res, 200, { ok: true, report: analyzeMarkdown(fileName, content, stat) });
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
});
