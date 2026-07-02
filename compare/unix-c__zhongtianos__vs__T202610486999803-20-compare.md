# zhongtianos ↔ T202610486999803-20 对比分析报告

> **生成时间**: 2026-07-02 07:38 UTC
> **对比方向**: 以 **zhongtianos** 为基准 (A), 分析 **T202610486999803-20** (B) 的差异
> **运行时长**: 616.87s · prompt=47465 · completion=59890 · reasoning=54601
> **综合相似度**: **0.1539** (低度相似)

## 一、总览

| 维度 | A: zhongtianos | B: T202610486999803-20 |
|---|---|---|
| 家族 | `unix-c` | `unix-c` |
| Cargo 形态 | 单 crate | 单 crate |
| 文件数 | 0 | 0 |
| 代码行数 | 0 | 0 |
| syscall 数 | 306 | 395 |
| 启动方式 | `c_entry` | `c_entry` |
| trap handlers | — | — |
| 已实现模块 | 启动流程 / 内存管理 / 进程与任务调度 / 文件系统 / 信号机制 / 进程间通信 / 网络 / 驱动框架 / 系统调用层 | 启动流程 / 内存管理 / 进程与任务调度 / 文件系统 / 信号机制 / 进程间通信 / 网络 / 驱动框架 / 系统调用层 |
| 未实现模块 | 无 | 无 |

## 二、结构差异

**目录 Jaccard**: 0.0423

| 仅 A 有 | 共有 | 仅 B 有 |
|---|---|---|
| `docs/assets` | `docs` | `docs/native-abi` |
| `docs/old` | `scripts` | `docs/research` |
| `include` | `user` | `docs/slides` |
| `include/asm` | — | `kernel` |
| `include/dev` | — | `kernel/abi` |
| `include/fs` | — | `kernel/arch` |
| `include/futex` | — | `kernel/bpf` |
| `include/ipc` | — | `kernel/core` |
| `include/lib` | — | `kernel/drivers` |
| `include/lock` | — | `kernel/external` |
| `include/mm` | — | `kernel/fs` |
| `include/proc` | — | `kernel/include` |
| `include/signal` | — | `kernel/ipc` |
| `include/sys` | — | `kernel/mm` |
| `include/trap` | — | `kernel/net` |

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
- B 实现 syscall 数: **395**
- 共同实现: **300**
- **syscall Jaccard**: **0.7481**

### 4.1 仅 A 实现的 syscall (6 个)

`mailread`, `mailwrite`, `recv`, `riscv_flush_icache`, `send`, `spawn`

### 4.2 仅 B 实现的 syscall (95 个)

`_sysctl`, `access`, `afs_syscall`, `alarm`, `arch_prctl`, `cachestat`, `chmod`, `chown`, `creat`, `create_module`, `dup2`, `epoll_create`  
`epoll_ctl_old`, `epoll_pwait2`, `epoll_wait`, `epoll_wait_old`, `eventfd`, `fchmodat2`, `file_getattr`, `file_setattr`, `fork`, `futex_requeue`, `futex_wait`, `futex_waitv`  
`futex_wake`, `futimesat`, `get_kernel_syms`, `get_thread_area`, `getdents`, `getpgrp`, `getpmsg`, `getxattrat`, `inotify_init`, `ioperm`, `iopl`, `landlock_add_rule`  
`landlock_create_ruleset`, `landlock_restrict_self`, `lchown`, `lightweight_prot`, `link`, `listmount`, `listns`, `listxattrat`, `lsm_get_self_attr`, `lsm_list_modules`, `lsm_set_self_attr`, `lstat`  
`map_shadow_stack`, `memfd_secret`, `mknod`, `modify_ldt`, `mount_setattr`, `mseal`, `open`, `open_tree_attr`, `pause`, `pipe`, `poll`, `process_mrelease`  
`putpmsg`, `query_module`, `quotactl_fd`, `readlink`, `removexattrat`, `rename`, `renameat`, `rmdir`, `security`, `select`, `set_mempolicy_home_node`, `set_thread_area`  
`setxattrat`, `shm_open`, `sigaction`, `signalfd`, `sigprocmask`, `sigreturn`, `sigsuspend`, `sigtimedwait`, `stat`, `statmount`, `stats`, `symlink`  
`sysfs`, `tuxcall`, `unlink`, `uprobe`, `uretprobe`, `uselib`, `ustat`, `utime`, `utimes`, `vfork`, `vserver`

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

**B (T202610486999803-20)**:

(无数据)

## 七、模块级语义对照

> 每条差异点的 file:line 会进入 §九 的验证透明表逐条核对。

### 7.1 启动 (`boot`)

**对照判定**: 独立设计

**A 仓做法**: 多阶段引导序列，通过 hart_started 等标志协调多核同步，扩展了 SBI、DTB 解析及更多子系统初始化。

**B 仓做法**: 严格串行初始化管线，基于板级抽象，按序初始化陷阱、UART、内存管理等，加载用户态 init 通过独立内核线程。

(无显著差异)

### 7.2 内存管理 (`mm`)

**对照判定**: 独立设计

**A 仓做法**: 用户空间内存分配器家族：位图/多线程池/异常安全分配器，通过 allocator_traits 提供统一接口，不涉及内核页表。

**B 仓做法**: 内核内存管理：以 mm_struct_t 和 VMA 链表管理进程地址空间，通过 buddy+slab 分配物理内存，实现 mmap/munmap/mprotect/brk/fork/ELF 加载等，支持 COW、大页降级、ASLR。

**关键差异点**:

- **物理内存分配策略** (独立)
  - A: `rootfs/usr/usr/include/c++/11.2.1/ext/bitmap_allocator.h:250-250` — 使用_ Bitmap_counter遍历位图管理固定大小块
  - B: `kernel/mm/mm.c:26-33` — 先 buddy 后 slab 初始化物理内存分配器
- **并发模型** (独立)
  - A: `rootfs/usr/usr/include/c++/11.2.1/ext/mt_allocator.h:300-320` — 线程局部缓存减少锁竞争，通过线程ID索引
  - B: `kernel/mm/vm.c:1393-1398` — COW fork中持 parent->lock 防止并发缺页竞争
- **虚拟内存管理** (独立)
  - A: `rootfs/usr/usr/include/c++/11.2.1/ext/bitmap_allocator.h:130-130` — free_list 管理连续内存块，无虚拟地址抽象
  - B: `kernel/mm/vm.c:511-524` — VMA 插入时自动合并相邻同属性区域
- **分配接口** (独立)
  - A: `rootfs/usr/usr/include/c++/11.2.1/bits/alloc_traits.h:250-250` — allocate 模板函数作为统一分配入口
  - B: `kernel/mm/vm.c:660-660` — mm_mmap 系统调用实现虚拟地址映射
- **缺页处理** (独立)
  - A: `rootfs/usr/usr/include/c++/11.2.1/ext/bitmap_allocator.h:350-350` — __bit_allocate 直接操作位图，不涉及缺页
  - B: `kernel/mm/mm.c:472-487` — 用户态拷贝路径按需触发缺页解析

### 7.3 进程/任务 (`task`)

**对照判定**: 独立设计

**A 仓做法**: 基于 proc_t/thread_t 的进程线程管理，支持 clone/exec/exit/wait/tsleep，全局队列管理，未实现调度策略和信号。

**B 仓做法**: 基于 task_t 的多级调度进程管理，每 CPU 独立队列，O(1) 调度+老化，支持 RT 策略、cgroup、双 ABI exec 和完整 POSIX 信号。

(无显著差异)

### 7.4 文件系统 (`fs`)

**对照判定**: 独立设计

**A 仓做法**: 基于编译时嵌入的静态只读文件系统，将用户文件转为常量数组，只读无写支持。

**B 仓做法**: 实现了类Linux的VFS层，支持ext4、procfs等多种文件系统，核心抽象为vnode、vfile、mount，提供完整文件操作和系统调用。

**关键差异点**:

- **文件存储方式** (独立)
  - A: `kern/fs/static_files/sort_src.c:1` — 编译时嵌入常量数组存储文件数据
  - B: `kernel/fs/ext4.c:583-586` — ext4双模式块寻址映射磁盘块
- **写操作支持** (独立)
  - A: `kern/fs/static_files/sort_src.c:400-410` — 静态文件系统无写操作，只读
  - B: `kernel/fs/ext4.c:160-165` — ext4物理块分配器支持块分配，可写
- **文件系统多样性** (独立)
  - A: `kern/fs/static_files/sort_src.c:2-12` — 仅静态文件系统实现
  - B: `kernel/fs/vfs.c:2-7` — VFS统一ext4, procfs, ramfs等多样文件系统

### 7.5 信号 (`signal`)

**对照判定**: 实现路径分化

**A 仓做法**: 以 per-thread 信号队列和 per-process 信号动作表为核心，实现完整 Linux 兼容信号集，包括 rt_sigaction、rt_sigprocmask、rt_sigreturn、siginfo_t、ucontext_t 和 SA_SIGINFO 扩展，同时支持 tkill/tgkill 和 setitimer 定时器信号，采用静态预分配事件池和自旋锁保护。

**B 仓做法**: 实现 POSIX 兼容信号处理，核心是 per-process 的 signal_state_t 结构（含动作表、位掩码和排队信息），通过 signal_deliver_user 在陷入边界同步传递，支持 SA_SIGINFO、实时信号、信号栈、线程组发送、signalfd 等 Linux ABI 特性。

**关键差异点**:

- **核心数据结构设计不同** (独立)
  - A: `include/signal/signal.h:26-30` — Per-process sigaction_t数组和per-thread sigevent_t链表
  - B: `kernel/include/proc/signal.h:43-48` — Per-process signal_state_t含动作表、位图和排队信息
- **信号传递点实现机制差异** (替换)
  - A: `kern/signal/sigentry.c:88` — sig_check修改trapframe跳至用户态handler
  - B: `kernel/proc/signal.c:282` — signal_deliver_user设置用户栈帧并修改上下文
- **kill系统调用实现差异** (替换)
  - A: `kern/syscall/sys_signal.c:139-140` — 包含硬编码pid==10特殊case
  - B: `kernel/abi/linux/sys_signal.c:38-49` — 标准实现遍历所有进程进行广播

### 7.6 IPC (`ipc`)

**对照判定**: 实现路径分化

**A 仓做法**: 该模块实现了管道、共享内存和futex三大IPC机制，核心抽象包括Pipe环形缓冲区、shm_list全局共享内存链表和futexevent等待队列。

**B 仓做法**: 本模块实现System V共享内存与信号量、Linux兼容timerfd/eventfd、自研A20事件队列和通道等多种IPC机制。

**关键差异点**:

- **共享内存管理结构** (替换)
  - A: `kern/ipc/shm.c:12` — shm_t链表全局管理
  - B: `kernel/ipc/sysv_shm.c:25-34` — sysv_shm_t定长数组
- **共享内存删除策略** (替换)
  - A: `kern/ipc/shm.c:102-110` — IPC_RMID立即回收但未清除映射
  - B: `kernel/ipc/sysv_shm.c:99-112` — 延迟删除至nattach归零
- **共享内存地址映射** (替换)
  - A: `kern/ipc/shm.c:37` — 从KERNEL_SHM固定区域线性分配
  - B: `kernel/ipc/sysv_shm.c:191` — 通过页表映射到用户地址空间

### 7.7 网络 (`net`)

**对照判定**: 独立设计

**A 仓做法**: 该模块在内核空间实现了一套纯软件定义的本地 socket 子系统（类似 Unix domain sockets），核心抽象是 Socket 结构体、全局 sockets[] 数组以及基于 FdDev 的虚拟设备接口。

**B 仓做法**: 该模块基于 lwIP 协议栈实现了类 POSIX 的 socket API，支持 AF_INET、AF_INET6、AF_UNIX 和 AF_ALG 域。

**关键差异点**:

- **网络协议栈核心实现** (独立)
  - A: `kern/fs/socket.c:45-52` — FdDev集成，自实现本地模拟
  - B: `kernel/net/socket_inet.c:60-80` — 基于lwIP协议栈，使用底部半环
- **锁模型设计** (替换)
  - A: `kern/fs/socket.c:54-65` — 自旋锁+可重入锁
  - B: `kernel/net/lwip_stack.c:27-36` — 两锁分离：g_net_lock和g_lwip_lock
- **setsockopt实现** (新增)
  - A: `kern/fs/socket.c:914-916` — 空桩函数，所有选项忽略
  - B: `kernel/net/socket_control.c:150-150` — 完整实现，支持大量选项
- **TCP数据传输机制** (独立)
  - A: `kern/fs/socket.c:497-503` — 直写对端环形缓冲区
  - B: `kernel/net/socket_inet.c:60-80` — lwIP TCP回调使用底部半环
- **UDP数据传输机制** (独立)
  - A: `kern/fs/socket.c:838-846` — 消息队列插入并唤醒
  - B: `kernel/net/socket_inet.c:60-80` — lwIP UDP回调使用底部半环
- **连接同步机制** (替换)
  - A: `kern/fs/socket.c:324-330` — sleep/wakeup
  - B: `kernel/net/socket.c:40-53` — 线程阻塞/唤醒机制

### 7.8 驱动 (`drivers`)

**对照判定**: 实现路径分化

**A 仓做法**: 该模块仅包含一个 virtio-blk 块设备驱动，采用 VirtIO MMIO 与 split virtqueue 模型。

**B 仓做法**: 该模块实现分层设备驱动模型，核心为 driver_t/device_t，支持多种设备类和静态注册。

**关键差异点**:

- **驱动组织模式** (替换)
  - A: `kern/driver/virtio.c:21-32` — 静态全局 struct disk，无框架抽象
  - B: `kernel/drivers/block/virtio_blk.c:617-626` — driver_t 结构体与 DRIVER_REGISTER 宏
- **同步与锁模型** (替换)
  - A: `kern/driver/virtio.c:270-272` — 持自旋锁期间调用 sleep/wakeup
  - B: `kernel/drivers/block/virtio_blk.c:496-508` — 中断处理中持有并操作，不阻塞
- **多设备实例支持** (新增)
  - A: `kern/driver/virtio.c:21-32` — 全局静态变量，仅支持单设备
  - B: `kernel/drivers/block/virtio_blk.c:52-53` — g_insts 定长数组支持多实例

### 7.9 系统调用 (`syscall`)

**对照判定**: 独立设计

**A 仓做法**: 系统调用层是内核处理用户态请求的核心抽象，采用经典的陷入-分发模型。核心数据结构为 trapframe_t，通过固定映射的 TRAMPOLINE 页实现用户态与内核态的安全切换。与 xv6-riscv 相比，本实现扩展了浮点寄存器保存/恢复、写时复制（COW）页错误处理、信号机制以及大量 Linux 兼容的系统调用（如 socket、futex、epoll 等）。系统调用号定义在 `syscall_ids.h` 中，分发通过 utrap_entry→syscall_entry 路径进行，但 syscall_entry 的具体实现未在提供源码中直接给出。

**B 仓做法**: 该系统调用层是A20OS内核的核心接口，通过syscall_dispatch分发用户态系统调用，支持原生ABI和Linux AB双表机制，并包含x86_64系统号转换。相比xv6，增加了性能剖析（条件编译的syscall_profile）、信号驱动的系统调用重试（-ERESTARTSYS处理）以及路径解析辅助函数syscall_path_at。核心抽象是dispatch函数基于当前任务abi_mode选择A20或Linux处理表，并在返回前处理信号和重调度。

**关键差异点**:

- **双ABI设计** (独立)
  - A: `include/sys/syscall_ids.h:1-450` — 使用单套与Linux兼容的系统调用编号
  - B: `kernel/syscall/syscall.c:34-69` — 根据abi_mode选择A20或Linux处理表
- **信号重试逻辑** (新增)
  - A: `kern/trap/utrap.c:1-200` — 无条件返回，不处理信号重试
  - B: `kernel/syscall/syscall.c:181-209` — 处理-ERESTARTSYS，支持SA_RESTART
- **系统调用号转换** (替换)
  - A: `include/sys/syscall_ids.h:1-450` — 直接使用Linux编号
  - B: `kernel/syscall/syscall.c:63-69` — 进行x86_64原生号到内核号转换
- **返回前处理** (独立)
  - A: `kern/trap/utrap.c:1-200` — 通过trampoline.S返回，更新trapframe
  - B: `kernel/syscall/syscall.c:216-232` — 调用signal_deliver_user和reschedule


## 八、B 相对 A 的关键差异

**总评**: B（A20OS）相比A（zhongtianos）在文件系统、网络、信号、驱动框架和IPC方面有显著扩展或替换，从教学性演示级内核向更完整的实验性内核演进，但整体相似度低，设计独立程度高。

**整体定位**: 同源分化 — 两仓共享起点但走向不同

### 8.1 文件系统：静态嵌入 vs VFS多层

**类型**: 替换 · **显著度**: ★★★★★

A使用编译时嵌入静态只读文件系统，无写支持；B实现基于vnode的VFS层，支持ext4、procfs、ramfs等动态读写文件系统，显著增强存储能力。

- A: `kern/fs/static_files/sort_src.c:2-12` — 将文件编译为常量数组，无动态磁盘访问
- B: `kernel/fs/vfs.c:2-7` — VFS提供统一fd接口，支持多种文件系统

### 8.2 网络协议栈：模拟 socket vs lwIP

**类型**: 替换 · **显著度**: ★★★★★

A通过全局数组和缓冲区直写模拟TCP/UDP，无硬件支持；B集成lwIP协议栈，支持真正IPv4/IPv6及硬件驱动，提供完整socket API。

- A: `kern/fs/socket.c:73-87` — 位图分配固定socket数组，模拟网络通信
- B: `kernel/net/socket_inet.c:60-80` — 基于lwIP，使用无锁底部半环传递数据

### 8.3 信号机制：不完整实现 vs POSIX完整

**类型**: 优化 · **显著度**: ★★★☆☆

A的信号实现存在空指针访问等缺陷，功能不完整；B实现了完整的POSIX信号，包括实时信号、信号栈、线程组发送等。

- A: `kern/signal/sigevent.c:10-12` — sigactions/sigevents为未初始化指针
- B: `kernel/proc/signal.c:349-350` — 在陷入边界调用signal_deliver_user传递信号

### 8.4 驱动框架：简单驱动 vs 分层模型

**类型**: 新增 · **显著度**: ★★★★☆

A仅有一个virtio-blk驱动，无抽象框架；B引入driver_t/device_t分层模型，支持静态注册、设备类接口和锁层级注释。

- A: `kern/driver/virtio.c:21-32` — virtio-blk核心数据结构，无框架抽象
- B: `kernel/drivers/block/virtio_blk.c:617-626` — DRIVER_REGISTER宏展示静态注册机制

### 8.5 IPC：有限原语 vs 多样化IPC

**类型**: 新增 · **显著度**: ★★★☆☆

A提供pipe、shm、futex；B在此基础上新增System V信号量、timerfd、eventfd及A20原生事件队列。

- A: `kern/ipc/shm.c:102-110` — System V共享内存基本实现
- B: `kernel/ipc/sysv_sem.c:40-48` — System V信号量核心结构（val数组+waiters）


## 九、综合相似度评分

### 9.1 各维度得分

| 维度 | 权重 | A↔B 得分 | 加权 |
|---|---|---|---|
| 函数签名 Jaccard | 0.30 | 0.0 | 0.0 |
| syscall Jaccard | 0.20 | 0.7481 | 0.1496 |
| 依赖 Jaccard | 0.20 | 0.0 | 0.0 |
| 调用图综合 | 0.20 | 0.0 | 0.0 |
| 目录 Jaccard | 0.10 | 0.0423 | 0.0042 |
| **合计** | **1.00** | — | **0.1539** |

### 9.2 等级判定

| 范围 | 等级 |
|---|---|
| ≥ 0.70 | 高度相似 |
| 0.40 - 0.70 | 中度相似 |
| 0.15 - 0.40 | 低度相似 |
| < 0.15 | 完全不同 |

**本次评级**: **低度相似** (0.1539)

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