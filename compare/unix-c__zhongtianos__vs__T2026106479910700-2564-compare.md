# zhongtianos ↔ T2026106479910700-2564 对比分析报告

> **生成时间**: 2026-07-02 07:39 UTC
> **对比方向**: 以 **zhongtianos** 为基准 (A), 分析 **T2026106479910700-2564** (B) 的差异
> **运行时长**: 732.36s · prompt=45469 · completion=70515 · reasoning=65333
> **综合相似度**: **0.101** (完全不同)

## 一、总览

| 维度 | A: zhongtianos | B: T2026106479910700-2564 |
|---|---|---|
| 家族 | `unix-c` | `unix-c` |
| Cargo 形态 | 单 crate | 单 crate |
| 文件数 | 0 | 0 |
| 代码行数 | 0 | 0 |
| syscall 数 | 306 | 169 |
| 启动方式 | `c_entry` | `c_entry` |
| trap handlers | — | — |
| 已实现模块 | 启动流程 / 内存管理 / 进程与任务调度 / 文件系统 / 信号机制 / 进程间通信 / 网络 / 驱动框架 / 系统调用层 | 启动流程 / 内存管理 / 进程与任务调度 / 文件系统 / 信号机制 / 进程间通信 / 网络 / 驱动框架 / 系统调用层 |
| 未实现模块 | 无 | 无 |

## 二、结构差异

**目录 Jaccard**: 0.05

| 仅 A 有 | 共有 | 仅 B 有 |
|---|---|---|
| `docs` | `include` | `doc` |
| `docs/assets` | `user` | `doc/reports` |
| `docs/old` | `user/include` | `doc/yungekc_log` |
| `include/asm` | — | `docker` |
| `include/dev` | — | `docker/riscv-toolchain` |
| `include/fs` | — | `hal` |
| `include/futex` | — | `hal/loongarch` |
| `include/ipc` | — | `hal/riscv` |
| `include/lib` | — | `hsai` |
| `include/lock` | — | `include/hal` |
| `include/mm` | — | `include/hsai` |
| `include/proc` | — | `include/kernel` |
| `include/signal` | — | `kernel` |
| `include/sys` | — | `kernel/driver` |
| `include/trap` | — | `kernel/fs` |

## 三、依赖差异

- A 总依赖数: **0**
- B 总依赖数: **0**
- 交集: **0**
- 仅 A 有: 0 项
- 仅 B 有: 0 项
- **依赖 Jaccard**: **1.0**

### 仅 A 有的代表性依赖 (前 15)

(无)

### 仅 B 有的代表性依赖 (前 15)

(无)

## 四、syscall 差异

- A 实现 syscall 数: **306**
- B 实现 syscall 数: **169**
- 共同实现: **154**
- **syscall Jaccard**: **0.4798**

### 4.1 仅 A 实现的 syscall (152 个)

`accept4`, `acct`, `add_key`, `adjtimex`, `arch_specific_syscall`, `bpf`, `capget`, `capset`, `clock_adjtime`, `clock_settime`, `close_range`, `delete_module`  
`execveat`, `fadvise64`, `fanotify_init`, `fanotify_mark`, `fdatasync`, `finit_module`, `flistxattr`, `flock`, `fremovexattr`, `fsconfig`, `fsetxattr`, `fsmount`  
`fsopen`, `fspick`, `get_mempolicy`, `getpriority`, `getxattr`, `init_module`, `inotify_add_watch`, `inotify_init1`, `inotify_rm_watch`, `io_cancel`, `io_destroy`, `io_getevents`  
`io_pgetevents`, `io_setup`, `io_submit`, `io_uring_enter`, `io_uring_register`, `io_uring_setup`, `ioprio_get`, `ioprio_set`, `kcmp`, `kexec_file_load`, `kexec_load`, `keyctl`  
`lgetxattr`, `listxattr`, `llistxattr`, `lookup_dcookie`, `lremovexattr`, `lsetxattr`, `mailread`, `mailwrite`, `mbind`, `memfd_create`, `migrate_pages`, `mkdir`  
`mlock`, `mlock2`, `mlockall`, `move_mount`, `move_pages`, `mq_getsetattr`, `mq_notify`, `mq_open`, `mq_timedreceive`, `mq_timedsend`, `mq_unlink`, `msgctl`  
`msgget`, `msgrcv`, `msgsnd`, `munlock`, `munlockall`, `name_to_handle_at`, `nfsservctl`, `open_by_handle_at`, `open_tree`, `openat2`, `perf_event_open`, `pidfd_getfd`  
`pidfd_open`, `pidfd_send_signal`, `pivot_root`, `pkey_alloc`, `pkey_free`, `pkey_mprotect`, `process_madvise`, `process_vm_readv`, `process_vm_writev`, `ptrace`, `quotactl`, `readahead`  
`reboot`, `recv`, `recvmmsg`, `remap_file_pages`, `removexattr`, `request_key`, `restart_syscall`, `riscv_flush_icache`, `rt_sigpending`, `rt_sigqueueinfo`, `rt_sigreturn`, `rt_sigsuspend`  
`rt_tgsigqueueinfo`, `sched_getattr`, `sched_getparam`, `sched_getscheduler`, `sched_rr_get_interval`, `sched_setattr`, `sched_setparam`, `sched_setscheduler`, `seccomp`, `semctl`, `semget`, `semop`  
`semtimedop`, `send`, `sendmmsg`, `set_mempolicy`, `setdomainname`, `setfsgid`, `setfsuid`, `setitimer`, `setns`, `setpriority`, `settimeofday`, `setxattr`  
`sigaltstack`, `signalfd4`, `socketpair`, `spawn`, `swapoff`, `swapon`, `sync_file_range`, `syncfs`, `tee`, `time`, `timer_create`, `timer_delete`  
`timer_getoverrun`, `timer_gettime`, `timer_settime`, `truncate`, `user_dispatch`, `userfaultfd`, `vhangup`, `vmsplice`

### 4.2 仅 B 实现的 syscall (15 个)

`fchmodat2`, `fork`, `futex_waitv`, `llseek`, `mknod`, `pread`, `pselect6_time32`, `sendfile64`, `settimer`, `sigaction`, `sigprocmask`, `sigreturn`  
`sleep`, `umount`, `wait`

## 五、函数签名 Jaccard

- A 公开函数签名数 (`pub fn`): **0**
- B 公开函数签名数: **0**
- 完全相同的签名: **0**
- **函数签名 Jaccard**: **1.0**

### 5.1 仅 A 暴露的接口样本 (前 10)

(无)

### 5.2 仅 B 暴露的接口样本 (前 10)

(无)

## 六、调用图差异 (轻量版)

> 第一版用集合层数字 + 高频函数名列表把『两个内核调用模式有多接近』讲清楚, 不画 mermaid (后续优化项)。

### 6.1 调用图统计

| 维度 | A | B |
|---|---|---|
| 节点数 (函数) | 0 | 0 |
| 边数 (调用关系) | 0 | 0 |
| 平均出度 | 0.0 | 0.0 |

### 6.2 节点 Jaccard: **0.0**

### 6.3 边 Jaccard: **0.0**

### 6.4 综合调用图相似度 = 0.5·node + 0.5·edge = **0.0**

### 6.5 高频被调函数 Top 10

**A (zhongtianos)**:

(无数据)

**B (T2026106479910700-2564)**:

(无数据)

## 七、模块级语义对照

> 每条差异点的 file:line 会进入 §九 的验证透明表逐条核对。

### 7.1 启动 (`boot`)

**对照判定**: 实现路径分化

**A 仓做法**: 多阶段引导序列，通过volatile标志协调多核同步，入口为_entry→start→main。

**B 仓做法**: 双架构入口与模块化初始化管线，从复位到首个用户进程调度，支持RISC-V和LoongArch。

**关键差异点**:

- **架构支持** (新增)
  - A: `kern/boot/entry.S:16-24` — 仅实现RISC-V汇编入口
  - B: `hal/loongarch/entry.S:10-13` — 增加了LoongArch DMW直映射入口
- **SBI调度模式** (替换)
  - A: `kern/boot/main.c:67-82` — 始终通过SBI_HART_START唤醒从核
  - B: `hal/riscv/start.c:39-46` — 提供非SBI模式通过mret降权进入S-mode
- **多核同步标志** (独立)
  - A: `kern/boot/main.c:61-65` — 使用hart_started,hart_first,kern_inited三个volatile
  - B: `kernel/SC7_start_kernel.c:104-105` — 使用started和pr_locking_enable自旋等待

### 7.2 内存管理 (`mm`)

**对照判定**: 独立设计

**A 仓做法**: 本模块实现了一系列用户空间内存分配器（位图分配器、多线程池分配器、异常安全分配器）及统一的 allocator_traits 接口。

**B 仓做法**: 本模块以 VMA 双向循环链表为进程虚拟地址空间的核心抽象，支持 mmap/munmap/mprotect/mremap 等系统调用；slab 分配器提供 8~1024 字节固定大小对象的快速缓存，底层依赖伙伴系统管理物理页。

**关键差异点**:

- **空闲内存管理策略** (独立)
  - A: `rootfs/usr/usr/include/c++/11.2.1/ext/bitmap_allocator.h:310-330` — 使用位图管理空闲块并查找
  - B: `include/kernel/slab.h:8-20` — slab使用空闲对象链表管理
- **并发访问模型** (独立)
  - A: `rootfs/usr/usr/include/c++/11.2.1/ext/mt_allocator.h:300-320` — 线程本地缓存减少全局锁竞争
  - B: `kernel/vma.c:676-686` — VMA链表操作无锁，存在并发风险
- **固定大小缓存分配** (独立)
  - A: `rootfs/usr/usr/include/c++/11.2.1/ext/mt_allocator.h:280-280` — __pool管理按大小分级的bin
  - B: `include/kernel/slab.h:22-22` — kmem_cache管理固定大小对象缓存
- **释放验证机制** (独立)
  - A: `rootfs/usr/usr/include/c++/11.2.1/ext/bitmap_allocator.h:400-420` — 未校验释放指针，存在double-free风险
  - B: `include/kernel/slab.h:15-15` — slab结构包含magic字段用于俘获错误

### 7.3 进程/任务 (`task`)

**对照判定**: 做法基本一致

**A 仓做法**: 该模块实现了进程与线程的管理核心，包括创建（sys_clone/sys_exec）、退出（sys_exit）、等待（sys_wait4）、定时睡眠（tsleep）、资源限制查询（sys_prlimit64）等。核心抽象是 thread_t（线程）和 proc_t（进程），通过全局队列（thread_runq/thread_freeq/thread_sleepq）管理生命状态。与 xv6 相比，增加了 CLONE_VM 线程共享、POSIX 定时睡眠（tsleep/clock_nanosleep）以及更多 Linux 兼容系统调用，但信号、进程组、调度策略等仍未实现，许多参数被忽略或用桩函数返回固定值。

**B 仓做法**: 本模块以进程控制块 `proc_t` 和线程结构 `thread_t` 为核心抽象，采用静态进程池（`pool[NPROC]`）预分配 PCB，支持多线程（通过线程队列 `thread_queue` 与独立 trapframe/context）。调度器采用简单轮询：遍历进程池 → 遍历线程队列 → 选择首个可运行线程 → `hsai_swtch` 切换上下文。与 xv6 原版相比，扩展了多线程支持、UID/GID、资源限制（`rlimit`）、命名空间（UTS）、`clone3`/`waitid` 等系统调用，但信号处理代码被大面积注释，依赖线程层重新实现。

(无显著差异)

### 7.4 文件系统 (`fs`)

**对照判定**: 独立设计

**A 仓做法**: 静态只读文件系统，编译时将文件嵌入内核数组，无磁盘操作。

**B 仓做法**: 基于lwext4的ext4文件系统，支持挂载、读写、日志，磁盘格式兼容。

**关键差异点**:

- **存储介质** (独立)
  - A: `kern/fs/static_files/sort_src.c:2-12` — 文件数据以常量数组嵌入内核
  - B: `kernel/fs/ext4.c:100-102` — 通过块设备表管理磁盘块设备
- **读写能力** (独立)
  - A: `kern/fs/static_files/sort_src.c:400-410` — 数组内容无写标志，只读
  - B: `kernel/fs/ext4.c:200` — ext4_link支持创建文件（写操作）
- **文件动态性** (独立)
  - A: `kern/fs/static_files/sort_src.c:2-12` — 文件内容编译时固定
  - B: `kernel/fs/ext4.c:252` — ext4_unlink支持删除文件
- **文件系统类型** (独立)
  - A: `kern/fs/static_files/sort_src.c:2-12` — 自定义静态文件系统
  - B: `kernel/fs/ext4_fs.c:45` — struct ext4_fs含超级块，ext4格式

### 7.5 信号 (`signal`)

**对照判定**: 实现路径分化

**A 仓做法**: 该模块以 per-thread 信号队列 (sigevent_t) 和 per-process 信号动作表 (sigaction_t) 为核心抽象，通过 sig_check/sig_return 在用户态入口/出口切换上下文。

**B 仓做法**: 本模块实现 POSIX 信号处理的核心流程，基于进程/线程粒度的信号掩码（sig_set）和待处理信号集（sig_pending），支持标准信号(1-31)与实时信号(SIGRTMIN-SIGRTMAX)。

**关键差异点**:

- **信号动作表存储粒度差异** (替换)
  - A: `kern/signal/sigevent.c:10-12` — 进程级 sigactions 二维数组
  - B: `kernel/signal.c:50-70` — 线程级 sigaction 数组
- **信号处理返回路径设计差异** (替换)
  - A: `kern/signal/sigentry.c:122` — 直接调用 sys_sigreturn 恢复上下文
  - B: `kernel/signal.c:526` — 固定跳板地址 SIGTRAMPOLINE 先执行 trampoline
- **SA_SIGINFO 扩展信息传递方式** (独立)
  - A: `include/signal/signal.h:30-42` — sigevent_t 预置 siginfo 地址字段
  - B: `kernel/signal.c:652-656` — setup_signal_frame 动态 copyout 填充

### 7.6 IPC (`ipc`)

**对照判定**: 实现路径分化

**A 仓做法**: 实现管道、System V共享内存和futex，管道基于xv6增加双层锁，共享内存固定内核地址，futex有限事件池双队列。

**B 仓做法**: 提供管道和futex，管道支持非阻塞I/O与动态缓冲区，futex含多种操作码，使用全局数组管理等待线程。

**关键差异点**:

- **管道缓冲区动态调整** (优化)
  - A: `kern/fs/fd/pipe.c:15` — 管道结构体无size字段，缓冲区固定
  - B: `kernel/fs/pipe.c:155-194` — 提供pipeset_size动态调整缓冲区大小
- **futex操作码扩展** (新增)
  - A: `kern/futex/futex_interface.c:18` — 仅实现futex_wait/wake基础操作
  - B: `include/kernel/futex.h:7-13` — 定义FUTEX_WAIT_BITSET等扩展操作码
- **futex队列管理方式** (独立)
  - A: `kern/futex/futex_event.c:32-41` — 使用freeq/usedq双队列管理事件
  - B: `kernel/futex.c:15-18` — 使用全局数组和valid标志管理等待队列

### 7.7 网络 (`net`)

**对照判定**: 独立设计

**A 仓做法**: 该模块在内核空间实现了一套纯软件定义的本地 socket 子系统，通过环形缓冲区和消息队列模拟网络通信，支持完整 POSIX 套接字 API。

**B 仓做法**: 该模块定义了一个自研轻量级 TCP/IP 协议栈，包含常见协议头部和 socket 接口，但极不完整，仅 sock_bind 可工作。

**关键差异点**:

- **功能完整性差异** (独立)
  - A: `kern/fs/socket.c:73-87` — 实现 socket 创建等完整接口
  - B: `kernel/socket.c:12-21` — send/recv 被注释，仅保留桩函数
- **核心抽象层次不同** (独立)
  - A: `kern/fs/socket.c:5-5` — Socket 结构体为本地通信核心抽象
  - B: `include/net.h:115-115` — tcp_sock_t 为 TCP 控制块，依赖真实协议
- **同步机制差异** (独立)
  - A: `kern/fs/socket.c:324-330` — accept 使用 sleep/wakeup 阻塞等待
  - B: `include/net.h:141-144` — wait_chan 无锁保护，存在数据竞争
- **内存管理方式不同** (独立)
  - A: `kern/fs/socket.c:54-65` — Message 预分配池，环形缓冲区管理
  - B: `include/virtio_net.h:36-39` — 接收缓冲区数组未定义大小，堆溢出风险
- **错误处理差异** (独立)
  - A: `kern/fs/socket.c:497-503` — 写端在缓冲区满时睡眠等待
  - B: `kernel/socket.c:83-84` — memmove 参数错误导致绑定无效

### 7.8 驱动 (`drivers`)

**对照判定**: 实现路径分化

**A 仓做法**: 仅实现virtio-blk块设备驱动（MMIO+split virtqueue），注释掉FEATURES_OK握手，rootfs含未匹配的UAPI头文件。

**B 仓做法**: VirtIO块设备驱动，支持RISC-V(MMIO)和LoongArch(PCI)两种传输层，LoongArch版本无锁且轮询。

**关键差异点**:

- **VirtIO FEATURES_OK握手实现** (取消)
  - A: `kern/driver/virtio.c:73-78` — FEATURES_OK代码被注释掉，跳过规范步骤
  - B: `kernel/driver/loongarch/virtio_disk.c:161` — 初始化过程包含标准FEATURES_OK状态设置
- **同步模型与锁机制** (独立)
  - A: `kern/driver/virtio.c:40` — 使用MTX_SPIN自旋锁保护队列操作
  - B: `kernel/driver/loongarch/virtio_disk.c:86-111` — disk结构体不含锁成员，明确不采用锁
- **I/O完成通知方式** (独立)
  - A: `kern/driver/virtio.c:305-307` — 中断处理中调用wakeup唤醒等待进程
  - B: `kernel/driver/loongarch/virtio_disk.c:440-448` — 使用双重忙等待轮询替代中断完成通知

### 7.9 系统调用 (`syscall`)

**对照判定**: 做法基本一致

**A 仓做法**: 系统调用层采用陷入-分发模型，核心为trapframe_t，扩展了浮点、COW、信号及Linux系统调用。

**B 仓做法**: 统一入口syscall()，switch-case分发170+ Linux系统调用，全局数组a[8]传参，使用copyin/copyout检查用户地址。

**关键差异点**:

- **参数传递与并发安全** (替换)
  - A: `kern/trap/utrap.c:254` — 通过td_trapframe直接传递参数
  - B: `kernel/syscall.c:10041-10044` — 全局数组a[8]存储参数，存在竞态


## 八、B 相对 A 的关键差异

**总评**: 两仓库尽管同属unix-c家族并源自xv6，但在架构支持、文件系统、内存管理、网络实现等核心子系统的设计上完全独立：A专注于RISC-V单架构、静态文件系统和纯软件socket模拟，而B追求双架构、ext4文件系统和自研TCP/IP栈，功能广度与实现深度各有取舍。

**整体定位**: 独立设计 — 两仓基本无对应关系

### 8.1 双架构条件编译策略

**类型**: 新增 · **显著度**: ★★★★☆

B采用条件编译支持RISC-V和LoongArch双架构，而A仅支持RISC-V；B在启动代码中保留了架构分支，避免了HAL抽象的性能损失但增加了维护成本。

- A: `kern/boot/entry.S:16-24` — RISC-V汇编入口，证明A仅支持RISC-V
- B: `kernel/SC7_start_kernel.c:82-86` — 条件编译分支，说明双架构实现

### 8.2 静态嵌入式 vs ext4文件系统

**类型**: 替换 · **显著度**: ★★★★★

A使用编译时常量数组嵌入文件数据，实现零拷贝只读访问；B集成lwext4库支持标准ext4磁盘格式，可读写但更复杂且存在早期不足。

- A: `kern/fs/static_files/sort_src.c:2-12` — 文件数据作为常量数组嵌入内核
- B: `kernel/fs/ext4.c:100-102` — 固定大小数组管理块设备资源

### 8.3 用户空间分配器 vs 内核VMA+slab

**类型**: 独立 · **显著度**: ★★★★☆

A的mm模块提供用户空间C++分配器（位图、线程池等），不涉及内核页表；B使用VMA双向链表管理进程地址空间并实现slab分配器，直接支持mmap等系统调用。

- A: `rootfs/usr/usr/include/c++/11.2.1/ext/mt_allocator.h:300-320` — 用户空间线程ID分配器，非内核组件
- B: `include/kernel/vma.h:35-51` — VMA结构体定义，管理虚拟地址空间

### 8.4 纯软件socket模拟 vs 自研TCP/IP原型

**类型**: 独立 · **显著度**: ★★★★☆

A用全局socket数组和环形缓冲区模拟网络通信，无需硬件；B定义自研TCP/IP协议栈结构但实现极不完整，核心send/recv被注释，处于早期原型阶段。

- A: `kern/fs/socket.c:73-87` — 位图分配socket，纯软件模拟
- B: `kernel/socket.c:12-21` — send/recv被注释，仅剩桩函数

### 8.5 RISC-V驱动使用锁 vs LoongArch无锁

**类型**: 独立 · **显著度**: ★★★☆☆

A的virtio-blk驱动使用自旋锁同步；B的RISC-V版本也有锁，但其LoongArch版本的disk结构体未包含spinlock，使用双重忙等待替代中断，存在并发风险。

- A: `kern/driver/virtio.c:40` — 互斥锁类型为自旋锁（关中断）
- B: `kernel/driver/loongarch/virtio_disk.c:86-111` — LoongArch disk结构体无spinlock成员


## 九、综合相似度评分

### 9.1 各维度得分

| 维度 | 权重 | A↔B 得分 | 加权 |
|---|---|---|---|
| 函数签名 Jaccard | 0.30 | 0.0 | 0.0 |
| syscall Jaccard | 0.20 | 0.4798 | 0.096 |
| 依赖 Jaccard | 0.20 | 0.0 | 0.0 |
| 调用图综合 | 0.20 | 0.0 | 0.0 |
| 目录 Jaccard | 0.10 | 0.05 | 0.005 |
| **合计** | **1.00** | — | **0.101** |

### 9.2 等级判定

| 范围 | 等级 |
|---|---|
| ≥ 0.70 | 高度相似 |
| 0.40 - 0.70 | 中度相似 |
| 0.15 - 0.40 | 低度相似 |
| < 0.15 | 完全不同 |

**本次评级**: **完全不同** (0.101)

### 9.3 公式

```text
overall = 0.30 × sig_jaccard
        + 0.20 × syscall_jaccard
        + 0.20 × deps_jaccard
        + 0.20 × callgraph_score (= 0.5 × node_jaccard + 0.5 × edge_jaccard)
        + 0.10 × dir_jaccard
```

## 十、附录: 警告与错误

### 警告 (1)

- 调用图抽取已跳过 (skip_callgraph=True)


---
*本报告由 oskag compare 自动生成, §七/§八 引用均经 verifier 二次校验, 不修饰失败。*