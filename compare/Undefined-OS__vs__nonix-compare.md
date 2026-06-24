# T202510003995291-2331 ↔ nonix 对比分析报告

> **生成时间**: 2026-06-16 16:06 UTC
> **对比方向**: 以 **T202510003995291-2331** 为基准 (A), 分析 **nonix** (B) 的差异
> **运行时长**: 362.11s · prompt=19223 · completion=21763 · reasoning=17500
> **综合相似度**: **0.3237** (低度相似)

## 一、总览

| 维度 | A: T202510003995291-2331 | B: nonix |
|---|---|---|
| 家族 | `arceos-starry` | `rcore-tutorial` |
| Cargo 形态 | workspace · 5 成员 | workspace · 2 成员 |
| 文件数 | 424 | 205 |
| 代码行数 | 36457 | 24240 |
| syscall 数 | 212 | 82 |
| 启动方式 | `axhal` | `polyhal` |
| trap handlers | SYSCALL, PAGE_FAULT, POST_TRAP, IRQ | — |
| 已实现模块 | 启动流程 / 内存管理 / 进程与任务调度 / 文件系统 / 信号机制 / 进程间通信 / 网络 / 系统调用层 | 启动流程 / 内存管理 / 进程与任务调度 / 文件系统 / 信号机制 / 驱动框架 / 系统调用层 |
| 未实现模块 | 驱动框架 | 进程间通信 / 网络 |

## 二、结构差异

**目录 Jaccard**: 0.2377

| 仅 A 有 | 共有 | 仅 B 有 |
|---|---|---|
| `api` | `vendor` | `bootloader` |
| `api/src` | `vendor/aarch64-cpu` | `doc` |
| `apps` | `vendor/aho-corasick` | `lwext4_rust` |
| `apps/junior` | `vendor/arm_gicv2` | `lwext4_rust/c` |
| `apps/libc` | `vendor/arm_pl011` | `lwext4_rust/doc` |
| `apps/nimbos` | `vendor/autocfg` | `lwext4_rust/examples` |
| `apps/oscomp` | `vendor/bit` | `lwext4_rust/riscv64-fs` |
| `arceos` | `vendor/bit_field` | `lwext4_rust/src` |
| `arceos/api` | `vendor/bitflags` | `os` |
| `arceos/configs` | `vendor/bitflags-1.3.2` | `os/src` |
| `arceos/doc` | `vendor/buddy_system_allocator` | `patch` |
| `arceos/examples` | `vendor/cfg-if` | `patch/cty` |
| `arceos/modules` | `vendor/critical-section` | `patch/polyhal` |
| `arceos/scripts` | `vendor/either` | `patch/virtio-drivers` |
| `arceos/tools` | `vendor/embedded-hal` | `user` |

## 三、依赖差异

- A 总依赖数: **46**
- B 总依赖数: **17**
- 交集: **5**
- 仅 A 有: 41 项
- 仅 B 有: 12 项
- **依赖 Jaccard**: **0.0862**

### 仅 A 有的代表性依赖 (前 15)

- `arceos_posix_api`
- `axalloc`
- `axconfig`
- `axdisplay`
- `axdriver_display`
- `axerrno`
- `axfeat`
- `axfs-ng`
- `axhal`
- `axio`
- `axlog`
- `axmm`
- `axnet`
- `axns`
- `axsignal`

### 仅 B 有的代表性依赖 (前 15)

- `buddy_system_allocator`
- `cfg-if`
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

- A 实现 syscall 数: **212**
- B 实现 syscall 数: **77**
- 共同实现: **76**
- **syscall Jaccard**: **0.3568**

### 4.1 仅 A 实现的 syscall (136 个)

`accept`, `access`, `adjtimex`, `arch_prctl`, `bind`, `bpf`, `chmod`, `chown`, `chroot`, `clock_getres`, `connect`, `dup2`  
`epoll_create1`, `epoll_ctl`, `epoll_pwait`, `eventfd2`, `fadvise64`, `fallocate`, `fanotify_init`, `fchdir`, `fchmod`, `fchmodat`, `fchown`, `fchownat`  
`flock`, `fork`, `fsopen`, `fspick`, `fstatfs`, `futex`, `get_mempolicy`, `get_robust_list`, `getitimer`, `getpeername`, `getpriority`, `getresgid`  
`getresuid`, `getrlimit`, `getsockname`, `getsockopt`, `inotify_init1`, `io_uring_setup`, `lchown`, `link`, `listen`, `lstat`, `madvise`, `memfd_create`  
`memfd_secret`, `mkdir`, `mknodat`, `mlock`, `mq_getsetattr`, `mq_notify`, `mq_open`, `mq_timedreceive`, `mq_timedsend`, `mq_unlink`, `msgctl`, `msgget`  
`msgrcv`, `msgsnd`, `msync`, `munlock`, `name_to_handle_at`, `newfstatat`, `open`, `open_by_handle_at`, `open_tree`, `perf_event_open`, `personality`, `pidfd_open`  
`pipe`, `pivot_root`, `poll`, `prctl`, `preadv`, `process_vm_writev`, `pwrite64`, `pwritev`, `recvfrom`, `removexattr`, `rename`, `renameat`  
`rmdir`, `rt_sigpending`, `rt_sigqueueinfo`, `rt_tgsigqueueinfo`, `sched_getaffinity`, `sched_getparam`, `sched_getscheduler`, `sched_rr_get_interval`, `sched_setaffinity`, `sched_setparam`, `sched_setscheduler`, `select`  
`semctl`, `semget`, `sendfile`, `sendmmsg`, `sendmsg`, `sendto`, `setdomainname`, `setfsgid`, `setgid`, `sethostname`, `setitimer`, `setpriority`  
`setregid`, `setresgid`, `setresuid`, `setreuid`, `setrlimit`, `setsid`, `setsockopt`, `setuid`, `setxattr`, `shmdt`, `sigaltstack`, `signalfd4`  
`socket`, `socketpair`, `stat`, `symlink`, `symlinkat`, `sync`, `tgkill`, `timerfd_create`, `timerfd_gettime`, `timerfd_settime`, `tkill`, `truncate`  
`umask`, `unlink`, `unshare`, `userfaultfd`

### 4.2 仅 B 实现的 syscall (1 个)

`io_setup`

## 五、函数签名 Jaccard

- A 公开函数签名数 (`pub fn`): **6470**
- B 公开函数签名数: **6014**
- 完全相同的签名: **3949**
- **函数签名 Jaccard**: **0.4627**

### 5.1 仅 A 暴露的接口样本 (前 10)

- `is_declaration(SELF) -> bool`
- `get_entry(SELF,M::VirtAddr) -> PagingResult<(&PTE,PageSize)>`
- `is_first_fragment(SELF) -> bool`
- `set_flow_label(SELF,u32) -> ()`
- `add_digit(u64,u8) -> Option<u64>`
- `lower_n_halfway(u64) -> u64`
- `normalize(&mutExtendedFloat) -> i32`
- `parse(&Packet<&T>,&ChecksumCapabilities) -> Result<Repr<>>`
- `igmp_egress(SELF,&mutD) -> bool`
- `has_forwarding_error(SELF) -> bool`

### 5.2 仅 B 暴露的接口样本 (前 10)

- `boot_device(SELF) -> Option<BootDevice>`
- `new(J,F) -> GroupBy<K,J::IntoIter,F>`
- `set_hpm31(SELF,bool) -> ()`
- `as_slice(SELF) -> Ptr<[T],I>`
- `drain(SELF) -> RawDrain<T,A>`
- `set_hpm26(SELF,bool) -> ()`
- `unlocked_fair(&mutSelf,F) -> U`
- `fd_allocate(Fd,Filesize,Filesize) -> Result<(),Errno>`
- `root(SELF) -> Root<>`
- `ipi_write_action(usize,u32) -> ()`

## 六、调用图差异 (轻量版)

> 第一版用集合层数字 + 高频函数名列表把『两个内核调用模式有多接近』讲清楚, 不画 mermaid (后续优化项)。

### 6.1 调用图统计

| 维度 | A | B |
|---|---|---|
| 节点数 (函数) | 7796 | 8609 |
| 边数 (调用关系) | 26635 | 29497 |
| 平均出度 | 5.26 | 5.02 |

### 6.2 节点 Jaccard: **0.3852**

### 6.3 边 Jaccard: **0.3404**

### 6.4 综合调用图相似度 = 0.5·node + 0.5·edge = **0.3628**

### 6.5 高频被调函数 Top 10

**A (T202510003995291-2331)**:

- `zeroed` — 8932 次
- `new` — 3297 次
- `field` — 3176 次
- `Ok` — 2508 次
- `clone` — 1953 次
- `parse` — 1685 次
- `Some` — 1483 次
- `Lite` — 1435 次
- `peek` — 1296 次
- `Err` — 1264 次

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

**A 仓做法**: 基于arceos框架，通过axhal作为底层启动入口，在main函数中初始化根目录、文件描述符表和挂载文件系统，然后调用run_user_app加载并运行用户程序（busybox shell）。

**B 仓做法**: 使用polyhal硬件抽象层，通过define_entry!宏生成入口点，主函数main(hartid)依次初始化堆、日志、内存区域、文件系统、内核页表和初始进程，最后运行任务调度器，仅hartid 0执行完整流程。

**关键差异点**:

- **入口生成方式** (替换)
  - A: `src/main.rs:27` — 直接定义main作为内核入口
  - B: `os/src/main.rs:103` — 使用define_entry!宏生成入口
- **初始化序列内容** (独立)
  - A: `src/main.rs:27-32` — 初始化根目录、fd表、文件系统
  - B: `os/src/main.rs:71-97` — 初始化堆、日志、内存、文件系统、页表、初始进程
- **多处理器处理** (新增)
  - A: `src/main.rs:27-32` — 无多核限制逻辑
  - B: `os/src/main.rs:71-73` — 仅hartid 0执行初始化
- **用户程序启动方式** (替换)
  - A: `core/src/entry.rs:13-20` — 通过run_user_app加载用户程序
  - B: `os/src/main.rs:68-97` — 初始化初始进程后运行调度器

### 7.2 内存管理 (`mm`)

**对照判定**: 独立设计

**A 仓做法**: 基于axmm::AddrSpace管理进程虚拟地址空间，通过位标志封装mmap权限与映射类型，支持MAP_FIXED等标志。实现ELF加载、信号trampoline映射、用户内存访问保护。

**B 仓做法**: 基于分页机制，采用惰性分配、写时复制和共享组模型，支持mmap/munmap系统调用，通过物理帧追踪器管理页面生命周期。

**关键差异点**:

- **地址空间数据结构设计** (独立)
  - A: `core/src/mm.rs:1` — 使用axmm::AddrSpace管理虚拟地址空间
  - B: `os/src/mm/memory_set.rs:23` — 使用MemorySet管理进程内存空间
- **缺页处理机制** (独立)
  - A: `core/src/mm.rs:214-224` — 通过percpu标志控制用户内存访问权限
  - B: `os/src/mm/memory_set.rs:41-75` — 惰性分配和写时复制缺页处理
- **物理页生命期管理** (独立)
  - A: `api/src/imp/mm/mmap.rs:225` — 系统调用munmap手动解除映射
  - B: `os/src/mm/map_area.rs:96-102` — FrameTracker析构时自动释放物理帧
- **映射标志与区域类型** (独立)
  - A: `api/src/imp/mm/mmap.rs:15-30,52-72` — 位标志封装权限和映射类型，支持MAP_FIXED
  - B: `os/src/mm/memory_set.rs:53-62` — 区分mmap/brk/栈等多类型内存区域

### 7.3 进程/任务 (`task`)

**对照判定**: 实现路径分化

**A 仓做法**: 采用 Rust 语言实现类 Linux 进程模块。使用 Arc/Weak 及 Mutex 管理进程组和会话，提供 fork、execve、exit 等系统调用，支持信号处理与时间统计。

**B 仓做法**: 基于协作式调度、单处理器模型，通过全局 TaskManager 管理就绪队列，Processor 持有当前任务。采用 UPSafeCell 实现内部可变性，支持 clone/fork/exec 进程创建，包含完整信号处理与僵尸进程回收机制。

**关键差异点**:

- **调度模型** (替换)
  - A: `api/src/imp/task/signal.rs:1-3` — 任务调度抽象与等待队列
  - B: `os/src/task/mod.rs:31-46` — 协作式调度与任务切换
- **进程组与会话** (取消)
  - A: `process/src/process.rs:73-96` — 进程组与会话机制
  - B: `os/src/task/task.rs:48-60` — PCB定义无进程组字段
- **信号处理设计** (替换)
  - A: `api/src/imp/task/signal.rs:22-57` — 后陷阱钩子处理信号
  - B: `os/src/task/mod.rs:238-253` — 信号分为内核与用户信号
- **进程创建语义** (替换)
  - A: `process/src/process.rs:127` — fork复制进程
  - B: `os/src/task/task.rs:495-540` — clone_task支持多共享语义

### 7.4 文件系统 (`fs`)

**对照判定**: 仅 B 实现

**A 仓做法**: (LLM 未给出)

**B 仓做法**: 基于 lwext4_rust 封装 ext4 文件系统驱动，通过 OSInode 包装 Ext4Inode 提供文件描述符语义，使用 inode 索引缓存加速路径查找，同时支持虚拟文件注册表；采用 UPSafeCell 内部可变性管理并发访问，实现类 POSIX 的 open/read/write/seek 等系统调用。

(无显著差异)

### 7.5 信号 (`signal`)

**对照判定**: 实现路径分化

**A 仓做法**: 基于 axsignal 抽象类型，实现完整 Linux 信号系统调用集，支持三级信号发送与自动检查。

**B 仓做法**: 使用 bitflags 和枚举自建信号数据结构，SigAction/KSigAction 双层封装，通过 SigTable 管理进程信号表。

**关键差异点**:

- **信号数据结构设计** (独立)
  - A: `api/src/imp/task/signal.rs:5-8` — 导入 axsignal crate 的抽象类型
  - B: `os/src/signal/sigflags.rs:1-167` — 使用 bitflags+枚举自建 SignalFlags
- **默认操作实现方式** (替换)
  - A: `api/src/imp/task/signal.rs:30-48` — 通过 enum SignalOSAction 定义五种动作
  - B: `os/src/signal/sigact.rs:82-89` — 通过 SigOp 枚举定义五种默认操作
- **信号发送目标粒度** (优化)
  - A: `api/src/imp/task/signal.rs:133-144` — 支持 send_signal_thread 线程级发送
- **系统调用完整性** (优化)
  - A: `api/src/imp/task/signal.rs:84-98` — 实现 sys_rt_sigprocmask 等全套调用
- **信号检查机制** (替换)
  - A: `api/src/imp/task/signal.rs:51-56` — 通过 post_trap_callback 自动检查信号
- **用户/内核动作分离** (独立)
  - A: `api/src/imp/task/signal.rs:5-8` — 使用 axsignal 类型，未显式分离
  - B: `os/src/signal/sigact.rs:10-16` — 通过 SigAction 和 KSigAction 双层结构分离

### 7.6 IPC (`ipc`)

**对照判定**: 仅 A 实现

**A 仓做法**: 基于全局页分配器的共享内存子系统，使用BTreeMap和原子键生成管理共享内存段。

**B 仓**: 未实现该模块

(无显著差异)

### 7.7 网络 (`net`)

**对照判定**: 仅 A 实现

**A 仓做法**: 以枚举 Socket 封装 axnet 的 TcpSocket/UdpSocket，通过匹配分发实现 POSIX 网络系统调用；提供 SockAddr 安全抽象层转换 sockaddr，支持 IPv4 并预留 IPv6 骨架；内置 DNS 查询和 addrinfo 内存管理。

**B 仓**: 未实现该模块

(无显著差异)

### 7.8 驱动 (`drivers`)

**对照判定**: 仅 B 实现

**A 仓**: 未实现该模块

**B 仓做法**: 驱动模块已实现

(无显著差异)

### 7.9 系统调用 (`syscall`)

**对照判定**: 实现路径分化

**A 仓做法**: 基于中断注册的集中式分发架构，通过TrapFrame统一提取参数，匹配Sysno枚举分派到各模块实现。支持文件、网络、内存、进程、信号等子系统的150+系统调用，部分未实现或直接绕过。

**B 仓做法**: 采用集中派发的架构：大写常量定义 syscall 编号，syscall() 函数通过 match 分发到子模块中各自独立的 sys_* 函数。子模块按功能分类（fs、mm、process、signal、other），统一使用 SyscallRet 返回值类型，通过 translated_* 系列函数安全访问用户态内存。

**关键差异点**:

- **系统调用编号定义方式** (替换)
  - A: `src/syscall.rs:32-34` — 通过 Sysno 枚举实现全量匹配分发
  - B: `os/src/syscall/mod.rs:13-130` — 使用与 Linux 兼容的大写常量定义 syscall 编号
- **用户态内存访问路径** (替换)
  - A: `src/syscall.rs:27` — 从 TrapFrame 提取参数并分发
  - B: `os/src/syscall/fs.rs:3-10` — 通过 translated_* 系列函数安全访问用户态内存
- **网络系统调用支持** (新增)
  - A: `api/src/imp/net/socket.rs:133-473` — 实现 socket、bind、sendto 等完整网络调用
  - B: `os/src/syscall/mod.rs:132-138` — 子模块列表中无网络 (net) 子模块


## 八、B 相对 A 的关键差异

**总评**: nonix 是一个基于 rcore-tutorial 的模块化教学内核，核心突出内存惰性/COW优化、ext4真实文件系统与精简 HAL 启动，但缺少网络、IPC 等高级功能，系统调用仅 82 个，整体定位为轻量实验平台，与 A 的完整类 Linux 实现形成分化。

**整体定位**: 同源分化 — 两仓共享起点但走向不同

### 8.1 网络子系统支持取消

**类型**: 取消 · **显著度**: ★★★☆☆

A 通过 Socket 枚举实现 TCP/UDP 多协议支持并集成 DNS，B 则完全未实现网络功能，系统调用模块仅覆盖 fs/mm/process 等，无任何网络相关子模块。

- A: `api/src/imp/net/socket.rs:67-70` — Socket 枚举统一封装 TCP/UDP 套接字
- B: `os/src/syscall/mod.rs:132-138` — syscall 子模块分类无网络、socket 相关模块

### 8.2 共享内存 IPC 取消

**类型**: 取消 · **显著度**: ★★★☆☆

A 基于全局页分配器与 Arc 引用计数实现了共享内存段管理，B 描述中明确 IPC 模块尚未实现，syscall 分类中无 ipc 条目。

- A: `core/src/shared_memory.rs:13-14` — 基于全局页分配器分配共享物理页
- B: `os/src/syscall/mod.rs:132-138` — syscall 子模块仅 fs、mm、process 等，无 ipc

### 8.3 惰性页分配与写时复制

**类型**: 新增 · **显著度**: ★★★★☆

B 在缺页异常处理中按需分配物理页，并在 fork 时通过写时复制共享页面，显著减少内存开销；A 的内存管理设计（mmap、ELF 加载）未提及此类优化。

- A: `api/src/imp/mm/mmap.rs:118-130` — 地址空间分配支持固定与自动查找，无惰性分配描述
- B: `os/src/mm/memory_set.rs:41-68` — 缺页时分情况惰性分配物理页

### 8.4 polyhal 硬件抽象层启动

**类型**: 独立 · **显著度**: ★★★☆☆

B 使用 polyhal 的 define_entry! 宏生成入口并限制仅主核启动，完全替代传统汇编启动与硬件初始化；A 则基于 axhal 标准流程，无 HAL 抽象层。

- A: `core/src/entry.rs:13-20` — run_user_app 创建用户空间并加载程序
- B: `os/src/main.rs:103` — define_entry! 宏生成入口点替代传统启动汇编

### 8.5 双层信号动作 vs 三级发送

**类型**: 独立 · **显著度**: ★★★☆☆

B 区分用户 SigAction 与内核 KSigAction 构成双层封装；A 则实现线程、进程、进程组三级信号发送，两者为不同粒度的信号处理架构。

- A: `api/src/imp/task/signal.rs:133-144` — 三级信号发送：线程、进程、进程组
- B: `os/src/signal/sigact.rs:10-16` — SigAction(用户)与KSigAction(内核)双层定义

### 8.6 孤儿进程托管机制

**类型**: 新增 · **显著度**: ★★★☆☆

B 在进程退出时自动将孤儿子进程托管给 INITPROC 避免僵尸；A 虽有进程组与会话管理，但未实现此类显式孤儿托管。

- A: `process/src/process.rs:73-96` — 进程组与会话管理，无孤儿进程托管逻辑
- B: `os/src/task/mod.rs:66-76` — 退出时检查孤儿子进程并移交给 INITPROC


## 九、综合相似度评分

### 9.1 各维度得分

| 维度 | 权重 | A↔B 得分 | 加权 |
|---|---|---|---|
| 函数签名 Jaccard | 0.30 | 0.4627 | 0.1388 |
| syscall Jaccard | 0.20 | 0.3568 | 0.0714 |
| 依赖 Jaccard | 0.20 | 0.0862 | 0.0172 |
| 调用图综合 | 0.20 | 0.3628 | 0.0726 |
| 目录 Jaccard | 0.10 | 0.2377 | 0.0238 |
| **合计** | **1.00** | — | **0.3237** |

### 9.2 等级判定

| 范围 | 等级 |
|---|---|
| ≥ 0.70 | 高度相似 |
| 0.40 - 0.70 | 中度相似 |
| 0.15 - 0.40 | 低度相似 |
| < 0.15 | 完全不同 |

**本次评级**: **低度相似** (0.3237)

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