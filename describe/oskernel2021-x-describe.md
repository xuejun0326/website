# oskernel2021-x · 作品描述报告

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

硬编码专项静态扫描发现 9 个候选，但没有候选通过确认门禁。

- 硬编码审查：规则候选 **9** 项；正式问题已确认 **0** 项、疑似 **0** 项、未验证 **0** 项。
- 静态工程审查：列出 **0** 项可能的编译、链接或未实现风险；模板句式匹配 **0** 次，占位表达 **0** 处。
- 设计审查：**0/8** 个模块形成完整支持的结论；**8/8** 个模块形成带源码位置的实现说明。
- 审查基线：`a93c01cd3439e4e35d8ee3207fe689027547a9fd`。

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
| 按测试名称或测试 ELF（可执行与可链接格式，常用于保存程序和内核映像）产生确定输出 | 未验证 | 1 | — | 候选扫描未完整完成。 |
| 针对评测场景的不合理优化 | 未验证 | 0 | — | 扫描未完整完成，不能给出无候选结论。 |
| 直接打印测试预期结果 | 未验证 | 0 | — | 扫描未完整完成，不能给出无候选结论。 |
| 修改测试或绕过失败用例 | 未验证 | 0 | — | 扫描未完整完成，不能给出无候选结论。 |

### 候选清单

- `HC-TIO-ff93eab73860`：`xv6-user/cat.c:25`，规则 `test-identity-controlled-output`。测试名称、测试 ELF 或参数参与分支，邻近代码直接输出或返回结果。

### 可能的编译、链接与实现问题

本次静态规则未定位到可能的编译、链接或未实现风险；这不是对实际构建结果的判断。

### 模板化生成痕迹

本次 Rust 源码扫描未发现预设的重复注释模板或占位表达。

---

<a id="project-overview"></a>
## 二、项目说明

该仓库 `oskernel2021-x` 属于 xv6-c 家族中的实验型内核，它在保留 xv6-riscv 教学内核的经典框架（进程表、Sv39（RISC-V 指令集架构的 39 位虚拟地址分页模式）页表（记录虚拟地址到物理地址映射关系的数据结构）、trap（处理器因系统调用、中断或异常进入内核的控制路径）处理、轮转调度）的同时，进行了多项深度改造：引入每进程独立内核页表（kpagetable）以支持内核直接访问用户内存，将文件系统从 inode（文件系统中记录文件属性和数据位置的索引节点）日志型替换为 FAT32（一种使用 32 位文件分配表的文件系统格式）实现，并扩展了 Linux 风格的系统调用（用户程序请求内核服务的受控入口）接口（如 openat、clone、mmap（把文件或匿名内存区域映射到进程虚拟地址空间的接口）等）。整体架构定位是“教学内核的 Linux 兼容性实验”，而非完整 Linux 兼容型或纯演示型。最值得评审注意的特点：一是双页表机制带来的设计复杂度和同步风险，二是 FAT32 文件系统替代 inode 的激进选择，三是系统调用层大量桩函数与编号冲突暴露的完成度问题。系统调用覆盖：39 项系统调用中约 13 个是直接返回 0 的桩函数，fork/execve/read/write 等核心路径有非空实现，但信号相关（rt_sigaction）和部分文件操作（mkdir）未实现或编号冲突。

---

<a id="module-boot"></a>
## 三、启动流程

**模块分析：**

启动流程以 kernel/main.c 的 main() 为 C 入口，由 entry_qemu.S / entry_k210.S 两个汇编入口按硬件平台分别引导。具体过程是：C 入口函数，按 hartid 分派主核/从核初始化路径，最终进入 scheduler() 开始调度；将 hartid & 0x1 写入 tp 寄存器，用于 per-CPU 变量寻址，双核下正确但扩展性受限；初始化 tickslock 自旋锁，在启动早期被 main() 调用，真正的定时器使能延迟到首次调度。

**实现位置：** [`kernel/main.c:31-83`](#evidence-E-MOD-boot-9b0a5c4f05)、[`kernel/entry_qemu.S:1-19`](#evidence-E-MOD-boot-52fe133a19)、[`kernel/entry_k210.S:1-28`](#evidence-E-MOD-boot-1241cfd1c5)、[`kernel/include/param.h:5-5`](#evidence-E-MOD-boot-62c1702a27)

---

<a id="module-mm"></a>
## 四、内存管理

**模块分析：**

本模块基于 xv6-riscv 的 SV39 三级页表框架，核心抽象是 pagetable_t（页表指针）与物理页分配器 kmem（freelist 链表 + 自旋锁）。具体过程是：从 freelist 弹出一个空闲页，返回内核可用的物理地址，失败返回 NULL；释放物理页到 freelist，用 0x01 填充捕获悬垂引用；遍历 SV39 三级页表，返回叶级 PTE（页表项，记录虚拟页映射、权限和状态）指针，alloc 控制是否创建中间页表页；建立虚拟地址到物理地址的映射，支持非页对齐的 va 和 size；拆除映射，do_free 控制是否释放物理页。

**实现位置：** [`kernel/kalloc.c:23-35`](#evidence-E-MOD-mm-92998ddba1)、[`kernel/vm.c:117-136`](#evidence-E-MOD-mm-368d981d8e)、[`kernel/vm.c:568-583`](#evidence-E-MOD-mm-a081872859)、[`kernel/proc.c:570-578`](#evidence-E-MOD-mm-fa7e7b7ced)

---

<a id="module-task"></a>
## 五、进程与任务调度

**模块分析：**

本模块以 struct proc 进程表为核心，实现基于状态机（UNUSED/SLEEPING/RUNNABLE/RUNNING/ZOMBIE）的进程生命周期管理，包括 allocproc/freeproc、fork/exit/wait、sleep/wakeup 同步原语，以及 round-robin 调度器 scheduler。具体过程是：每 CPU 调度循环，选择 RUNNABLE 进程，切换 satp（RISC-V 保存页表根地址和分页模式的控制寄存器）和上下文，无进程时 wfi；从当前进程切换到调度器，要求持有一把锁且中断关闭。

**实现位置：** [`kernel/proc.c:18-20`](#evidence-E-MOD-task-131054fa73)、[`kernel/include/proc.h:60-80`](#evidence-E-MOD-task-955ef5e029)、[`kernel/vm.c:568-584`](#evidence-E-MOD-task-abdc5b442f)、[`kernel/proc.c:143-158`](#evidence-E-MOD-task-914abca500)

---

<a id="module-fs"></a>
## 六、文件系统

**模块分析：**

本模块实现了一个基于 FAT32 的完整文件系统，核心抽象是 struct dirent（目录项缓存）和 struct file（文件描述符），通过 bio.c 的块缓存层访问磁盘。具体过程是：初始化文件表，清零所有 file 结构并初始化自旋锁；按文件类型分发读取操作，FD_ENTRY 分支持锁调用 eread 并更新偏移；读取 FAT32 引导扇区，初始化 BPB 参数、根目录和 ecache；读取 FAT 表项，返回下一簇号，通过块缓存访问磁盘；扫描 FAT 表分配空闲簇，标记为 EOC 并清零簇内容；实现 openat 系统调用，支持相对路径和 AT_CWDFD 特殊值。

**实现位置：** [`kernel/include/fat32.h:26-42`](#evidence-E-MOD-fs-64188fc1ed)、[`kernel/file.c:118-180`](#evidence-E-MOD-fs-c3593b19d4)、[`kernel/fat32.c:176-190`](#evidence-E-MOD-fs-2add10e9a6)、[`kernel/fat32.c:230-245`](#evidence-E-MOD-fs-2146abfa18)

---

<a id="module-signal"></a>
## 七、信号机制

**模块分析：**

本仓库的信号机制处于极早期/桩实现状态。具体过程是：设置进程 killed 标志并唤醒 SLEEPING 进程，返回 0 成功或 -1 未找到；POSIX（一组类 Unix 操作系统接口标准） sigaction 系统调用桩函数，直接返回 0，未实现；POSIX sigprocmask 系统调用桩函数，直接返回 0，未实现。

**实现位置：** [`kernel/include/proc.h:67-67`](#evidence-E-MOD-signal-a46f3c7c67)、[`kernel/proc.c:721-740`](#evidence-E-MOD-signal-d8df134cd8)、[`kernel/trap.c:76-76`](#evidence-E-MOD-signal-cc2d9c67bb)、[`kernel/sysproc.c:400-407`](#evidence-E-MOD-signal-7ab448c972)

---

<a id="module-ipc"></a>
## 八、进程间通信

**模块分析：**

本仓库的进程间通信以管道（pipe）为核心抽象，基于 xv6 经典实现扩展而来。具体过程是：分配管道和两个文件对象，设置读写端属性，失败时统一清理；关闭管道一端，唤醒对端，两端都关闭时释放内存；向管道写入 n 字节，满时持锁睡眠，返回实际写入字节数；从管道读取 n 字节，空时持锁睡眠，返回实际读取字节数；系统调用入口，创建管道并分配文件描述符，写回用户数组。

**实现位置：** [`kernel/include/pipe.h:8-17`](#evidence-E-MOD-ipc-b5a8b97e0f)、[`kernel/pipe.c:13-36`](#evidence-E-MOD-ipc-b29f034446)、[`kernel/pipe.c:67-90`](#evidence-E-MOD-ipc-fb3f105131)、[`kernel/pipe.c:94-118`](#evidence-E-MOD-ipc-30b5aa9667)

---

<a id="module-net"></a>
## 九、网络

**模块分析：**

本轮分析未在仓库中定位到该模块的具体实现。

**实现位置：** [`kernel/syscall.c:155-198`](#evidence-E-MOD-net-e7f0d57bde)、[`kernel/main.c:43-58`](#evidence-E-MOD-net-2c3703c0bb)、[`kernel/include/virtio.h:21-21`](#evidence-E-MOD-net-8d6b3e4606)

---

<a id="module-drivers"></a>
## 十、驱动框架

**模块分析：**

本仓库的驱动框架以 QEMU virtio（虚拟机中常用的标准化半虚拟设备接口）-blk 与 K210（基于 RISC-V 的双核系统级芯片，本项目支持的硬件平台之一）真实硬件两套后端为核心，通过 disk.c 的编译期宏（QEMU/非QEMU）统一抽象块设备读写与中断入口；UART（通用异步收发器，常用于串口输入输出） 16550a 提供串口收发与中断驱动的输出缓冲。具体过程是：平台无关的块设备初始化入口，按 QEMU 宏分发到 virtio_disk_init 或 sdcard_init。

**实现位置：** [`kernel/disk.c:1-49`](#evidence-E-MOD-drivers-8d5eda9ca0)、[`kernel/virtio_disk.c:20-52`](#evidence-E-MOD-drivers-7f30b56df6)、[`kernel/uart.c:89-137`](#evidence-E-MOD-drivers-2ecbac55b2)、[`kernel/plic.c:15-69`](#evidence-E-MOD-drivers-8150ce2ec3)

---

<a id="evidence-index"></a>
## 十一、验证范围与证据索引

### 验证范围与限制

- candidate limit reached: test_identity_output:8

### 问题明细

没有问题进入明细区。
### 证据索引

<a id="evidence-E-MOD-boot-9b0a5c4f05"></a>
#### E-MOD-boot-9b0a5c4f05

- 位置：`kernel/main.c:31-83`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-boot-52fe133a19"></a>
#### E-MOD-boot-52fe133a19

- 位置：`kernel/entry_qemu.S:1-19`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-boot-1241cfd1c5"></a>
#### E-MOD-boot-1241cfd1c5

- 位置：`kernel/entry_k210.S:1-28`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-boot-62c1702a27"></a>
#### E-MOD-boot-62c1702a27

- 位置：`kernel/include/param.h:5-5`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-mm-92998ddba1"></a>
#### E-MOD-mm-92998ddba1

- 位置：`kernel/kalloc.c:23-35`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-mm-368d981d8e"></a>
#### E-MOD-mm-368d981d8e

- 位置：`kernel/vm.c:117-136`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-mm-a081872859"></a>
#### E-MOD-mm-a081872859

- 位置：`kernel/vm.c:568-583`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-mm-fa7e7b7ced"></a>
#### E-MOD-mm-fa7e7b7ced

- 位置：`kernel/proc.c:570-578`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-task-131054fa73"></a>
#### E-MOD-task-131054fa73

- 位置：`kernel/proc.c:18-20`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-task-955ef5e029"></a>
#### E-MOD-task-955ef5e029

- 位置：`kernel/include/proc.h:60-80`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-task-abdc5b442f"></a>
#### E-MOD-task-abdc5b442f

- 位置：`kernel/vm.c:568-584`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-task-914abca500"></a>
#### E-MOD-task-914abca500

- 位置：`kernel/proc.c:143-158`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-fs-64188fc1ed"></a>
#### E-MOD-fs-64188fc1ed

- 位置：`kernel/include/fat32.h:26-42`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-fs-c3593b19d4"></a>
#### E-MOD-fs-c3593b19d4

- 位置：`kernel/file.c:118-180`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-fs-2add10e9a6"></a>
#### E-MOD-fs-2add10e9a6

- 位置：`kernel/fat32.c:176-190`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-fs-2146abfa18"></a>
#### E-MOD-fs-2146abfa18

- 位置：`kernel/fat32.c:230-245`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-signal-a46f3c7c67"></a>
#### E-MOD-signal-a46f3c7c67

- 位置：`kernel/include/proc.h:67-67`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-signal-d8df134cd8"></a>
#### E-MOD-signal-d8df134cd8

- 位置：`kernel/proc.c:721-740`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-signal-cc2d9c67bb"></a>
#### E-MOD-signal-cc2d9c67bb

- 位置：`kernel/trap.c:76-76`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-signal-7ab448c972"></a>
#### E-MOD-signal-7ab448c972

- 位置：`kernel/sysproc.c:400-407`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-ipc-b5a8b97e0f"></a>
#### E-MOD-ipc-b5a8b97e0f

- 位置：`kernel/include/pipe.h:8-17`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-ipc-b29f034446"></a>
#### E-MOD-ipc-b29f034446

- 位置：`kernel/pipe.c:13-36`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-ipc-fb3f105131"></a>
#### E-MOD-ipc-fb3f105131

- 位置：`kernel/pipe.c:67-90`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-ipc-30b5aa9667"></a>
#### E-MOD-ipc-30b5aa9667

- 位置：`kernel/pipe.c:94-118`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-net-e7f0d57bde"></a>
#### E-MOD-net-e7f0d57bde

- 位置：`kernel/syscall.c:155-198`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-net-2c3703c0bb"></a>
#### E-MOD-net-2c3703c0bb

- 位置：`kernel/main.c:43-58`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-net-8d6b3e4606"></a>
#### E-MOD-net-8d6b3e4606

- 位置：`kernel/include/virtio.h:21-21`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-drivers-8d5eda9ca0"></a>
#### E-MOD-drivers-8d5eda9ca0

- 位置：`kernel/disk.c:1-49`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-drivers-7f30b56df6"></a>
#### E-MOD-drivers-7f30b56df6

- 位置：`kernel/virtio_disk.c:20-52`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-drivers-2ecbac55b2"></a>
#### E-MOD-drivers-2ecbac55b2

- 位置：`kernel/uart.c:89-137`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。

<a id="evidence-E-MOD-drivers-8150ce2ec3"></a>
#### E-MOD-drivers-8150ce2ec3

- 位置：`kernel/plic.c:15-69`
- 校验：结构有效；语义未验证
- 说明：路径、行号、片段及 Git HEAD 内容一致；未执行单侧语义复核。
