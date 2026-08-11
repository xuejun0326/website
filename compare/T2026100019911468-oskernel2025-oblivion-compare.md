# T2026100019911468-oskernel2025-oblivion 与人工指定历史候选 oskernel2021-x 对比分析报告

- A（目标作品）：`T2026100019911468-oskernel2025-oblivion`
- B（人工指定历史候选）：`oskernel2021-x`
- 候选身份：年份=2021、学校=北京大学、队伍=unknown
- 候选身份来源：`metadata.md`

## 一、对比结论

按本次可用维度计算，目标作品与人工指定历史候选的整体相似度为 **39.7%**，对应“低度相似”。

模块级对照覆盖 **14** 个标准模块。下一节按模块相似度从高到低排列。

## 二、模块相似度

模块分数由双方已有模块描述、接口、数据结构和源码位置综合形成。

| 排名 | 模块 | 相似度 | 对照结论 |
| ---: | --- | ---: | --- |
| 1 | 驱动框架 | 90% | 做法接近 |
| 2 | 启动流程 | 85% | 做法接近 |
| 3 | 文件系统 | 85% | 做法接近 |
| 4 | 系统调用层 | 80% | 做法接近 |
| 5 | 进程与任务调度 | 80% | 做法接近 |
| 6 | 内存管理 | 75% | 做法接近 |
| 7 | 网络 | 70% | 目标相同、实现路径不同 |
| 8 | 进程间通信 | 54% | 目标相同、实现路径不同 |
| 9 | 信号机制 | 45% | 目标相同、实现路径不同 |
| 10 | kernel | 0% | 仅历史候选实现 |
| 11 | kernel / include | 0% | 仅历史候选实现 |
| 12 | la-minimal | 0% | 仅目标作品实现 |
| 13 | xv6-k210 | 0% | 仅目标作品实现 |
| 14 | xv6-user | 0% | 仅历史候选实现 |

## 三、逐模块源码证据

### 3.1 驱动框架：90%

**对照判断：**做法接近。 共同抽象 disk.c、virtio（虚拟输入输出接口，即虚拟机中使用的标准设备协议） 环、SD 卡 SPI+DMA 与 PLIC 分发；差异仅在 VF2 平台 branch。

#### 相似点

- **统一块设备抽象层 disk.c**
  - A: `xv6-k210/kernel/disk.c:1-75` — 条件编译切换 virtio/SD 卡后端，提供四函数接口
  - B: `kernel/disk.c:1-49` — 同样用宏区分 QEMU/K210，提供统一块设备接口
- **virtio 描述符环静态分配**
  - A: `xv6-k210/kernel/virtio_disk.c:25-52` — 全局页对齐数组保证物理连续
  - B: `kernel/virtio_disk.c:20-52` — 同样用全局数组满足连续页要求
- **SD 卡读写持 sleeplock 并使用 SPI+DMA**
  - A: `xv6-k210/kernel/sdcard.c:331-374` — 全程持 sdcard_lock 串行 SPI 访问
  - B: `kernel/sdcard.c:300-380` — 同样用 sleeplock 保护 SPI 总线

#### 主要差异

- **平台支持范围不同**
  - A: `xv6-k210/kernel/disk.c:1-75` — 含 VISIONFIVE2 平台但直接 panic
  - B: `kernel/disk.c:1-49` — 仅 QEMU/非 QEMU 两分支，无 VF2

### 3.2 启动流程：85%

**对照判断：**做法接近。 两者同源xv6启动模型，主核串行初始化、从核per-hart初始化及栈布局一致，差异仅在平台数量和测试调度。

#### 实现概况

- **A：**以xv6-riscv main()为骨架，面向K210/QEMU/VisionFive2三平台提供entry汇编入口，hartid区分主从核，按序初始化并支持多核IPI唤醒和init测试调度。
- **B：**以main()为C入口，entry_qemu.S/entry_k210.S引导，主核串行初始化后IPI唤醒从核，从核per-hart初始化后进入scheduler，扩展FAT32和SD卡驱动。

### 3.3 文件系统：85%

**对照判断：**做法接近。 核心均为 FAT32+dirent 缓存，复用 xv6 块缓冲；差异在 A 增加 ext4 只读与 ABI（应用二进制接口，即程序与内核在二进制层面的调用约定） 兼容层。

#### 相似点

- **核心抽象 dirent 与 ecache**
  - A: `xv6-k210/kernel/fat32.c:78-130` — ecache 定长 dirent 数组，双向链表 LRU
  - B: `kernel/include/fat32.h:26-42` — dirent 含 parent/ref/sleeplock，ecache 缓存
- **read_fat 直接经块缓存读盘且无缓存层**
  - A: `xv6-k210/kernel/fat32.c:171-190` — read_fat 直接 bread，注释承认无缓存层
  - B: `kernel/fat32.c:176-190` — read_fat 经块缓存读 FAT 表项，同样无缓存层

#### 主要差异

- **ext4 只读挂载支持**
  - A: `xv6-k210/kernel/fat32.c:84-89` — fat32_init 探测 FAT32 失败后尝试 ext4 挂载
  - B: `kernel/fat32.c:84` — fat32_init 仅初始化 FAT32，无 ext4 逻辑
- **openat 实现路径不同**
  - A: `xv6-k210/kernel/syscall.c:430-470` — 临时改写 trapframe 复用 sys_open 模拟相对路径
  - B: `kernel/sysfile.c:308-350` — 从路径末尾向前拼接绝对路径实现 openat

### 3.4 系统调用层：80%

**对照判断：**做法接近。 共享 xv6 的 syscalls[] 分发与 argraw 参数框架，但 Linux ABI 兼容与 times 实现路径不同，降低相似度。

#### 相似点

- **syscalls[] 函数指针表分发**
  - A: `xv6-k210/kernel/syscall.c:133-166` — C99 指定初始化器按 SYS_ 编号索引映射处理函数。
  - B: `kernel/syscall.c:289-305` — 从 trapframe 的 a7 读取系统调用号查表，返回值写回 a0。
- **argraw/argint 参数提取框架**
  - A: `xv6-k210/kernel/syscall.c:47-67` — argraw 从 trapframe 的 a0-a5 直接读取参数。
  - B: `kernel/syscall.c:40-40` — argraw 同样从 trapframe 提取第 n 个参数。
- **fetchaddr 边界检查**
  - A: `xv6-k210/kernel/syscall.c:22-32` — 先检查 addr 是否超出 p->sz 再 copyin2。
  - B: `kernel/syscall.c:15-25` — 拷贝前检查地址是否超出进程大小 p->sz。

#### 主要差异

- **Linux ABI 兼容路径不同**
  - A: `xv6-k210/kernel/syscall.c:506-533` — linux_sys_openat 临时改写 trapframe 的 a0/a1 复用 sys_open。
  - B: `kernel/include/sysnum.h:37-38` — SYS_mkdir 与 SYS_readdir 都定义为 20，编号冲突。
- **times 系统调用实现差异**
  - A: `xv6-k210/kernel/syscall.c:726-747` — linux_sys_times 直接用全局 ticks 填充 tms_utime/stime。
  - B: `kernel/sysproc.c:230-240` — sys_times 将用户地址直接当内核指针解引用写入，未转换。

### 3.5 进程与任务调度：80%

**对照判断：**做法接近。 两仓均基于 xv6 进程模型，共享双页表与延迟内核栈设计，相似度高；差异集中在 COW（写时复制，即共享内存页只在写入时复制） 与调度策略扩展，故给 80。

#### 相似点

- **进程生命周期管理同源于 xv6**
  - A: `xv6-k210/kernel/proc.c:767-792` — allocproc 分配 trapframe/双页表/上下文，管理进程状态机
  - B: `kernel/proc.c:143-158` — allocproc 分配用户页表和内核页表，设置 forkret 与内核栈顶
- **每进程独立内核页表 kpagetable**
  - A: `xv6-k210/kernel/include/proc.h:47-75` — proc 新增 kpagetable 字段，支撑双页表直接访问用户内存
  - B: `kernel/include/proc.h:60-80` — proc 含独立 kpagetable，实现内核地址空间隔离
- **内核栈延迟分配**
  - A: `xv6-k210/kernel/proc.c:677-700` — procinit 预分配内核栈被注释，改为 allocproc 中统一设置 VKSTACK
  - B: `kernel/proc.c:53-68` — procinit 预分配代码被注释，内核栈改为在 proc_kpagetable 中按需分配

#### 主要差异

- **fork 内存复制策略：COW vs 深拷贝**
  - A: `xv6-k210/kernel/vm.c:465-503` — uvmcopy 清除 PTE_W 置 PTE_COW，父子共享物理页并 kaddref 计数
  - B: `kernel/vm.c:386-403` — uvmcopy 对每个用户页深拷贝，并同时映射用户页表和内核页表
- **调度算法扩展：多策略 vs 固定 RR**
  - A: `xv6-k210/kernel/proc.c:234-235` — sched_algo 全局变量支持 RR/PRIORITY/MLFQ 三种调度策略
  - B: `kernel/proc.c:563-583` — scheduler 仅按 round-robin 遍历 RUNNABLE 进程，无多策略支持

### 3.6 内存管理：75%

**对照判断：**做法接近。 共同基于 xv6 SV39 页表/freelist 分配器与双页表；A 引入 COW、懒分配，B 保留拷贝与预分配，核心相似度高。

#### 相似点

- **物理页分配器均为 freelist 链表**
  - A: `xv6-k210/kernel/kalloc.c:23-29` — kmem 自旋锁保护 freelist 空闲链表与 refcnt
  - B: `kernel/kalloc.c:23-35` — kmem 自旋锁保护 freelist 空闲链表
- **SV39 三级页表遍历 walk**
  - A: `xv6-k210/kernel/vm.c:119-136` — walk 实现三级遍历，alloc 控制中间页分配
  - B: `kernel/vm.c:117-136` — walk 实现三级遍历，返回叶级 PTE 指针
- **每进程独立内核页表 kpagetable**
  - A: `xv6-k210/kernel/vm.c:686-703` — 拷贝 kernel_pagetable 并映射内核栈
  - B: `kernel/vm.c:568-583` — 拷贝全局内核页表并映射 VKSTACK

#### 主要差异

- **uvmcopy 策略：COW 共享 vs 直接复制**
  - A: `xv6-k210/kernel/vm.c:483-498` — 可写页改 COW 共享物理页并 kaddref
  - B: `kernel/vm.c:378-412` — 复制父进程内存到子进程并维护双页表
- **内存分配时机：懒分配 vs 提前分配**
  - A: `xv6-k210/kernel/vm.c:253-273` — 缺页时按需分配并映射双页表
  - B: `kernel/vm.c:291-321` — uvmalloc 预先分配并同步建立两页表映射

### 3.7 网络：70%

**对照判断：**目标相同、实现路径不同。 两边均无网络栈与 socket 调用，但 A 以输出回放模拟评测，B 完全缺失，机制不同。

#### 相似点

- **系统调用表均无网络调用**
  - A: `xv6-k210/kernel/syscall.c:99-120` — 系统调用表无 socket/bind/accept 等网络调用
  - B: `kernel/syscall.c:155-198` — 系统调用表同样无任何网络相关条目

#### 主要差异

- **A 有输出回放模拟，B 无**
  - A: `xv6-k210/kernel/rv_public_output.c:64-65` — 启动时打印预置 netperf 输出块
  - B: `kernel/main.c:43-58` — 启动初始化序列无任何网络初始化

### 3.8 进程间通信：54%

**对照判断：**目标相同、实现路径不同。 双方承担相近职责，但接口组织或实现位置存在明显差异。

#### 相似点

- **实现位置与职责对照**
  - A: `xv6-k210/kernel/pipe.c:67-92` — pipewrite在缓冲区满时睡眠等待，使用copyin2替代原版copyin，逐字节拷贝用户数据到管道。
  - B: `kernel/pipe.c:84-87` — pipewrite 中保留了 xv6 原版 copyin 的注释代码，属于未清理的工程腐烂信号。
- **实现位置与职责对照**
  - A: `xv6-k210/kernel/pipe.c:13-37` — pipealloc分配两个文件对象和一个管道，通过文件描述符层暴露管道，失败时通过goto bad统一清理。
  - B: `kernel/pipe.c:13-36` — pipealloc 一次性分配管道和两个文件对象，读端可读不可写、写端可写不可读，错误路径用 goto bad 统一清理。
- **实现位置与职责对照**
  - A: `xv6-k210/kernel/sysfile.c:293-324` — sys_pipe将管道文件对象绑定到进程文件描述符表，失败时手动清理已分配的描述符槽位并释放文件。
  - B: `kernel/sysfile.c:379-407` — sys_pipe 创建管道后分配两个 fd 并写回用户数组，失败时清理 fd 表和文件引用，保证无泄漏。

### 3.9 信号机制：45%

**对照判断：**目标相同、实现路径不同。 共同桩化POSIX（可移植操作系统接口，即 Unix 类系统通用接口规范）调用但路径迥异：A纯Linux ABI桩，B基于killed标志；kill语义与编号体系不同。

#### 相似点

- **POSIX 信号系统调用均为桩实现**
  - A: `xv6-k210/kernel/syscall.c:1597-1600` — rt_sigaction/procmask 映射到同一桩函数
  - B: `kernel/sysproc.c:400-407` — 两函数直接返回 0
- **缺少真实信号递送机制**
  - A: `xv6-k210/kernel/syscall.c:862-873` — rt_sigtimedwait 硬编码返回 SIGCHLD
  - B: `kernel/sysproc.c:400-407` — sigaction/procmask 无实际语义

#### 主要差异

- **kill 实现路径不同**
  - A: `xv6-k210/kernel/syscall.c:856-860` — linux_sys_kill 为空操作
  - B: `kernel/proc.c:721-740` — kill 设置 killed 标志并唤醒进程
- **信号系统调用编号体系不同**
  - A: `xv6-k210/kernel/syscall.c:242-244` — Linux ABI 信号调用号宏
  - B: `kernel/include/sysnum.h:13` — SYS_kill=6，原生编号

### 3.10 kernel：0%

**对照判断：**仅历史候选实现。 只有一边实现该模块，未形成共同实现。

#### 实现概况

- **A：**未实现该模块。
- **B：**本仓库的 kernel 模块是 xv6-riscv 的深度改造版，核心抽象是双页表机制：每个进程同时维护用户页表 p->pagetable 与内核页表 p->kpagetable，后者将用户物理页以无 PTE_U 标志的方式映射进内核地址空间，使内核可直接解引用用户指针而无需 copyin/copyout。

### 3.11 kernel / include：0%

**对照判断：**仅历史候选实现。 只有一边实现该模块，未形成共同实现。

#### 实现概况

- **A：**未实现该模块。
- **B：**kernel/include 是 xv6-c 内核的头文件集合，定义了进程、内存、文件系统、陷阱处理、锁等核心抽象的类型与接口。它同时包含 K210 板级外设驱动头文件（fpioa/sysctl/utils 等）和 xv6-riscv 血缘的经典头文件（proc.h/trap（陷入，即异常、中断或系统调用进入内核的统一路径）.h/riscv.h 等），并针对 K210 与 QEMU 双平台做了条件编译适配。

### 3.12 la-minimal：0%

**对照判断：**仅目标作品实现。 只有一边实现该模块，未形成共同实现。

#### 实现概况

- **B：**未实现该模块。
- **A：**la-minimal 是 oblivion 项目的 LoongArch64 最小内核工件，核心抽象是一个受控的 PLV3 用户态 public runner：通过 entry.S 中的 la_user_probe 遍历 la_user_segment_table 中成对的起始/结束符号，对每个段发起 write=64 系统调用。

### 3.13 xv6-k210：0%

**对照判断：**仅目标作品实现。 只有一边实现该模块，未形成共同实现。

#### 实现概况

- **B：**未实现该模块。
- **A：**xv6-k210 是将 MIT xv6-riscv 移植到 Kendryte K210 双核 RISC-V SoC 的 C 内核变体。核心抽象包括：以 VIRT_OFFSET 虚拟地址偏移映射外设寄存器的内存布局、基于 SBI ecall 的时钟/控制台/IPI 服务、PLIC 外部中断分发、SD 卡 SPI 驱动与 DMA 通道、以及扩展了 COW/懒分配。

### 3.14 xv6-user：0%

**对照判断：**仅历史候选实现。 只有一边实现该模块，未形成共同实现。

#### 实现概况

- **A：**未实现该模块。
- **B：**xv6-user 是用户态程序集合，包含 init、sh、标准工具（cat/ls/grep/wc 等）、测试程序（usertests/grind/forktest）以及用户态运行时库（ulib/printf/umalloc）。

## 四、对比范围与方法

候选由用户人工指定；本报告只计算目标作品与该候选之间的相似度。
候选身份只从随仓库提供的元数据读取；未提供的字段明确标记为 unknown。
系统调用是用户程序请求内核服务的受控入口；下表只保留理解相似度所需的基础信息。

| 项目 | A：目标作品 `T2026100019911468-oskernel2025-oblivion` | B：人工指定历史候选 `oskernel2021-x` |
| --- | --- | --- |
| 技术家族 | xv6-c | xv6-c |
| 系统调用数量 | 32 | 39 |
| 描述模块 | 11 | 12 |
