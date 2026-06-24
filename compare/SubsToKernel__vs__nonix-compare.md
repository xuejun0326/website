# T202510008995695-2720 ↔ nonix 对比分析报告

> **生成时间**: 2026-06-16 16:04 UTC
> **对比方向**: 以 **T202510008995695-2720** 为基准 (A), 分析 **nonix** (B) 的差异
> **运行时长**: 272.69s · prompt=17739 · completion=14446 · reasoning=10538
> **综合相似度**: **0.3558** (低度相似)

## 一、总览

| 维度 | A: T202510008995695-2720 | B: nonix |
|---|---|---|
| 家族 | `rcore-tutorial` | `rcore-tutorial` |
| Cargo 形态 | 单 crate | workspace · 2 成员 |
| 文件数 | 243 | 205 |
| 代码行数 | 64945 | 24240 |
| syscall 数 | 114 | 82 |
| 启动方式 | `global_asm` | `polyhal` |
| trap handlers | — | — |
| 已实现模块 | 启动流程 / 内存管理 / 进程与任务调度 / 文件系统 / 信号机制 / 网络 / 驱动框架 / 系统调用层 | 启动流程 / 内存管理 / 进程与任务调度 / 文件系统 / 信号机制 / 驱动框架 / 系统调用层 |
| 未实现模块 | 进程间通信 | 进程间通信 / 网络 |

## 二、结构差异

**目录 Jaccard**: 0.0342

| 仅 A 有 | 共有 | 仅 B 有 |
|---|---|---|
| `docs` | `os` | `bootloader` |
| `docs/final` | `os/src` | `doc` |
| `docs/img` | `user` | `lwext4_rust` |
| `docs/prel` | `user/src` | `lwext4_rust/c` |
| `docs/site` | — | `lwext4_rust/doc` |
| `os/cargo` | — | `lwext4_rust/examples` |
| `os/libs` | — | `lwext4_rust/riscv64-fs` |
| `os/vendor` | — | `lwext4_rust/src` |
| `user/cargo` | — | `patch` |
| — | — | `patch/cty` |
| — | — | `patch/polyhal` |
| — | — | `patch/virtio-drivers` |
| — | — | `user/test` |
| — | — | `vendor` |
| — | — | `vendor/aarch64-cpu` |

## 三、依赖差异

- A 总依赖数: **14**
- B 总依赖数: **17**
- 交集: **10**
- 仅 A 有: 4 项
- 仅 B 有: 7 项
- **依赖 Jaccard**: **0.4762**

### 仅 A 有的代表性依赖 (前 15)

- `bit_field`
- `loongarch64`
- `riscv`
- `smoltcp`

### 仅 B 有的代表性依赖 (前 15)

- `cfg-if`
- `fdt`
- `lazyinit`
- `polyhal`
- `polyhal-boot`
- `polyhal-trap`
- `zerocopy`

## 四、syscall 差异

- A 实现 syscall 数: **113**
- B 实现 syscall 数: **77**
- 共同实现: **70**
- **syscall Jaccard**: **0.5833**

### 4.1 仅 A 实现的 syscall (43 个)

`accept`, `bind`, `condvar_create`, `condvar_signal`, `condvar_wait`, `connect`, `enable_deadlock_detect`, `futex`, `get_mempolicy`, `get_robust_list`, `getsockname`, `getsockopt`  
`listen`, `lsm_set_self_attr`, `madvise`, `mail_read`, `mail_write`, `membarrier`, `mseal`, `msync`, `mutex_create`, `mutex_lock`, `mutex_unlock`, `recvfrom`  
`sched_getaffinity`, `semaphore_create`, `semaphore_down`, `semaphore_up`, `sendfile`, `sendto`, `setitimer`, `setpriority`, `setsid`, `setsockopt`, `socket`, `socketpair`  
`spawn`, `sync`, `sysinfo`, `tgkill`, `timerfd_gettime64`, `tkill`, `umask`

### 4.2 仅 B 实现的 syscall (7 个)

`copy_file_range`, `getpgid`, `io_setup`, `rt_sigsuspend`, `setpgid`, `shutdown`, `splice`

## 五、函数签名 Jaccard

- A 公开函数签名数 (`pub fn`): **4501**
- B 公开函数签名数: **6014**
- 完全相同的签名: **2397**
- **函数签名 Jaccard**: **0.2953**

### 5.1 仅 A 暴露的接口样本 (前 10)

- `set_qqic(SELF,u8) -> ()`
- `router_lifetime(SELF) -> Duration`
- `new_kernel() -> Self`
- `has_rank_error(SELF) -> bool`
- `dealloc(SELF,TaskIdentifier,NumberOfResources,ResourceIdentifier) -> ()`
- `set_reachable_time(SELF,Duration) -> ()`
- `add(SELF,&[&[u8]],&mut[&mut[u8]]) -> Result<u16>`
- `tx(SELF) -> bool`
- `flush(SELF) -> Result<(),i32>`
- `current_kstack_top() -> usize`

### 5.2 仅 B 暴露的接口样本 (前 10)

- `new(T) -> ForceUnalign<T,A>`
- `has_svm(SELF) -> bool`
- `find_all_nodes(SELF,&str) -> implIterator<Item=node::FdtNode<>>`
- `unicode_word_boundary(SELF,bool) -> Config`
- `start_anchored(SELF) -> StateID`
- `upper(SELF) -> u32`
- `new(Page<S>) -> Self`
- `is_align_gt_1(SELF) -> bool`
- `key_not_string() -> Self`
- `expr(&mut&str) -> Result<i64>`

## 六、调用图差异 (轻量版)

> 第一版用集合层数字 + 高频函数名列表把『两个内核调用模式有多接近』讲清楚, 不画 mermaid (后续优化项)。

### 6.1 调用图统计

| 维度 | A | B |
|---|---|---|
| 节点数 (函数) | 7922 | 8606 |
| 边数 (调用关系) | 28327 | 29460 |
| 平均出度 | 5.07 | 5.02 |

### 6.2 节点 Jaccard: **0.2839**

### 6.3 边 Jaccard: **0.2352**

### 6.4 综合调用图相似度 = 0.5·node + 0.5·edge = **0.2596**

### 6.5 高频被调函数 Top 10

**A (T202510008995695-2720)**:

- `new` — 3345 次
- `Ok` — 1762 次
- `field` — 1640 次
- `unwrap` — 1597 次
- `Some` — 1450 次
- `clone` — 1359 次
- `len` — 1117 次
- `parse` — 957 次
- `Err` — 875 次
- `iter` — 729 次

**B (nonix)**:

- `new` — 3375 次
- `field` — 2222 次
- `Ok` — 2125 次
- `Some` — 1727 次
- `clone` — 1339 次
- `Err` — 1180 次
- `unwrap` — 1147 次
- `parse` — 998 次
- `map` — 936 次
- `len` — 875 次

## 七、模块级语义对照

> 每条差异点的 file:line 会进入 §九 的验证透明表逐条核对。

### 7.1 启动 (`boot`)

**对照判定**: 实现路径分化

**A 仓做法**: 使用 global_asm! 嵌入汇编启动入口，支持 riscv64/loongarch64，通过静态栈和 clear_bss 初始化后跳转到 Rust main 顺序初始化各模块。

**B 仓做法**: 使用 polyhal 的 define_entry! 宏生成入口，仅 hartid 0 执行完整初始化，依次初始化堆、日志、内存、文件系统、页表和进程。

**关键差异点**:

- **入口生成方式不同** (替换)
  - A: `os/src/boot.rs:11-28` — 使用 global_asm! 嵌入汇编入口
  - B: `os/src/main.rs:103` — 使用 define_entry! 宏生成入口
- **多架构支持机制不同** (替换)
  - A: `os/src/boot.rs:11-12` — 条件编译支持 riscv64/loongarch64
  - B: `os/src/main.rs:71-73` — 基于 polyhal 抽象层实现架构无关
- **BSS 清零处理不同** (新增)
  - A: `os/src/main.rs:74-83` — 显式调用 clear_bss 清零 BSS 段
  - B: `os/src/main.rs:68-90` — 未见显式 BSS 清零步骤
- **初始化流程参与核心数不同** (新增)
  - A: `os/src/main.rs:85-109` — 所有 CPU 核心均执行相同初始化
  - B: `os/src/main.rs:71-73` — 仅 hartid 0 执行完整初始化，其他核心跳过
- **启动栈分配方式不同** (替换)
  - A: `os/src/boot.rs:4-8` — 在 .bss.stack 段静态分配 64KB 栈数组
  - B: `os/src/main.rs:80-90` — 通过 polyhal 初始化管理栈/页表
- **初始化顺序和内容不同** (独立)
  - A: `os/src/main.rs:85-109` — 顺序: clear_bss, 日志, 内存, 陷阱, 定时器, 文件系统, 网络
  - B: `os/src/main.rs:68-90` — 顺序: 堆, 日志, 内存区域, 文件系统, 内核页表, 初始进程

### 7.2 内存管理 (`mm`)

**对照判定**: 实现路径分化

**A 仓做法**: 基于多级页表的虚拟内存管理，支持RISC-V和LoongArch双架构。采用栈式物理帧分配器，通过FrameTracker实现RAII自动回收。支持写时复制(COW)、惰性分配、mmap/munmap等高级特性。内核地址空间通过KERNEL_SPACE懒静态初始化。

**B 仓做法**: 基于分页机制，采用惰性分配、写时复制和共享组模型，支持mmap/munmap系统调用，通过物理帧追踪器管理页面生命周期。

**关键差异点**:

- **架构支持与页表条件编译** (优化)
  - A: `os/src/mm/page_table.rs:28-30` — 使用条件编译适配RISC-V和LoongArch
  - B: `os/src/mm/memory_set.rs:23` — 未提及多架构，可能仅支持单架构
- **COW标记位使用bit 9** (优化)
  - A: `os/src/mm/page_table.rs:105-108` — 页表项bit 9统一用作写时复制(COW)标记
  - B: `os/src/mm/map_area.rs:66-70` — 未指定特定bit，使用共享组管理引用计数
- **共享内存组(groupid)模型** (新增)
  - A: `os/src/mm/memory_set.rs:35-39` — 无共享组概念，内核地址空间懒初始化
  - B: `os/src/mm/map_area.rs:66-70` — 通过groupid管理共享页引用计数
- **内核地址空间懒静态初始化** (新增)
  - A: `os/src/mm/memory_set.rs:35-39` — 内核地址空间通过KERNEL_SPACE懒静态初始化
  - B: `os/src/mm/memory_set.rs:23` — 未提及内核地址空间管理

### 7.3 进程/任务 (`task`)

**对照判定**: 实现路径分化

**A 仓做法**: 基于 rCore-Tutorial 的进程与线程管理，采用 Stride 调度，PCB 含多个 TCB，支持 fork/clone/execve/exit，使用 UPSafeCell 和 RecycleAllocator，集成 Futex 与信号处理。

**B 仓做法**: 协作式调度单处理器模型，全局 TaskManager 管理就绪队列，Processor 持有当前任务，采用 UPSafeCell，支持 clone/fork/exec，包含信号分层处理与僵尸进程回收。

**关键差异点**:

- **调度算法不同** (替换)
  - A: `os/src/task/process.rs:66-68` — Stride 调度，基于优先级计算 pass
  - B: `os/src/task/mod.rs:31-46` — 协作式调度，任务主动让出 CPU
- **进程-线程结构** (替换)
  - A: `os/src/task/process.rs:48-49` — 双层结构：PCB 持有线程列表 TCB
  - B: `os/src/task/task.rs:48-60` — 单层进程控制块，无独立线程结构
- **Futex 同步机制** (新增)
  - A: `os/src/task/mod.rs:131-136` — 显式 Futex 机制支持用户态同步唤醒
  - B: `os/src/task/task.rs:33` — 仅包含 RobustList 数据结构，未强调 Futex 功能
- **孤儿进程处理** (新增)
  - B: `os/src/task/mod.rs:66-76` — 退出时孤儿进程托管给 INITPROC

### 7.4 文件系统 (`fs`)

**对照判定**: 仅 B 实现

**A 仓做法**: (LLM 未给出)

**B 仓做法**: 基于 lwext4_rust 封装 ext4 文件系统驱动，通过 OSInode 包装 Ext4Inode 提供文件描述符语义，使用 inode 索引缓存加速路径查找，同时支持虚拟文件注册表；采用 UPSafeCell 内部可变性管理并发访问，实现类 POSIX 的 open/read/write/seek 等系统调用。

(无显著差异)

### 7.5 信号 (`signal`)

**对照判定**: 做法基本一致

**A 仓做法**: 仿照Linux信号模型实现，支持标准信号编号与默认操作分类，通过bitflags管理待处理信号和掩码，利用setup_frame在用户栈构建上下文帧以执行自定义处理程序，并支持SA_RESTART等标志。

**B 仓做法**: 基于bitflags定义31个信号编号与默认操作，通过SigAction/KSigAction双层结构分离用户与内核信号动作，SigTable使用UPSafeCell管理每进程信号表，支持kill、rt_sigaction等系统调用，默认操作包括终止、CoreDump、忽略、停止、继续。

**关键差异点**:

- **信号帧处理机制** (新增)
  - A: `os/src/signal/mod.rs:81-182` — 通过setup_frame在用户栈构建信号帧保存上下文
  - B: `os/src/signal/sigtable.rs:1-57` — 未实现帧处理，仅通过SigTable管理信号动作
- **信号表管理方式** (替换)
  - A: `os/src/signal/mod.rs:34-42` — 通过check_if_any_sig检查任务未屏蔽信号，bitflags管理
  - B: `os/src/signal/sigtable.rs:7-35` — 使用SigTable + UPSafeCell进行进程级信号表管理

### 7.6 IPC (`ipc`)

**对照判定**: 两边都未实现

两仓均未实现该模块。

### 7.7 网络 (`net`)

**对照判定**: 仅 A 实现

**A 仓做法**: 基于 smoltcp 协议栈实现的 TCP/UDP 网络模块，通过原子状态机管理 TCP 连接生命周期，提供 POSIX 风格 socket API，支持阻塞/非阻塞 I/O、loopback 回环设备及 DNS 查询。

**B 仓**: 未实现该模块

(无显著差异)

### 7.8 驱动 (`drivers`)

**对照判定**: 仅 A 实现

**A 仓做法**: 基于 trait 的驱动抽象层，提供统一接口；通过泛型参数 Hal 和 Transport 实现硬件解耦；支持 VirtIO 的 MMIO 和 PCI 传输，内部使用 spin::Mutex 保证线程安全。

**B 仓做法**: (LLM 未给出)

(无显著差异)

### 7.9 系统调用 (`syscall`)

**对照判定**: 实现路径分化

**A 仓做法**: 系统调用层模块化设计，按功能分为fs、mem、net等子模块，mod.rs统一分发，支持大量POSIX调用

**B 仓做法**: 集中派发架构，match分发到子模块，syscall编号与Linux兼容，统一SyscallRet返回值

**关键差异点**:

- **派发架构不同** (替换)
  - A: `os/src/syscall/fs.rs:10-16` — 模块化设计，各子模块自包含实现
  - B: `os/src/syscall/mod.rs:164-200` — 单一入口match派发所有syscall
- **网络系统调用支持** (缺失)
  - A: `os/src/syscall/net.rs:13-18` — 独立net子模块，实现socket/bind等
  - B: `os/src/syscall/mod.rs:132-138` — 子模块仅含fs、mm、process、signal、other，无网络
- **I/O多路复用支持** (缺失)
  - A: `os/src/syscall/fs.rs:58-65` — 实现pselect/ppoll系统调用
  - B: `os/src/syscall/mod.rs:13-130` — 未定义select/poll相关常量
- **子模块划分范围** (独立)
  - A: `os/src/syscall/mod.rs:1-5` — 划分为fs、mem、net三个子模块
  - B: `os/src/syscall/mod.rs:132-138` — 划分为fs、mm、process、signal、other五个子模块


## 八、B 相对 A 的关键差异

**总评**: B相对A在网络支持、文件系统后端、硬件抽象方式和调度策略上存在显著差异。B取消了网络协议栈，改用 ext4 真实文件系统，依赖 polyhal 外部库替代自研驱动，并以协作式调度取代 Stride 调度。整体上 B 更侧重实用文件系统和简化依赖，但功能完整性不及 A。

**整体定位**: 同源分化 — 两仓共享起点但走向不同

### 8.1 网络协议栈完全取消

**类型**: 取消 · **显著度**: ★★★★☆

A 实现了基于 smoltcp 的原子状态机 TCP/UDP 网络栈，支持阻塞/非阻塞 I/O；B 的系统调用层未包含 net 子模块，无任何网络功能，是核心功能缺失。

- A: `os/src/net/socket/tcp.rs:30-35` — 原子状态机驱动TCP生命周期
- B: `os/src/syscall/mod.rs:132-138` — 子模块分类仅含fs/mm/process等，无net

### 8.2 文件系统后端从简单实现替换为 ext4

**类型**: 替换 · **显著度**: ★★★★☆

A 的文件系统仅见于文件描述符表管理，未使用真实磁盘格式；B 通过 lwext4_rust 封装 ext4 驱动，提供 inode 缓存索引，支持持久化存储和符号链接解析。

- A: `os/src/syscall/fs.rs:10-16` — 进程内锁与文件描述符表管理，无物理FS证据
- B: `os/src/fs/inode.rs:1-5` — 基于lwext4_rust的ext4驱动封装

### 8.3 硬件抽象层替换为外部 polyhal 库

**类型**: 替换 · **显著度**: ★★★☆☆

A 自研 trait 驱动的 virtio 抽象，支持 MMIO/PCI；B 使用 polyhal 的 define_entry! 宏和通用初始化，将硬件细节委托给外部库，减少驱动代码但增加依赖。

- A: `os/src/drivers/virtio/net.rs:18-18` — Trait驱动的统一设备接口
- B: `os/src/main.rs:103` — 使用polyhal宏生成入口，硬件抽象委托库

### 8.4 调度算法从 Stride 替换为协作式

**类型**: 替换 · **显著度**: ★★★☆☆

A 实现基于优先级的 Stride 调度，动态计算 pass 值实现公平；B 采用协作式调度，任务主动让出 CPU，实现简单但无抢占，可能引起饥饿。

- A: `os/src/task/process.rs:66-68` — Stride调度算法基于优先级计算pass
- B: `os/src/task/mod.rs:31-46` — 协作式调度与任务切换


## 九、综合相似度评分

### 9.1 各维度得分

| 维度 | 权重 | A↔B 得分 | 加权 |
|---|---|---|---|
| 函数签名 Jaccard | 0.30 | 0.2953 | 0.0886 |
| syscall Jaccard | 0.20 | 0.5833 | 0.1167 |
| 依赖 Jaccard | 0.20 | 0.4762 | 0.0952 |
| 调用图综合 | 0.20 | 0.2596 | 0.0519 |
| 目录 Jaccard | 0.10 | 0.0342 | 0.0034 |
| **合计** | **1.00** | — | **0.3558** |

### 9.2 等级判定

| 范围 | 等级 |
|---|---|
| ≥ 0.70 | 高度相似 |
| 0.40 - 0.70 | 中度相似 |
| 0.15 - 0.40 | 低度相似 |
| < 0.15 | 完全不同 |

**本次评级**: **低度相似** (0.3558)

### 9.3 公式

```text
overall = 0.30 × sig_jaccard
        + 0.20 × syscall_jaccard
        + 0.20 × deps_jaccard
        + 0.20 × callgraph_score (= 0.5 × node_jaccard + 0.5 × edge_jaccard)
        + 0.10 × dir_jaccard
```

## 十、附录: 警告与错误

*无警告或错误。*

---
*本报告由 oskag compare 自动生成, §七/§八 引用均经 verifier 二次校验, 不修饰失败。*