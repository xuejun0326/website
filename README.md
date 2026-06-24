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
