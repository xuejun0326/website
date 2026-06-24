# OSKernel2025-StarryX-3037 ↔ T202510003995291-2331 对比分析报告

> **生成时间**: 2026-06-16 15:23 UTC
> **对比方向**: 以 **OSKernel2025-StarryX-3037** 为基准 (A), 分析 **T202510003995291-2331** (B) 的差异
> **运行时长**: 342.8s · prompt=20223 · completion=14062 · reasoning=8846
> **综合相似度**: **0.7028** (高度相似)

## 一、总览

| 维度 | A: OSKernel2025-StarryX-3037 | B: T202510003995291-2331 |
|---|---|---|
| 家族 | `arceos-starry` | `arceos-starry` |
| Cargo 形态 | workspace · 2 成员 | workspace · 5 成员 |
| 文件数 | 451 | 424 |
| 代码行数 | 42442 | 36457 |
| syscall 数 | 239 | 212 |
| 启动方式 | `axhal` | `axhal` |
| trap handlers | SYSCALL, PAGE_FAULT, POST_TRAP, IRQ | SYSCALL, PAGE_FAULT, POST_TRAP, IRQ |
| 已实现模块 | 启动流程 / 内存管理 / 进程与任务调度 / 文件系统 / 信号机制 / 进程间通信 / 网络 / 系统调用层 | 启动流程 / 内存管理 / 进程与任务调度 / 文件系统 / 信号机制 / 进程间通信 / 网络 / 系统调用层 |
| 未实现模块 | 驱动框架 | 驱动框架 |

## 二、结构差异

**目录 Jaccard**: 0.702

| 仅 A 有 | 共有 | 仅 B 有 |
|---|---|---|
| `arceos/crates` | `arceos` | `api` |
| `docs` | `arceos/api` | `api/src` |
| `docs/StarryX` | `arceos/configs` | `apps` |
| `vendor/allocator-api2` | `arceos/doc` | `apps/junior` |
| `vendor/axconfig-macros` | `arceos/examples` | `apps/libc` |
| `vendor/axsched` | `arceos/modules` | `apps/nimbos` |
| `vendor/ctor` | `arceos/scripts` | `apps/oscomp` |
| `vendor/ctor-proc-macro` | `arceos/tools` | `configs` |
| `vendor/dtor` | `arceos/ulib` | `core` |
| `vendor/dtor-proc-macro` | `bin` | `core/src` |
| `vendor/foldhash` | `src` | `modules` |
| `vendor/intrusive-collections` | `vendor` | `modules/lwext4_rust` |
| `vendor/lru` | `vendor/aarch64-cpu` | `modules/page_table_multiarch` |
| `vendor/memoffset` | `vendor/aho-corasick` | `modules/vfs` |
| `vendor/rand` | `vendor/allocator` | `process` |

## 三、依赖差异

- A 总依赖数: **46**
- B 总依赖数: **46**
- 交集: **28**
- 仅 A 有: 18 项
- 仅 B 有: 18 项
- **依赖 Jaccard**: **0.4375**

### 仅 A 有的代表性依赖 (前 15)

- `axdriver`
- `axfs-ng-vfs`
- `axruntime`
- `cfg-if`
- `chrono`
- `ctor_bare`
- `page_table_entry`
- `page_table_multiarch`
- `rand`
- `shlex`
- `xapi`
- `xcache`
- `xcore`
- `xprocess`
- `xsignal`

### 仅 B 有的代表性依赖 (前 15)

- `arceos_posix_api`
- `axdisplay`
- `axdriver_display`
- `axsignal`
- `bit_field`
- `flatten_objects`
- `macro_rules_attribute`
- `percpu`
- `quote`
- `rand_mt`
- `slab`
- `starry-core`
- `static_assertions`
- `syn`
- `syscall-trace`

## 四、syscall 差异

- A 实现 syscall 数: **239**
- B 实现 syscall 数: **212**
- 共同实现: **184**
- **syscall Jaccard**: **0.6891**

### 4.1 仅 A 实现的 syscall (55 个)

`accept4`, `add_key`, `capget`, `capset`, `clock_adjtime`, `clock_settime`, `clone3`, `epoll_create`, `epoll_pwait2`, `eventfd`, `faccessat2`, `fanotify_mark`  
`fchmodat2`, `fdatasync`, `fgetxattr`, `flistxattr`, `fremovexattr`, `fsetxattr`, `getgroups`, `getsid`, `getxattr`, `keyctl`, `listxattr`, `llistxattr`  
`lremovexattr`, `lsetxattr`, `membarrier`, `mincore`, `mknod`, `mremap`, `pidfd_getfd`, `pidfd_send_signal`, `pkey_alloc`, `pkey_free`, `pkey_mprotect`, `preadv2`  
`ptrace`, `pwritev2`, `readlink`, `reboot`, `request_key`, `sched_get_priority_max`, `sched_get_priority_min`, `semop`, `setfsuid`, `setgroups`, `sysinfo`, `timer_create`  
`timer_delete`, `timer_getoverrun`, `timer_gettime`, `timer_settime`, `utime`, `utimes`, `waitid`

### 4.2 仅 B 实现的 syscall (28 个)

`bpf`, `chown`, `faccessat`, `fchmodat`, `fsopen`, `fspick`, `get_mempolicy`, `getrlimit`, `inotify_init1`, `io_uring_setup`, `lchown`, `memfd_create`  
`name_to_handle_at`, `open_by_handle_at`, `open_tree`, `perf_event_open`, `pivot_root`, `process_vm_writev`, `sched_rr_get_interval`, `sendmmsg`, `sendmsg`, `setdomainname`, `setrlimit`, `signalfd4`  
`sync`, `umask`, `unshare`, `userfaultfd`

## 五、函数签名 Jaccard

- A 公开函数签名数 (`pub fn`): **6805**
- B 公开函数签名数: **6469**
- 完全相同的签名: **6050**
- **函数签名 Jaccard**: **0.8375**

### 5.1 仅 A 暴露的接口样本 (前 10)

- `message_count(SELF) -> usize`
- `sample_array(&mutR,usize) -> Option<[usize;N]>`
- `evict_from_pos(SELF,u64) -> LinuxResult`
- `emit(SELF,&mutPacket<&mutT>,&IpAddress,&IpAddress,usize,implFnOnce(&mut[u8]),&ChecksumCapabilities) -> ()`
- `poll_egress(SELF,Instant,&mut(implDevice+?Sized),&mutSocketSet<>) -> PollResult`
- `remove_entry(SELF,&Q) -> Option<(K,V::Strong)>`
- `get_type(SELF) -> AuxvType`
- `new(FanTarget,FanMarkFlags,FanEventMask,FanEventMask) -> Self`
- `parent(SELF) -> Option<Arc<Process>>`
- `reseed(SELF) -> Result<(),rand_core::OsError>`

### 5.2 仅 B 暴露的接口样本 (前 10)

- `negative_digit_comp(Bigint,ExtendedFloat,i32) -> ExtendedFloat`
- `test_addr_offset_from_overflow() -> ()`
- `add_small(SELF,bigint::Limb) -> Option<()>`
- `normalize(SELF) -> ()`
- `length_value(F,G) -> implFnMut(I)->IResult<I,O,E>`
- `memchr3_raw(u8,u8,u8,*constu8,*constu8) -> Option<*constu8>`
- `overlaps(SELF,Self) -> bool`
- `try_new(A,A) -> Option<Self>`
- `new_unchecked(A,A) -> Self`
- `iter(SELF,&[u8]) -> OneIter<>`

## 六、调用图差异 (轻量版)

> 第一版用集合层数字 + 高频函数名列表把『两个内核调用模式有多接近』讲清楚, 不画 mermaid (后续优化项)。

### 6.1 调用图统计

| 维度 | A | B |
|---|---|---|
| 节点数 (函数) | 7862 | 7799 |
| 边数 (调用关系) | 28177 | 26614 |
| 平均出度 | 5.36 | 5.26 |

### 6.2 节点 Jaccard: **0.8187**

### 6.3 边 Jaccard: **0.7412**

### 6.4 综合调用图相似度 = 0.5·node + 0.5·edge = **0.7799**

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

**B (T202510003995291-2331)**:

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

## 七、模块级语义对照

> 每条差异点的 file:line 会进入 §九 的验证透明表逐条核对。

### 7.1 启动 (`boot`)

**对照判定**: 实现路径分化

**A 仓做法**: 基于axhal框架，main完成初始化，打印彩色Logo，创建初始进程、挂载VFS、初始化IO，执行init.sh进入用户态。

**B 仓做法**: 基于arceos框架，axhal启动，main初始化根目录、文件描述符表、挂载文件系统，run_user_app加载用户程序。

**关键差异点**:

- **Logo展示** (新增)
  - A: `src/main.rs:24-37` — print_logo函数打印彩色Logo
  - B: `src/main.rs:27-32` — main中无Logo打印
- **初始进程创建方式** (替换)
  - A: `src/main.rs:58-58` — 使用xprocess创建初始进程
  - B: `core/src/entry.rs:13-20` — 通过run_user_app创建用户地址空间
- **用户程序启动方式** (替换)
  - A: `src/main.rs:59-68` — 执行init.sh脚本
  - B: `src/main.rs:34-35` — 嵌入测试脚本并运行busybox shell
- **进程线程模型** (独立)
  - A: `src/main.rs:58-58` — 通过xprocess创建初始进程，未显式分离
  - B: `core/src/entry.rs:35-50` — 显式定义ProcessData和TaskExt分离

### 7.2 内存管理 (`mm`)

**对照判定**: 实现路径分化

**A 仓做法**: 基于VMA的进程地址空间管理，支持匿名/文件映射、按需分页、大页面，提供mmap/munmap/mprotect，通过PageCacheManager管理文件页缓存。

**B 仓做法**: 基于axmm::AddrSpace管理进程虚拟地址空间，通过位标志封装权限与映射类型，支持ELF加载、信号trampoline映射、用户内存访问保护。

**关键差异点**:

- **VMA显式split vs 标志封装** (独立)
  - A: `xmodules/xvma/src/lib.rs:88-120` — VMA实现split_at_range细粒度区域切分
  - B: `api/src/imp/mm/mmap.rs:52-72` — 使用MmapFlags位标志表示映射类型，无显式VMA拆分
- **文件页缓存管理** (新增)
  - A: `xcore/src/mm/page_cache.rs:1-20` — PageCacheManager管理文件页缓存，支持按inode缓存和淘汰
  - B: `api/src/imp/mm/mmap.rs:80-117` — 未提及文件页缓存，仅直接映射文件内容
- **信号trampoline映射** (新增)
  - A: `xapi/src/mm/mmap.rs:20-33` — 未提及信号trampoline相关映射
  - B: `core/src/mm.rs:21-30` — map_trampoline将信号跳板固定映射到用户空间
- **ELF加载集成** (新增)
  - A: `xapi/src/mm/mmap.rs:20-33` — 未提及ELF加载，可能在其他模块
  - B: `core/src/mm.rs:57-95` — load_user_app解析ELF PHDR并映射段与栈

### 7.3 进程/任务 (`task`)

**对照判定**: 实现路径分化

**A 仓做法**: 基于arceos-starry框架，通过任务扩展机制将Linux进程/线程语义挂接到通用调度器上，包含凭证、信号、futex等完整状态。

**B 仓做法**: 采用Rust实现类Linux内核的进程与任务调度，使用Arc/Weak管理进程、线程、进程组和会话，支持fork、execve、信号处理。

**关键差异点**:

- **凭证模型** (新增)
  - A: `xcore/src/task/proc.rs:213` — 定义ProcessCredentials数据结构，包含UID/EUID等
  - B: `process/src/process.rs:7-15` — Process结构体未包含凭证信息
- **Futex支持** (新增)
  - A: `xcore/src/task/proc.rs:137-140` — XThread和XProcess包含FutexTable属性
  - B: `process/src/process.rs:7-15` — Process结构体无futex相关字段
- **调度策略属性** (新增)
  - A: `xcore/src/task/proc.rs:208-209` — XThread包含优先级、调度策略、OOM评分
  - B: `process/src/process.rs:7-15` — Process结构体无调度策略字段
- **信号处理框架位置** (优化)
  - A: `xcore/src/task/proc.rs:125-126` — 信号框架嵌入XThread和XProcess扩展
  - B: `api/src/imp/task/signal.rs:22-57` — 信号处理作为独立模块，后陷阱钩子检查
- **全局进程表结构** (替换)
  - A: `xcore/src/task/proc.rs:312-315` — 四张全局弱引用表：THREAD_TABLE等
  - B: `process/src/process.rs:119-125` — 全局PID分配与单一进程表

### 7.4 文件系统 (`fs`)

**对照判定**: 独立设计

**A 仓做法**: 基于 axfs_ng 虚拟文件系统层，通过 FileLike trait 统一文件描述符抽象，利用 with_fs/with_file 实现上下文感知的路径解析和文件操作，实现了丰富的 Linux 文件系统调用

**B 仓做法**: (LLM 未给出)

(无显著差异)

### 7.5 信号 (`signal`)

**对照判定**: 实现路径分化

**A 仓做法**: 基于 Rust 的分层信号处理模块，采用进程级和线程级双层信号管理器，支持标准与实时信号，通过信号帧构建用户栈上下文。

**B 仓做法**: 基于 axsignal 抽象类型，在用户态陷阱返回时自动检查信号，支持五种动作，实现了完整 Linux 信号系统调用集。

**关键差异点**:

- **信号检查触发机制不同** (替换)
  - A: `xmodules/xsignal/src/api/thread.rs:129-133` — 手动调用 check_signals 检查挂起信号
  - B: `api/src/imp/task/signal.rs:51-56` — 通过 post_trap_callback 自动检查信号
- **信号发送范围不同** (优化)
  - A: `xmodules/xsignal/src/api/thread.rs:209-215` — 仅支持向线程发送信号
  - B: `api/src/imp/task/signal.rs:133-164` — 支持三级发送：线程、进程、进程组
- **系统调用覆盖度不同** (新增)
  - A: `xmodules/xsignal/src/api/thread.rs:44-48, 209-245` — 仅提供 send_signal, wait_timeout 等基本接口
  - B: `api/src/imp/task/signal.rs:84-317` — 实现了 sigprocmask, sigaction, kill 等完整系统调用集
- **信号帧构建方式不同** (独立)
  - A: `xmodules/xsignal/src/api/thread.rs:12-15, 85-107` — 显式定义 SignalFrame 并在用户栈构建上下文
  - B: `api/src/imp/task/signal.rs:5-8` — 依赖 axsignal 抽象类型，未提及栈帧构建细节
- **信号数据结构抽象方式不同** (独立)
  - A: `xmodules/xsignal/src/types.rs:13-93, 206-270` — 自行定义 Signo, SignalSet, SignalInfo 等枚举与结构
  - B: `api/src/imp/task/signal.rs:5-8` — 通过 axsignal crate 提供的数据结构

### 7.6 IPC (`ipc`)

**对照判定**: 独立设计

**A 仓做法**: 基于 System V IPC 规范实现信号量、共享内存，全局 IPC_MANAGER 管理，支持 SEM_UNDO 和忙等待，未实现消息队列。

**B 仓做法**: 实现基于全局页分配器的共享内存子系统，使用 BTreeMap+Mutex 保护，通过 Arc 引用计数和 Drop 自动释放。

**关键差异点**:

- **信号量子系统实现** (独立)
  - A: `xapi/src/ipc/sem.rs:8-13` — 实现完整信号量包括 SEM_UNDO 和等待队列
  - B: `core/src/shared_memory.rs:9-74` — 未实现信号量，仅共享内存
- **共享内存映射结构** (独立)
  - A: `xcore/src/ipc/shm.rs:175-180` — 使用 BiBTreeMap 双索引映射（段ID→进程→虚拟地址）
  - B: `core/src/shared_memory.rs:28-29` — 使用 BTreeMap+Mutex 简单映射键→SharedMemory
- **资源管理方式** (独立)
  - A: `xcore/src/ipc/shm.rs:340-355` — 通过全局 IPC_MANAGER 限制系统总量，手动引用计数
  - B: `core/src/shared_memory.rs:43-43` — 通过 Arc 引用计数和 Drop trait 自动释放物理页
- **键生成机制** (独立)
  - A: `xapi/src/ipc/sem.rs:39-41` — 遵循 System V IPC 键生成（IPC_PRIVATE 或用户指定）
  - B: `core/src/shared_memory.rs:38-41` — 通过原子计数器递增生成唯一键，无 IPC_PRIVATE 概念

### 7.7 网络 (`net`)

**对照判定**: 实现路径分化

**A 仓做法**: 基于axnet TCP/UDP/Unix三协议栈，通过Socket枚举派发与impl_socket宏减少样板代码；syscall层与核心逻辑分离，支持阻塞/非阻塞及文件描述符复用，Unix socket功能有限。

**B 仓做法**: 以枚举Socket封装axnet的TcpSocket/UdpSocket，通过匹配分发实现POSIX网络系统调用；提供SockAddr安全抽象层转换sockaddr，支持IPv4并预留IPv6骨架；内置DNS查询和addrinfo内存管理。

**关键差异点**:

- **Unix socket支持差异** (取消)
  - A: `xcore/src/net/socket.rs:17-23` — Socket枚举包含Unix变体，axnet提供UnixSocket
  - B: `api/src/imp/net/socket.rs:67-70` — Socket枚举仅包含Tcp和Udp变体
- **宏简化 vs 匹配分发** (替换)
  - A: `xcore/src/net/socket.rs:24-33` — 使用impl_socket!宏生成统一dispatch方法
  - B: `api/src/imp/net/socket.rs:79-88` — 通过match枚举变体手动分发方法调用
- **syscall层与核心层分离程度** (优化)
  - A: `xapi/src/net/socket.rs:28-36` — syscall函数在xapi中，核心逻辑在xcore中
  - B: `api/src/imp/net/socket.rs:246-250` — syscall与核心实现在同一文件中，无分离
- **SockAddr安全抽象** (新增)
  - A: `xcore/src/net/socket.rs:136-141` — Unix socket地址返回伪地址，无统一抽象
  - B: `api/src/imp/net/socketaddr.rs:44-50` — 提供SockAddr枚举封装sockaddr，支持IPv4/IPv6
- **DNS查询支持** (新增)
  - A: `xapi/src/net/socket.rs:221-260` — 未实现getaddrinfo，仅有sendto/recvfrom
  - B: `api/src/imp/net/socket.rs:500-518` — 实现sys_getaddrinfo进行DNS解析
- **setsockopt实现** (独立)
  - A: `xapi/src/net/socket.rs:299-308` — 未提及setsockopt，仅有shutdown/socketpair
  - B: `api/src/imp/net/socket.rs:165-180` — setsockopt仅占位，未完全实现

### 7.8 驱动 (`drivers`)

**对照判定**: 两边都未实现

两仓均未实现该模块。

### 7.9 系统调用 (`syscall`)

**对照判定**: 实现路径分化

**A 仓做法**: 采用统一入口分发模式，通过register_trap_handler注册，内部match Sysno分发至xapi模块，大量桩实现返回Ok(0)，用户态指针安全封装。

**B 仓做法**: 基于中断注册集中分发，匹配Sysno枚举分派到各模块，支持150+系统调用，提供三种未实现降级策略，网络/内存/进程等子系统完善。

**关键差异点**:

- **桩实现策略** (替换)
  - A: `src/syscall.rs:75-90` — 大量系统调用直接返回Ok(0)作为桩
  - B: `src/syscall.rs:467-482` — 三种降级策略：stub_unimplemented、stub_bypass、stub_kill
- **网络系统调用实现** (新增)
  - B: `api/src/imp/net/socket.rs:37-40` — 基于Socket枚举封装UDP/TCP，实现socket/bind/connect等
- **系统调用组织方式** (替换)
  - A: `xapi/src/fs/ctl.rs:1-200` — 文件系统系统调用集中在ctl.rs子模块
  - B: `src/syscall.rs:6-25` — 系统调用实现分散在独立子模块（fs/io, fs/ctl等）


## 八、B 相对 A 的关键差异

**总评**: B 基于 ArceOS-Starry，整体设计类似 A，但移除了 VMA 和 System V 信号量，加强了信号发送模型、DNS 解析和系统调用降级策略，定位为衍生改进版。

**整体定位**: 派生关系 — B 在 A 的基础上演化

### 8.1 复杂 VMA 内存管理被移除

**类型**: 取消 · **显著度**: ★★★★★

A 实现了 VMA 结构支持按需分页、大页面和 split 操作；B 仅提供基本的 mmap 权限标志和地址空间分配，没有虚拟内存区域管理。

- A: `xmodules/xvma/src/lib.rs:1-42` — VMA 结构定义与按需分页
- B: `api/src/imp/mm/mmap.rs:15-30` — 仅 mmap 权限标志位封装，无 VMA

### 8.2 System V 信号量完全缺失

**类型**: 取消 · **显著度**: ★★★★☆

A 通过全局 IPC Manager 管理信号量和共享内存，支持 semctl 全部命令和 SEM_UNDO；B 仅实现共享内存（使用 Arc 引用计数），无信号量支持。

- A: `xapi/src/ipc/sem.rs:8-13` — IPC Manager 统一管理信号量
- B: `core/src/shared_memory.rs:13-24` — 只有共享内存，无信号量

### 8.3 新增 DNS 查询与 addrinfo 管理

**类型**: 新增 · **显著度**: ★★★☆☆

B 实现了自定义 DNS 查询和 addrinfo 结构的内存分配释放，支持域名解析；A 的网络模块未提及 DNS 功能。

- A: `xcore/src/net/socket.rs:17-23` — Socket 枚举未涉及 DNS
- B: `api/src/imp/net/socket.rs:506-518` — DNS 查询与 addrinfo 内存管理实现

### 8.4 系统调用降级策略明确化

**类型**: 优化 · **显著度**: ★★☆☆☆

A 对未实现系统调用多采用桩实现直接返回 0；B 实现了三种降级策略（跳过、返回 -ENOSYS、返回 0），使行为更明确。

- A: `src/syscall.rs:75-90` — 大量桩实现直接返回 Ok(0)
- B: `src/syscall.rs:467-470` — 三种降级策略处理未实现系统调用

### 8.5 信号发送从双层扩展到三级

**类型**: 优化 · **显著度**: ★★★☆☆

A 的信号管理器分为进程级和线程级双层，B 额外增加进程组级发送，实现线程、进程、进程组三级信号控制。

- A: `xmodules/xsignal/src/api/thread.rs:20-26` — 双层信号管理器
- B: `api/src/imp/task/signal.rs:133-144` — 三级信号发送（含进程组）


## 九、综合相似度评分

### 9.1 各维度得分

| 维度 | 权重 | A↔B 得分 | 加权 |
|---|---|---|---|
| 函数签名 Jaccard | 0.30 | 0.8375 | 0.2512 |
| syscall Jaccard | 0.20 | 0.6891 | 0.1378 |
| 依赖 Jaccard | 0.20 | 0.4375 | 0.0875 |
| 调用图综合 | 0.20 | 0.7799 | 0.156 |
| 目录 Jaccard | 0.10 | 0.702 | 0.0702 |
| **合计** | **1.00** | — | **0.7028** |

### 9.2 等级判定

| 范围 | 等级 |
|---|---|
| ≥ 0.70 | 高度相似 |
| 0.40 - 0.70 | 中度相似 |
| 0.15 - 0.40 | 低度相似 |
| < 0.15 | 完全不同 |

**本次评级**: **高度相似** (0.7028)

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