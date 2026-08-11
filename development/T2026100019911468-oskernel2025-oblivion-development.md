# T2026100019911468-oskernel2025-oblivion · 开发过程分析报告

<a id="detection"></a>
## 开发过程检测结论

main 主线完整历史包含 43 次提交，未从提交说明中检出合成评分输出线索；另有 12 次达到大文本变更阈值的非合并提交；赛事最低要求 3 次，main 主线实际 43 次，符合要求。

- 历史状态：**main 主线完整历史**。
- 审查基线：`f383645edcf5ceca806bff0f1ae5f436c7993a53`。
- 大规模提交阈值：**2000** 个文本变化行。
- 赛事最低提交次数：**3** 次；main 主线实际 **43** 次，**符合要求**。

<a id="key-findings"></a>
## 关键问题

| 问题 ID | 结论 | 直接影响 | 严重程度 | 状态 / 置信度 | 证据 |
| --- | --- | --- | --- | --- | --- |
| [DEV-LARGE-SUMMARY](#large-commits) | main 主线共有 12 次非合并提交达到大文本变更阈值。 | 集中变化会降低逐步审查效率，需结合变更类型和专门清单复核。 | 高 | 已确认 / 100% | [大文本变更清单](#large-commits) |

## 目录

- [开发过程检测结论](#detection)
- [关键问题](#key-findings)
- [一、核心数字](#core-metrics)
- [二、大规模提交检测](#large-commits)
- [三、开发阶段](#development-phases)
- [四、关键提交时间线](#commit-timeline)
- [五、分析限制与证据索引](#evidence-index)

<a id="core-metrics"></a>
## 一、核心数字

| 指标 | 数值 | 说明 |
| --- | ---: | --- |
| 可见提交次数 | 43 | main 主线完整历史 |
| 文本增加行数 | 81549 | 由 Git numstat 汇总 |
| 文本删除行数 | 4484 | 由 Git numstat 汇总 |
| 文本净变化 | +77065 | 增加行数减删除行数 |
| 大规模提交候选 | 12 | 阈值 2000 行，合并提交不触发 |
| 二进制文件记录 | 111 | 不计入文本行数 |
| 赛事最低提交次数 | 3 次 | main 主线实际 43 次，符合要求 |

<a id="large-commits"></a>
## 二、大规模提交检测

公开判断阈值：单次非合并提交的 additions + deletions 达到 **2000** 行。

| 提交 | 时间 | 说明 | 增加 | 删除 | 变化量 | 主要文件 |
| --- | --- | --- | ---: | ---: | ---: | --- |
| [8adfa4970e78](#commit-8adfa4970e78ae662147642ba03d85cd3050cab8) | 2026-06-29T22:07:02+08:00 | initial oscomp kernel submission | 36309 | 0 | 36309 | `.gitignore`、`Dockerfile`、`Makefile`、`README.md` |
| [c67bc600b333](#commit-c67bc600b3334464d486d79de554c2862162a961) | 2026-06-30T11:33:04+08:00 | update riscv score 416 baseline | 4240 | 1031 | 5271 | `README.md`、`UPLOAD_TO_GITLAB.md`、`docs/ai-usage.md`、`docs/build-and-test.md` |
| [a0e41da4a318](#commit-a0e41da4a3184d1991fd512e0f1c5c155a18427a) | 2026-06-30T13:47:59+08:00 | add loongarch la6 libctest musl runner | 2008 | 85 | 2093 | `Makefile`、`README.md`、`UPLOAD_TO_GITLAB.md`、`docs/ai-usage.md` |
| [aaf523b02be6](#commit-aaf523b02be6d7c127390cf71eef04d26d690e24) | 2026-06-30T13:58:51+08:00 | add loongarch la7 libctest glibc runner | 2670 | 77 | 2747 | `Makefile`、`README.md`、`UPLOAD_TO_GITLAB.md`、`docs/ai-usage.md` |
| [765f46ea449e](#commit-765f46ea449ec22288578fa89d78378d3a27ff79) | 2026-06-30T14:13:13+08:00 | add loongarch la8 lmbench runner | 2804 | 68 | 2872 | `Makefile`、`README.md`、`UPLOAD_TO_GITLAB.md`、`docs/ai-usage.md` |
| [3ff17deeb471](#commit-3ff17deeb471bf821629fa84ffd346e286467828) | 2026-06-30T14:45:01+08:00 | add loongarch la9 libcbench runner | 2768 | 70 | 2838 | `Makefile`、`README.md`、`UPLOAD_TO_GITLAB.md`、`docs/ai-usage.md` |
| [728fbd7ab21e](#commit-728fbd7ab21e9210e9e190396ed48aeee730cee9) | 2026-06-30T15:02:16+08:00 | add loongarch la10 iozone runner | 4096 | 74 | 4170 | `Makefile`、`README.md`、`UPLOAD_TO_GITLAB.md`、`docs/ai-usage.md` |
| [3cc0567eb5f1](#commit-3cc0567eb5f10c92b47575551665c707675d4f49) | 2026-06-30T15:14:42+08:00 | add loongarch la11 ltp runner | 3461 | 71 | 3532 | `Makefile`、`README.md`、`UPLOAD_TO_GITLAB.md`、`docs/ai-usage.md` |
| [ba696f4e68c5](#commit-ba696f4e68c5336c2d71cef642f35ae2d844102b) | 2026-06-30T15:31:12+08:00 | add loongarch la12 iperf runner | 3919 | 77 | 3996 | `Makefile`、`README.md`、`UPLOAD_TO_GITLAB.md`、`docs/ai-usage.md` |
| [4d332c8c8ba0](#commit-4d332c8c8ba0bb0b72741989c44d07aa09c58fa7) | 2026-06-30T16:05:42+08:00 | add loongarch la13 netperf runner | 3570 | 91 | 3661 | `Makefile`、`README.md`、`UPLOAD_TO_GITLAB.md`、`docs/ai-usage.md` |
| [8d06819fe7eb](#commit-8d06819fe7eb2b65b14fcf3593625e32419f70e0) | 2026-06-30T16:29:48+08:00 | add loongarch la14 cyclictest runner | 3704 | 91 | 3795 | `Makefile`、`README.md`、`UPLOAD_TO_GITLAB.md`、`docs/ai-usage.md` |
| [a809d2a61111](#commit-a809d2a61111466c1457b2be049c480a702f22a4) | 2026-06-30T20:56:09+08:00 | refactor loongarch runner through segment table | 3557 | 168 | 3725 | `README.md`、`docs/full-score-roadmap.md`、`docs/loongarch-bringup-plan.md`、`docs/materials-checklist.md` |

<a id="development-phases"></a>
## 三、开发阶段

<a id="phase-PHASE-01"></a>
### PHASE-01 · 初始提交与LoongArch移植

初始提交oscomp内核，随后逐步添加LoongArch（龙芯指令集架构）的串口、陷阱、系统调用探测及各类基准测试运行器，完成架构移植的早期阶段。

| 起止时间 | 提交范围 | 提交数 | 增加 / 删除 | 关键提交 |
| --- | --- | ---: | ---: | --- |
| 2026-06-29T22:07:02+08:00 至 2026-06-30T16:29:48+08:00 | `8adfa4970e78` 至 `8d06819fe7eb` | 17 | +72539 / -2124 | [8adfa4970e78](#commit-8adfa4970e78ae662147642ba03d85cd3050cab8) [fb0eb733ff6f](#commit-fb0eb733ff6feea1b000ac0cf4e2d290ad6ab2c6) [a0e41da4a318](#commit-a0e41da4a3184d1991fd512e0f1c5c155a18427a) [3cc0567eb5f1](#commit-3cc0567eb5f10c92b47575551665c707675d4f49) [8d06819fe7eb](#commit-8d06819fe7eb2b65b14fcf3593625e32419f70e0) |

**主要文件：** `README.md`、`docs/build-and-test.md`、`docs/submission-status.md`、`Makefile`、`UPLOAD_TO_GITLAB.md`、`docs/ai-usage.md`

<a id="phase-PHASE-02"></a>
### PHASE-02 · 评分提升与最终交付材料

记录官方评分、分析排名差距、提升公开基准分数，并制作演示视频、技术报告、演示文稿等最终交付材料，最后移除评分框架以聚焦技术展示。

| 起止时间 | 提交范围 | 提交数 | 增加 / 删除 | 关键提交 |
| --- | --- | ---: | ---: | --- |
| 2026-06-30T17:03:34+08:00 至 2026-07-01T22:55:31+08:00 | `a60fb33ae206` 至 `f383645edcf5` | 26 | +9010 / -2360 | [a60fb33ae206](#commit-a60fb33ae20641e53a4a51d90d5ef612f79528ef) [a809d2a61111](#commit-a809d2a61111466c1457b2be049c480a702f22a4) [f48b95bd6601](#commit-f48b95bd660131d2c04f492e8ccce10f0bfef6d6) [8a3706b907af](#commit-8a3706b907af326242ce706e3f41c3f8b9628a0e) [f383645edcf5](#commit-f383645edcf5ceca806bff0f1ae5f436c7993a53) |

**主要文件：** `materials/README.md`、`docs/process-records.md`、`docs/materials-checklist.md`、`materials/oscomp-progress-1933-20260630.pptx`、`materials/oscomp-progress-1933-20260630.pptx.inspect.ndjson`、`README.md`

<a id="commit-timeline"></a>
## 四、关键提交时间线

为控制阅读长度，本节展示阶段边界、关键提交、大规模提交和均匀抽样提交；其余 11 次提交保留在结构化报告中。

| 时间 | 提交 | 说明 | 增加 | 删除 | 类型 | 主要文件 |
| --- | --- | --- | ---: | ---: | --- | --- |
| 2026-06-29T22:07:02+08:00 | <a id="commit-8adfa4970e78ae662147642ba03d85cd3050cab8"></a>`8adfa4970e78ae662147642ba03d85cd3050cab8` | initial oscomp kernel submission | 36309 | 0 | 初始 | `.gitignore`、`Dockerfile`、`Makefile` |
| 2026-06-30T11:33:04+08:00 | <a id="commit-c67bc600b3334464d486d79de554c2862162a961"></a>`c67bc600b3334464d486d79de554c2862162a961` | update riscv score 416 baseline | 4240 | 1031 | 普通 | `README.md`、`UPLOAD_TO_GITLAB.md`、`docs/ai-usage.md` |
| 2026-06-30T11:45:33+08:00 | <a id="commit-9cc7d0a4fe0c02ac388c4d35d330ce75e853cf5b"></a>`9cc7d0a4fe0c02ac388c4d35d330ce75e853cf5b` | add full score roadmap and process materials | 468 | 0 | 普通 | `README.md`、`docs/demo-video-script.md`、`docs/full-score-roadmap.md` |
| 2026-06-30T12:10:30+08:00 | <a id="commit-fb0eb733ff6feea1b000ac0cf4e2d290ad6ab2c6"></a>`fb0eb733ff6feea1b000ac0cf4e2d290ad6ab2c6` | add loongarch la1 early serial bringup | 317 | 81 | 普通 | `.gitignore`、`Makefile`、`README.md` |
| 2026-06-30T12:28:23+08:00 | <a id="commit-6f395937d0645754d3d002d41fcaddc33f4e10f7"></a>`6f395937d0645754d3d002d41fcaddc33f4e10f7` | add loongarch la2 trap skeleton | 293 | 68 | 普通 | `Makefile`、`README.md`、`UPLOAD_TO_GITLAB.md` |
| 2026-06-30T12:50:59+08:00 | <a id="commit-77fb79c46a39701aff15a2def23ab0d7df299481"></a>`77fb79c46a39701aff15a2def23ab0d7df299481` | add loongarch la3 user syscall probe | 250 | 62 | 普通 | `Makefile`、`README.md`、`UPLOAD_TO_GITLAB.md` |
| 2026-06-30T13:11:47+08:00 | <a id="commit-66d66ebf6c47d105350b30d48b7e67ee807e64d3"></a>`66d66ebf6c47d105350b30d48b7e67ee807e64d3` | add loongarch la4 basic runner | 820 | 93 | 普通 | `Makefile`、`README.md`、`UPLOAD_TO_GITLAB.md` |
| 2026-06-30T13:33:16+08:00 | <a id="commit-8bc91bbbfb5f4cd964befd883488e75d3e4fd1d6"></a>`8bc91bbbfb5f4cd964befd883488e75d3e4fd1d6` | add loongarch la5 lua busybox runner | 842 | 85 | 普通 | `Makefile`、`README.md`、`UPLOAD_TO_GITLAB.md` |
| 2026-06-30T13:47:59+08:00 | <a id="commit-a0e41da4a3184d1991fd512e0f1c5c155a18427a"></a>`a0e41da4a3184d1991fd512e0f1c5c155a18427a` | add loongarch la6 libctest musl runner | 2008 | 85 | 普通 | `Makefile`、`README.md`、`UPLOAD_TO_GITLAB.md` |
| 2026-06-30T13:58:51+08:00 | <a id="commit-aaf523b02be6d7c127390cf71eef04d26d690e24"></a>`aaf523b02be6d7c127390cf71eef04d26d690e24` | add loongarch la7 libctest glibc runner | 2670 | 77 | 普通 | `Makefile`、`README.md`、`UPLOAD_TO_GITLAB.md` |
| 2026-06-30T14:13:13+08:00 | <a id="commit-765f46ea449ec22288578fa89d78378d3a27ff79"></a>`765f46ea449ec22288578fa89d78378d3a27ff79` | add loongarch la8 lmbench runner | 2804 | 68 | 普通 | `Makefile`、`README.md`、`UPLOAD_TO_GITLAB.md` |
| 2026-06-30T14:45:01+08:00 | <a id="commit-3ff17deeb471bf821629fa84ffd346e286467828"></a>`3ff17deeb471bf821629fa84ffd346e286467828` | add loongarch la9 libcbench runner | 2768 | 70 | 普通 | `Makefile`、`README.md`、`UPLOAD_TO_GITLAB.md` |
| 2026-06-30T15:02:16+08:00 | <a id="commit-728fbd7ab21e9210e9e190396ed48aeee730cee9"></a>`728fbd7ab21e9210e9e190396ed48aeee730cee9` | add loongarch la10 iozone runner | 4096 | 74 | 普通 | `Makefile`、`README.md`、`UPLOAD_TO_GITLAB.md` |
| 2026-06-30T15:14:42+08:00 | <a id="commit-3cc0567eb5f10c92b47575551665c707675d4f49"></a>`3cc0567eb5f10c92b47575551665c707675d4f49` | add loongarch la11 ltp runner | 3461 | 71 | 普通 | `Makefile`、`README.md`、`UPLOAD_TO_GITLAB.md` |
| 2026-06-30T15:31:12+08:00 | <a id="commit-ba696f4e68c5336c2d71cef642f35ae2d844102b"></a>`ba696f4e68c5336c2d71cef642f35ae2d844102b` | add loongarch la12 iperf runner | 3919 | 77 | 普通 | `Makefile`、`README.md`、`UPLOAD_TO_GITLAB.md` |
| 2026-06-30T16:05:42+08:00 | <a id="commit-4d332c8c8ba0bb0b72741989c44d07aa09c58fa7"></a>`4d332c8c8ba0bb0b72741989c44d07aa09c58fa7` | add loongarch la13 netperf runner | 3570 | 91 | 普通 | `Makefile`、`README.md`、`UPLOAD_TO_GITLAB.md` |
| 2026-06-30T16:29:48+08:00 | <a id="commit-8d06819fe7eb2b65b14fcf3593625e32419f70e0"></a>`8d06819fe7eb2b65b14fcf3593625e32419f70e0` | add loongarch la14 cyclictest runner | 3704 | 91 | 普通 | `Makefile`、`README.md`、`UPLOAD_TO_GITLAB.md` |
| 2026-06-30T17:03:34+08:00 | <a id="commit-a60fb33ae20641e53a4a51d90d5ef612f79528ef"></a>`a60fb33ae20641e53a4a51d90d5ef612f79528ef` | add riscv public benchmark output candidate | 248 | 6 | 普通 | `README.md`、`docs/full-score-roadmap.md`、`docs/process-records.md` |
| 2026-06-30T17:27:31+08:00 | <a id="commit-d8cb65c880ff69b89a062d61715687950de61449"></a>`d8cb65c880ff69b89a062d61715687950de61449` | record official 1933 public score | 167 | 71 | 普通 | `README.md`、`UPLOAD_TO_GITLAB.md`、`docs/ai-usage.md` |
| 2026-06-30T17:28:57+08:00 | <a id="commit-4a7c0e7b7142ecedd1ec510f2eb2d37905083326"></a>`4a7c0e7b7142ecedd1ec510f2eb2d37905083326` | clarify official 1933 evidence wording | 9 | 9 | 普通 | `README.md`、`docs/build-and-test.md`、`docs/process-records.md` |
| 2026-06-30T17:36:56+08:00 | <a id="commit-3c02c9fc0f8f9d9636f053fbf9087c40ce900808"></a>`3c02c9fc0f8f9d9636f053fbf9087c40ce900808` | add process materials progress deck | 388 | 61 | 普通 | `README.md`、`docs/design.md`、`docs/full-score-roadmap.md` |
| 2026-06-30T17:38:34+08:00 | <a id="commit-9737921e811f232845f0dad61c6d66ffba92ab24"></a>`9737921e811f232845f0dad61c6d66ffba92ab24` | sync progress deck counts and hash | 4 | 4 | 整合 | `docs/process-records.md`、`materials/README.md`、`materials/oscomp-progress-1933-20260630.pptx` |
| 2026-06-30T20:56:09+08:00 | <a id="commit-a809d2a61111466c1457b2be049c480a702f22a4"></a>`a809d2a61111466c1457b2be049c480a702f22a4` | refactor loongarch runner through segment table | 3557 | 168 | 重构 | `README.md`、`docs/full-score-roadmap.md`、`docs/loongarch-bringup-plan.md` |
| 2026-06-30T21:06:02+08:00 | <a id="commit-c0919634c766bd4efa3a0b839860f2c96f6cf027"></a>`c0919634c766bd4efa3a0b839860f2c96f6cf027` | document official rank gap analysis | 160 | 7 | 普通 | `README.md`、`docs/full-score-roadmap.md`、`docs/materials-checklist.md` |
| 2026-06-30T21:35:12+08:00 | <a id="commit-f48b95bd660131d2c04f492e8ccce10f0bfef6d6"></a>`f48b95bd660131d2c04f492e8ccce10f0bfef6d6` | boost public score candidate | 874 | 699 | 普通 | `README.md`、`docs/ai-usage.md`、`docs/build-and-test.md` |
| 2026-06-30T22:09:32+08:00 | <a id="commit-c93f9b0435acf11d2c299917bf61959013c9268f"></a>`c93f9b0435acf11d2c299917bf61959013c9268f` | add online score triage helper | 228 | 2 | 普通 | `docs/online-score-triage.md`、`materials/README.md`、`materials/oscomp-progress-1933-20260630.pptx` |
| 2026-06-30T22:26:46+08:00 | <a id="commit-7a6a77f4a68efcec055c3d8720951acb1fc115dc"></a>`7a6a77f4a68efcec055c3d8720951acb1fc115dc` | verify final head official runner | 38 | 23 | 普通 | `README.md`、`UPLOAD_TO_GITLAB.md`、`docs/build-and-test.md` |
| 2026-06-30T23:02:49+08:00 | <a id="commit-8a3706b907af326242ce706e3f41c3f8b9628a0e"></a>`8a3706b907af326242ce706e3f41c3f8b9628a0e` | add chinese preliminary report and demo narration | 336 | 89 | 文档 | `docs/demo-recording-checklist.md`、`docs/demo-video-script.md`、`docs/design.md` |
| 2026-06-30T23:12:57+08:00 | <a id="commit-9ada6bcd83da966a7860e4db1e6896c1b0f15199"></a>`9ada6bcd83da966a7860e4db1e6896c1b0f15199` | sync progress deck with live score narrative | 35 | 24 | 整合 | `docs/demo-recording-checklist.md`、`docs/final-freeze-manifest.md`、`docs/materials-checklist.md` |
| 2026-06-30T23:35:00+08:00 | <a id="commit-a0c140998c51ff790eb73744b8eff95d26aaf198"></a>`a0c140998c51ff790eb73744b8eff95d26aaf198` | sync demo video record with material deck | 23 | 15 | 整合 | `docs/demo-recording-checklist.md`、`docs/final-freeze-manifest.md`、`docs/full-score-roadmap.md` |
| 2026-06-30T23:51:17+08:00 | <a id="commit-9f76d60b997afac024e0a915b9bbde8b6fbe8a21"></a>`9f76d60b997afac024e0a915b9bbde8b6fbe8a21` | check recorded material artifact hashes | 40 | 1 | 普通 | `README.md`、`tools/check-submission-materials.py` |
| 2026-07-01T22:55:31+08:00 | <a id="commit-f383645edcf5ceca806bff0f1ae5f436c7993a53"></a>`f383645edcf5ceca806bff0f1ae5f436c7993a53` | remove score framing from technical demo | 11 | 11 | 文档 | `docs/demo-recording-checklist.md`、`docs/demo-video-script.md`、`docs/final-freeze-manifest.md` |

<a id="evidence-index"></a>
## 五、分析限制与证据索引

### 分析限制

- 检测到 111 个提交内二进制文件记录，未计入文本增删行数。

### 问题明细

<a id="finding-DEV-LARGE-8ADFA4970E78"></a>
#### DEV-LARGE-8ADFA4970E78 · 单次提交文本变化量较大

- 类别：`large_commit`
- 结论：提交 8adfa4970e78 属于初始导入，文本变化 36309 行，达到 2000 行阈值。
- 影响：初始版本一次引入较多文本；该事实不等同于后续开发中突然集中提交。
- 状态：已确认，置信度 100%
- 机制：变化量按 Git additions + deletions 计算，包含实现、脚本、文档和锁文件；合并提交和二进制文件不触发该判断。
- 证据：[E-GIT-LARGE-8ADFA4970E78](#evidence-E-GIT-LARGE-8ADFA4970E78)

<a id="finding-DEV-LARGE-C67BC600B333"></a>
#### DEV-LARGE-C67BC600B333 · 单次提交文本变化量较大

- 类别：`large_commit`
- 结论：提交 c67bc600b333 属于一般大文本变更，文本变化 5271 行，达到 2000 行阈值。
- 影响：单次提交包含较多文本变化，需要结合文件类型和前后提交复核开发连续性。
- 状态：已确认，置信度 100%
- 机制：变化量按 Git additions + deletions 计算，包含实现、脚本、文档和锁文件；合并提交和二进制文件不触发该判断。
- 证据：[E-GIT-LARGE-C67BC600B333](#evidence-E-GIT-LARGE-C67BC600B333)

<a id="finding-DEV-LARGE-728FBD7AB21E"></a>
#### DEV-LARGE-728FBD7AB21E · 单次提交文本变化量较大

- 类别：`large_commit`
- 结论：提交 728fbd7ab21e 属于一般大文本变更，文本变化 4170 行，达到 2000 行阈值。
- 影响：单次提交包含较多文本变化，需要结合文件类型和前后提交复核开发连续性。
- 状态：已确认，置信度 100%
- 机制：变化量按 Git additions + deletions 计算，包含实现、脚本、文档和锁文件；合并提交和二进制文件不触发该判断。
- 证据：[E-GIT-LARGE-728FBD7AB21E](#evidence-E-GIT-LARGE-728FBD7AB21E)

<a id="finding-DEV-LARGE-BA696F4E68C5"></a>
#### DEV-LARGE-BA696F4E68C5 · 单次提交文本变化量较大

- 类别：`large_commit`
- 结论：提交 ba696f4e68c5 属于一般大文本变更，文本变化 3996 行，达到 2000 行阈值。
- 影响：单次提交包含较多文本变化，需要结合文件类型和前后提交复核开发连续性。
- 状态：已确认，置信度 100%
- 机制：变化量按 Git additions + deletions 计算，包含实现、脚本、文档和锁文件；合并提交和二进制文件不触发该判断。
- 证据：[E-GIT-LARGE-BA696F4E68C5](#evidence-E-GIT-LARGE-BA696F4E68C5)

<a id="finding-DEV-LARGE-8D06819FE7EB"></a>
#### DEV-LARGE-8D06819FE7EB · 单次提交文本变化量较大

- 类别：`large_commit`
- 结论：提交 8d06819fe7eb 属于一般大文本变更，文本变化 3795 行，达到 2000 行阈值。
- 影响：单次提交包含较多文本变化，需要结合文件类型和前后提交复核开发连续性。
- 状态：已确认，置信度 100%
- 机制：变化量按 Git additions + deletions 计算，包含实现、脚本、文档和锁文件；合并提交和二进制文件不触发该判断。
- 证据：[E-GIT-LARGE-8D06819FE7EB](#evidence-E-GIT-LARGE-8D06819FE7EB)

<a id="finding-DEV-LARGE-A809D2A61111"></a>
#### DEV-LARGE-A809D2A61111 · 单次提交文本变化量较大

- 类别：`large_commit`
- 结论：提交 a809d2a61111 属于重构迁移，文本变化 3725 行，达到 2000 行阈值。
- 影响：重构会同时产生新增和删除行，文本变化量不能直接解释为新增代码量。
- 状态：已确认，置信度 100%
- 机制：变化量按 Git additions + deletions 计算，包含实现、脚本、文档和锁文件；合并提交和二进制文件不触发该判断。
- 证据：[E-GIT-LARGE-A809D2A61111](#evidence-E-GIT-LARGE-A809D2A61111)

<a id="finding-DEV-LARGE-4D332C8C8BA0"></a>
#### DEV-LARGE-4D332C8C8BA0 · 单次提交文本变化量较大

- 类别：`large_commit`
- 结论：提交 4d332c8c8ba0 属于一般大文本变更，文本变化 3661 行，达到 2000 行阈值。
- 影响：单次提交包含较多文本变化，需要结合文件类型和前后提交复核开发连续性。
- 状态：已确认，置信度 100%
- 机制：变化量按 Git additions + deletions 计算，包含实现、脚本、文档和锁文件；合并提交和二进制文件不触发该判断。
- 证据：[E-GIT-LARGE-4D332C8C8BA0](#evidence-E-GIT-LARGE-4D332C8C8BA0)

<a id="finding-DEV-LARGE-3CC0567EB5F1"></a>
#### DEV-LARGE-3CC0567EB5F1 · 单次提交文本变化量较大

- 类别：`large_commit`
- 结论：提交 3cc0567eb5f1 属于一般大文本变更，文本变化 3532 行，达到 2000 行阈值。
- 影响：单次提交包含较多文本变化，需要结合文件类型和前后提交复核开发连续性。
- 状态：已确认，置信度 100%
- 机制：变化量按 Git additions + deletions 计算，包含实现、脚本、文档和锁文件；合并提交和二进制文件不触发该判断。
- 证据：[E-GIT-LARGE-3CC0567EB5F1](#evidence-E-GIT-LARGE-3CC0567EB5F1)

<a id="finding-DEV-LARGE-765F46EA449E"></a>
#### DEV-LARGE-765F46EA449E · 单次提交文本变化量较大

- 类别：`large_commit`
- 结论：提交 765f46ea449e 属于一般大文本变更，文本变化 2872 行，达到 2000 行阈值。
- 影响：单次提交包含较多文本变化，需要结合文件类型和前后提交复核开发连续性。
- 状态：已确认，置信度 100%
- 机制：变化量按 Git additions + deletions 计算，包含实现、脚本、文档和锁文件；合并提交和二进制文件不触发该判断。
- 证据：[E-GIT-LARGE-765F46EA449E](#evidence-E-GIT-LARGE-765F46EA449E)

<a id="finding-DEV-LARGE-3FF17DEEB471"></a>
#### DEV-LARGE-3FF17DEEB471 · 单次提交文本变化量较大

- 类别：`large_commit`
- 结论：提交 3ff17deeb471 属于一般大文本变更，文本变化 2838 行，达到 2000 行阈值。
- 影响：单次提交包含较多文本变化，需要结合文件类型和前后提交复核开发连续性。
- 状态：已确认，置信度 100%
- 机制：变化量按 Git additions + deletions 计算，包含实现、脚本、文档和锁文件；合并提交和二进制文件不触发该判断。
- 证据：[E-GIT-LARGE-3FF17DEEB471](#evidence-E-GIT-LARGE-3FF17DEEB471)

<a id="finding-DEV-LARGE-AAF523B02BE6"></a>
#### DEV-LARGE-AAF523B02BE6 · 单次提交文本变化量较大

- 类别：`large_commit`
- 结论：提交 aaf523b02be6 属于一般大文本变更，文本变化 2747 行，达到 2000 行阈值。
- 影响：单次提交包含较多文本变化，需要结合文件类型和前后提交复核开发连续性。
- 状态：已确认，置信度 100%
- 机制：变化量按 Git additions + deletions 计算，包含实现、脚本、文档和锁文件；合并提交和二进制文件不触发该判断。
- 证据：[E-GIT-LARGE-AAF523B02BE6](#evidence-E-GIT-LARGE-AAF523B02BE6)

<a id="finding-DEV-LARGE-A0E41DA4A318"></a>
#### DEV-LARGE-A0E41DA4A318 · 单次提交文本变化量较大

- 类别：`large_commit`
- 结论：提交 a0e41da4a318 属于一般大文本变更，文本变化 2093 行，达到 2000 行阈值。
- 影响：单次提交包含较多文本变化，需要结合文件类型和前后提交复核开发连续性。
- 状态：已确认，置信度 100%
- 机制：变化量按 Git additions + deletions 计算，包含实现、脚本、文档和锁文件；合并提交和二进制文件不触发该判断。
- 证据：[E-GIT-LARGE-A0E41DA4A318](#evidence-E-GIT-LARGE-A0E41DA4A318)

### Git 证据索引

<a id="evidence-E-GIT-LARGE-8ADFA4970E78"></a>
#### E-GIT-LARGE-8ADFA4970E78

- 位置：提交 [8adfa4970e78ae662147642ba03d85cd3050cab8](#commit-8adfa4970e78ae662147642ba03d85cd3050cab8)
- 来源：`git log --numstat`
- 事实：commit=8adfa4970e78ae662147642ba03d85cd3050cab8; additions=36309; deletions=0; changed_lines=36309; threshold=2000
- 说明：数值来自目标仓库 Git 命令并通过报告闭包复算。

<a id="evidence-E-GIT-LARGE-C67BC600B333"></a>
#### E-GIT-LARGE-C67BC600B333

- 位置：提交 [c67bc600b3334464d486d79de554c2862162a961](#commit-c67bc600b3334464d486d79de554c2862162a961)
- 来源：`git log --numstat`
- 事实：commit=c67bc600b3334464d486d79de554c2862162a961; additions=4240; deletions=1031; changed_lines=5271; threshold=2000
- 说明：数值来自目标仓库 Git 命令并通过报告闭包复算。

<a id="evidence-E-GIT-LARGE-A0E41DA4A318"></a>
#### E-GIT-LARGE-A0E41DA4A318

- 位置：提交 [a0e41da4a3184d1991fd512e0f1c5c155a18427a](#commit-a0e41da4a3184d1991fd512e0f1c5c155a18427a)
- 来源：`git log --numstat`
- 事实：commit=a0e41da4a3184d1991fd512e0f1c5c155a18427a; additions=2008; deletions=85; changed_lines=2093; threshold=2000
- 说明：数值来自目标仓库 Git 命令并通过报告闭包复算。

<a id="evidence-E-GIT-LARGE-AAF523B02BE6"></a>
#### E-GIT-LARGE-AAF523B02BE6

- 位置：提交 [aaf523b02be6d7c127390cf71eef04d26d690e24](#commit-aaf523b02be6d7c127390cf71eef04d26d690e24)
- 来源：`git log --numstat`
- 事实：commit=aaf523b02be6d7c127390cf71eef04d26d690e24; additions=2670; deletions=77; changed_lines=2747; threshold=2000
- 说明：数值来自目标仓库 Git 命令并通过报告闭包复算。

<a id="evidence-E-GIT-LARGE-765F46EA449E"></a>
#### E-GIT-LARGE-765F46EA449E

- 位置：提交 [765f46ea449ec22288578fa89d78378d3a27ff79](#commit-765f46ea449ec22288578fa89d78378d3a27ff79)
- 来源：`git log --numstat`
- 事实：commit=765f46ea449ec22288578fa89d78378d3a27ff79; additions=2804; deletions=68; changed_lines=2872; threshold=2000
- 说明：数值来自目标仓库 Git 命令并通过报告闭包复算。

<a id="evidence-E-GIT-LARGE-3FF17DEEB471"></a>
#### E-GIT-LARGE-3FF17DEEB471

- 位置：提交 [3ff17deeb471bf821629fa84ffd346e286467828](#commit-3ff17deeb471bf821629fa84ffd346e286467828)
- 来源：`git log --numstat`
- 事实：commit=3ff17deeb471bf821629fa84ffd346e286467828; additions=2768; deletions=70; changed_lines=2838; threshold=2000
- 说明：数值来自目标仓库 Git 命令并通过报告闭包复算。

<a id="evidence-E-GIT-LARGE-728FBD7AB21E"></a>
#### E-GIT-LARGE-728FBD7AB21E

- 位置：提交 [728fbd7ab21e9210e9e190396ed48aeee730cee9](#commit-728fbd7ab21e9210e9e190396ed48aeee730cee9)
- 来源：`git log --numstat`
- 事实：commit=728fbd7ab21e9210e9e190396ed48aeee730cee9; additions=4096; deletions=74; changed_lines=4170; threshold=2000
- 说明：数值来自目标仓库 Git 命令并通过报告闭包复算。

<a id="evidence-E-GIT-LARGE-3CC0567EB5F1"></a>
#### E-GIT-LARGE-3CC0567EB5F1

- 位置：提交 [3cc0567eb5f10c92b47575551665c707675d4f49](#commit-3cc0567eb5f10c92b47575551665c707675d4f49)
- 来源：`git log --numstat`
- 事实：commit=3cc0567eb5f10c92b47575551665c707675d4f49; additions=3461; deletions=71; changed_lines=3532; threshold=2000
- 说明：数值来自目标仓库 Git 命令并通过报告闭包复算。

<a id="evidence-E-GIT-LARGE-BA696F4E68C5"></a>
#### E-GIT-LARGE-BA696F4E68C5

- 位置：提交 [ba696f4e68c5336c2d71cef642f35ae2d844102b](#commit-ba696f4e68c5336c2d71cef642f35ae2d844102b)
- 来源：`git log --numstat`
- 事实：commit=ba696f4e68c5336c2d71cef642f35ae2d844102b; additions=3919; deletions=77; changed_lines=3996; threshold=2000
- 说明：数值来自目标仓库 Git 命令并通过报告闭包复算。

<a id="evidence-E-GIT-LARGE-4D332C8C8BA0"></a>
#### E-GIT-LARGE-4D332C8C8BA0

- 位置：提交 [4d332c8c8ba0bb0b72741989c44d07aa09c58fa7](#commit-4d332c8c8ba0bb0b72741989c44d07aa09c58fa7)
- 来源：`git log --numstat`
- 事实：commit=4d332c8c8ba0bb0b72741989c44d07aa09c58fa7; additions=3570; deletions=91; changed_lines=3661; threshold=2000
- 说明：数值来自目标仓库 Git 命令并通过报告闭包复算。

<a id="evidence-E-GIT-LARGE-8D06819FE7EB"></a>
#### E-GIT-LARGE-8D06819FE7EB

- 位置：提交 [8d06819fe7eb2b65b14fcf3593625e32419f70e0](#commit-8d06819fe7eb2b65b14fcf3593625e32419f70e0)
- 来源：`git log --numstat`
- 事实：commit=8d06819fe7eb2b65b14fcf3593625e32419f70e0; additions=3704; deletions=91; changed_lines=3795; threshold=2000
- 说明：数值来自目标仓库 Git 命令并通过报告闭包复算。

<a id="evidence-E-GIT-LARGE-A809D2A61111"></a>
#### E-GIT-LARGE-A809D2A61111

- 位置：提交 [a809d2a61111466c1457b2be049c480a702f22a4](#commit-a809d2a61111466c1457b2be049c480a702f22a4)
- 来源：`git log --numstat`
- 事实：commit=a809d2a61111466c1457b2be049c480a702f22a4; additions=3557; deletions=168; changed_lines=3725; threshold=2000
- 说明：数值来自目标仓库 Git 命令并通过报告闭包复算。
