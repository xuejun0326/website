# OSKernel2025-StarryX-3037 ↔ T202510008995695-2720 对比分析报告

> **生成时间**: 2026-06-16 15:32 UTC
> **对比方向**: 以 **OSKernel2025-StarryX-3037** 为基准 (A), 分析 **T202510008995695-2720** (B) 的差异
> **运行时长**: 341.29s · prompt=19939 · completion=13998 · reasoning=7438
> **综合相似度**: **0.2299** (低度相似)

## 一、总览

| 维度 | A: OSKernel2025-StarryX-3037 | B: T202510008995695-2720 |
|---|---|---|
| 家族 | `arceos-starry` | `rcore-tutorial` |
| Cargo 形态 | workspace · 2 成员 | 单 crate |
| 文件数 | 451 | 243 |
| 代码行数 | 42442 | 64945 |
| syscall 数 | 239 | 114 |
| 启动方式 | `axhal` | `global_asm` |
| trap handlers | SYSCALL, PAGE_FAULT, POST_TRAP, IRQ | — |
| 已实现模块 | 启动流程 / 内存管理 / 进程与任务调度 / 文件系统 / 信号机制 / 进程间通信 / 网络 / 系统调用层 | 启动流程 / 内存管理 / 进程与任务调度 / 文件系统 / 信号机制 / 网络 / 驱动框架 / 系统调用层 |
| 未实现模块 | 驱动框架 | 进程间通信 |

## 二、结构差异

**目录 Jaccard**: 0.0044

| 仅 A 有 | 共有 | 仅 B 有 |
|---|---|---|
| `arceos` | `docs` | `docs/final` |
| `arceos/api` | — | `docs/img` |
| `arceos/configs` | — | `docs/prel` |
| `arceos/crates` | — | `docs/site` |
| `arceos/doc` | — | `os` |
| `arceos/examples` | — | `os/cargo` |
| `arceos/modules` | — | `os/libs` |
| `arceos/scripts` | — | `os/src` |
| `arceos/tools` | — | `os/vendor` |
| `arceos/ulib` | — | `user` |
| `bin` | — | `user/cargo` |
| `docs/StarryX` | — | `user/src` |
| `src` | — | — |
| `vendor` | — | — |
| `vendor/aarch64-cpu` | — | — |

## 三、依赖差异

- A 总依赖数: **46**
- B 总依赖数: **14**
- 交集: **5**
- 仅 A 有: 41 项
- 仅 B 有: 9 项
- **依赖 Jaccard**: **0.0909**

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

- `bit_field`
- `buddy_system_allocator`
- `hashbrown`
- `log`
- `loongarch64`
- `lwext4_rust`
- `riscv`
- `smoltcp`
- `virtio-drivers`

## 四、syscall 差异

- A 实现 syscall 数: **239**
- B 实现 syscall 数: **113**
- 共同实现: **93**
- **syscall Jaccard**: **0.3591**

### 4.1 仅 A 实现的 syscall (146 个)

`accept4`, `access`, `add_key`, `adjtimex`, `arch_prctl`, `capget`, `capset`, `chmod`, `chroot`, `clock_adjtime`, `clock_getres`, `clock_settime`  
`clone3`, `copy_file_range`, `dup2`, `epoll_create`, `epoll_create1`, `epoll_ctl`, `epoll_pwait`, `epoll_pwait2`, `eventfd`, `eventfd2`, `faccessat2`, `fadvise64`  
`fallocate`, `fanotify_init`, `fanotify_mark`, `fchdir`, `fchmod`, `fchmodat2`, `fchown`, `fchownat`, `fdatasync`, `fgetxattr`, `flistxattr`, `flock`  
`fork`, `fremovexattr`, `fsetxattr`, `fstatfs`, `getgroups`, `getitimer`, `getpeername`, `getpgid`, `getpriority`, `getresgid`, `getresuid`, `getsid`  
`getxattr`, `keyctl`, `link`, `listxattr`, `llistxattr`, `lremovexattr`, `lsetxattr`, `lstat`, `memfd_secret`, `mincore`, `mkdir`, `mknod`  
`mknodat`, `mlock`, `mq_getsetattr`, `mq_notify`, `mq_open`, `mq_timedreceive`, `mq_timedsend`, `mq_unlink`, `mremap`, `msgctl`, `msgget`, `msgrcv`  
`msgsnd`, `munlock`, `newfstatat`, `open`, `personality`, `pidfd_getfd`, `pidfd_open`, `pidfd_send_signal`, `pipe`, `pkey_alloc`, `pkey_free`, `pkey_mprotect`  
`poll`, `prctl`, `preadv`, `preadv2`, `ptrace`, `pwrite64`, `pwritev`, `pwritev2`, `readlink`, `reboot`, `removexattr`, `rename`  
`renameat`, `request_key`, `rmdir`, `rt_sigpending`, `rt_sigqueueinfo`, `rt_sigsuspend`, `rt_tgsigqueueinfo`, `sched_get_priority_max`, `sched_get_priority_min`, `sched_getparam`, `sched_getscheduler`, `sched_setaffinity`  
`sched_setparam`, `sched_setscheduler`, `select`, `semctl`, `semget`, `semop`, `setfsgid`, `setfsuid`, `setgid`, `setgroups`, `sethostname`, `setpgid`  
`setregid`, `setresgid`, `setresuid`, `setreuid`, `setuid`, `setxattr`, `shmdt`, `shutdown`, `sigaltstack`, `splice`, `stat`, `symlink`  
`symlinkat`, `timer_create`, `timer_delete`, `timer_getoverrun`, `timer_gettime`, `timer_settime`, `timerfd_create`, `timerfd_gettime`, `timerfd_settime`, `truncate`, `unlink`, `utime`  
`utimes`, `waitid`

### 4.2 仅 B 实现的 syscall (20 个)

`condvar_create`, `condvar_signal`, `condvar_wait`, `enable_deadlock_detect`, `faccessat`, `get_mempolicy`, `lsm_set_self_attr`, `mail_read`, `mail_write`, `mseal`, `mutex_create`, `mutex_lock`  
`mutex_unlock`, `semaphore_create`, `semaphore_down`, `semaphore_up`, `spawn`, `sync`, `timerfd_gettime64`, `umask`

## 五、函数签名 Jaccard

- A 公开函数签名数 (`pub fn`): **6805**
- B 公开函数签名数: **4500**
- 完全相同的签名: **2205**
- **函数签名 Jaccard**: **0.2423**

### 5.1 仅 A 暴露的接口样本 (前 10)

- `from_thread_static(&Arc<Thread>) -> &XProcess`
- `sys_tkill(Pid,u32) -> LinuxResult<isize>`
- `sys_pread64(c_int,UserPtr<u8>,usize,__kernel_off_t) -> LinuxResult<isize>`
- `cr2_write(u64) -> ()`
- `till_line_ending(&mutInput) -> Result<<InputasStream>::Slice,Error>`
- `fold_expr_binary(&mutF,ExprBinary) -> ExprBinary`
- `visit_predicate_type_mut(&mutV,&mutPredicateType) -> ()`
- `flags(SELF) -> PTFlags`
- `new(&str,&str) -> UnsavedFile`
- `as_static_str_inner(&DeriveInput,&GenerateTraitVariant) -> syn::Result<TokenStream>`

### 5.2 仅 B 暴露的接口样本 (前 10)

- `dedup(I) -> Dedup<I>`
- `si_pid(SELF) -> crate::pid_t`
- `new(u8,&[u8]) -> Memchr<>`
- `accept(SELF) -> AxResult<TcpSocket>`
- `count(SELF,implFnMut(*constu8,*constu8) -> usize,)->usize`
- `values_mut(SELF) -> implIterator<Item=&mutV>`
- `unwrap_left(SELF) -> L`
- `pie(SELF) -> bool`
- `take(SELF) -> Option<T>`
- `new(VirtIOBlk<H,T>) -> Self`

## 六、调用图差异 (轻量版)

> 第一版用集合层数字 + 高频函数名列表把『两个内核调用模式有多接近』讲清楚, 不画 mermaid (后续优化项)。

### 6.1 调用图统计

| 维度 | A | B |
|---|---|---|
| 节点数 (函数) | 7868 | 7921 |
| 边数 (调用关系) | 28164 | 28285 |
| 平均出度 | 5.36 | 5.06 |

### 6.2 节点 Jaccard: **0.3622**

### 6.3 边 Jaccard: **0.3053**

### 6.4 综合调用图相似度 = 0.5·node + 0.5·edge = **0.3337**

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

**A 仓做法**: 以 main 函数为入口，打印 Logo，创建初始进程，挂载 VFS，执行 init.sh，依赖 axhal 框架。

**B 仓做法**: 使用汇编入口（global_asm!），支持 riscv64/loongarch64，静态栈，clear_bss，按序初始化后进入调度。

**关键差异点**:

- **启动入口实现方式** (独立)
  - A: `src/main.rs:56-68` — 直接 Rust main 函数作为入口
  - B: `os/src/boot.rs:11-28` — global_asm! 嵌入汇编 _start 入口
- **多架构支持** (独立)
  - A: `src/main.rs:1-60` — 未显式区分架构，依赖 axhal
  - B: `os/src/boot.rs:11-12,32-33` — 条件编译 riscv64/loongarch64
- **启动栈分配方式** (独立)
  - A: `src/main.rs:1-56` — 未显式定义启动栈，由 axhal 管理
  - B: `os/src/boot.rs:4-8` — 静态数组 BOOT_STACK 在 .bss.stack 段
- **BSS 段清零** (独立)
  - A: `src/main.rs:1-68` — 未涉及 clear_bss
  - B: `os/src/main.rs:74-83` — 调用 clear_bss 清零 BSS 段
- **初始化顺序与内容** (独立)
  - A: `src/main.rs:56-68` — 创建进程、挂载 VFS、执行 init.sh
  - B: `os/src/main.rs:85-109` — clear_bss, 日志, 内存, 陷阱, 定时器, 文件系统, 网络, 调度
- **Logo 打印方式** (独立)
  - A: `src/main.rs:24-37` — print_logo 彩色打印 ASCII Logo
  - B: `os/src/main.rs:85-109` — 无 Logo 打印，直接初始化

### 7.2 内存管理 (`mm`)

**对照判定**: 独立设计

**A 仓做法**: 基于VMA的进程地址空间管理，支持匿名/文件映射、按需分页、大页面，提供mmap/munmap/mprotect，文件页缓存管理器。

**B 仓做法**: 基于多级页表的虚拟内存管理，支持RISC-V和LoongArch双架构，栈式物理帧分配器，COW、惰性分配、mmap/munmap。

**关键差异点**:

- **地址空间抽象模型不同** (独立)
  - A: `xapi/src/mm/mmap.rs:139-146` — 使用XUserSpace封装地址空间，基于VMA区域管理
  - B: `os/src/mm/memory_set.rs:47-47` — 使用MemorySet表示进程地址空间，直接操作页表和映射区域
- **文件页缓存机制差异** (独立)
  - A: `xcore/src/mm/page_cache.rs:1-20` — 实现PageCacheManager全局文件页缓存，按inode缓存并支持淘汰
  - B: `os/src/mm/memory_set.rs:17-19` — 未显式提供文件页缓存，mmap缺页时可能直接读取文件
- **缺页处理机制不同** (独立)
  - A: `xmodules/xvma/src/lib.rs:67-84` — 按需分页，通过VMA的loaded_pages集合记录已加载页
  - B: `os/src/mm/memory_set.rs:17-19` — 支持惰性缺页、写时复制缺页和mmap缺页多种处理类型
- **物理内存管理方式各异** (独立)
  - A: `xcore/src/mm/page_cache.rs:1-20` — 未显式提供物理帧分配器，依赖PageCacheManager管理缓存
  - B: `os/src/mm/memory_set.rs:2-2` — 使用FrameTracker实现RAII自动回收，栈式物理帧分配器
- **多架构页表实现** (独立)
  - A: `xapi/src/mm/mmap.rs:20-33` — 未涉及页表，通过VMA抽象实现映射，不依赖具体架构
  - B: `os/src/mm/page_table.rs:28-30` — 跨架构多级页表，条件编译适配RISC-V和LoongArch
- **写时复制(COW)支持** (独立)
  - A: `xmodules/xvma/src/lib.rs:1-42` — 未明确实现COW，可能通过VMA的写保护页处理
  - B: `os/src/mm/page_table.rs:105-108` — 页表项bit 9统一用作COW标记，有专门cow_page_fault处理

### 7.3 进程/任务 (`task`)

**对照判定**: 实现路径分化

**A 仓做法**: 基于arceos-starry框架，通过任务扩展机制将Linux进程/线程语义挂接到通用调度器上，支持完整凭证、信号、futex等。

**B 仓做法**: 基于rCore-Tutorial的进程与线程管理，采用Stride调度算法，PCB持有线程列表，支持fork/clone等系统调用。

**关键差异点**:

- **进程线程数据结构** (替换)
  - A: `xcore/src/task/proc.rs:121-141` — XThread和XProcess作为任务扩展
  - B: `os/src/task/process.rs:19-49` — PCB和TCB作为独立控制块
- **调度算法实现** (替换)
  - A: `xcore/src/task/proc.rs:208-209` — 调度策略和优先级作为属性，未指定算法
  - B: `os/src/task/process.rs:66-68` — 明确使用Stride调度算法计算pass
- **凭证模型支持** (新增)
  - A: `xapi/src/task/cred.rs:14-28` — 完整Linux凭证模型，支持UID/EUID/SUID/FSUID
  - B: `os/src/task/process.rs:34-49` — 无凭证相关数据结构
- **信号处理方式** (替换)
  - A: `xapi/src/task/signal.rs:1-8` — 信号框架嵌入线程与进程扩展中
  - B: `os/src/task/process.rs:34-49` — 信号在PCB内部状态中处理
- **Futex实现机制** (替换)
  - A: `xcore/src/task/proc.rs:137-140` — FutexTable挂载在XProcess中，支持进程私有/共享
  - B: `os/src/task/mod.rs:131-136` — Futex机制在模块级实现，用于用户态同步唤醒
- **进程树管理方式** (替换)
  - A: `xcore/src/task/proc.rs:312-315` — 全局弱引用哈希表管理进程/线程/组/会话
  - B: `os/src/task/process.rs:34-49` — PCB内部使用子进程列表管理进程树

### 7.4 文件系统 (`fs`)

**对照判定**: 仅 A 实现

**A 仓做法**: 基于 axfs_ng 虚拟文件系统层，通过 FileLike trait 统一文件描述符抽象，实现丰富的 Linux 文件系统调用，并采用 DirBuffer 高效处理 getdents64。

**B 仓做法**: (LLM 未给出)

**关键差异点**:

- **统一文件描述符抽象** (新增)
  - A: `xapi/src/fs/io.rs:1-15` — 通过 FileLike trait 统一文件描述符抽象
- **上下文感知路径解析** (新增)
  - A: `xapi/src/fs/ctl.rs:35-44` — 使用 with_fs/with_file 进行路径解析
- **DirBuffer高效getdents64** (新增)
  - A: `xapi/src/fs/ctl.rs:76-94` — DirBuffer管理目录条目缓冲区
- **fanotify事件监控** (新增)
  - A: `xamini/src/syscall/mod.rs:495-496` — 实现了fanotify事件监控机制

### 7.5 信号 (`signal`)

**对照判定**: 实现路径分化

**A 仓做法**: 基于 Rust 实现的分层信号处理模块，采用进程级和线程级双层信号管理器，支持标准信号（1-31）与实时信号（32-64），通过信号帧在用户栈上构建上下文并跳转到处理函数，提供信号掩码、挂起等待等完整操作。

**B 仓做法**: 仿照Linux信号模型实现，支持标准信号编号与默认操作分类，通过bitflags管理待处理信号和掩码，利用setup_frame在用户栈构建上下文帧以执行自定义处理程序，并支持SA_RESTART等标志。

**关键差异点**:

- **信号表示方式** (独立)
  - A: `xmodules/xsignal/src/types.rs:13-93` — 使用枚举Signo和u64位图SignalSet
  - B: `os/src/signal/signal.rs:33-64` — 使用bitflags SignalFlags表示信号集合
- **信号管理器层次** (新增)
  - A: `xmodules/xsignal/src/api/thread.rs:20-26` — 进程级和线程级双层信号管理器
  - B: `os/src/signal/mod.rs:34-43` — 仅任务级（线程）信号管理，无进程层
- **默认动作分类方式** (独立)
  - A: `xmodules/xsignal/src/types.rs:103-137` — 通过静态映射关联信号与默认动作
  - B: `os/src/signal/signal.rs:66-106` — 显式定义SigOp枚举五种默认操作
- **信号帧构建与恢复** (替换)
  - A: `xmodules/xsignal/src/api/thread.rs:52-107` — handle_signal集成构建帧与上下文保存恢复
  - B: `os/src/signal/mod.rs:81-186` — 分离为setup_frame和restore_frame两个函数

### 7.6 IPC (`ipc`)

**对照判定**: 仅 A 实现

**A 仓做法**: 基于 System V IPC 规范实现信号量、共享内存子系统，全局 IPC_MANAGER 管理，支持 SEM_UNDO 和等待队列，共享内存使用 BiBTreeMap 映射。

**B 仓**: 未实现该模块

**关键差异点**:

- **全局 IPC Manager 统一管理资源** (新增)
  - A: `xapi/src/ipc/sem.rs:8-13` — 使用 with_ipc_manager! 宏同步访问
  - B: `无:0-0` — 未实现
- **信号量支持 SEM_UNDO 与进程退出清理** (新增)
  - A: `xapi/src/ipc/sem.rs:166-175` — 实现 undo 操作与 clear_proc_sem
  - B: `无:0-0` — 未实现
- **共享内存使用 BiBTreeMap 双索引映射** (新增)
  - A: `xcore/src/ipc/shm.rs:175-180` — 维护 segments/index/pid_shmid_vaddr
  - B: `无:0-0` — 未实现
- **信号量操作采用简化忙等待而非阻塞** (新增)
  - A: `xapi/src/ipc/sem.rs:127-143` — 忙等待结合 IPC_NOWAIT 支持
  - B: `无:0-0` — 未实现
- **完整实现 semctl 所有标准命令** (新增)
  - A: `xapi/src/ipc/sem.rs:200-260` — 支持 IPC_STAT/IPC_SET/GETVAL 等
  - B: `无:0-0` — 未实现
- **共享内存验证参数并限制系统总量** (新增)
  - A: `xcore/src/ipc/shm.rs:340-355` — 检查大小和系统限制
  - B: `无:0-0` — 未实现

### 7.7 网络 (`net`)

**对照判定**: 实现路径分化

**A 仓做法**: 基于axnet TCP/UDP/Unix三协议栈，通过Socket枚举派发与impl_socket宏减少样板代码；syscall层与核心逻辑分离，支持阻塞/非阻塞及文件描述符复用，Unix socket功能有限。

**B 仓做法**: 基于smoltcp协议栈实现TCP/UDP网络模块，通过原子状态机管理TCP连接生命周期，提供POSIX风格socket API，支持阻塞/非阻塞I/O、loopback回环设备及DNS查询。

**关键差异点**:

- **底层协议栈不同** (替换)
  - A: `xcore/src/net/socket.rs:8` — 使用axnet提供的TcpSocket/UdpSocket等
  - B: `os/src/net/socket/mod.rs:177` — 封装smoltcp的SocketSet作为SocketSetWrapper
- **Unix socket支持** (新增)
  - A: `xcore/src/net/socket.rs:17-23` — Socket枚举包含UnixSocket变体
  - B: `os/src/net/socket/tcp.rs:52` — 仅定义TcpSocket，无Unix socket实现
- **TCP状态管理方式** (替换)
  - A: `xcore/src/net/socket.rs:17` — Socket枚举通过Mutex包裹底层socket，未显式状态机
  - B: `os/src/net/socket/tcp.rs:30-35` — 使用原子状态机管理TCP连接状态
- **监听机制设计** (替换)
  - A: `xapi/src/net/socket.rs:103` — 直接调用底层listen方法，无独立Listener表
  - B: `os/src/net/socket/mod.rs:36-37` — 使用ListenTable分离监听与连接管理
- **UDP自动绑定地址** (新增)
  - A: `xcore/src/net/socket.rs:65-73` — UDP sendto时若未绑定则自动分配本地地址
  - B: `os/src/net/socket/tcp.rs:143` — UDP实现无自动绑定机制，需手动bind

### 7.8 驱动 (`drivers`)

**对照判定**: 仅 B 实现

**A 仓**: 未实现该模块

**B 仓做法**: 基于 trait 的驱动抽象层，提供统一接口；通过泛型参数 Hal 和 Transport 实现硬件解耦；支持 VirtIO 的 MMIO 和 PCI 传输，内部使用 spin::Mutex 保证线程安全。

**关键差异点**:

- **Trait 驱动的统一设备接口** (新增)
  - B: `os/src/drivers/virtio/net.rs:18-18` — 使用BaseDriver trait统一设备接口
- **泛型+Hal/Transport硬件解耦** (新增)
  - B: `os/src/drivers/virtio/net.rs:26-26` — 通过泛型参数Hal和Transport解耦硬件
- **内部spin::Mutex并发安全** (新增)
  - B: `os/src/drivers/virtio/net.rs:27-27` — 使用spin::Mutex保护内部状态
- **支持MMIO和PCI两种传输方式** (新增)
  - B: `os/src/drivers/virtio/net.rs:33-33` — 支持MMIO和PCI两种VirtIO传输方式

### 7.9 系统调用 (`syscall`)

**对照判定**: 实现路径分化

**A 仓做法**: 统一入口分发，match分发至xapi子系统，大量桩实现，UserPtr安全访问用户空间。

**B 仓做法**: 模块化设计，按功能分fs/mem/net子模块，进程内锁管理fd，translated_byte_buffer翻译用户地址，支持网络和I/O多路复用。

**关键差异点**:

- **用户空间访问机制** (替换)
  - A: `xapi/src/fs/ctl.rs:1-20` — 使用UserPtr/UserConstPtr封装用户指针
  - B: `os/src/syscall/fs.rs:3-8` — 使用translated_byte_buffer地址翻译
- **系统调用组织方式** (独立)
  - A: `src/syscall.rs:1-200` — 统一入口match分发到xapi函数
  - B: `os/src/syscall/fs.rs:10-16` — 模块化组织，通过进程内锁访问PCB
- **网络系统调用实现** (新增)
  - A: `src/syscall.rs:75-90` — 未提及网络调用，大量桩实现
  - B: `os/src/syscall/net.rs:13-18` — 实现了socket/bind/connect等网络系统调用
- **I/O多路复用支持** (新增)
  - A: `src/syscall.rs:75-90` — 未实现pselect/ppoll
  - B: `os/src/syscall/fs.rs:58-65` — 实现了pselect和ppoll系统调用
- **错误码处理方式** (独立)
  - A: `src/syscall.rs:1-200` — 使用LinuxResult<isize>返回错误
  - B: `os/src/syscall/fs.rs:32-33` — 使用SysErrNo枚举统一错误码


## 八、B 相对 A 的关键差异

**总评**: B 基于 rCore-Tutorial 扩展多架构、COW 和原子网络，而 A 深耕 Linux 兼容 IPC/凭证/VFS，两者同源不同路。

**整体定位**: 同源分化 — 两仓共享起点但走向不同

### 8.1 多架构启动支持

**类型**: 新增 · **显著度**: ★★★★☆

B 通过 global_asm! 和条件编译同时支持 RISC-V 与 LoongArch 启动，A 仅针对 x86_64，无多架构启动抽象。

- A: `src/main.rs:56-68` — A 的主入口仅定义单一启动流程，未体现架构选择。
- B: `os/src/boot.rs:11-28` — 条件编译 + global_asm! 实现双架构启动入口。

### 8.2 COW 与惰性分配 vs VMA 按需分页

**类型**: 替换 · **显著度**: ★★★★☆

B 使用页表项 bit 9 标记写时复制并在缺页时处理 COW，优化 fork 内存效率；A 通过 VMA 区域管理实现按需分页和大页面支持，侧重文件映射与拆分。

- A: `xmodules/xvma/src/lib.rs:1-42` — VMA 结构支持文件/匿名映射与按需分页。
- B: `os/src/mm/page_table.rs:105-108` — 页表项 bit 9 用作 COW 标记。

### 8.3 System V IPC 缺失

**类型**: 取消 · **显著度**: ★★★☆☆

A 提供完整的 System V 信号量/共享内存/消息队列管理，B 未实现任何 SysV IPC，进程间通信依赖简单的 Futex 和 pipe。

- A: `xapi/src/ipc/sem.rs:8-13` — 全局 IPC Manager 统一管理信号量等资源。
- B: `os/src/syscall/fs.rs:10-16` — 仅包含文件描述符与进程内锁，无 IPC 调用。

### 8.4 网络协议栈实现范式

**类型**: 替换 · **显著度**: ★★★★☆

A 采用枚举 Socket 统一派发 + 宏消除样板；B 使用基于 smoltcp 的原子状态机驱动 TCP，并通过 compare_exchange 实现无锁状态转换。

- A: `xcore/src/net/socket.rs:17-23` — 三协议 Socket 枚举统一派发。
- B: `os/src/net/socket/tcp.rs:30-35` — TCP 原子状态机定义。

### 8.5 Linux 凭证模型缺失

**类型**: 取消 · **显著度**: ★★★★☆

A 实现 UID/EUID/SUID 等完整凭证模型，B 的任务结构缺少任何用户/组权限字段，反映出面向教学而非权限安全。

- A: `xapi/src/task/cred.rs:14-28` — 定义全套 Linux 凭证字段。
- B: `os/src/task/process.rs:48-49` — PCB 仅包含线程列表，无凭证信息。


## 九、综合相似度评分

### 9.1 各维度得分

| 维度 | 权重 | A↔B 得分 | 加权 |
|---|---|---|---|
| 函数签名 Jaccard | 0.30 | 0.2423 | 0.0727 |
| syscall Jaccard | 0.20 | 0.3591 | 0.0718 |
| 依赖 Jaccard | 0.20 | 0.0909 | 0.0182 |
| 调用图综合 | 0.20 | 0.3337 | 0.0667 |
| 目录 Jaccard | 0.10 | 0.0044 | 0.0004 |
| **合计** | **1.00** | — | **0.2299** |

### 9.2 等级判定

| 范围 | 等级 |
|---|---|
| ≥ 0.70 | 高度相似 |
| 0.40 - 0.70 | 中度相似 |
| 0.15 - 0.40 | 低度相似 |
| < 0.15 | 完全不同 |

**本次评级**: **低度相似** (0.2299)

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