const assert = require("assert");
const fs = require("fs");
const net = require("net");
const os = require("os");
const path = require("path");
const { spawn } = require("child_process");

const root = path.join(__dirname, "..");
const reportRoot = fs.mkdtempSync(path.join(os.tmpdir(), "oskag-report-routes-"));
const pdfName = "__路由测试-summary.pdf";
const markdownName = "__路由测试-development.md";
const pdfPath = path.join(reportRoot, "summary", pdfName);
const markdownPath = path.join(reportRoot, "development", markdownName);

function availablePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
  });
}

async function waitForServer(url, child) {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    if (child.exitCode !== null) throw new Error(`server exited with code ${child.exitCode}`);
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  throw new Error("server did not start in time");
}

(async () => {
  fs.mkdirSync(path.dirname(pdfPath), { recursive: true });
  fs.mkdirSync(path.dirname(markdownPath), { recursive: true });
  fs.writeFileSync(pdfPath, Buffer.from("%PDF-1.4\nroute test\n"));
  fs.writeFileSync(markdownPath, "# 开发过程分析\n\n路由测试。\n", "utf8");

  const port = await availablePort();
  const child = spawn(process.execPath, ["server.js"], {
    cwd: root,
    env: { ...process.env, PORT: String(port), REPORT_ROOT: reportRoot },
    stdio: "ignore"
  });

  try {
    const base = `http://127.0.0.1:${port}`;
    await waitForServer(`${base}/api/reports`, child);

    const viewResponse = await fetch(`${base}/files/summary/${encodeURIComponent(pdfName)}`);
    assert.strictEqual(viewResponse.status, 200);
    assert.strictEqual(viewResponse.headers.get("content-type"), "application/pdf");
    assert.strictEqual(viewResponse.headers.get("content-disposition"), null);
    assert.ok((await viewResponse.arrayBuffer()).byteLength > 0);

    const downloadResponse = await fetch(`${base}/download/summary/${encodeURIComponent(pdfName)}`);
    assert.strictEqual(downloadResponse.status, 200);
    assert.match(downloadResponse.headers.get("content-disposition") || "", /^attachment;/);
    await downloadResponse.arrayBuffer();

    const markdownResponse = await fetch(
      `${base}/api/report?kind=development&name=${encodeURIComponent(markdownName)}`
    );
    assert.strictEqual(markdownResponse.status, 200);
    const markdown = await markdownResponse.json();
    assert.strictEqual(markdown.kind, "development");
    assert.match(markdown.content, /开发过程分析/);
  } finally {
    if (child.exitCode === null) {
      child.kill();
      await new Promise((resolve) => child.once("exit", resolve));
    }
    fs.rmSync(reportRoot, { recursive: true, force: true, maxRetries: 5, retryDelay: 50 });
  }
})().catch((error) => {
  fs.rmSync(reportRoot, { recursive: true, force: true, maxRetries: 5, retryDelay: 50 });
  console.error(error);
  process.exitCode = 1;
});
