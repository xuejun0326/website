# zhongtianos ↔ T2026100069910698-3954 对比分析报告

> **生成时间**: 2026-07-02 07:35 UTC
> **对比方向**: 以 **zhongtianos** 为基准 (A), 分析 **T2026100069910698-3954** (B) 的差异
> **运行时长**: 474.01s · prompt=43725 · completion=45009 · reasoning=40729
> **综合相似度**: **0.1023** (完全不同)

## 一、总览

| 维度 | A: zhongtianos | B: T2026100069910698-3954 |
|---|---|---|
| 家族 | `unix-c` | `unix-c` |
| Cargo 形态 | 单 crate | 单 crate |
| 文件数 | 0 | 0 |
| 代码行数 | 0 | 0 |
| syscall 数 | 306 | 155 |
| 启动方式 | `c_entry` | `c_entry` |
| trap handlers | — | — |
| 已实现模块 | 启动流程 / 内存管理 / 进程与任务调度 / 文件系统 / 信号机制 / 进程间通信 / 网络 / 驱动框架 / 系统调用层 | 启动流程 / 内存管理 / 进程与任务调度 / 文件系统 / 网络 / 驱动框架 / 系统调用层 |
| 未实现模块 | 无 | 信号机制 / 进程间通信 |

## 二、结构差异

**目录 Jaccard**: 0.0392

| 仅 A 有 | 共有 | 仅 B 有 |
|---|---|---|
| `docs/assets` | `docs` | `src` |
| `docs/old` | `linker` | `src/arch` |
| `include` | — | `src/drivers` |
| `include/asm` | — | `src/include` |
| `include/dev` | — | `src/kernel` |
| `include/fs` | — | `src/user` |
| `include/futex` | — | `testbin` |
| `include/ipc` | — | `tools` |
| `include/lib` | — | — |
| `include/lock` | — | — |
| `include/mm` | — | — |
| `include/proc` | — | — |
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
- B 实现 syscall 数: **155**
- 共同实现: **152**
- **syscall Jaccard**: **0.4919**

### 4.1 仅 A 实现的 syscall (154 个)

`acct`, `add_key`, `adjtimex`, `arch_specific_syscall`, `bpf`, `capget`, `capset`, `clock_adjtime`, `clock_getres`, `clock_settime`, `close_range`, `copy_file_range`  
`delete_module`, `execveat`, `faccessat2`, `fadvise64`, `fanotify_init`, `fanotify_mark`, `fchdir`, `fgetxattr`, `finit_module`, `flistxattr`, `flock`, `fremovexattr`  
`fsconfig`, `fsetxattr`, `fsmount`, `fsopen`, `fspick`, `fstatat`, `get_mempolicy`, `getcpu`, `getitimer`, `getxattr`, `init_module`, `inotify_add_watch`  
`inotify_init1`, `inotify_rm_watch`, `io_cancel`, `io_destroy`, `io_getevents`, `io_pgetevents`, `io_setup`, `io_submit`, `io_uring_enter`, `io_uring_register`, `io_uring_setup`, `ioprio_get`  
`ioprio_set`, `kcmp`, `kexec_file_load`, `kexec_load`, `keyctl`, `lgetxattr`, `listxattr`, `llistxattr`, `lookup_dcookie`, `lremovexattr`, `lsetxattr`, `mailread`  
`mailwrite`, `mbind`, `memfd_create`, `migrate_pages`, `mkdir`, `mknodat`, `mlock2`, `move_mount`, `move_pages`, `mq_getsetattr`, `mq_notify`, `mq_open`  
`mq_timedreceive`, `mq_timedsend`, `mq_unlink`, `msgctl`, `msgget`, `msgrcv`, `msgsnd`, `name_to_handle_at`, `nfsservctl`, `open_by_handle_at`, `open_tree`, `openat2`  
`perf_event_open`, `personality`, `pidfd_getfd`, `pidfd_open`, `pidfd_send_signal`, `pivot_root`, `pkey_alloc`, `pkey_free`, `pkey_mprotect`, `prctl`, `preadv2`, `process_madvise`  
`process_vm_readv`, `process_vm_writev`, `ptrace`, `pwritev2`, `quotactl`, `readahead`, `reboot`, `recv`, `recvmmsg`, `remap_file_pages`, `removexattr`, `request_key`  
`restart_syscall`, `riscv_flush_icache`, `sched_getattr`, `sched_rr_get_interval`, `sched_setattr`, `seccomp`, `semctl`, `semget`, `semop`, `semtimedop`, `send`, `sendmmsg`  
`set_mempolicy`, `setdomainname`, `setfsgid`, `setfsuid`, `setgroups`, `sethostname`, `setns`, `setregid`, `setreuid`, `setrlimit`, `setsid`, `settimeofday`  
`setxattr`, `signalfd4`, `spawn`, `splice`, `swapoff`, `swapon`, `symlinkat`, `sync_file_range`, `tee`, `time`, `timer_create`, `timer_delete`  
`timer_getoverrun`, `timer_gettime`, `timer_settime`, `truncate`, `unshare`, `user_dispatch`, `userfaultfd`, `vhangup`, `vmsplice`, `waitid`

### 4.2 仅 B 实现的 syscall (3 个)

`max`, `renameat`, `vfork`

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

**B (T2026100069910698-3954)**:

(无数据)

## 七、模块级语义对照

> 每条差异点的 file:line 会进入 §九 的验证透明表逐条核对。

### 7.1 启动 (`boot`)

**对照判定**: 独立设计

**A 仓做法**: 多阶段多核启动，含汇编入口、机器模式C入口和监督模式主初始化，通过标志同步主从核，扩展了SBI/DTB/子系统初始化。

**B 仓做法**: 汇编入口boot.S（RISC-V和LoongArch），设置栈、清零BSS、跳转kernel_main，极简设计，无多核支持。

**关键差异点**:

- **多核同步协议** (新增)
  - A: `kern/boot/main.c:173-177` — 使用volatile标志识别主核，同步从核启动顺序
  - B: `src/arch/riscv64/boot.S:4-14` — 仅单核启动，无多核同步代码
- **固件参数传递** (新增)
  - A: `kern/boot/start.c:18-25` — 保存DTB入口到dtbEntry，用于硬件探测
  - B: `src/arch/riscv64/boot.S:4-14` — 未保存a0/a1参数，直接跳转C函数
- **栈分配策略** (优化)
  - A: `kern/boot/entry.S:16-24` — 每核计算独立栈指针，支持多核隔离
  - B: `src/arch/riscv64/boot.S:25-28` — 仅声明一个boot_stack，所有核共享
- **从核启动方式** (新增)
  - A: `kern/boot/main.c:67-82` — 通过SBI_HART_START接口唤醒其他核
  - B: `src/arch/riscv64/boot.S:4-14` — 无多核启动相关逻辑
- **多架构支持** (新增)
  - A: `kern/boot/entry.S:16-24` — 仅提供RISC-V架构实现
  - B: `src/arch/loongarch64/boot.S:3-13` — 提供LoongArch64启动实现，架构独立

### 7.2 内存管理 (`mm`)

**对照判定**: 独立设计

**A 仓做法**: 用户空间C++分配器库，提供位图、多线程池、异常安全分配器及统一allocator_traits接口，支持细粒度内存复用和线程局部缓存。

**B 仓做法**: 基于Sv39的虚拟内存管理，包含物理页分配器、页表操作、COW fork、共享内存和用户地址校验，面向单核设计，硬编码256 MiB内存。

**关键差异点**:

- **模块层次** (独立)
  - A: `rootfs/usr/usr/include/c++/11.2.1/bits/alloc_traits.h:250-250` — 统一分配入口，用户空间实现
  - B: `src/kernel/vm.c:171-171` — 内核物理页分配函数
- **分配粒度** (独立)
  - A: `rootfs/usr/usr/include/c++/11.2.1/ext/mt_allocator.h:280-280` — 多级bin支持多种大小
  - B: `src/kernel/vm.c:171-193` — 固定4KB页分配
- **并发与锁** (独立)
  - A: `rootfs/usr/usr/include/c++/11.2.1/ext/mt_allocator.h:300-320` — 线程局部缓存与互斥锁
  - B: `src/kernel/vm.c:424-444` — 单核sfence_vma无多核TLB击落
- **核心数据结构** (独立)
  - A: `rootfs/usr/usr/include/c++/11.2.1/ext/bitmap_allocator.h:130-130` — free链表管理空闲块
  - B: `src/kernel/vm.c:14-14` — PageInfo管理物理页

### 7.3 进程/任务 (`task`)

**对照判定**: 独立设计

**A 仓做法**: 该模块实现了进程与线程的管理核心，包括创建、退出、等待、定时睡眠、资源限制查询等，核心抽象是thread_t和proc_t，通过全局队列管理，但信号等未实现。

**B 仓做法**: 该模块以静态任务表实现进程管理，支持协作式轮转调度，完整clone标志，信号机制完整，单核无锁设计。

(无显著差异)

### 7.4 文件系统 (`fs`)

**对照判定**: 独立设计

**A 仓做法**: 基于编译时嵌入的静态只读文件系统，通过常量C数组提供文件内容，覆盖大量POSIX syscall但放弃写支持。

**B 仓做法**: 双层文件系统：memfs内存文件系统+只读ext4，copy-on-open，扁平命名空间，支持写操作但缺乏并发保护。

**关键差异点**:

- **文件存储后端** (独立)
  - A: `kern/fs/static_files/sort_src.c:2-12` — 使用编译时常量数组嵌入文件数据
  - B: `src/kernel/fs.c:21-35` — 使用MemFile数组和64MiB内存池作为存储
- **写支持** (新增)
  - A: `kern/fs/static_files/sort_src.c:400-410` — 数组内容只含数据，无写标志，不支持写操作
  - B: `src/kernel/fs.c:868-868` — 实现了fs_write系统调用，支持memfs写入
- **目录结构** (独立)
  - A: `kern/fs/static_files/sort_src.c:200-210` — 文件数据不含目录元数据，无树状结构
  - B: `src/kernel/fs.c:522-536` — 通过遍历数组和前缀匹配模拟目录枚举
- **文件元数据** (新增)
  - A: `kern/fs/static_files/sort_src.c:200-210` — 缺少权限、时间戳等元数据
  - B: `src/kernel/fs.c:22-22` — struct MemFile包含nlink、时间戳等元数据

### 7.5 信号 (`signal`)

**对照判定**: 仅 A 实现

**A 仓做法**: 该模块以 per-thread 信号队列 (sigevent_t) 和 per-process 信号动作表 (sigaction_t) 为核心抽象，通过 sig_check/sig_return 在用户态入口/出口切换上下文。相比 xv6 原版仅简单的 signal 模拟，实现了完整的 Linux 兼容信号集，包括 rt_sigaction、rt_sigprocmask、rt_sigreturn、siginfo_t、ucontext_t 和 SA_SIGINFO 扩展；同时支持 per-thread 信号发送 (tkill/tgkill) 和 setitimer 定时器信号。实现采用静态预分配事件池和自旋锁保护，但存在内存分配未完成等早期问题。

**B 仓**: 未实现该模块

(无显著差异)

### 7.6 IPC (`ipc`)

**对照判定**: 仅 A 实现

**A 仓做法**: 实现了管道、共享内存和futex三大IPC机制，核心抽象包括Pipe环形缓冲区、shm_list全局链表和futexevent等待队列。

**B 仓**: 未实现该模块

(无显著差异)

### 7.7 网络 (`net`)

**对照判定**: 独立设计

**A 仓做法**: 内核态软件定义socket子系统，基于环形缓冲区/消息队列模拟通信，支持完整POSIX套接字API。

**B 仓做法**: 仅暴露极简原始数据包收发接口和硬编码MTU，socket系统调用已注册但无socket层实现。

**关键差异点**:

- **socket API完整性** (独立)
  - A: `kern/fs/socket.c:73-87` — 从全局数组分配socket并挂载FdDev
  - B: `src/include/net.h:1-9` — 仅定义原始数据包收发，无socket结构
- **数据传输方式** (独立)
  - A: `kern/fs/socket.c:497-503` — TCP直写对端环形缓冲区
  - B: `src/include/net.h:10-11` — 裸指针缓冲区收发，无中间缓冲
- **协议支持** (独立)
  - A: `kern/fs/socket.c:838-846` — UDP消息队列发送，区分协议
  - B: `src/include/net.h:6` — 仅硬编码以太网MTU，无协议层
- **阻塞模型** (独立)
  - A: `kern/fs/socket.c:757-771` — UDP接收在空队列上sleep阻塞
  - B: `src/include/net.h:9-11` — net_available轮询，无阻塞机制

### 7.8 驱动 (`drivers`)

**对照判定**: 实现路径分化

**A 仓做法**: 仅包含一个完整的virtio-blk块设备驱动，采用VirtIO MMIO传输层与split virtqueue，舍弃FEATURES_OK，含自测试函数。

**B 仓做法**: 由多个独立驱动组成（块、网络、UART），基于VirtIO，支持MMIO和PCI后端，但virtqueue代码重复。

**关键差异点**:

- **块设备写操作支持** (取消)
  - A: `kern/driver/virtio.c:137` — virtio_disk_rw接口支持读写操作
  - B: `src/include/block.h:11` — 仅有block_read_sector，无写接口
- **驱动同步模型** (替换)
  - A: `kern/driver/virtio.c:270-272` — 持锁调用sleep等待中断完成
  - B: `src/drivers/virtio_net.c:231-235` — 忙等直到设备用毕（net_send_packet）
- **VirtIO队列布局代码重复** (独立)
  - A: `kern/driver/virtio.c:21-32` — 单文件中统一管理virtqueue三个环
  - B: `src/drivers/virtio_blk.c:72-75` — virtio_blk独立定义virtqueue布局，与virtio_net重复

### 7.9 系统调用 (`syscall`)

**对照判定**: 做法基本一致

**A 仓做法**: 系统调用层采用陷入-分发模型，通过TRAMPOLINE页切换，扩展了浮点、COW、信号及大量Linux系统调用。

**B 仓做法**: 基于ecall陷入，trap_handler分发，信号返回特殊处理，静态资源表管理大量系统调用，存在工程风险。

(无显著差异)


## 八、B 相对 A 的关键差异

**总评**: B 与 A 均基于 xv6 教学内核，但走向截然不同的独立演化路径。A 面向 RISC-V 多核，通过静态文件系统与软件网络栈大幅扩展系统调用广度（306 个），而 B 聚焦单核双架构，以 memfs+ext4 双层文件系统和静态资源表实现 155 个 syscall，网络层尚处早期。两者设计理念与工程取舍基本无交集。

**整体定位**: 独立设计 — 两仓基本无对应关系

### 8.1 多核 vs 单核架构

**类型**: 独立 · **显著度**: ★★★★★

A 实现了多核启动同步（volatile 标志+忙等待），B 彻底省略多核，所有子系统无锁假设单核执行。此差异直接影响并发模型与系统扩展性。

- A: `kern/boot/main.c:173-177` — 主核识别与同步，依赖 volatile+屏障
- B: `src/arch/riscv64/boot.S:4-14` — 单核启动序列，无多核同步

### 8.2 文件系统设计：静态嵌入 vs 双层可写

**类型**: 独立 · **显著度**: ★★★★☆

A 采用编译时常量数组嵌入文件内容，只读零拷贝；B 使用 memfs+ext4 只读后端，首次打开时复制到内存文件系统并支持写入。两种方案完全独立，各有取舍。

- A: `kern/fs/static_files/sort_src.c:2-12` — 文件数据编译为 const 数组嵌入内核
- B: `src/kernel/fs.c:21-35` — memfs 核心结构体与内存池布局

### 8.3 网络协议栈：完整 socket 层 vs 底层桩

**类型**: 独立 · **显著度**: ★★★☆☆

A 拥有完整软件 socket 层，模拟 TCP/UDP，支持阻塞同步；B 仅定义原始数据包收发接口和 syscall 号，上层 socket 未实现。两者网络能力差距悬殊，设计阶段不同。

- A: `kern/fs/socket.c:73-87` — 全局 sockets 数组和位图分配
- B: `src/include/net.h:1-9` — 仅 net_send/recv_packet 原始接口

### 8.4 内核内存管理：用户态分配器 vs 内核态伙伴

**类型**: 独立 · **显著度**: ★★★☆☆

A 的 mm 模块实现的是用户空间 C++ 分配器（位图、线程池），不涉及内核页表；B 实现基于 Sv39 的物理页分配器、页表操作和 COW，是内核核心组件。两者面向层次完全不同。

- A: `rootfs/usr/usr/include/c++/11.2.1/ext/bitmap_allocator.h:70-90` — 用户空间位图分配器，自由链表
- B: `src/kernel/vm.c:14-20` — 内核物理页元数据 PageInfo 数组

### 8.5 系统调用实现深度：高覆盖 vs 桩为主

**类型**: 独立 · **显著度**: ★★☆☆☆

A 实现 306 个系统调用，多数有实质功能；B 定义 400+ 调用号但仅 155 个实现，大量返回 -ENOSYS 或仅登记资源表。B 的接口覆盖面广但深度不足，A 更侧重实质实现。

- A: `kern/syscall/sys_signal.c:4-6` — sys_kill 具体实现含边界检查
- B: `src/kernel/syscall.c:145-149` — 静态资源表管理，许多 syscall 仅登记


## 九、综合相似度评分

### 9.1 各维度得分

| 维度 | 权重 | A↔B 得分 | 加权 |
|---|---|---|---|
| 函数签名 Jaccard | 0.30 | 0.0 | 0.0 |
| syscall Jaccard | 0.20 | 0.4919 | 0.0984 |
| 依赖 Jaccard | 0.20 | 0.0 | 0.0 |
| 调用图综合 | 0.20 | 0.0 | 0.0 |
| 目录 Jaccard | 0.10 | 0.0392 | 0.0039 |
| **合计** | **1.00** | — | **0.1023** |

### 9.2 等级判定

| 范围 | 等级 |
|---|---|
| ≥ 0.70 | 高度相似 |
| 0.40 - 0.70 | 中度相似 |
| 0.15 - 0.40 | 低度相似 |
| < 0.15 | 完全不同 |

**本次评级**: **完全不同** (0.1023)

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