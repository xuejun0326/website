const fs = require("fs");
const path = require("path");
const vm = require("vm");
const assert = require("assert");

const appPath = path.join(__dirname, "..", "public", "app.js");
const source = fs.readFileSync(appPath, "utf8");
const appWithoutBootstrap = source.slice(0, source.indexOf("\nwireEvents();"));

const nodes = {
  "#page-analysis": { innerHTML: "" }
};

const context = {
  console,
  document: {
    baseURI: "https://example.com/website/",
    querySelector(selector) {
      if (!nodes[selector]) nodes[selector] = { innerHTML: "" };
      return nodes[selector];
    },
    querySelectorAll() {
      return [];
    },
    addEventListener() {}
  },
  URL
};

vm.createContext(context);
vm.runInContext(`
${appWithoutBootstrap}
state.reports.describe = [{
  id: "describe:demo-describe.md",
  file: "demo-describe.md",
  project: "Demo",
  title: "Demo",
  year: "2026",
  school: "School",
  family: "Family",
  status: "已发布",
  citationRate: 100,
  updatedAt: "2026-08-11T00:00:00.000Z",
  files: {
    summary: { kind: "summary", format: "pdf", file: "demo-summary.pdf", available: true },
    development: { kind: "development", format: "md", file: "demo-development.md", available: true },
    description: { kind: "describe", format: "md", file: "demo-describe.md", available: true },
    comparison: { kind: "compare", format: "md", file: "demo-compare.md", available: true }
  }
}];
state.staticMode = false;
renderAnalysis();
globalThis.reportHtml = document.querySelector("#page-analysis").innerHTML;
`, context);

assert.match(context.reportHtml, /<th>摘要 PDF<\/th>/);
assert.match(context.reportHtml, /<th>开发过程分析 MD<\/th>/);
assert.match(context.reportHtml, /<th>作品描述 MD<\/th>/);
assert.match(context.reportHtml, /<th>对比报告 MD<\/th>/);
assert.match(context.reportHtml, /href="\/files\/summary\/demo-summary\.pdf"/);
assert.match(context.reportHtml, /href="\/download\/summary\/demo-summary\.pdf"/);
assert.match(context.reportHtml, /data-preview="development:demo-development\.md"/);
assert.match(context.reportHtml, /data-preview="describe:demo-describe\.md"/);
assert.match(context.reportHtml, /data-preview="compare:demo-compare\.md"/);

vm.runInContext(`
state.reports.describe[0].files.summary.available = false;
renderAnalysis();
globalThis.missingHtml = document.querySelector("#page-analysis").innerHTML;
`, context);

assert.match(context.missingHtml, /file-missing">待补充<\/span>/);
