# T202510003995291-2331 ↔ T202510008995695-2720 对比分析报告

> **生成时间**: 2026-06-16 15:48 UTC
> **对比方向**: 以 **T202510003995291-2331** 为基准 (A), 分析 **T202510008995695-2720** (B) 的差异
> **运行时长**: 303.95s · prompt=20339 · completion=16084 · reasoning=10856
> **综合相似度**: **0.2566** (低度相似)

## 一、总览

| 维度 | A: T202510003995291-2331 | B: T202510008995695-2720 |
|---|---|---|
| 家族 | `arceos-starry` | `rcore-tutorial` |
| Cargo 形态 | workspace · 5 成员 | 单 crate |
| 文件数 | 424 | 243 |
| 代码行数 | 36457 | 64945 |
| syscall 数 | 212 | 114 |
| 启动方式 | `axhal` | `global_asm` |
| trap handlers | SYSCALL, PAGE_FAULT, POST_TRAP, IRQ | — |
| 已实现模块 | 启动流程 / 内存管理 / 进程与任务调度 / 文件系统 / 信号机制 / 进程间通信 / 网络 / 系统调用层 | 启动流程 / 内存管理 / 进程与任务调度 / 文件系统 / 信号机制 / 网络 / 驱动框架 / 系统调用层 |
| 未实现模块 | 驱动框架 | 进程间通信 |

## 二、结构差异

**目录 Jaccard**: 0.0

| 仅 A 有 | 共有 | 仅 B 有 |
|---|---|---|
| `api` | — | `docs` |
| `api/src` | — | `docs/final` |
| `apps` | — | `docs/img` |
| `apps/junior` | — | `docs/prel` |
| `apps/libc` | — | `docs/site` |
| `apps/nimbos` | — | `os` |
| `apps/oscomp` | — | `os/cargo` |
| `arceos` | — | `os/libs` |
| `arceos/api` | — | `os/src` |
| `arceos/configs` | — | `os/vendor` |
| `arceos/doc` | — | `user` |
| `arceos/examples` | — | `user/cargo` |
| `arceos/modules` | — | `user/src` |
| `arceos/scripts` | — | — |
| `arceos/tools` | — | — |

## 三、依赖差异

- A 总依赖数: **46**
- B 总依赖数: **14**
- 交集: **6**
- 仅 A 有: 40 项
- 仅 B 有: 8 项
- **依赖 Jaccard**: **0.1111**

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
- `hashbrown`
- `log`
- `loongarch64`
- `lwext4_rust`
- `riscv`
- `smoltcp`
- `virtio-drivers`

## 四、syscall 差异

- A 实现 syscall 数: **212**
- B 实现 syscall 数: **113**
- 共同实现: **95**
- **syscall Jaccard**: **0.413**

### 4.1 仅 A 实现的 syscall (117 个)

`access`, `adjtimex`, `arch_prctl`, `bpf`, `chmod`, `chown`, `chroot`, `clock_getres`, `copy_file_range`, `dup2`, `epoll_create1`, `epoll_ctl`  
`epoll_pwait`, `eventfd2`, `fadvise64`, `fallocate`, `fanotify_init`, `fchdir`, `fchmod`, `fchmodat`, `fchown`, `fchownat`, `flock`, `fork`  
`fsopen`, `fspick`, `fstatfs`, `getitimer`, `getpeername`, `getpgid`, `getpriority`, `getresgid`, `getresuid`, `getrlimit`, `inotify_init1`, `io_uring_setup`  
`lchown`, `link`, `lstat`, `memfd_create`, `memfd_secret`, `mkdir`, `mknodat`, `mlock`, `mq_getsetattr`, `mq_notify`, `mq_open`, `mq_timedreceive`  
`mq_timedsend`, `mq_unlink`, `msgctl`, `msgget`, `msgrcv`, `msgsnd`, `munlock`, `name_to_handle_at`, `newfstatat`, `open`, `open_by_handle_at`, `open_tree`  
`perf_event_open`, `personality`, `pidfd_open`, `pipe`, `pivot_root`, `poll`, `prctl`, `preadv`, `process_vm_writev`, `pwrite64`, `pwritev`, `removexattr`  
`rename`, `renameat`, `rmdir`, `rt_sigpending`, `rt_sigqueueinfo`, `rt_sigsuspend`, `rt_tgsigqueueinfo`, `sched_getparam`, `sched_getscheduler`, `sched_rr_get_interval`, `sched_setaffinity`, `sched_setparam`  
`sched_setscheduler`, `select`, `semctl`, `semget`, `sendmmsg`, `sendmsg`, `setdomainname`, `setfsgid`, `setgid`, `sethostname`, `setpgid`, `setregid`  
`setresgid`, `setresuid`, `setreuid`, `setrlimit`, `setuid`, `setxattr`, `shmdt`, `shutdown`, `sigaltstack`, `signalfd4`, `splice`, `stat`  
`symlink`, `symlinkat`, `timerfd_create`, `timerfd_gettime`, `timerfd_settime`, `truncate`, `unlink`, `unshare`, `userfaultfd`

### 4.2 仅 B 实现的 syscall (18 个)

`condvar_create`, `condvar_signal`, `condvar_wait`, `enable_deadlock_detect`, `lsm_set_self_attr`, `mail_read`, `mail_write`, `membarrier`, `mseal`, `mutex_create`, `mutex_lock`, `mutex_unlock`  
`semaphore_create`, `semaphore_down`, `semaphore_up`, `spawn`, `sysinfo`, `timerfd_gettime64`

## 五、函数签名 Jaccard

- A 公开函数签名数 (`pub fn`): **6469**
- B 公开函数签名数: **4501**
- 完全相同的签名: **2331**
- **函数签名 Jaccard**: **0.2698**

### 5.1 仅 A 暴露的接口样本 (前 10)

- `try_read_state_id(&[u8],&str) -> Result<(StateID,usize),DeserializeError>`
- `fold_item_struct(&mutF,ItemStruct) -> ItemStruct`
- `fold_type_impl_trait(&mutF,TypeImplTrait) -> TypeImplTrait`
- `derive(TokenStream,TokenStream) -> TokenStream`
- `pattern_names(SELF,PatternID) -> GroupInfoPatternNames<>`
- `get(SELF,u8) -> u8`
- `remove(SELF) -> Item`
- `write_version_len() -> usize`
- `new(&OnePass) -> OnePassCache`
- `visit_type_array_mut(&mutV,&mutTypeArray) -> ()`

### 5.2 仅 B 暴露的接口样本 (前 10)

- `sched_yield() -> isize`
- `release() -> ()`
- `par_keys(SELF) -> ParKeys<K,V>`
- `variable(&str) -> Expr`
- `fill0(SELF) -> usize`
- `get_palen() -> usize`
- `into_values(SELF) -> IntoValues<K,V,A>`
- `default_op(SELF) -> SigOp`
- `capture_to_value(&&V) -> Value<>`
- `is_dynamic_link_file(&str) -> bool`

## 六、调用图差异 (轻量版)

> 第一版用集合层数字 + 高频函数名列表把『两个内核调用模式有多接近』讲清楚, 不画 mermaid (后续优化项)。

### 6.1 调用图统计

| 维度 | A | B |
|---|---|---|
| 节点数 (函数) | 7798 | 7928 |
| 边数 (调用关系) | 26575 | 28300 |
| 平均出度 | 5.26 | 5.07 |

### 6.2 节点 Jaccard: **0.3773**

### 6.3 边 Jaccard: **0.3312**

### 6.4 综合调用图相似度 = 0.5·node + 0.5·edge = **0.3543**

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

**B (T202510008995695-2720)**:

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

## 七、模块级语义对照

> 每条差异点的 file:line 会进入 §九 的验证透明表逐条核对。

### 7.1 启动 (`boot`)

**对照判定**: 独立设计

**A 仓做法**: 基于arceos框架，通过axhal底层启动，初始化全局资源后加载并运行用户程序(busybox shell)。

**B 仓做法**: 使用global_asm!嵌入汇编入口，支持多架构，静态分配栈，按顺序初始化子系统后进入任务调度。

**关键差异点**:

- **启动入口方式不同** (独立)
  - A: `src/main.rs:27-32` — main函数作为内核入口点，初始化全局资源
  - B: `os/src/boot.rs:11-28` — 使用global_asm!嵌入架构相关汇编启动入口
- **初始化流程侧重点不同** (独立)
  - A: `src/main.rs:27-32` — 初始化根目录、文件描述符表和挂载文件系统
  - B: `os/src/main.rs:85-109` — 按顺序初始化clear_bss、日志、内存、陷阱、定时器等
- **用户程序加载 vs 任务调度** (独立)
  - A: `core/src/entry.rs:13-20` — 通过run_user_app创建用户地址空间并加载程序
  - B: `os/src/main.rs:85-109` — 初始化后直接进入任务调度循环，无显式加载程序
- **架构支持方式不同** (独立)
  - A: `src/main.rs:27-32` — 未显式提及架构支持，基于axhal抽象
  - B: `os/src/boot.rs:11-12` — 条件编译支持riscv64和loongarch64双架构
- **启动栈分配方式不同** (独立)
  - A: `core/src/entry.rs:13-20` — 未显式定义启动栈，依赖axhal
  - B: `os/src/boot.rs:4-8` — 在.bss.stack段静态分配64KB栈数组

### 7.2 内存管理 (`mm`)

**对照判定**: 实现路径分化

**A 仓做法**: 基于axmm::AddrSpace管理进程虚拟地址空间，位标志封装mmap权限与类型，支持ELF加载、信号trampoline映射、用户内存访问保护，提供sys_mmap/munmap/mprotect。

**B 仓做法**: 基于多级页表的虚拟内存管理，支持RISC-V和LoongArch双架构，栈式物理帧分配器与FrameTracker RAII回收，支持写时复制(COW)、惰性分配、mmap/munmap等，内核地址空间懒静态初始化。

**关键差异点**:

- **架构与页表实现抽象层次不同** (独立)
  - A: `core/src/mm.rs:1-1` — 使用axmm::AddrSpace抽象管理虚拟内存映射，不直接操作页表
  - B: `os/src/mm/page_table.rs:28-30` — 直接操作多级页表（PageTableEntry、PTEFlags），条件编译适配RISC-V和LoongArch
- **写时复制(COW)支持** (独立)
  - A: `api/src/imp/mm/mmap.rs:15-30` — 未提及COW机制，映射类型仅区分共享/私有/固定/匿名
  - B: `os/src/mm/page_table.rs:105-108` — 页表项bit 9统一用作写时复制(COW)标记，处理COW缺页
- **物理帧管理与分配策略** (独立)
  - A: `core/src/mm.rs:1-1` — 未显式设计物理帧分配器，依赖axmm内部管理
  - B: `os/src/mm/memory_set.rs:2-2` — 通过frame_alloc/frame_dealloc及FrameTracker的Drop实现RAII自动回收的栈式分配器
- **缺页处理机制** (独立)
  - A: `core/src/mm.rs:214-224` — 仅通过percpu标志保护用户内存访问，未详细描述缺页处理
  - B: `os/src/mm/memory_set.rs:17-19` — 支持惰性缺页、写时复制缺页和mmap缺页多种处理方式
- **信号trampoline映射** (独立)
  - A: `core/src/mm.rs:21-30` — 明确将信号trampoline映射到用户空间固定虚拟地址
  - B: `os/src/mm/memory_set.rs:35-39` — 未提及信号trampoline映射，专注于内核地址空间懒初始化

### 7.3 进程/任务 (`task`)

**对照判定**: 实现路径分化

**A 仓做法**: 采用 Rust 语言实现类 Linux 内核的进程与任务调度模块。使用 Arc/Weak 及 Mutex 管理进程、线程、进程组和会话，提供 fork、execve、exit 等系统调用，支持信号处理与时间统计。调度层面基于 TaskExt 和 WaitQueue 实现阻塞与唤醒。

**B 仓做法**: 基于 rCore-Tutorial 的进程与线程管理，采用 Stride 调度算法，进程(PCB)包含多个线程(TCB)，使用 UPSafeCell 实现单核态互斥，支持 fork/clone/execve/exit 等系统调用，通过 RecycleAllocator 管理 PID/TID 分配，集成 Futex 同步与信号处理。

**关键差异点**:

- **调度算法实现方式** (替换)
  - A: `api/src/imp/task/signal.rs:1-3` — 基于 TaskExt 和 WaitQueue 的抽象调度
  - B: `os/src/task/process.rs:66-68` — 采用 Stride 调度算法，基于优先级计算 pass
- **PID/TID 分配机制** (替换)
  - A: `process/src/process.rs:119-125` — 全局进程表与 spawn_process 分配新 PID
  - B: `os/src/task/process.rs:205-211` — RecycleAllocator 回收式分配 PID/TID/HeapID
- **线程创建支持** (新增)
  - A: `process/src/process.rs:127` — 仅提供 fork 创建新进程，无显式线程创建
  - B: `os/src/task/process.rs:482-493` — clone 系统调用支持 CLONE_THREAD 创建线程

### 7.4 文件系统 (`fs`)

**对照判定**: 两边都未实现

**A 仓做法**: (LLM 未给出)

**B 仓做法**: (LLM 未给出)

(无显著差异)

### 7.5 信号 (`signal`)

**对照判定**: 实现路径分化

**A 仓做法**: 基于axsignal抽象类型，在用户态陷阱返回时自动检查信号，支持五种动作，实现了完整的Linux信号系统调用集，包括三级信号发送。

**B 仓做法**: 仿照Linux信号模型，使用bitflags管理信号，通过setup_frame构建用户栈帧执行自定义处理，支持默认操作分类。

**关键差异点**:

- **信号表示方式不同** (替换)
  - A: `api/src/imp/task/signal.rs:5-8` — 使用axsignal crate的抽象类型（SignalSet等）
  - B: `os/src/signal/signal.rs:33-64` — 使用bitflags表示信号掩码（SignalFlags）
- **信号检查机制不同** (替换)
  - A: `api/src/imp/task/signal.rs:51-56` — 通过post_trap_callback自动检查信号
  - B: `os/src/signal/mod.rs:34` — 显式调用check_if_any_sig_for_current_task
- **自定义处理实现方式不同** (替换)
  - A: `api/src/imp/task/signal.rs:30-48` — 通过check_signals执行动作，未提及用户栈帧
  - B: `os/src/signal/mod.rs:81-182` — 通过setup_frame在用户栈构建上下文帧并恢复
- **信号发送粒度不同** (替换)
  - A: `api/src/imp/task/signal.rs:133-164` — 支持线程、进程、进程组三级发送
  - B: `os/src/signal/mod.rs:270` — 仅有send_signal_to_thread_group（线程组级）

### 7.6 IPC (`ipc`)

**对照判定**: 仅 A 实现

**A 仓做法**: 实现了基于全局页分配器的共享内存子系统，通过内核态虚拟地址映射和引用计数管理共享内存段，使用 BTreeMap 和原子键生成机制支持创建、查询和删除操作。

**B 仓**: 未实现该模块

**关键差异点**:

- **共享内存子系统** (缺失)
  - A: `core/src/shared_memory.rs:9-74` — 实现了共享内存创建、获取、删除
  - B: `N/A:N/A` — B 仓库未实现

### 7.7 网络 (`net`)

**对照判定**: 实现路径分化

**A 仓做法**: 以枚举 Socket 封装 axnet 的 TcpSocket/UdpSocket，通过匹配分发实现 POSIX 网络系统调用；提供 SockAddr 安全抽象层转换 sockaddr，支持 IPv4 并预留 IPv6 骨架；内置 DNS 查询和 addrinfo 内存管理。

**B 仓做法**: 基于 smoltcp 协议栈实现的 TCP/UDP 网络模块，通过原子状态机管理 TCP 连接生命周期，提供 POSIX 风格 socket API，支持阻塞/非阻塞 I/O、loopback 回环设备及 DNS 查询。

**关键差异点**:

- **底层协议栈不同** (替换)
  - A: `api/src/imp/net/socket.rs:67-70` — 封装 axnet 的 TcpSocket/UdpSocket
  - B: `os/src/net/socket/mod.rs:188-189` — 基于 smoltcp 协议栈封装 socket 集合
- **套接字抽象方式** (替换)
  - A: `api/src/imp/net/socket.rs:67-70` — 枚举 Socket 统一封装 TCP/UDP
  - B: `os/src/net/socket/mod.rs:177` — SocketSetWrapper 独立管理各类型 socket
- **地址抽象层** (新增)
  - A: `api/src/imp/net/socketaddr.rs:44-50` — SockAddr 提供安全 sockaddr 抽象
  - B: `os/src/net/socket/tcp.rs:52` — 直接使用 smoltcp 内部地址表示
- **TCP 连接状态管理** (新增)
  - A: `api/src/imp/net/socket.rs:298` — 调用 axnet 的 connect，未显式状态机
  - B: `os/src/net/socket/tcp.rs:30-35` — 原子状态机驱动 TCP 生命周期
- **监听连接管理** (替换)
  - A: `api/src/imp/net/socket.rs:461` — 直接调用 axnet 的 accept
  - B: `os/src/net/socket/mod.rs:36-37` — Listener 表分离监听与连接管理
- **阻塞/非阻塞 I/O** (新增)
  - A: `api/src/imp/net/socket.rs:316` — 未明确区分阻塞/非阻塞模式
  - B: `os/src/net/socket/tcp.rs:119-122` — 通过 WouldBlock 错误及 yield 实现非阻塞

### 7.8 驱动 (`drivers`)

**对照判定**: 仅 B 实现

**A 仓**: 未实现该模块

**B 仓做法**: 基于trait的驱动抽象层，支持VirtIO MMIO/PCI，提供网络和块设备驱动

(无显著差异)

### 7.9 系统调用 (`syscall`)

**对照判定**: 实现路径分化

**A 仓做法**: 基于中断注册的集中式分发架构，通过TrapFrame统一提取参数，匹配Sysno枚举分派到各模块实现。

**B 仓做法**: 模块化设计，按功能分为文件系统、内存、网络等子模块，由mod.rs统一分发，通过进程内锁和地址翻译实现。

**关键差异点**:

- **系统调用分发机制** (替换)
  - A: `src/syscall.rs:13-15` — 中断处理函数集中分发所有系统调用
  - B: `os/src/syscall/fs.rs:10-16` — 进程内锁与文件描述符表管理，模块化分发
- **参数提取与地址翻译** (替换)
  - A: `src/syscall.rs:27-27` — 从TrapFrame统一提取参数
  - B: `os/src/syscall/fs.rs:3-8` — 通过translated_byte_buffer等安全翻译用户指针
- **未实现系统调用处理** (新增)
  - A: `src/syscall.rs:467-482` — 提供返回ENOSYS、直接返回0、调用exit三种降级策略
  - B: `os/src/syscall/fs.rs:32-39` — 统一使用SysErrNo枚举处理错误，未实现返回ENOSYS
- **I/O多路复用支持** (独立)
  - A: `api/src/imp/fs/poll.rs:0-0` — 定义了PollFlags和PollEntry结构，但未明确pselect/ppoll
  - B: `os/src/syscall/fs.rs:58-65` — 显式支持pselect和ppoll系统调用
- **网络协议栈抽象** (替换)
  - A: `api/src/imp/net/socket.rs:37-40` — 基于Socket枚举封装UDP/TCP
  - B: `os/src/syscall/net.rs:13-18` — 基于File trait和Socket枚举抽象网络接口


## 八、B 相对 A 的关键差异

**总评**: B 基于 rCore-Tutorial 扩展，相对 A (基于 ArceOS) 实现了多架构支持、写时复制内存管理、Stride 调度、无锁网络栈等特性，但缺少进程组、IPC 共享内存和系统调用降级策略，整体偏向教学实验，与 A 的生产级定位形成互补。

**整体定位**: 同源分化 — 两仓共享起点但走向不同

### 8.1 多架构启动支持

**类型**: 新增 · **显著度**: ★★★★★

B 通过条件编译和 global_asm! 同时支持 RISC‑V 和 LoongArch 双架构，A 仅有单一架构入口，未显式声明多架构支持，这是内核可移植性的核心差异。

- A: `src/main.rs:27-32` — 单一 main 入口，无架构条件编译
- B: `os/src/boot.rs:11-12` — 条件编译支持 riscv64 和 loongarch64

### 8.2 写时复制与惰性分配内存管理

**类型**: 新增 · **显著度**: ★★★★★

B 在页表项中使用 bit 9 标记写时复制，并实现惰性缺页与 mmap 缺页处理，有效提升内存效率；A 仅提供基础的 mmap 权限封装，无 COW 或惰性分配机制。

- A: `api/src/imp/mm/mmap.rs:15-30` — 位标志封装 mmap 权限，无 COW
- B: `os/src/mm/memory_set.rs:17-19` — 支持惰性缺页、写时复制缺页等

### 8.3 网络协议栈实现方式

**类型**: 替换 · **显著度**: ★★★★☆

A 用枚举 Socket + 匹配路由实现 TCP/UDP 多态；B 则基于 smoltcp 封装原子状态机，通过 compare_exchange 实现无锁状态转换，两者采用截然不同的设计范式。

- A: `api/src/imp/net/socket.rs:67-70` — 枚举 Socket 统一封装 TCP/UDP
- B: `os/src/net/socket/tcp.rs:30-35` — 原子状态机驱动 TCP 生命周期

### 8.4 信号处理框架设计

**类型**: 替换 · **显著度**: ★★★★☆

A 采用信号 trampoline 固定映射，支持三级发送；B 则通过 setup_frame 在用户栈构建上下文帧，结合标准信号编号与默认操作分类，两者实现思路独立。

- A: `core/src/mm.rs:21-30` — 信号 trampoline 映射到固定虚拟地址
- B: `os/src/signal/mod.rs:81-182` — setup_frame 在用户栈构建信号帧

### 8.5 进程组与会话机制缺失

**类型**: 取消 · **显著度**: ★★★☆☆

B 仅实现进程‑线程双层结构，未引入进程组或会话管理，而 A 在进程模块中实现了完整的 Unix 进程层次，该差异影响进程组织和信号发送。

- A: `process/src/process.rs:73-96` — 实现进程组与会话管理
- B: `os/src/task/process.rs:48-49` — 仅进程‑线程双层结构，无进程组


## 九、综合相似度评分

### 9.1 各维度得分

| 维度 | 权重 | A↔B 得分 | 加权 |
|---|---|---|---|
| 函数签名 Jaccard | 0.30 | 0.2698 | 0.0809 |
| syscall Jaccard | 0.20 | 0.413 | 0.0826 |
| 依赖 Jaccard | 0.20 | 0.1111 | 0.0222 |
| 调用图综合 | 0.20 | 0.3543 | 0.0709 |
| 目录 Jaccard | 0.10 | 0.0 | 0.0 |
| **合计** | **1.00** | — | **0.2566** |

### 9.2 等级判定

| 范围 | 等级 |
|---|---|
| ≥ 0.70 | 高度相似 |
| 0.40 - 0.70 | 中度相似 |
| 0.15 - 0.40 | 低度相似 |
| < 0.15 | 完全不同 |

**本次评级**: **低度相似** (0.2566)

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