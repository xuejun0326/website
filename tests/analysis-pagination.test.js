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
    querySelector(selector) {
      if (!nodes[selector]) nodes[selector] = { innerHTML: "" };
      return nodes[selector];
    },
    querySelectorAll() {
      return [];
    },
    addEventListener() {}
  },
  location: { hash: "" },
  history: { replaceState() {} },
  URL
};

vm.createContext(context);

const testCode = `
${appWithoutBootstrap}

state.reports.describe = Array.from({ length: 23 }, (_, index) => ({
  id: "describe:item-" + (index + 1),
  type: "describe",
  file: "describe-" + (index + 1) + ".md",
  title: "Describe-" + (index + 1),
  project: "DescribeProject-" + (index + 1),
  year: "2026",
  school: "School",
  family: "Family",
  status: "已发布",
  risk: "正常",
  citationRate: 100,
  updatedAt: "2026-06-23T00:00:00.000Z"
}));

state.analysisPage = 1;
renderAnalysis();
globalThis.firstPageHtml = document.querySelector("#page-analysis").innerHTML;

state.analysisPage = 2;
renderAnalysis();
globalThis.secondPageHtml = document.querySelector("#page-analysis").innerHTML;

state.analysisPage = 3;
renderAnalysis();
globalThis.thirdPageHtml = document.querySelector("#page-analysis").innerHTML;
`;

vm.runInContext(testCode, context);

function rowCount(html) {
  return html.match(/data-select-describe=/g)?.length || 0;
}

assert.strictEqual(rowCount(context.firstPageHtml), 10, "first analysis page should render 10 rows");
assert.strictEqual(rowCount(context.secondPageHtml), 10, "second analysis page should render 10 rows");
assert.strictEqual(rowCount(context.thirdPageHtml), 3, "third analysis page should render remaining rows");
assert.match(context.firstPageHtml, /DescribeProject-1/);
assert.doesNotMatch(context.firstPageHtml, /DescribeProject-11/);
assert.match(context.secondPageHtml, /DescribeProject-11/);
assert.match(context.secondPageHtml, /data-analysis-page="next"/);
assert.match(context.secondPageHtml, /共 23 条，显示 11-20/);
assert.match(context.thirdPageHtml, /DescribeProject-23/);
