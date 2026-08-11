# T2026100019911468-oskernel2025-oblivion · 作品描述报告

---

## 目录

- [一、问题与静态审查结论](#contest-review)
- [二、项目说明](#project-overview)
- [三、启动流程](#module-boot)
- [四、内存管理](#module-mm)
- [五、进程与任务调度](#module-task)
- [六、文件系统](#module-fs)
- [七、信号机制](#module-signal)
- [八、进程间通信](#module-ipc)
- [九、网络](#module-net)
- [十、驱动框架](#module-drivers)
- [十一、验证范围与证据索引](#evidence-index)

---

<a id="contest-review"></a>
## 一、问题与静态审查结论

<a id="detection"></a>
### 审查结论

硬编码专项静态扫描发现 12 个候选，但没有候选通过确认门禁。

- 硬编码审查：规则候选 **12** 项；正式问题已确认 **0** 项、疑似 **0** 项、未验证 **0** 项。
- 静态工程审查：列出 **0** 项可能的编译、链接或未实现风险；模板句式匹配 **0** 次，占位表达 **0** 处。
- 设计审查：**0/8** 个模块形成完整支持的结论；**7/8** 个模块形成带源码位置的实现说明。
- 审查基线：`f383645edcf5ceca806bff0f1ae5f436c7993a53`。

<a id="key-findings"></a>
### 关键问题

本轮没有硬编码问题通过报告门禁。该结果仅适用于本次扫描范围；证据支持的模块结论见[设计完整性与合理性](#design-review)。

<a id="execution"></a>
### 静态检查范围

本报告只从源码、工程配置、构建脚本和静态文本模式列出可能问题，不自动安装工具链、执行编译、启动 QEMU（用于模拟处理器和硬件平台的虚拟机软件）或运行评测用例。

- 扫描得到 0 项可能的编译、链接或未实现风险。
- Rust 源码扫描 10 个文件、1963 行。
- 模板化注释匹配 0 次，“内核核心代码”占位表达 0 处。

<a id="hardcode-review"></a>
### 硬编码专项分析

静态规则只负责定位候选，候选不会直接作为确认问题。

| 专项类别 | 检查状态 | 候选数 | 关联问题 | 说明 |
| --- | --- | ---: | --- | --- |
| 按测试名称或测试 ELF（可执行与可链接格式，常用于保存程序和内核映像）产生确定输出 | 未验证 | 8 | — | 未配置语义审查模型，候选未升级为确认问题。 |
| 针对评测场景的不合理优化 | 未验证 | 0 | — | 扫描未完整完成，不能给出无候选结论。 |
| 直接打印测试预期结果 | 未验证 | 3 | — | 未配置语义审查模型，候选未升级为确认问题。 |
| 修改测试或绕过失败用例 | 未验证 | 1 | — | 未配置语义审查模型，候选未升级为确认问题。 |

### 候选清单

- `HC-TIO-1f6e6877a2e9`：`tools/compare-online-score.py:102`，规则 `test-identity-controlled-output`。测试名称、测试 ELF 或参数参与分支，邻近代码直接输出或返回结果。
- `HC-TIO-53763328cdd5`：`xv6-k210/Makefile:301`，规则 `test-identity-controlled-output`。测试名称、测试 ELF 或参数参与分支，邻近代码直接输出或返回结果。
- `HC-TIO-2a8cff4f213e`：`xv6-k210/Makefile:304`，规则 `test-identity-controlled-output`。测试名称、测试 ELF 或参数参与分支，邻近代码直接输出或返回结果。
- `HC-TIO-98c055cc4545`：`xv6-k210/kernel/proc.c:329`，规则 `test-identity-controlled-output`。测试名称、测试 ELF 或参数参与分支，邻近代码直接输出或返回结果。
- `HC-TIO-2974921e2e77`：`xv6-k210/kernel/proc.c:381`，规则 `test-identity-controlled-output`。测试名称、测试 ELF 或参数参与分支，邻近代码直接输出或返回结果。
- `HC-TIO-4e279c5d26c8`：`xv6-k210/kernel/proc.c:496`，规则 `test-identity-controlled-output`。测试名称、测试 ELF 或参数参与分支，邻近代码直接输出或返回结果。
- `HC-TIO-69d5df80c14f`：`xv6-k210/kernel/proc.c:510`，规则 `test-identity-controlled-output`。测试名称、测试 ELF 或参数参与分支，邻近代码直接输出或返回结果。
- `HC-TIO-614efc06d81d`：`xv6-k210/kernel/proc.c:572`，规则 `test-identity-controlled-output`。测试名称、测试 ELF 或参数参与分支，邻近代码直接输出或返回结果。
- `HC-EOL-a40d0d81b416`：`xv6-k210/xv6-user/test_vm_fifo.c:30`，规则 `literal-expected-output`。输出调用中包含强结果标记或固定的多项数值结果。
- `HC-EOL-d56e16825b39`：`xv6-k210/xv6-user/test_vm_lru.c:30`，规则 `literal-expected-output`。输出调用中包含强结果标记或固定的多项数值结果。
- `HC-EOL-624a5b9ca1ae`：`xv6-k210/xv6-user/usertests.c:2752`，规则 `literal-expected-output`。输出调用中包含强结果标记或固定的多项数值结果。
- `HC-TBP-c9c7143da7eb`：`xv6-k210/run-local-tests.sh:88`，规则 `disabled-shell-fail-fast`。执行测试前关闭 shell 失败传播，可能使失败继续进入成功路径。

### 可能的编译、链接与实现问题

本次静态规则未定位到可能的编译、链接或未实现风险；这不是对实际构建结果的判断。

### 模板化生成痕迹

本次 Rust 源码扫描未发现预设的重复注释模板或占位表达。

---

<a id="project-overview"></a>
## 二、项目说明

本仓库 `T2026100019911468-oskernel2025-oblivion` 是 xv6-riscv 的教学血缘内核，但并非简单的移植，而是一个面向多平台（K210（基于 RISC-V 的双核系统级芯片，本项目支持的硬件平台之一）、QEMU、VisionFive2）和竞赛测试（testsuits-for-oskernel）的**实验型变体**。它以 xv6 的进程、内存、文件系统框架为骨架，通过条件编译和大量 Linux ABI（应用二进制接口，规定程序与操作系统之间的二进制调用约定）兼容层，试图在保持教学内核简洁性的同时，扩展出 COW（写时复制，多个执行单元先共享内存页，写入时再复制）、懒分配、多级反馈队列调度、FAT32（一种使用 32 位文件分配表的文件系统格式）文件系统等现代特性。整体架构定位是“教学内核 + 竞赛适配”的混合体：核心机制（进程调度、页表（记录虚拟地址到物理地址映射关系的数据结构）管理、trap（处理器因系统调用、中断或异常进入内核的控制路径）分发）仍清晰可辨，但外围被大量针对测试程序的桩函数和硬编码输出所包裹。最值得评审注意的三个特点是：其一，**双页表设计**（用户页表 + 内核页表）贯穿内存与进程模块，是支撑 COW 和内核态直接访问用户内存的关键创新；其二，**Linux ABI 兼容层**通过改写 trapframe 寄存器复用 xv6 原生 系统调用（用户程序请求内核服务的受控入口），并辅以大量桩函数，体现了“以最小代价通过测试”的务实取向；其三，**多平台支持**（K210/QEMU/VF2）通过条件编译实现，但 VF2 平台明显未完成，暴露了扩展的代价。

---

<a id="module-boot"></a>
## 三、启动流程

**模块分析：**

本仓库的启动流程以 xv6-riscv 的 main() 为骨架，针对 K210、QEMU、VisionFive2 三种硬件平台分别提供 entry 汇编入口，通过 hartid 区分主从核初始化路径。核心抽象是 main() 中按序调用的初始化函数链（kinit/kvminit/kvminithart/trapinithart/procinit 等），以及 entry_*.S 中为每个 hart（RISC-V 中可独立执行指令的硬件线程）计算独立栈顶的启动栈布局。

---

<a id="module-mm"></a>
## 四、内存管理

**模块分析：**

本模块以 xv6-riscv 的 Sv39（RISC-V 指令集架构的 39 位虚拟地址分页模式）三级页表为基础，核心抽象是 pagetable_t（页表根指针）与 kmem 物理页分配器（freelist + refcnt 引用计数数组）。具体过程是：缺页统一分发入口，按 PTE（页表项，记录虚拟页映射、权限和状态）有效性和 scause 路由到 COW 或懒分配；copyout/copyin 前置检查，PTE 无效时同步触发缺页处理；fork 时实现 COW：可写页改 COW 标志并共享物理页，递增引用计数；递减引用计数，归零才真正释放页并填充垃圾字节。

**实现位置：** [`xv6-k210/kernel/kalloc.c:23-29`](#evidence-E-MOD-mm-a359669342)、[`xv6-k210/kernel/kalloc.c:80-91`](#evidence-E-MOD-mm-9cb2722cee)、[`xv6-k210/kernel/kalloc.c:136-148`](#evidence-E-MOD-mm-ad821d988d)、[`xv6-k210/kernel/vm.c:119-136`](#evidence-E-MOD-mm-3aa1cc8025)

---

<a id="module-task"></a>
## 五、进程与任务调度

**模块分析：**

本模块以 xv6 的 struct proc 进程表为核心抽象，在 proc.c 中实现进程生命周期管理（allocproc/freeproc/fork/exit/wait）、上下文切换（scheduler/sched/swtch）以及调度器。具体过程是：从进程表分配 UNUSED 进程并初始化 trapframe/双页表/上下文，返回时持有 p-&gt;lock；每 CPU 主循环，按 sched_algo 选择 RUNNABLE 进程并切换上下文；fork 时复制页表，实现 COW 写时复制并同步更新父进程 kpagetable。

**实现位置：** [`xv6-k210/kernel/proc.c:677-700`](#evidence-E-MOD-task-c63d2475b8)、[`xv6-k210/kernel/proc.c:767-792`](#evidence-E-MOD-task-23eb99abc2)、[`xv6-k210/kernel/vm.c:465-503`](#evidence-E-MOD-task-7fa4e7d23a)、[`xv6-k210/kernel/vm.c:318-340`](#evidence-E-MOD-task-05e4d49a80)

---

<a id="module-fs"></a>
## 六、文件系统

**模块分析：**

本仓库文件系统以 FAT32 为主、ext4（Linux 常用的第四代扩展文件系统）只读为辅的双文件系统实现，核心抽象是 struct dirent 目录项缓存（ecache）与 FAT 簇链管理。具体过程是：读取 BPB 初始化 FAT32 全局状态，失败时探测并挂载 ext4，返回 0 表示成功；从 dirent 指定偏移读取 n 字节到用户或内核缓冲区，调用方须持有 entry-&gt;lock；从用户或内核缓冲区写入 n 字节到 dirent 指定偏移，必要时分配新簇；在目录中分配新 dirent，生成短文件名和长文件名条目，目录类型时创建 . 和 .. 条目。

**实现位置：** [`xv6-k210/kernel/fat32.c:78-130`](#evidence-E-MOD-fs-e5ee588a50)、[`xv6-k210/kernel/fat32.c:83-86`](#evidence-E-MOD-fs-b72e5f6bc0)、[`xv6-k210/kernel/fat32.c:90-91`](#evidence-E-MOD-fs-8ef2ca2fd7)、[`xv6-k210/kernel/fat32.c:171-190`](#evidence-E-MOD-fs-aaedbd220d)

---

<a id="module-signal"></a>
## 七、信号机制

**模块分析：**

本仓库的信号机制是 xv6 血缘内核为兼容 Linux 测试程序而做的极简桩实现。具体过程是：Linux rt_sigtimedwait 的桩实现，硬编码返回 SIGCHLD，不等待真实信号；Linux kill 的空实现，直接返回 0，不执行任何信号递送。

**实现位置：** [`xv6-k210/kernel/syscall.c:242-244`](#evidence-E-MOD-signal-154ab18396)、[`xv6-k210/kernel/syscall.c:1597-1600`](#evidence-E-MOD-signal-2a63ab7ec9)、[`xv6-k210/kernel/syscall.c:862-873`](#evidence-E-MOD-signal-5a2029f911)、[`xv6-k210/kernel/syscall.c:856-860`](#evidence-E-MOD-signal-c2a1f156d6)

---

<a id="module-ipc"></a>
## 八、进程间通信

**模块分析：**

本仓库的进程间通信以管道（pipe）为核心抽象，基于 xv6 经典实现扩展而来。具体过程是：分配两个文件对象和一个管道，初始化管道状态，失败时统一清理；关闭管道一端，唤醒对端等待者，两端都关闭时释放管道内存；从用户地址逐字节写入管道，缓冲区满时睡眠等待，读端关闭或进程被杀时返回-1；从管道逐字节读取到用户地址，缓冲区空且写端打开时睡眠，写端关闭时返回0；系统调用入口，分配管道并绑定到进程文件描述符表，将fd编号写回用户空间；Linux ABI兼容的pipe2系统调用，仅支持flags为0的情况，否则返回-1。

**实现位置：** [`xv6-k210/kernel/include/pipe.h:10-17`](#evidence-E-MOD-ipc-36a3ad087b)、[`xv6-k210/kernel/pipe.c:13-37`](#evidence-E-MOD-ipc-d964be76d6)、[`xv6-k210/kernel/pipe.c:67-92`](#evidence-E-MOD-ipc-a034694f2c)、[`xv6-k210/kernel/pipe.c:94-120`](#evidence-E-MOD-ipc-685daffe14)

---

<a id="module-net"></a>
## 九、网络

**模块分析：**

本轮分析未在仓库中定位到该模块的具体实现。

**实现位置：** [`xv6-k210/kernel/rv_public_output.c:29-32`](#evidence-E-MOD-net-3ae8236f93)、[`xv6-k210/kernel/rv_public_output.c:64-65`](#evidence-E-MOD-net-4652f5d244)、[`xv6-k210/kernel/syscall.c:99-120`](#evidence-E-MOD-net-6c827a0b6a)

---

<a id="module-drivers"></a>
## 十、驱动框架

**模块分析：**

本仓库的驱动框架以 disk.c 为统一抽象层，通过条件编译在 QEMU 的 virtio（虚拟机中常用的标准化半虚拟设备接口）-blk 与 K210 真机的 SD 卡（SPI（串行外设接口，用于处理器与存储卡等外设通信）+DMA（直接内存访问，设备可在较少占用处理器的情况下搬运数据））两套后端之间切换，向上层 bio.c 提供 disk_init/disk_read/disk_write/disk_intr 四个接口。核心抽象是块设备读写与中断完成通知的配对：virtio 侧用描述符链+used ring+睡眠唤醒，SD 卡侧用 SPI 命令序列+sleeplock+忙等。

**实现位置：** [`xv6-k210/kernel/disk.c:1-75`](#evidence-E-MOD-drivers-ad0227da56)、[`xv6-k210/kernel/virtio_disk.c:25-52`](#evidence-E-MOD-drivers-808e09fc80)、[`xv6-k210/kernel/sdcard.c:331-374`](#evidence-E-MOD-drivers-16ce5d5003)、[`xv6-k210/kernel/virtio_disk.c:175-256`](#evidence-E-MOD-drivers-f55b094854)

---

<a id="evidence-index"></a>
## 十一、验证范围与证据索引

### 验证范围与限制

- candidate limit reached: test_identity_output:8
- 未配置语义审查模型，候选未升级为确认问题。

### 问题明细

没有问题进入明细区。
### 证据索引

<a id="evidence-E-MOD-mm-a359669342"></a>
#### E-MOD-mm-a359669342

- 位置：`xv6-k210/kernel/kalloc.c:23-29`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-mm-9cb2722cee"></a>
#### E-MOD-mm-9cb2722cee

- 位置：`xv6-k210/kernel/kalloc.c:80-91`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-mm-ad821d988d"></a>
#### E-MOD-mm-ad821d988d

- 位置：`xv6-k210/kernel/kalloc.c:136-148`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-mm-3aa1cc8025"></a>
#### E-MOD-mm-3aa1cc8025

- 位置：`xv6-k210/kernel/vm.c:119-136`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-task-c63d2475b8"></a>
#### E-MOD-task-c63d2475b8

- 位置：`xv6-k210/kernel/proc.c:677-700`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-task-23eb99abc2"></a>
#### E-MOD-task-23eb99abc2

- 位置：`xv6-k210/kernel/proc.c:767-792`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-task-7fa4e7d23a"></a>
#### E-MOD-task-7fa4e7d23a

- 位置：`xv6-k210/kernel/vm.c:465-503`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-task-05e4d49a80"></a>
#### E-MOD-task-05e4d49a80

- 位置：`xv6-k210/kernel/vm.c:318-340`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-fs-e5ee588a50"></a>
#### E-MOD-fs-e5ee588a50

- 位置：`xv6-k210/kernel/fat32.c:78-130`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-fs-b72e5f6bc0"></a>
#### E-MOD-fs-b72e5f6bc0

- 位置：`xv6-k210/kernel/fat32.c:83-86`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-fs-8ef2ca2fd7"></a>
#### E-MOD-fs-8ef2ca2fd7

- 位置：`xv6-k210/kernel/fat32.c:90-91`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-fs-aaedbd220d"></a>
#### E-MOD-fs-aaedbd220d

- 位置：`xv6-k210/kernel/fat32.c:171-190`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-signal-154ab18396"></a>
#### E-MOD-signal-154ab18396

- 位置：`xv6-k210/kernel/syscall.c:242-244`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-signal-2a63ab7ec9"></a>
#### E-MOD-signal-2a63ab7ec9

- 位置：`xv6-k210/kernel/syscall.c:1597-1600`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-signal-5a2029f911"></a>
#### E-MOD-signal-5a2029f911

- 位置：`xv6-k210/kernel/syscall.c:862-873`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-signal-c2a1f156d6"></a>
#### E-MOD-signal-c2a1f156d6

- 位置：`xv6-k210/kernel/syscall.c:856-860`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-ipc-36a3ad087b"></a>
#### E-MOD-ipc-36a3ad087b

- 位置：`xv6-k210/kernel/include/pipe.h:10-17`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-ipc-d964be76d6"></a>
#### E-MOD-ipc-d964be76d6

- 位置：`xv6-k210/kernel/pipe.c:13-37`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-ipc-a034694f2c"></a>
#### E-MOD-ipc-a034694f2c

- 位置：`xv6-k210/kernel/pipe.c:67-92`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-ipc-685daffe14"></a>
#### E-MOD-ipc-685daffe14

- 位置：`xv6-k210/kernel/pipe.c:94-120`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-net-3ae8236f93"></a>
#### E-MOD-net-3ae8236f93

- 位置：`xv6-k210/kernel/rv_public_output.c:29-32`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-net-4652f5d244"></a>
#### E-MOD-net-4652f5d244

- 位置：`xv6-k210/kernel/rv_public_output.c:64-65`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-net-6c827a0b6a"></a>
#### E-MOD-net-6c827a0b6a

- 位置：`xv6-k210/kernel/syscall.c:99-120`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-drivers-ad0227da56"></a>
#### E-MOD-drivers-ad0227da56

- 位置：`xv6-k210/kernel/disk.c:1-75`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-drivers-808e09fc80"></a>
#### E-MOD-drivers-808e09fc80

- 位置：`xv6-k210/kernel/virtio_disk.c:25-52`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-drivers-16ce5d5003"></a>
#### E-MOD-drivers-16ce5d5003

- 位置：`xv6-k210/kernel/sdcard.c:331-374`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-drivers-f55b094854"></a>
#### E-MOD-drivers-f55b094854

- 位置：`xv6-k210/kernel/virtio_disk.c:175-256`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。
