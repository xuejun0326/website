# Analysis-Only Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the home and comparison experiences completely so the site contains only a page named "作品分析".

**Architecture:** Keep the existing native HTML/CSS/JavaScript analysis table and Markdown preview flow. Remove comparison reports and every comparison branch from the browser, Node server, static builder, tests, documentation, and repository data. The remaining API returns only the `describe` report group.

**Tech Stack:** Node.js 18+, native browser JavaScript, HTML, CSS, Markdown files.

---

### Task 1: Specify the analysis-only structure

**Files:**
- Create: `tests/analysis-only.test.js`
- Modify: `package.json`

- [x] **Step 1: Write the failing test**

Create assertions that require one `page-analysis` section, the title "作品分析", no home or compare page, no compare directory, and no compare parser/build constants.

- [x] **Step 2: Run test to verify it fails**

Run: `node tests/analysis-only.test.js`

Expected: FAIL because `page-home`, `page-compare`, compare code, and `compare/` still exist.

### Task 2: Reduce the browser to one page

**Files:**
- Modify: `public/index.html`
- Modify: `public/app.js`
- Modify: `public/styles.css`

- [x] **Step 1: Remove home and compare markup and navigation**

Keep the brand, the analysis container, Markdown preview modal, and toast. Rename all visible "今年作品分析" labels to "作品分析".

- [x] **Step 2: Remove home/compare state, renderers, filters, pagination, and hash routing**

Load `{ describe: [] }`, render the analysis page directly, and retain analysis search, filters, pagination, preview, and download behavior.

- [x] **Step 3: Remove CSS used only by home and compare**

Delete metric, compare picker/detail/progress, redundant navigation, and unused single-page layout rules while preserving analysis table and modal styling.

### Task 3: Remove comparison data and backend support

**Files:**
- Delete: `compare/*.md`
- Modify: `server.js`
- Modify: `scripts/build-static.js`
- Delete: `tests/compare-pagination.test.js`
- Modify: `tests/static-build.test.js`

- [x] **Step 1: Delete comparison reports and test**

Remove the tracked `compare/` directory contents and compare-specific regression test.

- [x] **Step 2: Simplify dynamic indexing**

Remove `COMPARE_DIR`, compare metadata inference, compare upload/download branching, and return only `{ describe }` from `/api/reports`.

- [x] **Step 3: Simplify static indexing**

Copy only `public/` and `describe/`, and generate `dist/api/reports.json` with a `describe` array only.

### Task 4: Update documentation and verify

**Files:**
- Modify: `README.md`
- Modify: `package.json`

- [x] **Step 1: Update user-facing documentation and test command**

Describe the site as a single作品分析 report browser and remove compare directory/deployment references.

- [x] **Step 2: Run verification**

Run: `npm test`

Expected: all analysis-only, pagination, and static-build tests exit with code 0.

Run: `node --check public/app.js`, `node --check server.js`, and `node --check scripts/build-static.js`.

Expected: all syntax checks exit with code 0.

- [ ] **Step 3: Commit**

Run: `git add -A` and `git commit -m "Remove home and comparison pages"`.
