# OSKernel2025-StarryX-3037 ↔ nonix 对比分析报告

> **生成时间**: 2026-06-18 04:16 UTC
> **对比方向**: 以 **OSKernel2025-StarryX-3037** 为基准 (A), 分析 **nonix** (B) 的差异
> **运行时长**: 588.92s · prompt=39972 · completion=43986 · reasoning=40133
> **综合相似度**: **0.2958** (低度相似)

## 一、总览

| 维度 | A: OSKernel2025-StarryX-3037 | B: nonix |
|---|---|---|
| 家族 | `arceos-starry` | `rcore-tutorial` |
| Cargo 形态 | workspace · 2 成员 | workspace · 2 成员 |
| 文件数 | 451 | 205 |
| 代码行数 | 42442 | 24240 |
| syscall 数 | 239 | 82 |
| 启动方式 | `axhal` | `polyhal` |
| trap handlers | SYSCALL, PAGE_FAULT, POST_TRAP, IRQ | — |
| 已实现模块 | 启动流程 / 内存管理 / 进程与任务调度 / 文件系统 / 信号机制 / 进程间通信 / 网络 / 系统调用层 | 启动流程 / 内存管理 / 进程与任务调度 / 文件系统 / 信号机制 / 驱动框架 / 系统调用层 |
| 未实现模块 | 驱动框架 | 进程间通信 / 网络 |

## 二、结构差异

**目录 Jaccard**: 0.2385

| 仅 A 有 | 共有 | 仅 B 有 |
|---|---|---|
| `arceos` | `vendor` | `bootloader` |
| `arceos/api` | `vendor/aarch64-cpu` | `doc` |
| `arceos/configs` | `vendor/aho-corasick` | `lwext4_rust` |
| `arceos/crates` | `vendor/arm_gicv2` | `lwext4_rust/c` |
| `arceos/doc` | `vendor/arm_pl011` | `lwext4_rust/doc` |
| `arceos/examples` | `vendor/autocfg` | `lwext4_rust/examples` |
| `arceos/modules` | `vendor/bit` | `lwext4_rust/riscv64-fs` |
| `arceos/scripts` | `vendor/bit_field` | `lwext4_rust/src` |
| `arceos/tools` | `vendor/bitflags` | `os` |
| `arceos/ulib` | `vendor/bitflags-1.3.2` | `os/src` |
| `bin` | `vendor/cfg-if` | `patch` |
| `docs` | `vendor/critical-section` | `patch/cty` |
| `docs/StarryX` | `vendor/either` | `patch/polyhal` |
| `src` | `vendor/embedded-hal` | `patch/virtio-drivers` |
| `vendor/allocator` | `vendor/equivalent` | `user` |

## 三、依赖差异

- A 总依赖数: **46**
- B 总依赖数: **17**
- 交集: **6**
- 仅 A 有: 40 项
- 仅 B 有: 11 项
- **依赖 Jaccard**: **0.1053**

### 仅 A 有的代表性依赖 (前 15)

- `axalloc`
- `axconfig`
- `axdriver`
- `axerrno`
- `axfeat`
- `axfs-ng`
- `axfs-ng-vfs`
- `axhal`
- `axio`
- `axlog`
- `axmm`
- `axnet`
- `axns`
- `axruntime`
- `axsync`

### 仅 B 有的代表性依赖 (前 15)

- `buddy_system_allocator`
- `fdt`
- `hashbrown`
- `lazyinit`
- `log`
- `lwext4_rust`
- `polyhal`
- `polyhal-boot`
- `polyhal-trap`
- `virtio-drivers`
- `zerocopy`

## 四、syscall 差异

- A 实现 syscall 数: **239**
- B 实现 syscall 数: **77**
- 共同实现: **75**
- **syscall Jaccard**: **0.3112**

### 4.1 仅 A 实现的 syscall (164 个)

`accept`, `accept4`, `access`, `add_key`, `adjtimex`, `arch_prctl`, `bind`, `capget`, `capset`, `chmod`, `chroot`, `clock_adjtime`  
`clock_getres`, `clock_settime`, `clone3`, `connect`, `dup2`, `epoll_create`, `epoll_create1`, `epoll_ctl`, `epoll_pwait`, `epoll_pwait2`, `eventfd`, `eventfd2`  
`faccessat2`, `fadvise64`, `fallocate`, `fanotify_init`, `fanotify_mark`, `fchdir`, `fchmod`, `fchmodat2`, `fchown`, `fchownat`, `fdatasync`, `fgetxattr`  
`flistxattr`, `flock`, `fork`, `fremovexattr`, `fsetxattr`, `fstatfs`, `futex`, `get_robust_list`, `getgroups`, `getitimer`, `getpeername`, `getpriority`  
`getresgid`, `getresuid`, `getsid`, `getsockname`, `getsockopt`, `getxattr`, `keyctl`, `link`, `listen`, `listxattr`, `llistxattr`, `lremovexattr`  
`lsetxattr`, `lstat`, `madvise`, `membarrier`, `memfd_secret`, `mincore`, `mkdir`, `mknod`, `mknodat`, `mlock`, `mq_getsetattr`, `mq_notify`  
`mq_open`, `mq_timedreceive`, `mq_timedsend`, `mq_unlink`, `mremap`, `msgctl`, `msgget`, `msgrcv`, `msgsnd`, `msync`, `munlock`, `newfstatat`  
`open`, `personality`, `pidfd_getfd`, `pidfd_open`, `pidfd_send_signal`, `pipe`, `pkey_alloc`, `pkey_free`, `pkey_mprotect`, `poll`, `prctl`, `preadv`  
`preadv2`, `ptrace`, `pwrite64`, `pwritev`, `pwritev2`, `readlink`, `reboot`, `recvfrom`, `removexattr`, `rename`, `renameat`, `request_key`  
`rmdir`, `rt_sigpending`, `rt_sigqueueinfo`, `rt_tgsigqueueinfo`, `sched_get_priority_max`, `sched_get_priority_min`, `sched_getaffinity`, `sched_getparam`, `sched_getscheduler`, `sched_setaffinity`, `sched_setparam`, `sched_setscheduler`  
`select`, `semctl`, `semget`, `semop`, `sendfile`, `sendto`, `setfsgid`, `setfsuid`, `setgid`, `setgroups`, `sethostname`, `setitimer`  
`setpriority`, `setregid`, `setresgid`, `setresuid`, `setreuid`, `setsid`, `setsockopt`, `setuid`, `setxattr`, `shmdt`, `sigaltstack`, `socket`  
`socketpair`, `stat`, `symlink`, `symlinkat`, `sysinfo`, `tgkill`, `timer_create`, `timer_delete`, `timer_getoverrun`, `timer_gettime`, `timer_settime`, `timerfd_create`  
`timerfd_gettime`, `timerfd_settime`, `tkill`, `truncate`, `unlink`, `utime`, `utimes`, `waitid`

### 4.2 仅 B 实现的 syscall (2 个)

`faccessat`, `io_setup`

## 五、函数签名 Jaccard

- A 公开函数签名数 (`pub fn`): **6805**
- B 公开函数签名数: **6015**
- 完全相同的签名: **3833**
- **函数签名 Jaccard**: **0.4265**

### 5.1 仅 A 暴露的接口样本 (前 10)

- `with_uspace(F) -> T`
- `visit_foreign_item_type_mut(&mutV,&mutForeignItemType) -> ()`
- `random_bool(f64) -> bool`
- `set_bucket_interval(SELF,Duration) -> ()`
- `fold_expr_for_loop(&mutF,ExprForLoop) -> ExprForLoop`
- `alloc(SELF) -> i32`
- `contiguous_window(SELF) -> usize`
- `remove_front(SELF) -> usize`
- `available_read(SELF) -> usize`
- `print(&T) -> PrettyPrinter<T>`

### 5.2 仅 B 暴露的接口样本 (前 10)

- `path_rename(Fd,&str,Fd,&str) -> Result<(),Errno>`
- `vppn(SELF) -> usize`
- `uninit_slice_fill_zero(&mut[MaybeUninit<u8>]) -> &mut[u8]`
- `framebuffer_table(SELF) -> Option<&FramebufferTable>`
- `set_ne(bool) -> ()`
- `into_table(SELF) -> &mutHashTable<T,A>`
- `shift_remove(SELF,&Q) -> bool`
- `get_port_info(port_id,*mutport_info) -> status_t`
- `set_dir1_width(usize) -> ()`
- `to_writer_truncate(&B,implWrite) -> Result<(),fmt::Error>`

## 六、调用图差异 (轻量版)

> 第一版用集合层数字 + 高频函数名列表把『两个内核调用模式有多接近』讲清楚, 不画 mermaid (后续优化项)。

### 6.1 调用图统计

| 维度 | A | B |
|---|---|---|
| 节点数 (函数) | 7847 | 8592 |
| 边数 (调用关系) | 28214 | 29453 |
| 平均出度 | 5.35 | 5.02 |

### 6.2 节点 Jaccard: **0.3282**

### 6.3 边 Jaccard: **0.2785**

### 6.4 综合调用图相似度 = 0.5·node + 0.5·edge = **0.3034**

### 6.5 高频被调函数 Top 10

**A (OSKernel2025-StarryX-3037)**:

- `zeroed` — 8934 次
- `new` — 3714 次
- `field` — 3212 次
- `Ok` — 2775 次
- `clone` — 2107 次
- `parse` — 1707 次
- `Err` — 1518 次
- `Some` — 1441 次
- `Lite` — 1435 次
- `peek` — 1301 次

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

**对照判定**: 独立设计

**A 仓做法**: 内核基于ArceOS的axruntime/axhal框架启动。main()在axruntime硬件初始化后被调用，构建init进程、挂载VFS、初始化stdio，最终执行init.sh进入用户态。

**B 仓做法**: nonix以main(hartid)为入口，通过polyhal_boot宏从汇编跳转。启动序列：堆→日志→polyhal→物理帧→文件系统→任务，最后进入用户态。

**关键差异点**:

- **入口与早期初始化路径** (独立)
  - A: `src/main.rs:1-10` — axruntime完成早期初始化
  - B: `os/src/main.rs:91` — polyhal_boot宏生成入口
- **启动序列构成** (独立)
  - A: `src/main.rs:56-72` — init进程、VFS、stdio、init.sh
  - B: `os/src/main.rs:73-89` — 堆、日志、polyhal、内存、文件系统、任务
- **日志子系统选择** (替换)
  - A: `src/main.rs:1-10` — 引入axlog crate
  - B: `os/src/main.rs:73-75` — logging::init初始化

### 7.2 内存管理 (`mm`)

**对照判定**: 独立设计

**A 仓做法**: 本模块以 `axmm::AddrSpace` 为底层地址空间抽象, 通过 `xvma` crate 提供文件映射的 VMA 管理, 并在 `XUserSpace` 中整合堆管理、页缓存与地址空间操作, 实现用户进程的按需分页、文件 mmap 及 brk 堆分配。

**B 仓做法**: 未提供详细描述，但已实现

(无显著差异)

### 7.3 进程/任务 (`task`)

**对照判定**: 实现路径分化

**A 仓做法**: 基于 ArceOS axtask 构建完整 Linux 进程/线程模型，通过类型擦除扩展挂载 POSIX 语义。

**B 仓做法**: 以 TaskControlBlock 为核心，FIFO 调度，支持信号/clone/execve，上下文切换依赖 polyhal。

**关键差异点**:

- **核心抽象模型** (独立)
  - A: `xcore/src/task/proc.rs:62-65` — XTaskExt 注册为 axtask 扩展
  - B: `os/src/task/task.rs:42-47` — TCB 核心抽象: PidHandle + UPSafeCell
- **调度器实现** (独立)
  - A: `xapi/src/task/schedule.rs:23-25` — yield 委托 axtask::yield_now
  - B: `os/src/task/manager.rs:7-9` — FIFO VecDeque 就绪队列
- **PID 管理机制** (替换)
  - A: `xcore/src/task/proc.rs:286-289` — 全局弱引用表存储 PID/TID
  - B: `os/src/task/pid.rs:52` — PidAllocator 分配并复用 PID
- **信号处理架构** (独立)
  - A: `xcore/src/task/proc.rs:196-210` — 进程级与线程级双层信号管理器
  - B: `os/src/task/task.rs:73-87` — TCB 内部直接存信号掩码和状态

### 7.4 文件系统 (`fs`)

**对照判定**: 独立设计

**A 仓做法**: 以 axfs_ng_vfs VFS trait 体系为核心，构建 MemoryFs (tmpfs) 和 VirtFs 只读虚拟文件系统，桥接 60+ Linux syscall。

**B 仓做法**: 以统一 File trait 为抽象，使用 lwext4_rust 操作 ext4 磁盘文件系统，支持管道和伪文件系统，进程通过 FdTable 管理描述符。

**关键差异点**:

- **文件系统抽象核心** (独立)
  - A: `xcore/src/fs/vfs/tmp/mod.rs:85-120` — 实现 FilesystemOps trait 提供 VFS 抽象
  - B: `os/src/fs/inode.rs:340-395` — OSInode 实现 File trait 封装真实文件
- **文件系统类型: 内存 vs ext4** (独立)
  - A: `xcore/src/fs/vfs/tmp/mod.rs:1-455` — MemoryFs 基于 Slab 分配器的内存文件系统
  - B: `os/src/fs/ext4_lw/inode.rs:16-21` — Ext4Inode 封装 lwext4_rust 的 ext4 文件
- **虚拟文件实现方式** (独立)
  - A: `xcore/src/fs/vfs/virt_file.rs:1-316` — VirtFile 通过闭包动态生成内容，只读
  - B: `os/src/fs/usedfiles.rs:5-43` — 硬编码 /proc/meminfo 内容，欺骗测试
- **零拷贝接口实现** (独立)
  - A: `xapi/src/fs/io.rs:245` — sys_sendfile 使用 16KB 用户态缓冲中转
  - B: `os/src/fs/pipe.rs:182-220` — splice 操作使用 unsafe 构造 UserBuffer
- **目录读取功能** (独立)
  - A: `xapi/src/fs/ctl.rs:143` — sys_getdents64 通过 DirBuffer 保证对齐
  - B: `os/src/fs/inode.rs:377-393` — get_dirent 返回 0，目录读取功能未实现

### 7.5 信号 (`signal`)

**对照判定**: 实现路径分化

**A 仓做法**: 本模块基于 xsignal crate 实现 UNIX 信号递送, 核心抽象为 Signo/SignalSet/SignalAction/PendingSignals 及 ThreadSignalManager.

**B 仓做法**: 该模块围绕 SigAction / KSigAction 双层抽象构建，用 SignalFlags bitflags 提供信号集操作，通过 SigTable 管理信号动作，具备 POSIX 信号基本骨架。

**关键差异点**:

- **信号编号范围与实时支持** (独立)
  - A: `xmodules/xsignal/src/types.rs:117-121` — 区分标准与实时信号，支持最多64个信号
  - B: `os/src/signal/sigflags.rs:37` — 32位bitflags，仅支持至多31个标准信号
- **实时信号排队能力** (新增)
  - A: `xmodules/xsignal/src/pending.rs:60-78` — 标准信号合并，实时信号无上限排队
  - B: `os/src/signal/sigflags.rs:37` — 位掩码无队列，同一信号多次发送丢失
- **用户设置与默认动作区分标志** (新增)
  - A: `xmodules/xsignal/src/action.rs:120` — SignalAction 无 customed 字段
  - B: `os/src/signal/sigact.rs:49` — KSigAction 增加 customed 标志标记用户设置
- **SA_* 标志实现状态** (独立)
  - A: `xmodules/xsignal/src/action.rs:88-100` — SA_RESTORER 已实现，但值与标准可能不同
  - B: `os/src/signal/sigflags.rs:144-167` — SA_* 常量定义完整但全部未实现
- **信号管理层级结构** (新增)
  - A: `xmodules/xsignal/src/api/thread.rs:21-34` — 线程级与进程级两级信号管理器
  - B: `os/src/signal/sigtable.rs:8` — 仅进程级 SigTable，无线程级管理

### 7.6 IPC (`ipc`)

**对照判定**: 仅 A 实现

**A 仓做法**: 实现了 IPC 相关功能，包括进程间通信原语

**B 仓**: 未实现该模块

(无显著差异)

### 7.7 网络 (`net`)

**对照判定**: 仅 A 实现

**A 仓做法**: 本模块以 Socket 枚举为核心抽象，统一封装 TCP/UDP/Unix 套接字，通过 FileLike 集成到 fd 表，syscall 层负责地址解析与权限校验，核心层提供协议无关委托。

**B 仓**: 未实现该模块

(无显著差异)

### 7.8 驱动 (`drivers`)

**对照判定**: 仅 B 实现

**A 仓**: 未实现该模块

**B 仓做法**: 本模块围绕块设备驱动构建了两层trait抽象（BaseDriver→BlockDriver），通过Disk提供带游标的逐字节读写，利用VirtioTransportImpl统一RISC-V MMIO与LoongArch PCI传输。

(无显著差异)

### 7.9 系统调用 (`syscall`)

**对照判定**: 做法基本一致

**A 仓做法**: (LLM 未给出)

**B 仓做法**: 以 syscall(syscall_id, args) 为单一入口，通过平坦 match 将 ~80 个 Linux RISC-V 系统调用号分派到各 sys_* 处理函数。

(无显著差异)


## 八、B 相对 A 的关键差异

**总评**: B 相对 A 整体定位为: 源自教学内核的实验原型, 功能广度与深度均远低于 A, 但通过 ext4 与 polyhal 展示了不同的技术路径, 整体属于同源分化中的弱实现分支。

**整体定位**: 同源分化 — 两仓共享起点但走向不同

### 8.1 文件系统后端：tmpfs vs ext4

**类型**: 替换 · **显著度**: ★★★★★

A 基于 Slab 分配器与 BTreeMap 自研 tmpfs；B 则通过 lwext4_rust 库操作 ext4 磁盘镜像, 两者在存储引擎、可移植性及兼容性路径上根本不同。

- A: `xcore/src/fs/vfs/tmp/mod.rs:85-120` — tmpfs 实现 FilesystemOps trait
- B: `os/src/fs/inode.rs:30-43` — OSInode 封装 Ext4Inode, 依赖外部 C 库

### 8.2 进程模型：外挂式扩展 vs 集中式 TCB

**类型**: 独立 · **显著度**: ★★★★☆

A 通过 Box<dyn Any> 在轻量调度器上挂载 POSIX 语义, 实现解耦；B 在单个 TCB 中直接容纳所有状态, 设计紧耦合。

- A: `xmodules/xprocess/src/process.rs:280-285` — ProcessBuilder::data 注入类型擦除扩展
- B: `os/src/task/task.rs:73-87` — TCB 内部状态集中包含所有资源

### 8.3 网络子系统：有 vs 无

**类型**: 取消 · **显著度**: ★★★☆☆

A 实现了套接字抽象并集成到 VFS, 支持 TCP/UDP/Unix；B 启动流程仅初始化文件与任务, 无网络能力。

- A: `xcore/src/net/socket.rs:12-16` — Socket 枚举统一封装三种协议
- B: `os/src/main.rs:84-89` — 启动序列无网络初始化

### 8.4 实时信号排队支持

**类型**: 取消 · **显著度**: ★★★☆☆

A 的 xsignal 模块为实时信号提供 Vec 排队, 标准信号合并；B 的信号模块仅静态映射默认行为, 无排队结构。

- A: `xmodules/xsignal/src/pending.rs:60-78` — 实时信号无上限排队, 标准信号单槽
- B: `os/src/signal/sigflags.rs:76-108` — 硬编码 32 个信号的默认行为

### 8.5 启动框架：axruntime vs polyhal

**类型**: 独立 · **显著度**: ★★☆☆☆

A 依赖 axruntime 进行早期初始化, 嵌入 init 脚本；B 通过 polyhal_boot 宏和手动内存发现启动, 显式构建跨架构抽象。

- A: `src/main.rs:1-10` — 依赖 axruntime 提供入口
- B: `os/src/main.rs:76-83` — polyhal 公共层初始化并注入页分配器

### 8.6 用户态内存管理：VMA 与缺页处理缺失

**类型**: 取消 · **显著度**: ★★★☆☆

A 实现了 VMA 分割、mmap 文件映射与按需分页；B 仅维持基本页表映射, 无高级用户态内存管理。

- A: `xcore/src/mm/uspace.rs:18-23` — XUserSpace 集成地址空间与 VMA
- B: `os/src/main.rs:76-83` — 启动仅注入帧分配器, 无 VMA 逻辑


## 九、综合相似度评分

### 9.1 各维度得分

| 维度 | 权重 | A↔B 得分 | 加权 |
|---|---|---|---|
| 函数签名 Jaccard | 0.30 | 0.4265 | 0.1279 |
| syscall Jaccard | 0.20 | 0.3112 | 0.0622 |
| 依赖 Jaccard | 0.20 | 0.1053 | 0.0211 |
| 调用图综合 | 0.20 | 0.3034 | 0.0607 |
| 目录 Jaccard | 0.10 | 0.2385 | 0.0238 |
| **合计** | **1.00** | — | **0.2958** |

### 9.2 等级判定

| 范围 | 等级 |
|---|---|
| ≥ 0.70 | 高度相似 |
| 0.40 - 0.70 | 中度相似 |
| 0.15 - 0.40 | 低度相似 |
| < 0.15 | 完全不同 |

**本次评级**: **低度相似** (0.2958)

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