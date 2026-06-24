const fs = require("fs");
const path = require("path");
const vm = require("vm");
const assert = require("assert");

const appPath = path.join(__dirname, "..", "public", "app.js");
const source = fs.readFileSync(appPath, "utf8");
const appWithoutBootstrap = source.slice(0, source.indexOf("\nwireEvents();"));

const nodes = {
  "#page-reports": { innerHTML: "" }
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

const testCode = `
${appWithoutBootstrap}

state.reports.describe = Array.from({ length: 8 }, (_, index) => ({
  id: "describe:item-" + (index + 1),
  type: "describe",
  file: "describe-" + (index + 1) + ".md",
  title: "Describe-" + (index + 1),
  project: "DescribeProject-" + (index + 1),
  family: "Family",
  status: "已发布",
  citationRate: 100,
  updatedAt: "2026-06-23T00:00:00.000Z"
}));

state.reports.compare = Array.from({ length: 12 }, (_, index) => ({
  id: "compare:item-" + (index + 1),
  type: "compare",
  file: "compare-" + (index + 1) + ".md",
  title: "Compare-" + (index + 1),
  left: "Left-" + (index + 1),
  right: "Right-" + (index + 1),
  score: 1 - index / 100,
  status: "已发布",
  citationRate: 100,
  updatedAt: "2026-06-23T00:00:00.000Z"
}));

state.reportsPage = 1;
state.reportTypeFilter = "全部类型";
renderReports();
globalThis.firstPageHtml = document.querySelector("#page-reports").innerHTML;

state.reportsPage = 2;
renderReports();
globalThis.secondPageHtml = document.querySelector("#page-reports").innerHTML;

state.reportsPage = 1;
state.reportTypeFilter = "项目分析";
renderReports();
globalThis.describeOnlyHtml = document.querySelector("#page-reports").innerHTML;

state.reportTypeFilter = "比对报告";
renderReports();
globalThis.compareOnlyHtml = document.querySelector("#page-reports").innerHTML;
`;

vm.runInContext(testCode, context);

function rowCount(html) {
  return html.match(/data-report-row=/g)?.length || 0;
}

assert.strictEqual(rowCount(context.firstPageHtml), 10, "first reports page should render 10 rows");
assert.strictEqual(rowCount(context.secondPageHtml), 10, "second reports page should render 10 rows");
assert.match(context.firstPageHtml, /Describe-1/);
assert.doesNotMatch(context.firstPageHtml, /Compare-12/);
assert.match(context.secondPageHtml, /Compare-12/);
assert.match(context.firstPageHtml, /共 20 条，显示 1-10/);
assert.match(context.secondPageHtml, /共 20 条，显示 11-20/);

assert.strictEqual(rowCount(context.describeOnlyHtml), 8, "describe filter should render 8 rows");
assert.match(context.describeOnlyHtml, /项目分析/);
assert.doesNotMatch(context.describeOnlyHtml, /比对报告<\/td>/);

assert.strictEqual(rowCount(context.compareOnlyHtml), 10, "compare filter should render first 10 compare rows");
assert.match(context.compareOnlyHtml, /比对报告/);
assert.doesNotMatch(context.compareOnlyHtml, /项目分析<\/td>/);
