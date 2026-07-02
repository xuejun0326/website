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
const compareCount = fs.readdirSync(path.join(root, "compare")).filter((file) => file.endsWith(".md")).length;

assert.ok(fs.existsSync(path.join(dist, "index.html")), "dist should contain index.html");
assert.ok(fs.existsSync(path.join(dist, "app.js")), "dist should contain app.js");
assert.ok(fs.existsSync(path.join(dist, "styles.css")), "dist should contain styles.css");
assert.strictEqual(reports.describe.length, describeCount, "static build should index all describe reports");
assert.strictEqual(reports.compare.length, compareCount, "static build should index all compare reports");

for (const item of reports.describe) {
  assert.ok(fs.existsSync(path.join(dist, "describe", item.file)), `missing describe asset: ${item.file}`);
}

for (const item of reports.compare) {
  assert.ok(fs.existsSync(path.join(dist, "compare", item.file)), `missing compare asset: ${item.file}`);
}
