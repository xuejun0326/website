# OSKAG 作品分析站点

面向内核赛道作品分析的报告发布网站。站点以 `describe/` 中的作品描述为作品索引，并为每份作品展示摘要、开发过程分析、作品描述和对比报告四类文件。

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
public/          作品分析页面、样式和交互逻辑
summary/         摘要 PDF
development/     开发过程分析 Markdown
describe/        作品描述 Markdown，同时作为作品索引
compare/         对比报告 Markdown
server.js        Node.js 报告索引与文件服务
tests/           行为回归测试
```

## 文件命名

同一份作品的四个文件使用相同的作品 ID。例如作品描述文件为 `demo-describe.md` 时，其余文件名为：

```text
summary/demo-summary.pdf
development/demo-development.md
describe/demo-describe.md
compare/demo-compare.md
```

只要 `describe/` 中存在作品描述，页面就会显示该作品。其他文件尚未放入对应目录时，页面显示“待补充”。

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
api/reports.json      静态报告索引
summary/*.pdf         摘要 PDF
development/*.md      开发过程分析 Markdown
describe/*.md         作品描述 Markdown
compare/*.md          对比报告 Markdown
```

Cloudflare 静态部署模式下，线上页面不能直接写入报告文件。新增或修改报告时，把文件放入对应目录并提交到 GitHub，Cloudflare 会自动重新部署。

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
