const fs = require("fs");
const path = require("path");
const assert = require("assert");

const root = path.join(__dirname, "..");
const index = fs.readFileSync(path.join(root, "public", "index.html"), "utf8");
const app = fs.readFileSync(path.join(root, "public", "app.js"), "utf8");
const server = fs.readFileSync(path.join(root, "server.js"), "utf8");
const build = fs.readFileSync(path.join(root, "scripts", "build-static.js"), "utf8");

assert.match(index, /id="page-analysis"/);
assert.doesNotMatch(index, /id="page-home"/);
assert.doesNotMatch(index, /id="page-compare"/);
assert.doesNotMatch(index, /<nav\b/);

assert.match(app, /<h1 class="page-title">作品分析<\/h1>/);
assert.doesNotMatch(app, /function renderHome\b/);
assert.doesNotMatch(app, /function renderCompare\b/);
assert.doesNotMatch(app, /selectedCompare|comparePage|compareLeftFilter|compareRightFilter/);
assert.doesNotMatch(app, /\["home", "analysis", "compare"\]/);
assert.doesNotMatch(app, /leftYear|rightYear|leftSchool|rightSchool/);

assert.doesNotMatch(server, /COMPARE_DIR|type === "compare"/);
assert.doesNotMatch(build, /COMPARE_DIR|readGroup\("compare"/);
assert.strictEqual(fs.existsSync(path.join(root, "compare")), false, "compare report directory should be removed");
