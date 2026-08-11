const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const DESCRIBE_DIR = path.join(ROOT, "describe");
const DIST = path.join(ROOT, "dist");

function resetDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
}

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const source = path.join(from, entry.name);
    const target = path.join(to, entry.name);
    if (entry.isDirectory()) {
      copyDir(source, target);
    } else {
      fs.copyFileSync(source, target);
    }
  }
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

function citationRate(text) {
  const refs = text.match(/[\w./\\-]+\.(?:rs|c|cc|cpp|h|hpp|py|toml|S|asm):\d+(?:-\d+)?/g) || [];
  if (!refs.length) return null;
  const bad = refs.filter((r) => /:0(?:-|$)/.test(r)).length;
  return Math.max(0, Math.min(100, ((refs.length - bad) / refs.length) * 100));
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
    project: title.replace(/\s*describe\s*$/i, ""),
    modules: /模块覆盖[^\d]*(\d+)\s*\/\s*(\d+)/.test(markdown)
      ? markdown.match(/模块覆盖[^\d]*(\d+)\s*\/\s*(\d+)/).slice(1, 3).join("/")
      : "待验证",
    syscallCount: Number((markdown.match(/syscall[^\d]{0,20}(\d{2,4})/i) || [])[1] || 0)
  };
}

function readGroup(dir) {
  return fs.readdirSync(dir)
    .filter((file) => file.toLowerCase().endsWith(".md"))
    .map((file) => {
      const full = path.join(dir, file);
      return analyzeMarkdown(file, fs.readFileSync(full, "utf8"), fs.statSync(full));
    })
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
}

resetDir(DIST);
copyDir(PUBLIC, DIST);
copyDir(DESCRIBE_DIR, path.join(DIST, "describe"));

const data = {
  staticMode: true,
  describe: readGroup(DESCRIBE_DIR)
};

fs.mkdirSync(path.join(DIST, "api"), { recursive: true });
fs.writeFileSync(path.join(DIST, "api", "reports.json"), JSON.stringify(data, null, 2), "utf8");
console.log(`Built Cloudflare Pages static site: ${DIST}`);
console.log(`describe=${data.describe.length}`);
