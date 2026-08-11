# oskernel2021-x · 开发过程分析报告

<a id="detection"></a>
## 开发过程检测结论

main 主线完整历史包含 337 次提交，未从提交说明中检出合成评分输出线索；另有 11 次达到大文本变更阈值的非合并提交；赛事最低要求 3 次，main 主线实际 337 次，符合要求。

- 历史状态：**main 主线完整历史**。
- 审查基线：`a93c01cd3439e4e35d8ee3207fe689027547a9fd`。
- 大规模提交阈值：**2000** 个文本变化行。
- 赛事最低提交次数：**3** 次；main 主线实际 **337** 次，**符合要求**。

<a id="key-findings"></a>
## 关键问题

| 问题 ID | 结论 | 直接影响 | 严重程度 | 状态 / 置信度 | 证据 |
| --- | --- | --- | --- | --- | --- |
| [DEV-LARGE-SUMMARY](#large-commits) | main 主线共有 11 次非合并提交达到大文本变更阈值。 | 集中变化会降低逐步审查效率，需结合变更类型和专门清单复核。 | 高 | 已确认 / 100% | [大文本变更清单](#large-commits) |

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
| 可见提交次数 | 337 | main 主线完整历史 |
| 文本增加行数 | 68300 | 由 Git numstat 汇总 |
| 文本删除行数 | 34577 | 由 Git numstat 汇总 |
| 文本净变化 | +33723 | 增加行数减删除行数 |
| 大规模提交候选 | 11 | 阈值 2000 行，合并提交不触发 |
| 二进制文件记录 | 358 | 不计入文本行数 |
| 赛事最低提交次数 | 3 次 | main 主线实际 337 次，符合要求 |

<a id="large-commits"></a>
## 二、大规模提交检测

公开判断阈值：单次非合并提交的 additions + deletions 达到 **2000** 行。

| 提交 | 时间 | 说明 | 增加 | 删除 | 变化量 | 主要文件 |
| --- | --- | --- | ---: | ---: | ---: | --- |
| [754610f2cc0b](#commit-754610f2cc0b169adea4cae253cfd9847dc9ccdb) | 2020-10-19T04:44:14+09:00 | first commit | 2871 | 0 | 2871 | `Makefile`、`bootloader/SBI/rustsbi-qemu`、`bootloader/SBI/rustsbi.bin`、`kernel/console.c` |
| [6de93845f32f](#commit-6de93845f32fed37a9d6aaf90bdd5cb884b7d025) | 2020-10-21T03:08:48+09:00 | add all of kernel | 4556 | 10 | 4566 | `Makefile`、`kernel/bio.c`、`kernel/buf.h`、`kernel/console.c` |
| [01ec2b3896ac](#commit-01ec2b3896acfaac8129aa49b1c49f31b5192de8) | 2020-11-01T00:15:28+09:00 | add user | 5029 | 5 | 5034 | `Makefile`、`README`、`kernel/main.c`、`mkfs/mkfs.c` |
| `a3c2af358c12` | 2020-11-02T09:37:46+09:00 | change something | 1823 | 204 | 2027 | `Makefile`、`kernel/bio.c`、`kernel/console.c`、`kernel/exec.c` |
| [43db17f6ba6a](#commit-43db17f6ba6a2a69a75f3af78e224d32d7d06892) | 2020-11-03T07:37:51+09:00 | succeed read and write sd card | 10231 | 28 | 10259 | `Makefile`、`kendryte_sdk/include/platform.h`、`kernel/fpioa.c`、`kernel/gpiohs.c` |
| [a3dbd91bd0f6](#commit-a3dbd91bd0f6dcc4fbb1d339b789838be62c6d05) | 2020-11-10T16:13:09+08:00 | fix the pop_off panic bug | 15705 | 19 | 15724 | `.gitignore`、`Makefile`、`kernel/entry_k210.S`、`kernel/main.c` |
| [7dc9c748b679](#commit-7dc9c748b679c884a59891997e11d3a3fc580f3f) | 2020-11-17T03:23:35+09:00 | remove tags | 0 | 15662 | 15662 | `tags` |
| [30afd8a68e5e](#commit-30afd8a68e5e8a1c4e8e47ccd1051daebc7aa48e) | 2021-01-17T01:23:57+08:00 | tmp commit | 2103 | 5 | 2108 | `Makefile`、`kernel/include/sdcard.back.h`、`kernel/include/sdcard.example.h`、`kernel/include/spi.example.h` |
| [3531c6d7bd4c](#commit-3531c6d7bd4c4a1e6e89125fd58a9995f5ef90b2) | 2021-03-05T23:25:01+08:00 | Update docs and readme. | 138 | 2755 | 2893 | `Makefile`、`README.md`、`README_cn.md`、`doc/内核原理-系统调用.md` |
| [423584d7ee3d](#commit-423584d7ee3dc85895c64ca0f81331c0cdb22cec) | 2021-03-13T00:52:29+08:00 | dma interrupt works; M runs S'codes to handle ext-intr; rustsbi still panic in some peculiar cases. | 5080 | 133 | 5213 | `Makefile`、`bootloader/SBI/rustsbi-k210/.cargo/config.toml`、`bootloader/SBI/rustsbi-k210/src/main.rs`、`bootloader/SBI/sbi-k210` |
| [b5ab18306659](#commit-b5ab18306659811da5a755d805949ebe87250066) | 2021-04-05T19:09:15+08:00 | Move dev-addr to high space for U-addr mapping; Abandon defs.h and some files; | 771 | 2473 | 3244 | `.gitignore`、`Makefile`、`README.md`、`README_cn.md` |

<a id="development-phases"></a>
## 三、开发阶段

<a id="phase-PHASE-01"></a>
### PHASE-01 · 基础建立

本阶段包含 42 次提交，文本变化 18622 行，主要涉及 kernel/main.c、kernel/defs.h、kernel/test.c。

| 起止时间 | 提交范围 | 提交数 | 增加 / 删除 | 关键提交 |
| --- | --- | ---: | ---: | --- |
| 2020-10-19T00:53:22+08:00 至 2020-11-02T18:27:23+09:00 | `7119267da84e` 至 `bfeef014144c` | 42 | +16547 / -2075 | [754610f2cc0b](#commit-754610f2cc0b169adea4cae253cfd9847dc9ccdb) [6de93845f32f](#commit-6de93845f32fed37a9d6aaf90bdd5cb884b7d025) [01ec2b3896ac](#commit-01ec2b3896acfaac8129aa49b1c49f31b5192de8) |

**主要文件：** `kernel/main.c`、`kernel/defs.h`、`kernel/test.c`、`Makefile`、`kernel/trap.c`、`kernel/timer.c`

<a id="phase-PHASE-02"></a>
### PHASE-02 · 核心能力实现

本阶段包含 42 次提交，文本变化 46427 行，主要涉及 kernel/main.c、README.md、Makefile。

| 起止时间 | 提交范围 | 提交数 | 增加 / 删除 | 关键提交 |
| --- | --- | ---: | ---: | --- |
| 2020-11-02T19:21:43+09:00 至 2020-11-19T05:00:49+09:00 | `23798eb17636` 至 `0d76209dbbec` | 42 | +29042 / -17385 | [43db17f6ba6a](#commit-43db17f6ba6a2a69a75f3af78e224d32d7d06892) [a3dbd91bd0f6](#commit-a3dbd91bd0f6dcc4fbb1d339b789838be62c6d05) [7dc9c748b679](#commit-7dc9c748b679c884a59891997e11d3a3fc580f3f) |

**主要文件：** `kernel/main.c`、`README.md`、`Makefile`、`kernel/proc.c`、`kernel/vm.c`、`kernel/test.c`

<a id="phase-PHASE-03"></a>
### PHASE-03 · 子系统扩展

本阶段包含 42 次提交，文本变化 6964 行，主要涉及 Makefile、kernel/main.c、kernel/include/defs.h。

| 起止时间 | 提交范围 | 提交数 | 增加 / 删除 | 关键提交 |
| --- | --- | ---: | ---: | --- |
| 2020-11-22T07:15:27+09:00 至 2021-01-15T12:16:30+08:00 | `3552b55afcf4` 至 `9bcfaac7993f` | 42 | +4873 / -2091 | [feff806a5e6c](#commit-feff806a5e6cbe6224440de006fe58a60b19dddb) [2aac809a472b](#commit-2aac809a472ba81f3cb528e43a62ba72cf27e45f) [3c5a12c7675d](#commit-3c5a12c7675d46d72d03d81f521d302a1f551c10) |

**主要文件：** `Makefile`、`kernel/main.c`、`kernel/include/defs.h`、`README.md`、`doc/report_2020_12_26.md`、`kernel/fat32.c`

<a id="phase-PHASE-04"></a>
### PHASE-04 · 兼容能力完善

本阶段包含 42 次提交，文本变化 8249 行，主要涉及 Makefile、xv6-user/sh.c、kernel/fat32.c。

| 起止时间 | 提交范围 | 提交数 | 增加 / 删除 | 关键提交 |
| --- | --- | ---: | ---: | --- |
| 2021-01-15T12:29:27+08:00 至 2021-03-06T00:14:00+08:00 | `89793967a706` 至 `9b0bf37fabc1` | 42 | +4183 / -4066 | [30afd8a68e5e](#commit-30afd8a68e5e8a1c4e8e47ccd1051daebc7aa48e) [5a1e143b3451](#commit-5a1e143b3451cd59e60a43f186564b889569222a) [3531c6d7bd4c](#commit-3531c6d7bd4c4a1e6e89125fd58a9995f5ef90b2) |

**主要文件：** `Makefile`、`xv6-user/sh.c`、`kernel/fat32.c`、`kernel/main.c`、`fs.sh`、`README.md`

<a id="phase-PHASE-05"></a>
### PHASE-05 · 测试与评分适配

本阶段包含 42 次提交，文本变化 19837 行，主要涉及 Makefile、kernel/trap.c、kernel/proc.c。

| 起止时间 | 提交范围 | 提交数 | 增加 / 删除 | 关键提交 |
| --- | --- | ---: | ---: | --- |
| 2021-03-06T01:33:25+09:00 至 2021-05-29T16:05:55+08:00 | `b8e37994a0e4` 至 `fbecdb1d3c2c` | 42 | +11270 / -8567 | [423584d7ee3d](#commit-423584d7ee3dc85895c64ca0f81331c0cdb22cec) [a3751519b107](#commit-a3751519b107e0ea0723c0460ebd3508e0930957) [b5ab18306659](#commit-b5ab18306659811da5a755d805949ebe87250066) |

**主要文件：** `Makefile`、`kernel/trap.c`、`kernel/proc.c`、`kernel/fat32.c`、`kernel/sysfile.c`、`kernel/vm.c`

<a id="phase-PHASE-06"></a>
### PHASE-06 · 架构移植

本阶段包含 42 次提交，文本变化 459 行，主要涉及 kernel/sysfile.c、kernel/vm.c、kernel/proc.c。

| 起止时间 | 提交范围 | 提交数 | 增加 / 删除 | 关键提交 |
| --- | --- | ---: | ---: | --- |
| 2021-05-29T16:07:28+08:00 至 2021-05-30T13:17:23+08:00 | `e17eb74504a7` 至 `8a64224aa22b` | 42 | +331 / -128 | [fdb523dcc35a](#commit-fdb523dcc35a263e1546f0ecf15322397ebc66ef) `0d40a2ff7613` `d282b4944823` |

**主要文件：** `kernel/sysfile.c`、`kernel/vm.c`、`kernel/proc.c`、`xv6-user/init.c`、`kernel/include/riscv.h`、`kernel/syscall.c`

<a id="phase-PHASE-07"></a>
### PHASE-07 · 回退与主线整合

本阶段包含 42 次提交，文本变化 476 行，主要涉及 kernel/sysfile.c、kernel/syscall.c、kernel/file.c。

| 起止时间 | 提交范围 | 提交数 | 增加 / 删除 | 关键提交 |
| --- | --- | ---: | ---: | --- |
| 2021-05-30T13:20:23+08:00 至 2021-05-31T21:56:05+08:00 | `052511da90b2` 至 `acd981eadbdb` | 42 | +389 / -87 | `a52760836f25` `c40f9c9f3979` `147484b08ccc` |

**主要文件：** `kernel/sysfile.c`、`kernel/syscall.c`、`kernel/file.c`、`kernel/fat32.c`、`kernel/include/fat32.h`、`kernel/include/proc.h`

<a id="phase-PHASE-08"></a>
### PHASE-08 · 最终交付

本阶段包含 43 次提交，文本变化 1843 行，主要涉及 kernel/sysproc.c、kernel/syscall.c、kernel/sysfile.c。

| 起止时间 | 提交范围 | 提交数 | 增加 / 删除 | 关键提交 |
| --- | --- | ---: | ---: | --- |
| 2021-05-31T21:57:53+08:00 至 2021-08-18T18:05:30+08:00 | `7e8236a19b79` 至 `a93c01cd3439` | 43 | +1665 / -178 | `c425958784bd` `f88ebb7a18f7` `10c6ec29fcc0` |

**主要文件：** `kernel/sysproc.c`、`kernel/syscall.c`、`kernel/sysfile.c`、`kernel/trap.c`、`kernel/fat32.c`、`内核设计与开发文档_nostayuplate.pdf`

<a id="commit-timeline"></a>
## 四、关键提交时间线

为控制阅读长度，本节展示阶段边界、关键提交、大规模提交和均匀抽样提交；其余 305 次提交保留在结构化报告中。

| 时间 | 提交 | 说明 | 增加 | 删除 | 类型 | 主要文件 |
| --- | --- | --- | ---: | ---: | --- | --- |
| 2020-10-19T00:53:22+08:00 | <a id="commit-7119267da84eb11f17657dd74125a59bdebf0f2d"></a>`7119267da84eb11f17657dd74125a59bdebf0f2d` | Create README.md | 63 | 0 | 初始 | `README.md` |
| 2020-10-19T04:44:14+09:00 | <a id="commit-754610f2cc0b169adea4cae253cfd9847dc9ccdb"></a>`754610f2cc0b169adea4cae253cfd9847dc9ccdb` | first commit | 2871 | 0 | 普通 | `Makefile`、`bootloader/SBI/rustsbi-qemu`、`bootloader/SBI/rustsbi.bin` |
| 2020-10-21T03:08:48+09:00 | <a id="commit-6de93845f32fed37a9d6aaf90bdd5cb884b7d025"></a>`6de93845f32fed37a9d6aaf90bdd5cb884b7d025` | add all of kernel | 4556 | 10 | 普通 | `Makefile`、`kernel/bio.c`、`kernel/buf.h` |
| 2020-11-01T00:15:28+09:00 | <a id="commit-01ec2b3896acfaac8129aa49b1c49f31b5192de8"></a>`01ec2b3896acfaac8129aa49b1c49f31b5192de8` | add user | 5029 | 5 | 普通 | `Makefile`、`README`、`kernel/main.c` |
| 2020-11-02T18:27:23+09:00 | <a id="commit-bfeef014144c6743bef2815392802bbb1f131fdd"></a>`bfeef014144c6743bef2815392802bbb1f131fdd` | rm kernel/*.h | 0 | 1439 | 普通 | `kernel/date.h`、`kernel/defs.h`、`kernel/elf.h` |
| 2020-11-02T19:21:43+09:00 | <a id="commit-23798eb176361594365800abf6e9bba2750b6585"></a>`23798eb176361594365800abf6e9bba2750b6585` | add doc | 116 | 0 | 文档 | `doc/s_extern_interrupt.md`、`img/s_extern_interrupt.png` |
| 2020-11-03T07:37:51+09:00 | <a id="commit-43db17f6ba6a2a69a75f3af78e224d32d7d06892"></a>`43db17f6ba6a2a69a75f3af78e224d32d7d06892` | succeed read and write sd card | 10231 | 28 | 普通 | `Makefile`、`kendryte_sdk/include/platform.h`、`kernel/fpioa.c` |
| 2020-11-10T16:13:09+08:00 | <a id="commit-a3dbd91bd0f6dcc4fbb1d339b789838be62c6d05"></a>`a3dbd91bd0f6dcc4fbb1d339b789838be62c6d05` | fix the pop_off panic bug | 15705 | 19 | 普通 | `.gitignore`、`Makefile`、`kernel/entry_k210.S` |
| 2020-11-17T03:23:35+09:00 | <a id="commit-7dc9c748b679c884a59891997e11d3a3fc580f3f"></a>`7dc9c748b679c884a59891997e11d3a3fc580f3f` | remove tags | 0 | 15662 | 普通 | `tags` |
| 2020-11-19T05:00:49+09:00 | <a id="commit-0d76209dbbecf1acffbcb1ab24d764f9fb78dc82"></a>`0d76209dbbecf1acffbcb1ab24d764f9fb78dc82` | add proc doc | 57 | 4 | 文档 | `README.md`、`doc/proc.md`、`kernel/proc.c` |
| 2020-11-22T07:15:27+09:00 | <a id="commit-3552b55afcf44410b30bfe0098602a1cab52343c"></a>`3552b55afcf44410b30bfe0098602a1cab52343c` | add logo | 24 | 3 | 普通 | `Makefile`、`kernel/include/defs.h`、`kernel/logo.c` |
| 2020-12-12T23:00:36+09:00 | <a id="commit-feff806a5e6cbe6224440de006fe58a60b19dddb"></a>`feff806a5e6cbe6224440de006fe58a60b19dddb` | add rustsbi-qemu | 979 | 4 | 普通 | `bootloader/SBI/rustsbi-k210/Cargo.lock`、`bootloader/SBI/rustsbi-k210/build.rs`、`bootloader/SBI/rustsbi-k210/rust-toolchain` |
| 2021-01-12T15:39:58+08:00 | <a id="commit-2aac809a472ba81f3cb528e43a62ba72cf27e45f"></a>`2aac809a472ba81f3cb528e43a62ba72cf27e45f` | Add FAT32 filesystem (read only). | 1197 | 149 | 普通 | `Makefile`、`kernel/bio.c`、`kernel/disk_virtio.c` |
| 2021-01-13T18:41:10+08:00 | <a id="commit-3c5a12c7675d46d72d03d81f521d302a1f551c10"></a>`3c5a12c7675d46d72d03d81f521d302a1f551c10` | shell works on qemu | 316 | 427 | 普通 | `Makefile`、`kernel/bio.c`、`kernel/console.c` |
| 2021-01-15T12:16:30+08:00 | <a id="commit-9bcfaac7993fd0f13eea654045f14f08a83a9350"></a>`9bcfaac7993fd0f13eea654045f14f08a83a9350` | update fs | 114 | 74 | 普通 | `Makefile`、`README.md`、`doc/fs.md` |
| 2021-01-15T12:29:27+08:00 | <a id="commit-89793967a70693ba2fe15afd3430f2de73ccdb9d"></a>`89793967a70693ba2fe15afd3430f2de73ccdb9d` | Update fs.md | 2 | 1 | 普通 | `doc/fs.md` |
| 2021-01-17T01:23:57+08:00 | <a id="commit-30afd8a68e5e8a1c4e8e47ccd1051daebc7aa48e"></a>`30afd8a68e5e8a1c4e8e47ccd1051daebc7aa48e` | tmp commit | 2103 | 5 | 普通 | `Makefile`、`kernel/include/sdcard.back.h`、`kernel/include/sdcard.example.h` |
| 2021-03-04T14:18:37+08:00 | <a id="commit-5a1e143b3451cd59e60a43f186564b889569222a"></a>`5a1e143b3451cd59e60a43f186564b889569222a` | finished SD card driver, but to work on k210 requires more to be done | 379 | 520 | 普通 | `.gitignore`、`kernel/disk.c`、`kernel/include/printf.h` |
| 2021-03-05T23:25:01+08:00 | <a id="commit-3531c6d7bd4c4a1e6e89125fd58a9995f5ef90b2"></a>`3531c6d7bd4c4a1e6e89125fd58a9995f5ef90b2` | Update docs and readme. | 138 | 2755 | 文档 | `Makefile`、`README.md`、`README_cn.md` |
| 2021-03-06T00:14:00+08:00 | <a id="commit-9b0bf37fabc1a95ace39673f65ee4976ec10c99e"></a>`9b0bf37fabc1a95ace39673f65ee4976ec10c99e` | A version that works both on k210 and qemu. | 5 | 8 | 普通 | `Makefile`、`kernel/.sdcard.c.swp`、`kernel/main.c` |
| 2021-03-06T01:33:25+09:00 | <a id="commit-b8e37994a0e48ff13ca44d6caaccc40ab2eb2709"></a>`b8e37994a0e48ff13ca44d6caaccc40ab2eb2709` | update rustsbi-qemu to 0.1.1 version | 143 | 64 | 普通 | `bootloader/SBI/rustsbi-qemu/Cargo.lock`、`bootloader/SBI/rustsbi-qemu/Cargo.toml`、`bootloader/SBI/rustsbi-qemu/build.rs` |
| 2021-03-13T00:52:29+08:00 | <a id="commit-423584d7ee3dc85895c64ca0f81331c0cdb22cec"></a>`423584d7ee3dc85895c64ca0f81331c0cdb22cec` | dma interrupt works; M runs S'codes to handle ext-intr; rustsbi still panic in some peculiar cases. | 5080 | 133 | 普通 | `Makefile`、`bootloader/SBI/rustsbi-k210/.cargo/config.toml`、`bootloader/SBI/rustsbi-k210/src/main.rs` |
| 2021-04-03T22:32:56+08:00 | <a id="commit-a3751519b107e0ea0723c0460ebd3508e0930957"></a>`a3751519b107e0ea0723c0460ebd3508e0930957` | Add trace syscall; Fix xargs bugs. | 782 | 791 | 普通 | `Makefile`、`bootloader/SBI/rustsbi-k210/.cargo/config.toml`、`kernel/dmac.c` |
| 2021-04-05T19:09:15+08:00 | <a id="commit-b5ab18306659811da5a755d805949ebe87250066"></a>`b5ab18306659811da5a755d805949ebe87250066` | Move dev-addr to high space for U-addr mapping; Abandon defs.h and some files; | 771 | 2473 | 普通 | `.gitignore`、`Makefile`、`README.md` |
| 2021-05-29T16:05:55+08:00 | <a id="commit-fbecdb1d3c2c71a30dc10738f7824af6b1580869"></a>`fbecdb1d3c2c71a30dc10738f7824af6b1580869` | Update memlayout.h | 1 | 0 | 普通 | `kernel/include/memlayout.h` |
| 2021-05-29T16:07:28+08:00 | <a id="commit-e17eb74504a7067b7cefcca50ad54773ed70981b"></a>`e17eb74504a7067b7cefcca50ad54773ed70981b` | Update syscall.c | 0 | 3 | 普通 | `kernel/syscall.c` |
| 2021-05-29T16:11:50+08:00 | <a id="commit-fdb523dcc35a263e1546f0ecf15322397ebc66ef"></a>`fdb523dcc35a263e1546f0ecf15322397ebc66ef` | Update proc.c | 53 | 8 | 普通 | `kernel/proc.c` |
| 2021-05-30T13:17:23+08:00 | <a id="commit-8a64224aa22b16b1eefd3a9251ff4c49601f730f"></a>`8a64224aa22b16b1eefd3a9251ff4c49601f730f` | Update sysfile.c | 24 | 0 | 普通 | `kernel/sysfile.c` |
| 2021-05-30T13:20:23+08:00 | <a id="commit-052511da90b2cdef10259acfc57c5063f849da4c"></a>`052511da90b2cdef10259acfc57c5063f849da4c` | Update fat32.h | 2 | 2 | 普通 | `kernel/include/fat32.h` |
| 2021-05-31T21:56:05+08:00 | <a id="commit-acd981eadbdb791126c350cdf8baf0e18947f99d"></a>`acd981eadbdb791126c350cdf8baf0e18947f99d` | Update fat32.c | 8 | 8 | 普通 | `kernel/fat32.c` |
| 2021-05-31T21:57:53+08:00 | <a id="commit-7e8236a19b7946883250b5aeb2f9f7f1cc0a84b1"></a>`7e8236a19b7946883250b5aeb2f9f7f1cc0a84b1` | Update trap.c | 2 | 0 | 普通 | `kernel/trap.c` |
| 2021-08-18T18:05:30+08:00 | <a id="commit-a93c01cd3439e4e35d8ee3207fe689027547a9fd"></a>`a93c01cd3439e4e35d8ee3207fe689027547a9fd` | Update init.c | 1 | 1 | 初始 | `xv6-user/init.c` |

<a id="evidence-index"></a>
## 五、分析限制与证据索引

### 分析限制

- 可见历史包含 337 次提交，超过阶段归纳模型的 240 次输入上限；阶段已确定性划分。
- 检测到 358 个提交内二进制文件记录，未计入文本增删行数。

### 问题明细

<a id="finding-DEV-LARGE-A3DBD91BD0F6"></a>
#### DEV-LARGE-A3DBD91BD0F6 · 单次提交文本变化量较大

- 类别：`large_commit`
- 结论：提交 a3dbd91bd0f6 属于一般大文本变更，文本变化 15724 行，达到 2000 行阈值。
- 影响：单次提交包含较多文本变化，需要结合文件类型和前后提交复核开发连续性。
- 状态：已确认，置信度 100%
- 机制：变化量按 Git additions + deletions 计算，包含实现、脚本、文档和锁文件；合并提交和二进制文件不触发该判断。
- 证据：[E-GIT-LARGE-A3DBD91BD0F6](#evidence-E-GIT-LARGE-A3DBD91BD0F6)

<a id="finding-DEV-LARGE-7DC9C748B679"></a>
#### DEV-LARGE-7DC9C748B679 · 单次提交文本变化量较大

- 类别：`large_commit`
- 结论：提交 7dc9c748b679 属于一般大文本变更，文本变化 15662 行，达到 2000 行阈值。
- 影响：单次提交包含较多文本变化，需要结合文件类型和前后提交复核开发连续性。
- 状态：已确认，置信度 100%
- 机制：变化量按 Git additions + deletions 计算，包含实现、脚本、文档和锁文件；合并提交和二进制文件不触发该判断。
- 证据：[E-GIT-LARGE-7DC9C748B679](#evidence-E-GIT-LARGE-7DC9C748B679)

<a id="finding-DEV-LARGE-43DB17F6BA6A"></a>
#### DEV-LARGE-43DB17F6BA6A · 单次提交文本变化量较大

- 类别：`large_commit`
- 结论：提交 43db17f6ba6a 属于一般大文本变更，文本变化 10259 行，达到 2000 行阈值。
- 影响：单次提交包含较多文本变化，需要结合文件类型和前后提交复核开发连续性。
- 状态：已确认，置信度 100%
- 机制：变化量按 Git additions + deletions 计算，包含实现、脚本、文档和锁文件；合并提交和二进制文件不触发该判断。
- 证据：[E-GIT-LARGE-43DB17F6BA6A](#evidence-E-GIT-LARGE-43DB17F6BA6A)

<a id="finding-DEV-LARGE-423584D7EE3D"></a>
#### DEV-LARGE-423584D7EE3D · 单次提交文本变化量较大

- 类别：`large_commit`
- 结论：提交 423584d7ee3d 属于一般大文本变更，文本变化 5213 行，达到 2000 行阈值。
- 影响：单次提交包含较多文本变化，需要结合文件类型和前后提交复核开发连续性。
- 状态：已确认，置信度 100%
- 机制：变化量按 Git additions + deletions 计算，包含实现、脚本、文档和锁文件；合并提交和二进制文件不触发该判断。
- 证据：[E-GIT-LARGE-423584D7EE3D](#evidence-E-GIT-LARGE-423584D7EE3D)

<a id="finding-DEV-LARGE-01EC2B3896AC"></a>
#### DEV-LARGE-01EC2B3896AC · 单次提交文本变化量较大

- 类别：`large_commit`
- 结论：提交 01ec2b3896ac 属于一般大文本变更，文本变化 5034 行，达到 2000 行阈值。
- 影响：单次提交包含较多文本变化，需要结合文件类型和前后提交复核开发连续性。
- 状态：已确认，置信度 100%
- 机制：变化量按 Git additions + deletions 计算，包含实现、脚本、文档和锁文件；合并提交和二进制文件不触发该判断。
- 证据：[E-GIT-LARGE-01EC2B3896AC](#evidence-E-GIT-LARGE-01EC2B3896AC)

<a id="finding-DEV-LARGE-6DE93845F32F"></a>
#### DEV-LARGE-6DE93845F32F · 单次提交文本变化量较大

- 类别：`large_commit`
- 结论：提交 6de93845f32f 属于一般大文本变更，文本变化 4566 行，达到 2000 行阈值。
- 影响：单次提交包含较多文本变化，需要结合文件类型和前后提交复核开发连续性。
- 状态：已确认，置信度 100%
- 机制：变化量按 Git additions + deletions 计算，包含实现、脚本、文档和锁文件；合并提交和二进制文件不触发该判断。
- 证据：[E-GIT-LARGE-6DE93845F32F](#evidence-E-GIT-LARGE-6DE93845F32F)

<a id="finding-DEV-LARGE-B5AB18306659"></a>
#### DEV-LARGE-B5AB18306659 · 单次提交文本变化量较大

- 类别：`large_commit`
- 结论：提交 b5ab18306659 属于一般大文本变更，文本变化 3244 行，达到 2000 行阈值。
- 影响：单次提交包含较多文本变化，需要结合文件类型和前后提交复核开发连续性。
- 状态：已确认，置信度 100%
- 机制：变化量按 Git additions + deletions 计算，包含实现、脚本、文档和锁文件；合并提交和二进制文件不触发该判断。
- 证据：[E-GIT-LARGE-B5AB18306659](#evidence-E-GIT-LARGE-B5AB18306659)

<a id="finding-DEV-LARGE-3531C6D7BD4C"></a>
#### DEV-LARGE-3531C6D7BD4C · 单次提交文本变化量较大

- 类别：`large_commit`
- 结论：提交 3531c6d7bd4c 属于一般大文本变更，文本变化 2893 行，达到 2000 行阈值。
- 影响：单次提交包含较多文本变化，需要结合文件类型和前后提交复核开发连续性。
- 状态：已确认，置信度 100%
- 机制：变化量按 Git additions + deletions 计算，包含实现、脚本、文档和锁文件；合并提交和二进制文件不触发该判断。
- 证据：[E-GIT-LARGE-3531C6D7BD4C](#evidence-E-GIT-LARGE-3531C6D7BD4C)

<a id="finding-DEV-LARGE-754610F2CC0B"></a>
#### DEV-LARGE-754610F2CC0B · 单次提交文本变化量较大

- 类别：`large_commit`
- 结论：提交 754610f2cc0b 属于一般大文本变更，文本变化 2871 行，达到 2000 行阈值。
- 影响：单次提交包含较多文本变化，需要结合文件类型和前后提交复核开发连续性。
- 状态：已确认，置信度 100%
- 机制：变化量按 Git additions + deletions 计算，包含实现、脚本、文档和锁文件；合并提交和二进制文件不触发该判断。
- 证据：[E-GIT-LARGE-754610F2CC0B](#evidence-E-GIT-LARGE-754610F2CC0B)

<a id="finding-DEV-LARGE-30AFD8A68E5E"></a>
#### DEV-LARGE-30AFD8A68E5E · 单次提交文本变化量较大

- 类别：`large_commit`
- 结论：提交 30afd8a68e5e 属于一般大文本变更，文本变化 2108 行，达到 2000 行阈值。
- 影响：单次提交包含较多文本变化，需要结合文件类型和前后提交复核开发连续性。
- 状态：已确认，置信度 100%
- 机制：变化量按 Git additions + deletions 计算，包含实现、脚本、文档和锁文件；合并提交和二进制文件不触发该判断。
- 证据：[E-GIT-LARGE-30AFD8A68E5E](#evidence-E-GIT-LARGE-30AFD8A68E5E)

<a id="finding-DEV-LARGE-A3C2AF358C12"></a>
#### DEV-LARGE-A3C2AF358C12 · 单次提交文本变化量较大

- 类别：`large_commit`
- 结论：提交 a3c2af358c12 属于一般大文本变更，文本变化 2027 行，达到 2000 行阈值。
- 影响：单次提交包含较多文本变化，需要结合文件类型和前后提交复核开发连续性。
- 状态：已确认，置信度 100%
- 机制：变化量按 Git additions + deletions 计算，包含实现、脚本、文档和锁文件；合并提交和二进制文件不触发该判断。
- 证据：[E-GIT-LARGE-A3C2AF358C12](#evidence-E-GIT-LARGE-A3C2AF358C12)

### Git 证据索引

<a id="evidence-E-GIT-LARGE-754610F2CC0B"></a>
#### E-GIT-LARGE-754610F2CC0B

- 位置：提交 [754610f2cc0b169adea4cae253cfd9847dc9ccdb](#commit-754610f2cc0b169adea4cae253cfd9847dc9ccdb)
- 来源：`git log --numstat`
- 事实：commit=754610f2cc0b169adea4cae253cfd9847dc9ccdb; additions=2871; deletions=0; changed_lines=2871; threshold=2000
- 说明：数值来自目标仓库 Git 命令并通过报告闭包复算。

<a id="evidence-E-GIT-LARGE-6DE93845F32F"></a>
#### E-GIT-LARGE-6DE93845F32F

- 位置：提交 [6de93845f32fed37a9d6aaf90bdd5cb884b7d025](#commit-6de93845f32fed37a9d6aaf90bdd5cb884b7d025)
- 来源：`git log --numstat`
- 事实：commit=6de93845f32fed37a9d6aaf90bdd5cb884b7d025; additions=4556; deletions=10; changed_lines=4566; threshold=2000
- 说明：数值来自目标仓库 Git 命令并通过报告闭包复算。

<a id="evidence-E-GIT-LARGE-01EC2B3896AC"></a>
#### E-GIT-LARGE-01EC2B3896AC

- 位置：提交 [01ec2b3896acfaac8129aa49b1c49f31b5192de8](#commit-01ec2b3896acfaac8129aa49b1c49f31b5192de8)
- 来源：`git log --numstat`
- 事实：commit=01ec2b3896acfaac8129aa49b1c49f31b5192de8; additions=5029; deletions=5; changed_lines=5034; threshold=2000
- 说明：数值来自目标仓库 Git 命令并通过报告闭包复算。

<a id="evidence-E-GIT-LARGE-A3C2AF358C12"></a>
#### E-GIT-LARGE-A3C2AF358C12

- 位置：提交 `a3c2af358c1277561488c18de38fff55ea5e5c3d`
- 来源：`git log --numstat`
- 事实：commit=a3c2af358c1277561488c18de38fff55ea5e5c3d; additions=1823; deletions=204; changed_lines=2027; threshold=2000
- 说明：数值来自目标仓库 Git 命令并通过报告闭包复算。

<a id="evidence-E-GIT-LARGE-43DB17F6BA6A"></a>
#### E-GIT-LARGE-43DB17F6BA6A

- 位置：提交 [43db17f6ba6a2a69a75f3af78e224d32d7d06892](#commit-43db17f6ba6a2a69a75f3af78e224d32d7d06892)
- 来源：`git log --numstat`
- 事实：commit=43db17f6ba6a2a69a75f3af78e224d32d7d06892; additions=10231; deletions=28; changed_lines=10259; threshold=2000
- 说明：数值来自目标仓库 Git 命令并通过报告闭包复算。

<a id="evidence-E-GIT-LARGE-A3DBD91BD0F6"></a>
#### E-GIT-LARGE-A3DBD91BD0F6

- 位置：提交 [a3dbd91bd0f6dcc4fbb1d339b789838be62c6d05](#commit-a3dbd91bd0f6dcc4fbb1d339b789838be62c6d05)
- 来源：`git log --numstat`
- 事实：commit=a3dbd91bd0f6dcc4fbb1d339b789838be62c6d05; additions=15705; deletions=19; changed_lines=15724; threshold=2000
- 说明：数值来自目标仓库 Git 命令并通过报告闭包复算。

<a id="evidence-E-GIT-LARGE-7DC9C748B679"></a>
#### E-GIT-LARGE-7DC9C748B679

- 位置：提交 [7dc9c748b679c884a59891997e11d3a3fc580f3f](#commit-7dc9c748b679c884a59891997e11d3a3fc580f3f)
- 来源：`git log --numstat`
- 事实：commit=7dc9c748b679c884a59891997e11d3a3fc580f3f; additions=0; deletions=15662; changed_lines=15662; threshold=2000
- 说明：数值来自目标仓库 Git 命令并通过报告闭包复算。

<a id="evidence-E-GIT-LARGE-30AFD8A68E5E"></a>
#### E-GIT-LARGE-30AFD8A68E5E

- 位置：提交 [30afd8a68e5e8a1c4e8e47ccd1051daebc7aa48e](#commit-30afd8a68e5e8a1c4e8e47ccd1051daebc7aa48e)
- 来源：`git log --numstat`
- 事实：commit=30afd8a68e5e8a1c4e8e47ccd1051daebc7aa48e; additions=2103; deletions=5; changed_lines=2108; threshold=2000
- 说明：数值来自目标仓库 Git 命令并通过报告闭包复算。

<a id="evidence-E-GIT-LARGE-3531C6D7BD4C"></a>
#### E-GIT-LARGE-3531C6D7BD4C

- 位置：提交 [3531c6d7bd4c4a1e6e89125fd58a9995f5ef90b2](#commit-3531c6d7bd4c4a1e6e89125fd58a9995f5ef90b2)
- 来源：`git log --numstat`
- 事实：commit=3531c6d7bd4c4a1e6e89125fd58a9995f5ef90b2; additions=138; deletions=2755; changed_lines=2893; threshold=2000
- 说明：数值来自目标仓库 Git 命令并通过报告闭包复算。

<a id="evidence-E-GIT-LARGE-423584D7EE3D"></a>
#### E-GIT-LARGE-423584D7EE3D

- 位置：提交 [423584d7ee3dc85895c64ca0f81331c0cdb22cec](#commit-423584d7ee3dc85895c64ca0f81331c0cdb22cec)
- 来源：`git log --numstat`
- 事实：commit=423584d7ee3dc85895c64ca0f81331c0cdb22cec; additions=5080; deletions=133; changed_lines=5213; threshold=2000
- 说明：数值来自目标仓库 Git 命令并通过报告闭包复算。

<a id="evidence-E-GIT-LARGE-B5AB18306659"></a>
#### E-GIT-LARGE-B5AB18306659

- 位置：提交 [b5ab18306659811da5a755d805949ebe87250066](#commit-b5ab18306659811da5a755d805949ebe87250066)
- 来源：`git log --numstat`
- 事实：commit=b5ab18306659811da5a755d805949ebe87250066; additions=771; deletions=2473; changed_lines=3244; threshold=2000
- 说明：数值来自目标仓库 Git 命令并通过报告闭包复算。
