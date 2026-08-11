const fs = require("fs");
const path = require("path");
const vm = require("vm");
const assert = require("assert");

const appPath = path.join(__dirname, "..", "public", "app.js");
const source = fs.readFileSync(appPath, "utf8");
const appWithoutBootstrap = source.slice(0, source.indexOf("\nwireEvents();"));

const nodes = {
  "#page-analysis": { innerHTML: "" },
  "#toast": { textContent: "", classList: { add() {}, remove() {} } }
};

const context = {
  console,
  document: {
    baseURI: "https://example.com/",
    querySelector(selector) {
      if (!nodes[selector]) nodes[selector] = { innerHTML: "" };
      return nodes[selector];
    },
    querySelectorAll() {
      return [];
    },
    addEventListener() {}
  },
  fetch: async () => ({
    ok: true,
    async json() {
      return { staticMode: true, describe: [] };
    }
  }),
  URL
};

vm.createContext(context);
vm.runInContext(`
${appWithoutBootstrap}
globalThis.loadPromise = loadReports().then(() => {
  globalThis.detectedStaticMode = state.staticMode;
  globalThis.reportDownloadUrl = downloadUrl("report.md");
});
`, context);

context.loadPromise.then(() => {
  assert.strictEqual(context.detectedStaticMode, true, "static index metadata should enable static mode");
  assert.strictEqual(context.reportDownloadUrl, "/describe/report.md");
});
