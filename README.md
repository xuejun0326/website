# OSKAG Kernel Analysis Site

面向内核赛道作品分析与历年作品比对的报告发布网站。站点采用服务器端 Markdown 报告库模式，启动后自动索引 `describe/` 与 `compare/` 目录中的报告，评审方打开网址即可直接浏览、预览和下载。

## 本地运行

```bash
npm start
```

默认访问：

```text
http://localhost:4173
```

## 目录说明

```text
public/      前端页面、样式和交互逻辑
server.js    Node.js 报告索引与静态资源服务
describe/    单个作品分析 Markdown
compare/     作品对比 Markdown
tests/       前端行为回归测试
```

## 测试

```bash
npm test
```

## Cloudflare Pages 部署

连接 GitHub 仓库后，Cloudflare Pages 使用以下配置：

```text
Build command: npm run build
Build output directory: dist
Root directory: /
```

构建脚本会生成静态发布目录 `dist/`，其中包含：

```text
api/reports.json   静态报告索引
describe/*.md      项目分析 Markdown
compare/*.md       比对报告 Markdown
```

Cloudflare 静态部署模式下，线上页面不能直接在线写入 Markdown。新增或修改报告时，把 `.md` 文件提交到 GitHub 的 `describe/` 或 `compare/` 目录，Cloudflare 会自动重新部署。

仓库也提供了 `wrangler.toml`：

```toml
[assets]
directory = "./dist"
```

如果使用 Workers 部署，部署命令填写：

```bash
npx wrangler deploy
```

Wrangler 会从该配置读取静态发布目录 `dist`。

## GitHub Pages 部署

仓库包含 `.github/workflows/pages.yml`。每次推送到 `main` 后，GitHub Actions 会自动执行：

```bash
npm run build
```

并把 `dist/` 发布到 GitHub Pages。

首次启用时，在 GitHub 仓库进入：

```text
Settings -> Pages -> Build and deployment -> Source
```

选择：

```text
GitHub Actions
```

保存后重新运行 `Deploy GitHub Pages` workflow。

## 部署

服务器安装 Node.js 18+ 后：

```bash
npm install
npm start
```

长期运行建议使用 `pm2`：

```bash
npm install -g pm2
pm2 start server.js --name oskag-site
pm2 save
```
