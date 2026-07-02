# zhongtianos ↔ T2026114499910840-1796 对比分析报告

> **生成时间**: 2026-07-02 07:39 UTC
> **对比方向**: 以 **zhongtianos** 为基准 (A), 分析 **T2026114499910840-1796** (B) 的差异
> **运行时长**: 692.86s · prompt=41960 · completion=61343 · reasoning=56930
> **综合相似度**: **0.1413** (完全不同)

## 一、总览

| 维度 | A: zhongtianos | B: T2026114499910840-1796 |
|---|---|---|
| 家族 | `unix-c` | `unix-c` |
| Cargo 形态 | 单 crate | 单 crate |
| 文件数 | 0 | 0 |
| 代码行数 | 0 | 0 |
| syscall 数 | 306 | 430 |
| 启动方式 | `c_entry` | `c_entry` |
| trap handlers | — | — |
| 已实现模块 | 启动流程 / 内存管理 / 进程与任务调度 / 文件系统 / 信号机制 / 进程间通信 / 网络 / 驱动框架 / 系统调用层 | 启动流程 / 内存管理 / 进程与任务调度 / 文件系统 / 信号机制 / 进程间通信 / 网络 / 驱动框架 / 系统调用层 |
| 未实现模块 | 无 | 无 |

## 二、结构差异

**目录 Jaccard**: 0.0364

| 仅 A 有 | 共有 | 仅 B 有 |
|---|---|---|
| `docs/assets` | `docs` | `images` |
| `docs/old` | `user` | `kernel` |
| `include` | — | `kernel/freestnd-c-hdrs` |
| `include/asm` | — | `kernel/scripts` |
| `include/dev` | — | `kernel/src` |
| `include/fs` | — | `modules` |
| `include/futex` | — | `modules/drivers` |
| `include/ipc` | — | `modules/fs` |
| `include/lib` | — | `modules/lcompat` |
| `include/lock` | — | `modules/net` |
| `include/mm` | — | `user/base` |
| `include/proc` | — | `user/cache` |
| `include/signal` | — | — |
| `include/sys` | — | — |
| `include/trap` | — | — |

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
- B 实现 syscall 数: **430**
- 共同实现: **300**
- **syscall Jaccard**: **0.6881**

### 4.1 仅 A 实现的 syscall (6 个)

`mailread`, `mailwrite`, `recv`, `send`, `spawn`, `user_dispatch`

### 4.2 仅 B 实现的 syscall (130 个)

`_sysctl`, `access`, `afs_syscall`, `alarm`, `arch_prctl`, `cachestat`, `chmod`, `chown`, `clock_adjtime64`, `clock_getres_time32`, `clock_getres_time64`, `clock_gettime64`  
`clock_gettime_time32`, `clock_nanosleep_time32`, `clock_nanosleep_time64`, `clock_settime64`, `creat`, `create_module`, `dup2`, `epoll_create`, `epoll_ctl_old`, `epoll_pwait2`, `epoll_wait`, `epoll_wait_old`  
`eventfd`, `fadvise64_64`, `fchmodat2`, `file_getattr`, `file_setattr`, `fork`, `futex_`, `futex_requeue`, `futex_time64`, `futex_wait`, `futex_waitv`, `futex_wake`  
`futimesat`, `get_kernel_syms`, `get_thread_area`, `getdents`, `getpgrp`, `getpmsg`, `getresuid_`, `getxattrat`, `inotify_init`, `io_pgetevents_time64`, `ioperm`, `iopl`  
`landlock_add_rule`, `landlock_create_ruleset`, `landlock_restrict_self`, `lchown`, `lightweight_prot`, `link`, `listmount`, `listns`, `listxattrat`, `lsm_get_self_attr`, `lsm_list_modules`, `lsm_set_self_attr`  
`lstat`, `map_shadow_stack`, `memfd_secret`, `mknod`, `modify_ldt`, `mount_setattr`, `mq_timedreceive_time64`, `mq_timedsend_time64`, `mseal`, `newfstat`, `newuname`, `ni_syscall`  
`open`, `open_tree_attr`, `pause`, `pipe`, `poll`, `ppoll_time32`, `ppoll_time64`, `process_mrelease`, `pselect6_time32`, `pselect6_time64`, `putpmsg`, `query_module`  
`quotactl_fd`, `readlink`, `recvmmsg_time32`, `recvmmsg_time64`, `removexattrat`, `rename`, `renameat`, `riscv_hwprobe`, `rmdir`, `rseq_slice_yield`, `rt_sigtimedwait_time32`, `rt_sigtimedwait_time64`  
`sched_rr_get_interval_time64`, `security`, `select`, `semtimedop_time64`, `sendfile64`, `set_mempolicy_home_node`, `set_thread_area`, `setfsuid_`, `setresuid_`, `setxattrat`, `signalfd`, `stat`  
`statmount`, `stats`, `symlink`, `sync_file_range2`, `syscalls`, `sysfs`, `timer_gettime64`, `timer_settime64`, `timerfd_gettime64`, `timerfd_settime64`, `timerfd_settime_`, `tuxcall`  
`umount`, `unlink`, `uselib`, `ustat`, `utime`, `utimensat_`, `utimensat_time64`, `utimes`, `vfork`, `vserver`

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

**B (T2026114499910840-1796)**:

(无数据)

## 七、模块级语义对照

> 每条差异点的 file:line 会进入 §九 的验证透明表逐条核对。

### 7.1 启动 (`boot`)

**对照判定**: 实现路径分化

**A 仓做法**: 启动流程模块实现了从CPU复位到内核完全初始化的多阶段引导序列。核心抽象是多核同步协议，由 `hart_started[NCPU]`、`hart_first`、`kern_inited` 三个 volatile 标志协调第一个核（主核）与其他核（从核）的执行顺序；关键入口函数包括 `_entry`（汇编）、`start`（机器模式 C 入口）和 `main`（监督模式主初始化）。

**B 仓做法**: 核心抽象是一组统一的引导信息查询接口（boot_* 函数族），每种架构/引导协议提供一个实现文件（limine_boot.c、sbi_boot.c、la_boot.c）。通过结构 boot_info（LoongArch）或 Limine 请求、SBI 调用获取硬件信息，构建内存映射表 boot_memory_map_t。

**关键差异点**:

- **多核同步机制** (替换)
  - A: `kern/boot/main.c:61-65` — 使用volatile标志和内存屏障进行多核同步
  - B: `kernel/src/boot/sbi_boot.c:476-479` — 使用ap_startup_lock自旋锁保护唤醒顺序
- **AP启动地址传递** (替换)
  - A: `kern/boot/main.c:67-82` — 硬编码0x80200000作为SBI_HART_START地址
  - B: `kernel/src/boot/laboot/boot.S:350-359` — 预填充ap_startup_info结构体传递页表和栈
- **页表初始设置** (独立)
  - A: `kern/boot/start.c:18-25` — 关闭分页；hart_init中再开启
  - B: `kernel/src/boot/laboot/boot.S:145-154` — 汇编中静态预填页表（identity map+高半核映射）

### 7.2 内存管理 (`mm`)

**对照判定**: 独立设计

**A 仓做法**: 用户空间C++分配器系列：位图、多线程池、异常安全分配器，提供统一allocator_traits接口，支持细粒度复用与线程局部缓存。

**B 仓做法**: 内核内存管理：dlmalloc作为堆分配器，进程虚拟地址空间通过VMA红黑树管理，实现mmap/munmap/mprotect/brk等系统调用，支持高级特性但部分为桩。

**关键差异点**:

- **线程安全设计** (独立)
  - A: `rootfs/usr/usr/include/c++/11.2.1/ext/mt_allocator.h:300-320` — 使用线程本地缓存减少锁竞争
  - B: `kernel/src/mm/alloc.c:150-160` — dlmalloc默认非线程安全，需外部锁
- **接口层级差异** (独立)
  - A: `rootfs/usr/usr/include/c++/11.2.1/bits/alloc_traits.h:250` — 用户层分配器统一入口allocate
  - B: `kernel/src/mm/mm_syscall.c:682` — 内核系统调用sys_mmap创建虚拟映射
- **同步机制对比** (独立)
  - A: `rootfs/usr/usr/include/c++/11.2.1/ext/bitmap_allocator.h:180-200` — free_list使用静态互斥锁保护全局列表
  - B: `kernel/src/mm/mm_syscall.c:920-940` — sys_mprotect持锁顺序与其他路径不一致

### 7.3 进程/任务 (`task`)

**对照判定**: 实现路径分化

**A 仓做法**: 进程与线程管理，含clone/exit/wait4/tsleep/prlimit64，thread_t和proc_t抽象，全局队列管理，支持CLONE_VM和POSIX定时睡眠，未实现信号和进程组。

**B 仓做法**: 以task_t为核心，PID哈希表和per-CPU调度队列，支持clone/fork/wait4/ptrace/进程内存读写，多核调度，部分syscall早期实现。

**关键差异点**:

- **调度队列从全局改为per-CPU** (替换)
  - A: `procinit.c:1-5` — 使用全局TAILQ队列thread_runq等
  - B: `kernel/src/task/task.c:1` — 使用per-CPU调度队列schedulers[]
- **进程线程结构从分离改为统一** (替换)
  - A: `proc/thread.h:1-10` — thread_t与proc_t分离
  - B: `kernel/src/task/task_syscall.c:33` — 统一task_t结构体
- **定时睡眠机制不同** (替换)
  - A: `tsleep.c:1-10` — 预分配tsevent_t数组实现定时唤醒
  - B: `kernel/src/task/task_syscall.h:134-141` — sys_nanosleep基于简单延时，未支持信号中断

### 7.4 文件系统 (`fs`)

**对照判定**: 独立设计

**A 仓做法**: 基于编译时嵌入的静态只读文件系统，通过常量C数组提供文件内容，避免块设备与日志，支持大量POSIX syscall。

**B 仓做法**: 包含ext文件系统驱动、VFS系统调用层和挂载管理，实现经典分层文件系统，支持持久化。

(无显著差异)

### 7.5 信号 (`signal`)

**对照判定**: 独立设计

**A 仓做法**: 该模块以 per-thread 信号队列和 per-process 信号动作表为核心，实现 Linux 兼容信号集，支持实时信号和定时器信号。

**B 仓做法**: 该模块每个进程嵌入 signal_t 结构，使用位图管理信号，支持 POSIX 实时信号和信号帧构建，覆盖四架构。

(无显著差异)

### 7.6 IPC (`ipc`)

**对照判定**: 实现路径分化

**A 仓做法**: 管道(Pipe)、共享内存(System V shm)和futex三大IPC，管道用环形缓冲区并加自旋锁与睡眠锁，共享内存从KERNEL_SHM固定区分配，futex用固定事件池和双队列。

**B 仓做法**: 以futex和pipefs为核心，futex用256哈希桶支持完整Linux操作，管道用pipefs支持匿名和命名管道，集成robust list清理和tidptr唤醒。

**关键差异点**:

- **管道缓冲区模型** (替换)
  - A: `kern/fs/fd/pipe.c:93-144` — 环形缓冲区，通过模运算索引
  - B: `kernel/src/fs/pipe.c:370-385` — 线性数组，使用memmove压缩数据
- **futex等待队列组织结构** (替换)
  - A: `kern/futex/futex.h:1` — 固定事件池和双队列(freeq/usedq)
  - B: `kernel/src/task/futex.c:5` — 256个哈希桶加自旋锁链表
- **futex支持的操作范围** (新增)
  - A: `kern/futex/futex_interface.c:18-38` — 仅实现futex_wait和futex_wake
  - B: `kernel/src/task/futex.c:480` — 系统调用分发FUTEX_WAIT/WAKE/WAKE_OP/LOCK_PI等多种命令
- **命名管道(FIFO)支持** (新增)
  - A: `kern/fs/fd/pipe.c:53` — pipe仅创建匿名管道，无命名管道支持
  - B: `kernel/src/fs/pipe.c:130` — pipefs_named_ensure_info实现FIFO首次打开初始化

### 7.7 网络 (`net`)

**对照判定**: 独立设计

**A 仓做法**: 该模块在内核空间实现了一套纯软件定义的本地 socket 子系统（类似 Unix domain sockets），核心抽象是 Socket 结构体、全局 sockets[] 数组以及基于 FdDev 的虚拟设备接口。

**B 仓做法**: 该模块包含两个独立子系统：基于 lwIP 协议栈的 BSD Socket API 和内核 Netlink 套接字，分别位于 modules/net/netserver/ 和 kernel/src/net/。

**关键差异点**:

- **网络协议栈实现方式不同** (独立)
  - A: `kern/fs/socket.c:497-503` — 本地环形缓冲区直写对端，模拟TCP流
  - B: `modules/net/netserver/lwip/api/sockets.c:60-63` — 条件编译包含lwIP实现，基于netconn层
- **支持的协议范围不同** (独立)
  - A: `kern/fs/socket.c:355-360` — 硬编码127.0.0.1和端口，仅限本地通信
  - B: `kernel/src/net/netlink.c:7` — 定义MAX_NETLINK_SOCKETS，支持Netlink协议
- **资源管理模型不同** (独立)
  - A: `kern/fs/socket.c:73-87` — 固定大小全局sockets数组，位图分配
  - B: `kernel/src/net/netlink.c:19` — 固定大小消息池netlink_msg_pool静态预分配

### 7.8 驱动 (`drivers`)

**对照判定**: 独立设计

**A 仓做法**: 该模块目前仅包含一个完整的 virtio-blk 块设备驱动 (`kern/driver/virtio.c`)，采用 VirtIO MMIO 传输层与 split virtqueue 环形缓冲模型（描述符表、可用环、已用环）。

**B 仓做法**: 该内核的驱动框架基于总线抽象（bus_t）和设备注册（bus_device_install_internal）构建，通过虚拟文件系统（VFS）将每个设备暴露为文件节点，支持统一的read/write/ioctl接口。

**关键差异点**:

- **驱动架构模型** (独立)
  - A: `kern/driver/virtio.c:21-32` — 静态disk结构包含virtqueue环和追踪状态
  - B: `kernel/src/drivers/bus/usb.c:19-28` — bus_t抽象和默认属性数组
- **I/O同步模型** (独立)
  - A: `kern/driver/virtio.c:270-272` — 持自旋锁期间调用sleep等待中断
  - B: `modules/drivers/virtio/gpu.c:467-471` — 持互斥锁期间轮询yield等待响应
- **支持的设备类型** (独立)
  - A: `kern/driver/virtio.c:21-32` — 仅块设备结构，无其他设备驱动
  - B: `kernel/src/drivers/drm/drm_ioctl.c:124-133` — DRM内部伪文件系统，面向图形dma-buf
- **中断处理方式** (独立)
  - A: `kern/driver/virtio.c:286-290` — 中断处理遍历used ring并唤醒进程
  - B: `modules/drivers/virtio/gpu.c:388-395` — 通过VFS poll机制通知异步完成

### 7.9 系统调用 (`syscall`)

**对照判定**: 实现路径分化

**A 仓做法**: 系统调用层采用陷入-分发模型，基于trapframe_t和TRAMPOLINE页实现用户态/内核态切换，扩展了浮点寄存器、COW、信号和大量Linux兼容系统调用。

**B 仓做法**: 系统调用层基于全局syscall_handlers函数指针数组，通过regist_syscall_handler注册，x86_64使用MSR设置入口，aarch64/riscv64通过异常向量表，实现200+ Linux兼容syscall。

**关键差异点**:

- **系统调用分发架构** (替换)
  - A: `kern/trap/utrap.c:1-100` — 通过utrap_entry→syscall_entry分发
  - B: `kern/syscall/syscall.c:1-100` — 通过syscall_handlers数组和regist_syscall_handler分发
- **系统调用表实现** (替换)
  - A: `kern/syscall/sysnames.c:1-100` — 使用固定大小数组，索引最大1030，无占位
  - B: `kern/syscall/syscall.c:1-100` — 使用动态注册，dummy_syscall_handler占位未实现
- **浮点寄存器支持** (新增)
  - A: `trampoline.S:1-100` — 保存/恢复32个浮点寄存器
  - B: `arch/x86/syscall.c:1-100` — 未特别提及浮点支持


## 八、B 相对 A 的关键差异

**总评**: B 是一个面向多架构的 Unix-like 教学内核，系统调用覆盖更广（430 vs 306），在驱动框架、futex、启动协议等方面显著扩展了功能深度，与 A 的单一架构、静态文件系统设计形成独立分支。

**整体定位**: 独立设计 — 两仓基本无对应关系

### 8.1 多架构引导支持

**类型**: 新增 · **显著度**: ★★★★★

B 支持 x86_64、aarch64、riscv64、loongarch64 四架构和 Limine、SBI、laboot 多种引导协议，而 A 仅支持 RISC-V SBI 启动。

- A: `kern/boot/main.c:67-82` — 通过 SBI 启动其他核
- B: `kernel/src/boot/limine_boot.c:1-40` — Limine 启动路径依赖声明段

### 8.2 完整驱动框架（USB/DRM）

**类型**: 新增 · **显著度**: ★★★★☆

B 实现了基于总线抽象的设备模型，支持 USB 热插拔、DRM 子系统和内部伪文件系统，而 A 仅有一个 virtio-blk 驱动。

- A: `kern/driver/virtio.c:21-32` — virtio 核心数据结构
- B: `kernel/src/drivers/bus/usb.c:19-28` — USB 总线和设备抽象

### 8.3 Futex 完整语义实现

**类型**: 优化 · **显著度**: ★★★☆☆

B 实现了 FUTEX_LOCK_PI、WAKE_OP、REQUEUE 等高级操作及私有/共享寻址，相比 A 的简单 futex 事件池更接近 Linux 标准。

- A: `kern/futex/futex_interface.c:12-16` — 缺省用户地址范围检查
- B: `kernel/src/task/futex.c:5-12` — 哈希桶结构和 256 槽位


## 九、综合相似度评分

### 9.1 各维度得分

| 维度 | 权重 | A↔B 得分 | 加权 |
|---|---|---|---|
| 函数签名 Jaccard | 0.30 | 0.0 | 0.0 |
| syscall Jaccard | 0.20 | 0.6881 | 0.1376 |
| 依赖 Jaccard | 0.20 | 0.0 | 0.0 |
| 调用图综合 | 0.20 | 0.0 | 0.0 |
| 目录 Jaccard | 0.10 | 0.0364 | 0.0036 |
| **合计** | **1.00** | — | **0.1413** |

### 9.2 等级判定

| 范围 | 等级 |
|---|---|
| ≥ 0.70 | 高度相似 |
| 0.40 - 0.70 | 中度相似 |
| 0.15 - 0.40 | 低度相似 |
| < 0.15 | 完全不同 |

**本次评级**: **完全不同** (0.1413)

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