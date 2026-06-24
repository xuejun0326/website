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

assert.ok(fs.existsSync(path.join(dist, "index.html")), "dist should contain index.html");
assert.ok(fs.existsSync(path.join(dist, "app.js")), "dist should contain app.js");
assert.ok(fs.existsSync(path.join(dist, "styles.css")), "dist should contain styles.css");
assert.strictEqual(reports.describe.length, 8, "static build should index 8 describe reports");
assert.strictEqual(reports.compare.length, 12, "static build should index 12 compare reports");

for (const item of reports.describe) {
  assert.ok(fs.existsSync(path.join(dist, "describe", item.file)), `missing describe asset: ${item.file}`);
}

for (const item of reports.compare) {
  assert.ok(fs.existsSync(path.join(dist, "compare", item.file)), `missing compare asset: ${item.file}`);
}
