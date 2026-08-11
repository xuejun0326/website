const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");
const assert = require("assert");

const root = path.join(__dirname, "..");
const dist = path.join(root, "dist");

childProcess.execFileSync(process.execPath, [path.join(root, "scripts", "build-static.js")], {
  cwd: root,
  stdio: "inherit"
});

const reportsPath = path.join(dist, "api", "reports.json");
const reports = JSON.parse(fs.readFileSync(reportsPath, "utf8"));
const describeCount = fs.readdirSync(path.join(root, "describe")).filter((file) => file.endsWith(".md")).length;

assert.ok(fs.existsSync(path.join(dist, "index.html")), "dist should contain index.html");
assert.ok(fs.existsSync(path.join(dist, "app.js")), "dist should contain app.js");
assert.ok(fs.existsSync(path.join(dist, "styles.css")), "dist should contain styles.css");
assert.strictEqual(reports.staticMode, true, "static index should identify static deployment mode");
assert.strictEqual(reports.describe.length, describeCount, "static build should index all describe reports");
assert.strictEqual(Object.hasOwn(reports, "compare"), false, "static index should not contain compare reports");
assert.ok(fs.existsSync(path.join(dist, "summary")), "dist should contain summary files");
assert.ok(fs.existsSync(path.join(dist, "development")), "dist should contain development files");
assert.ok(fs.existsSync(path.join(dist, "compare")), "dist should contain per-project comparison files");

for (const item of reports.describe) {
  assert.ok(fs.existsSync(path.join(dist, "describe", item.file)), `missing describe asset: ${item.file}`);
  const base = item.file.replace(/-describe\.md$/i, "").replace(/\.md$/i, "");
  assert.deepStrictEqual(Object.keys(item.files), ["summary", "development", "description", "comparison"]);
  assert.strictEqual(item.files.summary.file, `${base}-summary.pdf`);
  assert.strictEqual(item.files.development.file, `${base}-development.md`);
  assert.strictEqual(item.files.description.file, item.file);
  assert.strictEqual(item.files.description.available, true);
  assert.strictEqual(item.files.comparison.file, `${base}-compare.md`);
}
