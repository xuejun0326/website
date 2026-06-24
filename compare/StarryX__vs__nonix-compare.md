# OSKernel2025-StarryX-3037 ↔ nonix 对比分析报告

> **生成时间**: 2026-06-16 15:44 UTC
> **对比方向**: 以 **OSKernel2025-StarryX-3037** 为基准 (A), 分析 **nonix** (B) 的差异
> **运行时长**: 145.92s · prompt=18821 · completion=11351 · reasoning=5998
> **综合相似度**: **0.2959** (低度相似)

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

- `recv_slice(SELF,&mut[u8]) -> Result<usize,RecvError>`
- `parent(SELF) -> Option<Arc<Process>>`
- `visit_pat_struct_mut(&mutV,&mutPatStruct) -> ()`
- `selective_ack_permitted(SELF) -> Result<bool>`
- `visit_lit_int_mut(&mutV,&mutLitInt) -> ()`
- `visit_stmt_mut(&mutV,&mutStmt) -> ()`
- `process(SELF) -> Arc<Process>`
- `pmu_counter_fw_read_hi(usize) -> SbiRet`
- `dscp(SELF) -> u8`
- `visit_where_clause_mut(&mutV,&mutWhereClause) -> ()`

### 5.2 仅 B 暴露的接口样本 (前 10)

- `command_line(SELF) -> Option<&str>`
- `iocsr_write_d(usize,u64) -> ()`
- `set_hpm9(SELF,bool) -> ()`
- `handle_irq(SELF,F) -> ()`
- `set_rpcntl3(bool) -> ()`
- `set_boxed_logger(Box<dynLog>) -> Result<(),SetLoggerError>`
- `count_raw(SELF,*constu8,*constu8) -> usize`
- `make_arc_write_guard_unchecked(&Arc<Self>) -> ArcRwLockWriteGuard<R,T>`
- `is_disjoint(SELF,&Self) -> bool`
- `fd_filestat_get(Fd) -> Result<Filestat,Errno>`

## 六、调用图差异 (轻量版)

> 第一版用集合层数字 + 高频函数名列表把『两个内核调用模式有多接近』讲清楚, 不画 mermaid (后续优化项)。

### 6.1 调用图统计

| 维度 | A | B |
|---|---|---|
| 节点数 (函数) | 7856 | 8588 |
| 边数 (调用关系) | 28196 | 29496 |
| 平均出度 | 5.36 | 5.02 |

### 6.2 节点 Jaccard: **0.3284**

### 6.3 边 Jaccard: **0.2797**

### 6.4 综合调用图相似度 = 0.5·node + 0.5·edge = **0.3041**

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

**对照判定**: 实现路径分化

**A 仓做法**: 以axhal框架为基础，在main函数中完成内核初始化，打印Logo、创建初始进程、挂载VFS并执行init.sh。

**B 仓做法**: 使用polyhal硬件抽象层，通过define_entry!宏生成入口，仅hartid 0执行完整初始化后运行任务调度器。

**关键差异点**:

- **入口生成方式不同** (替换)
  - A: `src/main.rs:56-68` — 直接定义main函数作为入口
  - B: `os/src/main.rs:103` — 使用define_entry!宏生成入口
- **初始化范围差异** (新增)
  - A: `src/main.rs:58-68` — 仅创建进程、挂载VFS、执行init.sh
  - B: `os/src/main.rs:68-90` — 完整初始化堆、日志、内存、文件系统、页表等
- **多核处理方式** (新增)
  - A: `src/main.rs:56-56` — 未显式处理多核，假设单核
  - B: `os/src/main.rs:71-73` — 仅hartid 0执行完整初始化，其他核等待
- **内存初始化方式** (替换)
  - A: `src/main.rs:56-68` — 未显式初始化内存，依赖外部模块
  - B: `os/src/main.rs:82-90` — 遍历物理内存区域并注册到帧分配器
- **进程创建机制** (替换)
  - A: `src/main.rs:58-58` — 通过xprocess创建初始进程
  - B: `os/src/main.rs:91-91` — 通过自定义调度器创建初始进程

### 7.2 内存管理 (`mm`)

**对照判定**: 实现路径分化

**A 仓做法**: 基于VMA的进程地址空间管理，支持匿名/文件映射、按需分页、大页面，通过PageCacheManager管理文件页缓存。

**B 仓做法**: 基于分页机制，采用惰性分配、写时复制和共享组模型，通过物理帧追踪器管理页面生命周期。

**关键差异点**:

- **地址空间组织结构** (独立)
  - A: `xcore/src/mm/uspace.rs:1-1` — XUserSpace封装地址空间和VMA区域列表
  - B: `os/src/mm/memory_set.rs:23-23` — MemorySet包含页表和MapArea列表
- **页面缓存管理机制** (独立)
  - A: `xcore/src/mm/page_cache.rs:1-20` — 全局PageCacheManager缓存文件页
  - B: `os/src/mm/map_area.rs:66-70` — 通过共享组和写时复制管理页生命周期
- **虚拟内存区域表示** (独立)
  - A: `xmodules/xvma/src/lib.rs:30-30` — MmapRegion含文件信息、偏移和已加载页集合
  - B: `os/src/mm/map_area.rs:8-8` — MapArea为通用地址区间，管理帧缓存

### 7.3 进程/任务 (`task`)

**对照判定**: 实现路径分化

**A 仓做法**: 基于arceos-starry框架，通过任务扩展机制将Linux进程/线程语义挂接到通用调度器上，支持完整凭证、信号、futex等。

**B 仓做法**: 基于协作式调度、单处理器模型，通过全局TaskManager管理就绪队列，采用UPSafeCell实现内部可变性，支持fork/clone/exec。

**关键差异点**:

- **调度模型不同** (替换)
  - A: `xcore/src/task/proc.rs:61-63` — 任务扩展分离通用调度与Linux语义
  - B: `os/src/task/mod.rs:31-46` — 协作式调度，suspend_current_and_run_next
- **进程/线程数据结构分层** (替换)
  - A: `xcore/src/task/proc.rs:121-141` — XThread和XProcess双层结构
  - B: `os/src/task/task.rs:48-60` — 单一TaskControlBlock，内部通过UPSafeCell封装可变状态
- **凭证模型支持** (新增)
  - A: `xapi/src/task/cred.rs:14-28` — 完整UID/EUID/SUID/FSUID凭证管理
  - B: `os/src/task/task.rs:65-80` — 未提及凭证，仅含内存、信号、文件描述符等
- **Futex支持** (新增)
  - A: `xcore/src/task/proc.rs:137-140` — FutexTable挂载在XProcess中，支持进程私有与共享
  - B: `os/src/task/task.rs:33-35` — 仅有RobustList，无完整futex机制
- **进程创建方式不同** (替换)
  - A: `xcore/src/task/proc.rs:37-40` — new_user_task创建用户态任务
  - B: `os/src/task/task.rs:495-540` — clone_task根据CloneFlags创建子进程

### 7.4 文件系统 (`fs`)

**对照判定**: 实现路径分化

**A 仓做法**: 基于 axfs_ng 虚拟文件系统层，通过 FileLike trait 统一文件描述符抽象，实现上下文感知路径解析和丰富 Linux 系统调用。

**B 仓做法**: 基于 lwext4_rust 封装 ext4 文件系统驱动，通过 OSInode 包装 Ext4Inode 提供文件描述符语义，使用 inode 索引缓存加速路径查找。

**关键差异点**:

- **文件系统后端** (替换)
  - A: `xapi/src/fs/ctl.rs:5-8` — 通过 axfs_ng 和 axfs_ng_vfs 实现虚拟文件系统
  - B: `os/src/fs/inode.rs:1-5` — 基于 lwext4_rust 的 ext4 驱动封装
- **文件描述符抽象** (替换)
  - A: `xapi/src/fs/io.rs:1-15` — 统一文件描述符抽象 (FileLike trait)
  - B: `os/src/fs/inode.rs:16-20` — OSInode 结构体包装 Ext4Inode
- **路径解析方式** (替换)
  - A: `xapi/src/fs/ctl.rs:35-44` — 上下文感知路径解析 (with_fs/with_file)
  - B: `os/src/fs/inode.rs:243-249` — 路径到 inode 的内存缓存索引 (fsidx)
- **目录读取机制** (替换)
  - A: `xapi/src/fs/ctl.rs:76-94` — DirBuffer 高效处理 getdents64
  - B: `os/src/fs/ext4_lw/inode.rs:193-194` — 通过 read_dentry 读取目录项
- **事件监控支持** (新增)
  - A: `xamini/src/syscall/mod.rs:495-496` — fanotify 事件监控机制

### 7.5 信号 (`signal`)

**对照判定**: 实现路径分化

**A 仓做法**: 基于 Rust 实现的分层信号处理模块，采用进程级和线程级双层信号管理器，支持标准信号（1-31）与实时信号（32-64），通过信号帧在用户栈上构建上下文并跳转到处理函数，提供信号掩码、挂起等待等完整操作。

**B 仓做法**: 基于 bitflags 定义 31 个信号编号与默认操作，通过 SigAction/KSigAction 双层结构分离用户与内核信号动作，SigTable 使用 UPSafeCell 管理每进程信号表，支持 kill、rt_sigaction 等系统调用，默认操作包括终止、CoreDump、忽略、停止、继续。

**关键差异点**:

- **信号范围差异** (替换)
  - A: `xmodules/xsignal/src/types.rs:13-93` — 定义了信号 1-64，包括实时信号
  - B: `os/src/signal/sigflags.rs:1-167` — 仅定义 31 个标准信号，无实时信号
- **管理层次不同** (替换)
  - A: `xmodules/xsignal/src/api/thread.rs:20-26` — 线程级信号管理器 ThreadSignalManager，双层结构
  - B: `os/src/signal/sigtable.rs:7-57` — 进程级 SigTable 管理所有信号动作
- **信号帧上下文切换** (新增)
  - A: `xmodules/xsignal/src/api/thread.rs:12-15` — 定义 SignalFrame，在用户栈构造并恢复上下文
  - B: `os/src/signal/sigact.rs:10-16` — 无信号帧机制，仅通过默认操作处理
- **信号掩码类型** (替换)
  - A: `xmodules/xsignal/src/types.rs:203-210` — SignalSet 使用 u64 位图表示
  - B: `os/src/signal/sigflags.rs:35-40` — SignalFlags 使用 u32 bitflags
- **用户/内核动作封装** (独立)
  - A: `xmodules/xsignal/src/types.rs:268-275` — SignalInfo 直接兼容 libc siginfo_t
  - B: `os/src/signal/sigact.rs:10-40` — SigAction 与 KSigAction 双层封装区分用户/内核

### 7.6 IPC (`ipc`)

**对照判定**: 仅 A 实现

**A 仓做法**: 基于 System V IPC 规范实现信号量、共享内存子系统，采用全局 IPC_MANAGER 管理资源，支持 SEM_UNDO 和进程退出清理。

**B 仓**: 未实现该模块

**关键差异点**:

- **信号量子系统实现** (新增)
  - A: `xapi/src/ipc/sem.rs:8-13` — 实现了 semget、semop、semctl 等系统调用，支持 IPC_STAT/IPC_SET 等命令
- **共享内存子系统实现** (新增)
  - A: `xcore/src/ipc/shm.rs:175-180` — 使用 BiBTreeMap 双索引管理共享内存段和进程映射
- **SEM_UNDO 与进程退出清理** (新增)
  - A: `xapi/src/ipc/sem.rs:380-385` — 进程退出时恢复信号量操作，避免死锁
- **全局 IPC Manager 管理** (新增)
  - A: `xapi/src/ipc/sem.rs:8-13` — 通过 with_ipc_manager! 宏同步访问全局 IPC_MANAGER
- **共享内存参数验证与总量限制** (新增)
  - A: `xcore/src/ipc/shm.rs:340-355` — 验证权限、大小，限制系统总共享内存量

### 7.7 网络 (`net`)

**对照判定**: 仅 A 实现

**A 仓做法**: 基于axnet TCP/UDP/Unix三协议栈，通过Socket枚举派发与impl_socket宏减少样板代码；syscall层与核心逻辑分离，支持阻塞/非阻塞及文件描述符复用，Unix socket功能有限。

**B 仓**: 未实现该模块

(无显著差异)

### 7.8 驱动 (`drivers`)

**对照判定**: 仅 B 实现

**A 仓**: 未实现该模块

**B 仓做法**: 驱动模块已实现（具体设计未提供）

(无显著差异)

### 7.9 系统调用 (`syscall`)

**对照判定**: 实现路径分化

**A 仓做法**: 统一入口分发，大型match匹配Sysno枚举，大量桩实现，UserPtr/UserConstPtr安全访问用户内存。

**B 仓做法**: 常量定义syscall编号，match派发到子模块，translated_*系列函数安全访问用户态内存，统一SyscallRet返回值。

**关键差异点**:

- **系统调用号定义方式** (替换)
  - A: `src/syscall.rs:7` — 使用Sysno枚举类型
  - B: `os/src/syscall/mod.rs:13-130` — 使用大写常量定义syscall编号
- **返回值类型** (替换)
  - A: `src/syscall.rs:25` — LinuxResult<isize>
  - B: `os/src/syscall/mod.rs:140-141` — SyscallRet (Result<usize, SysErrNo>)
- **桩实现策略** (新增)
  - A: `src/syscall.rs:75-90` — 大量桩实现直接返回Ok(0)
- **用户内存访问方式** (独立)
  - A: `xapi/src/fs/ctl.rs:1-20` — UserPtr/UserConstPtr安全封装
  - B: `os/src/syscall/fs.rs:3-10` — translated_*系列函数


## 八、B 相对 A 的关键差异

**总评**: B(nonix)与A(StarryX)完全独立设计，A追求Linux兼容性(239 syscall, VMA, IPC, 网络)，B基于rcore-tutorial，强调简洁(82 syscall)、惰性分配与COW、真实ext4文件系统、协作调度，无IPC和网络。两者架构哲学不同。

**整体定位**: 同源分化 — 两仓共享起点但走向不同

### 8.1 内存管理策略：惰性分配+COW vs VMA+文件缓存

**类型**: 替换 · **显著度**: ★★★★★

A采用VMA管理文件/匿名映射、按需分页、大页面与全局文件页缓存，B采用惰性页分配、写时复制与共享组模型，内存管理核心机制截然不同，体现Linux兼容与教学简化两种取向。

- A: `xmodules/xvma/src/lib.rs:1-42` — VMA结构实现按需分页与大页面支持
- B: `os/src/mm/memory_set.rs:41-68` — 惰性分配：缺页异常时按需分配物理页

### 8.2 文件系统实现：ext4真实驱动 vs 虚拟VFS抽象

**类型**: 替换 · **显著度**: ★★★★☆

A通过axfs_ng提供虚拟文件系统，用FileLike trait统一IO抽象；B直接封装lwext4_rust实现真实ext4文件操作，以FileClass抽象虚拟与真实文件，实现路径差异大。

- A: `xapi/src/fs/io.rs:1-15` — FileLike trait统一所有I/O对象
- B: `os/src/fs/inode.rs:1-5` — 基于lwext4_rust的ext4驱动封装

### 8.3 IPC子系统：完整System V IPC vs 完全缺失

**类型**: 取消 · **显著度**: ★★★★☆

A实现了信号量、共享内存等System V IPC，全局IPC管理器统一管理；B系统调用入口无任何IPC处理分支，该功能被故意省略。

- A: `xapi/src/ipc/sem.rs:8-13` — 全局IPC_MANAGER与with_ipc_manager!宏
- B: `os/src/syscall/mod.rs:164-200` — 单一syscall入口无IPC相关分支

### 8.4 调度策略：抢占式调度(Futex) vs 协作式调度

**类型**: 替换 · **显著度**: ★★★★☆

A通过Futex与调度策略支持优先级、OOM等抢占特性；B仅实现协作式调度，任务自行让出CPU，无抢占机制，影响实时性与复杂度。

- A: `xcore/src/task/proc.rs:137-140` — Futex与调度策略（优先级/策略/OOM）
- B: `os/src/task/mod.rs:31-46` — 协作式调度与任务切换实现

### 8.5 网络协议栈：全功能Socket vs 完全缺失

**类型**: 取消 · **显著度**: ★★★☆☆

A实现TCP/UDP/Unix Socket三协议统一派发与FileLike集成；B无网络子系统，系统调用表中无socket相关条目，应用范围受限。

- A: `xcore/src/net/socket.rs:17-23` — 三协议Socket枚举统一派发
- B: `os/src/syscall/mod.rs:164-200` — 无网络相关系统调用分支

### 8.6 信号管理层：进程/线程双层 vs 用户/内核双层

**类型**: 独立 · **显著度**: ★★★☆☆

A按进程/线程维度分层管理信号，在用户栈构建信号帧；B按用户/内核维度分层，用SigAction与KSigAction封装，虽都分层但设计目标不同。

- A: `xmodules/xsignal/src/api/thread.rs:20-26` — 进程级与线程级双层信号管理器
- B: `os/src/signal/sigact.rs:10-16` — SigAction与KSigAction区分用户/内核


## 九、综合相似度评分

### 9.1 各维度得分

| 维度 | 权重 | A↔B 得分 | 加权 |
|---|---|---|---|
| 函数签名 Jaccard | 0.30 | 0.4265 | 0.1279 |
| syscall Jaccard | 0.20 | 0.3112 | 0.0622 |
| 依赖 Jaccard | 0.20 | 0.1053 | 0.0211 |
| 调用图综合 | 0.20 | 0.3041 | 0.0608 |
| 目录 Jaccard | 0.10 | 0.2385 | 0.0238 |
| **合计** | **1.00** | — | **0.2959** |

### 9.2 等级判定

| 范围 | 等级 |
|---|---|
| ≥ 0.70 | 高度相似 |
| 0.40 - 0.70 | 中度相似 |
| 0.15 - 0.40 | 低度相似 |
| < 0.15 | 完全不同 |

**本次评级**: **低度相似** (0.2959)

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