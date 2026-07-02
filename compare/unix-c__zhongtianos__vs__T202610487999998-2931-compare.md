# zhongtianos ↔ T202610487999998-2931 对比分析报告

> **生成时间**: 2026-07-02 07:34 UTC
> **对比方向**: 以 **zhongtianos** 为基准 (A), 分析 **T202610487999998-2931** (B) 的差异
> **运行时长**: 394.32s · prompt=34429 · completion=30056 · reasoning=27846
> **综合相似度**: **0.1101** (完全不同)

## 一、总览

| 维度 | A: zhongtianos | B: T202610487999998-2931 |
|---|---|---|
| 家族 | `unix-c` | `unix-c` |
| Cargo 形态 | 单 crate | 单 crate |
| 文件数 | 0 | 0 |
| 代码行数 | 0 | 0 |
| syscall 数 | 306 | 170 |
| 启动方式 | `c_entry` | `c_entry` |
| trap handlers | — | — |
| 已实现模块 | 启动流程 / 内存管理 / 进程与任务调度 / 文件系统 / 信号机制 / 进程间通信 / 网络 / 驱动框架 / 系统调用层 | 启动流程 / 进程与任务调度 / 文件系统 / 驱动框架 / 系统调用层 |
| 未实现模块 | 无 | 内存管理 / 信号机制 / 进程间通信 / 网络 |

## 二、结构差异

**目录 Jaccard**: 0.02

| 仅 A 有 | 共有 | 仅 B 有 |
|---|---|---|
| `docs` | `scripts` | `kernel` |
| `docs/assets` | — | `kernel/arch` |
| `docs/old` | — | `kernel/common` |
| `include` | — | `kernel/fs` |
| `include/asm` | — | `kernel/include` |
| `include/dev` | — | `kernel/proc` |
| `include/fs` | — | `kernel/syscall` |
| `include/futex` | — | — |
| `include/ipc` | — | — |
| `include/lib` | — | — |
| `include/lock` | — | — |
| `include/mm` | — | — |
| `include/proc` | — | — |
| `include/signal` | — | — |
| `include/sys` | — | — |

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
- B 实现 syscall 数: **170**
- 共同实现: **167**
- **syscall Jaccard**: **0.5405**

### 4.1 仅 A 实现的 syscall (139 个)

`accept4`, `acct`, `add_key`, `adjtimex`, `arch_specific_syscall`, `bpf`, `capget`, `capset`, `clock_adjtime`, `clock_settime`, `delete_module`, `fadvise64`  
`fanotify_init`, `fanotify_mark`, `fgetxattr`, `finit_module`, `flistxattr`, `fremovexattr`, `fsconfig`, `fsetxattr`, `fsmount`, `fsopen`, `fspick`, `fstatat`  
`getcpu`, `getxattr`, `init_module`, `inotify_add_watch`, `inotify_init1`, `inotify_rm_watch`, `io_cancel`, `io_destroy`, `io_getevents`, `io_pgetevents`, `io_setup`, `io_submit`  
`io_uring_enter`, `io_uring_register`, `io_uring_setup`, `ioprio_get`, `ioprio_set`, `kcmp`, `kexec_file_load`, `kexec_load`, `keyctl`, `lgetxattr`, `listxattr`, `llistxattr`  
`lookup_dcookie`, `lremovexattr`, `lsetxattr`, `mailread`, `mailwrite`, `mbind`, `membarrier`, `memfd_create`, `migrate_pages`, `mincore`, `mkdir`, `mlock`  
`mlock2`, `mlockall`, `move_mount`, `move_pages`, `mq_getsetattr`, `mq_notify`, `mq_open`, `mq_timedreceive`, `mq_timedsend`, `mq_unlink`, `msgctl`, `msgget`  
`msgrcv`, `msgsnd`, `munlock`, `munlockall`, `name_to_handle_at`, `nfsservctl`, `open_by_handle_at`, `open_tree`, `openat2`, `perf_event_open`, `personality`, `pidfd_getfd`  
`pidfd_open`, `pidfd_send_signal`, `pivot_root`, `pkey_alloc`, `pkey_free`, `pkey_mprotect`, `process_madvise`, `process_vm_readv`, `process_vm_writev`, `ptrace`, `quotactl`, `readahead`  
`reboot`, `recv`, `recvmmsg`, `recvmsg`, `remap_file_pages`, `removexattr`, `request_key`, `restart_syscall`, `riscv_flush_icache`, `rt_tgsigqueueinfo`, `sched_getattr`, `sched_setattr`  
`seccomp`, `semctl`, `semget`, `semop`, `semtimedop`, `send`, `sendmmsg`, `sendmsg`, `set_mempolicy`, `setdomainname`, `setfsgid`, `setfsuid`  
`sethostname`, `setns`, `settimeofday`, `setxattr`, `shmat`, `shmctl`, `shmdt`, `shmget`, `signalfd4`, `spawn`, `swapoff`, `swapon`  
`tee`, `time`, `unshare`, `user_dispatch`, `userfaultfd`, `vhangup`, `vmsplice`

### 4.2 仅 B 实现的 syscall (3 个)

`epoll_pwait2`, `futex_waitv`, `renameat`

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

**B (T202610487999998-2931)**:

(无数据)

## 七、模块级语义对照

> 每条差异点的 file:line 会进入 §九 的验证透明表逐条核对。

### 7.1 启动 (`boot`)

**对照判定**: 实现路径分化

**A 仓做法**: 启动流程模块实现多阶段引导序列，核心是多核同步协议，支持从CPU复位到内核完全初始化。

**B 仓做法**: 启动流程模块负责从CPU复位到C环境就绪的最小初始化，核心是汇编入口至kmain，支持双架构且仅单核运行。

**关键差异点**:

- **多核启动策略** (替换)
  - A: `kern/boot/main.c:173-177` — 主核识别与串口初始化，使用volatile标志协调多核
  - B: `kernel/arch/riscv64/entry.S:3-7` — 检查hart ID，非0核直接陷入WFI循环
- **栈初始化方式** (独立)
  - A: `kern/boot/entry.S:16-24` — hartid+1偏移计算独立栈指针
  - B: `kernel/arch/riscv64/entry.S:22-24` — 64KB固定栈空间，用链接符号boot_stack_top初始化sp
- **初始化深度与范围** (优化)
  - A: `kern/boot/main.c:135-143` — 主核完成所有子系统初始化后创建初始进程
  - B: `kernel/arch/riscv64/entry.S:15-16` — 仅调用kmain，后续初始化在外部模块

### 7.2 内存管理 (`mm`)

**对照判定**: 仅 A 实现

**A 仓做法**: 本模块实现了一系列用户空间内存分配器（位图分配器、多线程池分配器、异常安全分配器）及统一的 allocator_traits 接口。

**B 仓**: 未实现该模块

(无显著差异)

### 7.3 进程/任务 (`task`)

**对照判定**: 独立设计

**A 仓做法**: 进程与线程管理核心，基于 thread_t 和 proc_t 及全局队列实现创建/退出/等待/定时睡眠/资源限制等系统调用。

**B 仓做法**: 基于静态进程表和 struct user_proc 实现进程管理，包括状态机、页表复制和 ELF 加载。

(无显著差异)

### 7.4 文件系统 (`fs`)

**对照判定**: 独立设计

**A 仓做法**: 基于编译时嵌入的静态只读文件系统，将用户文件转换为C数组，支持POSIX调用但VFS层缺失。

**B 仓做法**: 直接解析ext4磁盘格式，通过ext4结构体实现只读文件访问，无VFS层，无写支持。

(无显著差异)

### 7.5 信号 (`signal`)

**对照判定**: 仅 A 实现

**A 仓做法**: 以per-thread信号队列和per-process信号动作表为核心，实现完整Linux兼容信号集，支持rt_sigaction/tkill等，采用静态事件池和自旋锁，但存在内存分配未完成问题。

**B 仓**: 未实现该模块

(无显著差异)

### 7.6 IPC (`ipc`)

**对照判定**: 仅 A 实现

**A 仓做法**: 实现管道、System V共享内存和futex，结构包含Pipe、shm_t和futexevent_t。

**B 仓**: 未实现该模块

(无显著差异)

### 7.7 网络 (`net`)

**对照判定**: 仅 A 实现

**A 仓做法**: 内核空间实现纯软件本地socket子系统（类似Unix domain sockets），支持UDP/TCP双协议和完整POSIX API，通过环形缓冲区和消息队列模拟通信，集成VFS。

**B 仓**: 未实现该模块

(无显著差异)

### 7.8 驱动 (`drivers`)

**对照判定**: 实现路径分化

**A 仓做法**: 仅包含一个完整的 virtio-blk 驱动，基于 VirtIO MMIO 和 split virtqueue，使用中断和信号量同步。

**B 仓做法**: 定义了 block.h 抽象接口，基于 Virtio 为 RISC-V 64 和 LoongArch64 实现块设备驱动，采用轮询且无中断。

**关键差异点**:

- **中断支持** (替换)
  - A: `kern/driver/virtio.c:286-290` — 使用标准 VirtIO 中断处理流程
  - B: `kernel/common/virtio.c:372-380` — 纯轮询等待设备完成
- **同步模型** (替换)
  - A: `kern/driver/virtio.c:270-272` — 持有自旋锁时调用 sleep/wakeup
  - B: `kernel/common/virtio.c:67-70` — 无并发保护，全局数据结构无锁
- **对外接口** (独立)
  - A: `kern/driver/virtio.c:137` — 直接暴露 virtio_disk_rw 供文件系统调用
  - B: `kernel/include/block.h:7-9` — 通过 block_read_sector/block_read 提供更高级抽象
- **描述符管理** (替换)
  - A: `kern/driver/virtio.c:21-32` — 使用位图 free 数组扫描分配
  - B: `kernel/common/virtio.c:71-72` — 使用 next_avail 全局变量顺序分配

### 7.9 系统调用 (`syscall`)

**对照判定**: 独立设计

**A 仓做法**: 系统调用层是内核处理用户态请求的核心抽象，采用经典的陷入-分发模型。核心数据结构为trapframe_t，通过固定映射的TRAMPOLINE页实现用户态与内核态的安全切换。与xv6-riscv相比，本实现扩展了浮点寄存器保存/恢复、写时复制（COW）页错误处理、信号机制以及大量Linux兼容的系统调用。

**B 仓做法**: 系统调用层通过一组兼容填充函数实现Linux风格的stat/statx/statfs/rlimit系统调用结果格式化。核心抽象是提供与Linux用户空间兼容的stat、statx、statfs、rlimit结构体定义及其填充逻辑，直接写入用户提供的指针。

(无显著差异)


## 八、B 相对 A 的关键差异

**总评**: B是一个从零实现的教学内核，支持LoongArch64和RISC-V双架构，直接解析ext4只读文件系统，子系统少而精；A是xv6的扩展版，功能丰富但粗糙，仅支持RISC-V，采用静态嵌入式文件系统。

**整体定位**: 独立设计 — 两仓基本无对应关系

### 8.1 多核启动同步机制

**类型**: 优化 · **显著度**: ★★★☆☆

A使用volatile标志和忙等待轮询协调多核，B在RISC-V上让非主核陷入WFI等待中断，更省电且符合常规做法。

- A: `kern/boot/main.c:173-177` — 主核通过volatile标志唤醒从核，忙等待
- B: `kernel/arch/riscv64/entry.S:2-17` — 非主核调用WFI进入休眠

### 8.2 双架构支持扩展

**类型**: 新增 · **显著度**: ★★★★☆

B新增了LoongArch64架构的支持，包含完整的汇编入口和初始化路径；A仅支持RISC-V，无其他架构代码。

- A: `kern/boot/entry.S:16-24` — RISC-V专属入口，无多架构支持
- B: `kernel/arch/loongarch64/entry.S:2-18` — LoongArch64入口，清除BSS并设置栈

### 8.3 Virtio驱动实现风格

**类型**: 替换 · **显著度**: ★★☆☆☆

A的virtio驱动包含部分特性协商代码（虽被注释），使用自旋锁+睡眠同步；B的virtio驱动为纯轮询，无中断和协商，接口更简单。

- A: `kern/driver/virtio.c:73-78` — 注释掉的FEATURES_OK握手
- B: `kernel/common/virtio.c:372-380` — 硬编码轮询超时，无中断机制


## 九、综合相似度评分

### 9.1 各维度得分

| 维度 | 权重 | A↔B 得分 | 加权 |
|---|---|---|---|
| 函数签名 Jaccard | 0.30 | 0.0 | 0.0 |
| syscall Jaccard | 0.20 | 0.5405 | 0.1081 |
| 依赖 Jaccard | 0.20 | 0.0 | 0.0 |
| 调用图综合 | 0.20 | 0.0 | 0.0 |
| 目录 Jaccard | 0.10 | 0.02 | 0.002 |
| **合计** | **1.00** | — | **0.1101** |

### 9.2 等级判定

| 范围 | 等级 |
|---|---|
| ≥ 0.70 | 高度相似 |
| 0.40 - 0.70 | 中度相似 |
| 0.15 - 0.40 | 低度相似 |
| < 0.15 | 完全不同 |

**本次评级**: **完全不同** (0.1101)

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