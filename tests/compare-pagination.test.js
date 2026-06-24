const fs = require("fs");
const path = require("path");
const vm = require("vm");
const assert = require("assert");

const appPath = path.join(__dirname, "..", "public", "app.js");
const source = fs.readFileSync(appPath, "utf8");
const appWithoutBootstrap = source.slice(0, source.indexOf("\nwireEvents();"));

const nodes = {
  "#page-compare": { innerHTML: "" }
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
  }
};

vm.createContext(context);

const testCode = `
${appWithoutBootstrap}

state.reports.compare = Array.from({ length: 12 }, (_, index) => ({
  id: "compare:item-" + (index + 1),
  type: "compare",
  file: "item-" + (index + 1) + ".md",
  title: "item-" + (index + 1),
  left: "Project-" + (index + 1),
  right: "Base-" + (index + 1),
  score: 1 - index / 100,
  status: "已发布",
  risk: "低风险",
  signature: 0.8,
  syscall: 0.7,
  deps: 0.6,
  callgraph: 0.5,
  directory: 0.4,
  updatedAt: "2026-06-23T00:00:00.000Z"
}));

state.selectedCompare = null;
state.comparePage = 1;
renderCompare();
globalThis.firstPageHtml = document.querySelector("#page-compare").innerHTML;

state.comparePage = 2;
renderCompare();
globalThis.secondPageHtml = document.querySelector("#page-compare").innerHTML;
`;

vm.runInContext(testCode, context);

const firstPageRows = context.firstPageHtml.match(/data-select-compare=/g) || [];
const secondPageRows = context.secondPageHtml.match(/data-select-compare=/g) || [];

assert.strictEqual(firstPageRows.length, 10, "first compare page should render 10 rows");
assert.strictEqual(secondPageRows.length, 2, "second compare page should render remaining 2 rows");
assert.match(context.firstPageHtml, /data-select-compare="compare:item-1"/);
assert.doesNotMatch(context.firstPageHtml, /data-select-compare="compare:item-11"/);
assert.match(context.secondPageHtml, /data-select-compare="compare:item-11"/);
assert.match(context.secondPageHtml, /data-select-compare="compare:item-12"/);
assert.doesNotMatch(context.secondPageHtml, /data-select-compare="compare:item-1"/);
