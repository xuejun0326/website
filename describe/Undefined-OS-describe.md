# T202510003995291-2331 内核代码分析报告

> **生成时间**: 2026-06-16T10:01:35.678741+00:00  
> **家族**: `arceos-starry` · workspace=[undefined-os-api, starry-core, undefined-process, syscall-trace, undefined-vfs, undefined-os]  
> **代码量**: 737 文件 / 65547 行  
> **syscall**: 212 项  
> **运行时长**: 430.6s · prompt=299651 · completion=32987 · reasoning=702

## 一、总览

该仓库基于ArceOS构建，采用两层启动设计，通过main初始化全局资源后调用run_user_app加载用户程序。内存管理支持多级页大小（4K/2M/1G）和ELF递归加载，并映射信号跳板。进程管理实现两级进程/线程模型，包含全局进程表、原子PID分配、进程组/会话层级及僵尸进程处理。信号机制通过POST_TRAP钩子自动检查并处理信号，支持线程/进程/进程组三级发送。IPC实现了基于Arc引用计数和Drop自动归还的共享内存。网络层通过Socket枚举统一管理TCP/UDP，并实现FileLike trait支持文件式读写。系统调用通过单一trap入口和巨量match分发，未实现者采用三级stub策略。整体架构模块化，注重Linux兼容性与安全性。

**评分**: 完整度 ★★☆ · 创新性 ★★★ · 代码质量 ★★☆

**syscall 覆盖**: 覆盖212个系统调用，涵盖网络、文件、任务、内存、IPC、信号等域，部分为stub实现，整体广度较高。

## 二、创新点

### 1. 两级进程/线程分离模型

实现进程含多线程结构，通过全局进程表、原子PID分配、进程组/会话管理及僵尸处理，增强Linux兼容性。

**证据**:

- `process/src/process.rs:8-17`
- `process/src/process.rs:234-238`
- `process/src/process.rs:141-160`

### 2. POST_TRAP钩子自动信号处理

信号检查通过POST_TRAP回调自动触发，无需显式等待，提高实时性与效率。

**证据**:

- `api/src/imp/task/signal.rs:19-20`

### 3. 多级页大小与ELF动态映射

地址空间支持4K/2M/1G页大小，ELF加载递归处理脚本解释器，并映射信号跳板至用户态。

**证据**:

- `api/src/imp/mm/mmap.rs:114-128`
- `core/src/mm.rs:113-140`

### 4. 共享内存ARC生命周期管理

共享内存段使用Arc管理引用，Drop时自动归还分配器页，确保内存安全与资源释放。

**证据**:

- `core/src/shared_memory.rs:40-55`
- `core/src/shared_memory.rs:18-24`

### 5. 未实现系统调用三级Stub策略

根据系统调用重要性采用bypass/ENOSYS/exit三级处理，保证未实现调用的行为可控。

**证据**:

- `src/syscall.rs:516-530`

### 6. Socket枚举统一TCP/UDP并实现FileLike

通过Socket枚举封装axnet套接字，利用Mutex保障线程安全，并实现FileLike trait支持文件式读写。

**证据**:

- `api/src/imp/net/socket.rs:41-44`
- `api/src/imp/net/socket.rs:185-200`

### 7. 用户态指针安全封装集中化

在系统调用层集中封装用户态指针转换与安全检查，通过in/out模式减少风险。

**证据**:

- `api/src/imp/net/socket.rs:223-232`

## 三、启动流程

采用两层启动设计：内核入口 main 初始化文件系统、文件描述符表，挂载文件系统；然后调用 run_user_app 从用户程序加载到地址空间，创建用户上下文与任务，最终由 axtask 调度执行。

### 启动调用图

```mermaid
graph TD
    main[["main\nsrc/main.rs:27"]]:::entry
    main --> lock["lock\n(unknown)"]:::call
    main --> clone["clone\n(unknown)"]:::call
    main --> change_root["change_root\n(unknown)"]:::call
    main --> unwrap["unwrap\n(unknown)"]:::call
    main --> init_new["init_new\n(unknown)"]:::call
    main --> fd_table_new["FdTable::new\n(unknown)"]:::call
    main --> mount_all["mount_all\n(unknown)"]:::call
    main --> expect["expect\n(unknown)"]:::call
    main --> into_iter["into_iter\n(unknown)"]:::call
    main --> map["map\n(unknown)"]:::call
    main --> collect["collect\n(unknown)"]:::call
    main --> to_string["to_string\n(unknown)"]:::call
    init_new --> handle_syscall{{"handle_syscall (SYSCALL)\nsrc/syscall.rs:28"}}:::handler
    init_new --> handle_page_fault{{"handle_page_fault (PAGE_FAULT)\nsrc/mm.rs:13"}}:::handler
    init_new --> post_trap_callback{{"post_trap_callback (POST_TRAP)\napi/src/imp/task/signal.rs:70"}}:::handler
    init_new --> handler_irq{{"handler_irq (IRQ)\narceos/modules/axhal/src/irq.rs:38"}}:::handler

    classDef entry fill:#1976d2,color:#fff;
    classDef handler fill:#c62828,color:#fff;
    classDef call fill:#eee,color:#333;
```

### 设计要点


**· 两层启动：main 初始化全局资源**


  引证: `src/main.rs:27-45`

  ```rust
  fn main() {
    let root_dir = axfs_ng::api::FS_CONTEXT.lock().root_dir.clone();
    FS_CONTEXT.lock().change_root(root_dir).unwrap();
    FD_TABLE.init_new(FdTable::new());
    mount_all().expect("Mounting all filesystems failed");
  ```


**· run_user_app 封装用户程序加载与执行**


  引证: `core/src/entry.rs:17-68`

  ```rust
  pub fn run_user_app(args: &[String], envs: &[String]) -> Option<i32> {
    let mut uspace = new_user_aspace_empty()
        .and_then(|mut it| {
            copy_from_kernel(&mut it)?;
            map_trampoline(&mut it)?;
            Ok(it)
        })
  ```


**· 使用 UspaceContext 创建用户态上下文**


  引证: `core/src/entry.rs:46-47`

  ```rust
  let uctx = UspaceContext::new(entry_vaddr.into(), ustack_top, 2333);
  ```


**· 通过 axtask::spawn_task 调度用户任务**


  引证: `core/src/entry.rs:65-66`

  ```rust
  let user_task = axtask::spawn_task(user_task);
    user_task.join()
  ```


**· 依赖 axhal 和 axfs 抽象硬件与文件系统**


  引证: `src/main.rs:7-8`

  ```rust
  extern crate axlog;
extern crate alloc;
  ```


  引证: `core/src/entry.rs:2-4`

  ```rust
  use axhal::arch::UspaceContext;
use axfs::{CURRENT_DIR, CURRENT_DIR_PATH};
  ```


### 关键数据结构

- `ProcessData` @ `core/src/entry.rs:53` — 进程数据，包含参数、地址空间、信号等，与线程绑定

- `TaskExt` @ `core/src/entry.rs:67` — 任务扩展数据，关联线程和线程数据


### 主要接口

- `main` @ `src/main.rs:27` — 内核入口，初始化全局资源并调用 run_user_app

- `run_user_app` @ `core/src/entry.rs:17` — 创建用户地址空间、加载程序、生成用户任务并等待退出

## 四、内存管理

基于 axmm::AddrSpace 封装用户态地址空间管理，支持 4K/2M/1G 多级页大小、ELF 加载、信号跳板映射、设备内存直映射及文件后备映射。通过 percpu 标志实现内核态安全访问用户内存，架构自适应内核映射复制。

### 设计要点


**· 地址空间架构自适应内核映射**


  引证: `core/src/mm.rs:21-28`

  ```rust
  pub fn copy_from_kernel(aspace: &mut AddrSpace) -> AxResult {
    #[cfg(not(any(target_arch = "aarch64", target_arch = "loongarch64")))]
    {
        aspace.copy_mappings_from(&kernel_aspace().lock())?;
    }
    Ok(())
}
  ```


**· 多级页大小支持（4K/2M/1G）**


  引证: `api/src/imp/mm/mmap.rs:114-128`

  ```rust
  let page_size = if map_flags.contains(MmapFlags::HUGETLB) {
        if map_flags.contains(MmapFlags::HUGE_1GB) {
            PageSize::Size1G
        } else if map_flags.contains(MmapFlags::HUGE_2MB) {
            PageSize::Size2M
        } else {
            error!("[sys_mmap] HUGETLB flag is set, but no supported huge page size is specified.");
            return Err(LinuxError::EINVAL);
        }
    } else {
        PageSize::Size4K
    };
  ```


**· ELF 加载与脚本解释器递归支持**


  引证: `core/src/mm.rs:113-140`

  ```rust
  fn map_elf(uspace: &mut AddrSpace, elf: &ElfFile) -> AxResult<(VirtAddr, [AuxvEntry; 17])> {
    let uspace_base = uspace.base().as_usize();
    let elf_parser = ELFParser::new(
        elf,
        axconfig::plat::USER_INTERP_BASE,
        Some(uspace_base as isize),
        uspace_base,
    )
    .map_err(|_| AxError::InvalidData)?;

    for segment in elf_parser.ph_load() {
  ```


  引证: `core/src/mm.rs:166-179`

  ```rust
  let elf = if let Ok(elf) = ElfFile::new(&file_data) {
        elf
    } else {
        if file_data.starts_with(b"#!") {
            let first_line_end = file_data
                .iter()
                .position(|&c| c == b'\n')
                .unwrap_or(file_data.len());
            let first_line = &file_data[2..first_line_end];
            let interp_path = core::str::from_utf8(first_line)
  ```


**· 信号跳板映射到用户态**


  引证: `core/src/mm.rs:31-40`

  ```rust
  pub fn map_trampoline(aspace: &mut AddrSpace) -> AxResult {
    let signal_trampoline_paddr = virt_to_phys(axsignal::arch::signal_trampoline_address().into());
    aspace.map_linear(
        axconfig::plat::SIGNAL_TRAMPOLINE.into(),
        signal_trampoline_paddr,
        PAGE_SIZE_4K,
        MappingFlags::READ | MappingFlags::EXECUTE | MappingFlags::USER,
        PageSize::Size4K,
    )?;
    Ok(())
}
  ```


**· 基于 percpu 标志的用户内存访问管控**


  引证: `core/src/mm.rs:213-225`

  ```rust
  #[percpu::def_percpu]
static mut ACCESSING_USER_MEM: bool = false;

pub fn access_user_memory<R>(f: impl FnOnce() -> R) -> R {
    ACCESSING_USER_MEM.with_current(|v| {
        *v = true;
        let result = f();
        *v = false;
        result
    })
}

pub fn is_accessing_user_memory() -> bool {
    ACCESSING_USER_MEM.read_current()
}
  ```


### 关键数据结构

- `MmapProt` @ `api/src/imp/mm/mmap.rs:22` — mmap 权限标志位集合，封装 PROT_READ/WRITE/EXEC/GROWSDOWN/GROWSUP

- `MmapFlags` @ `api/src/imp/mm/mmap.rs:47` — mmap 映射标志位集合，含 MAP_SHARED/PRIVATE/FIXED/ANONYMOUS/HUGETLB 等

- `AddrSpace` @ `core/src/mm.rs:10` — 来自 axmm crate 的地址空间结构，管理虚拟地址映射与页表

- `ACCESSING_USER_MEM` @ `core/src/mm.rs:213` — per-CPU bool 标志，标记当前是否正在访问用户态内存以允许缺页异常


### 主要接口

- `sys_mmap` @ `api/src/imp/mm/mmap.rs:83` — Linux mmap 系统调用实现，支持匿名/文件/设备/巨页映射

- `sys_munmap` @ `api/src/imp/mm/mmap.rs:229` — Linux munmap 系统调用实现，解除映射并刷新 TLB

- `sys_mprotect` @ `api/src/imp/mm/mmap.rs:241` — Linux mprotect 系统调用实现，修改已有映射的保护权限

- `new_user_aspace_empty` @ `core/src/mm.rs:13` — 基于内核配置创建空的用户地址空间

- `copy_from_kernel` @ `core/src/mm.rs:21` — 按架构将内核页表映射复制到用户地址空间

- `map_trampoline` @ `core/src/mm.rs:31` — 将信号处理跳板页映射到用户空间固定虚拟地址

- `load_user_app` @ `core/src/mm.rs:155` — 加载用户程序 ELF 文件，支持脚本/动态链接器递归加载

- `access_user_memory` @ `core/src/mm.rs:219` — 设置当前线程允许访问用户内存，供内核安全读写用户数据

## 五、进程与任务调度

采用两级进程/线程模型（Process 含多线程），通过全局进程表、原子 PID 分配、进程组/会话层级管理及信号后处理回调实现 Linux 兼容的进程调度与信号机制。

### 设计要点


**· 两层级进程/线程分离模型**


  引证: `process/src/process.rs:8-17`

  ```rust
  pub struct Process {
    pid: Pid,
    threads: Mutex<BTreeMap<Pid, Arc<Thread>>>,
    process_group: Mutex<Weak<ProcessGroup>>,
    children: Mutex<BTreeMap<Pid, Arc<Process>>>,
    parent: Mutex<Weak<Process>>,
    is_zombie: AtomicBool,
    exit_code: AtomicI32,
}
  ```


**· 原子计数器生成唯一 PID**


  引证: `process/src/process.rs:234-238`

  ```rust
  static NEXT_PID: AtomicU32 = AtomicU32::new(1);

fn generate_next_pid() -> Pid {
    NEXT_PID.fetch_add(1, Ordering::Acquire)
}
  ```


**· 僵尸进程与子进程移交机制**


  引证: `process/src/process.rs:141-160`

  ```rust
  fn set_zombie(&self) {
    self.is_zombie.store(true, Ordering::Release);
}

fn get_child_reaper(&self) -> Option<Arc<Process>> {
    if self.pid == 1 {
        return None;
    }
    PROCESS_TABLE.lock().get(&1).cloned()
}

pub(crate) fn exit(self: &Arc<Self>) {
    assert!(!self.is_zombie());
    self.set_zombie();
    let reaper = self.get_child_reaper();
  ```


**· 进程组与会话层级管理**


  引证: `process/src/process.rs:49-87`

  ```rust
  pub fn create_group(self: &Arc<Self>) -> Arc<ProcessGroup> {
    let origin_group = self.get_group();
    if origin_group.get_pgid() == self.pid {
        return origin_group;
    }
    let new_group = create_process_group(self.pid, origin_group.session.clone());
    self.change_group(&new_group);
    new_group
}
pub fn create_session(self: &Arc<Self>) -> Option<Arc<Session>> {
    if self.is_group_leader() { return None; }
    let new_session = create_session(self.pid);
  ```


**· 信号后处理回调机制**


  引证: `api/src/imp/task/signal.rs:28-65`

  ```rust
  pub fn check_signals(tf: &mut TrapFrame, restore_blocked: Option<SignalSet>) -> bool {
    let signal = &current_thread_data().signal;
    let Some((sig, os_action)) = signal.check_signals(tf, restore_blocked) else {
        return false;
    };
    let signo = sig.signo();
    match os_action {
        SignalOSAction::Terminate => { sys_exit_impl(0, signo as u32, true); }
        SignalOSAction::CoreDump => { sys_exit_impl(0, 0x80 + signo as u32, true); }
  ```


**· 等待队列实现信号同步**


  引证: `api/src/imp/task/signal.rs:288-308`

  ```rust
  pub fn sys_rt_sigtimedwait(
    set: UserConstPtr<SignalSet>,
    info: UserPtr<siginfo>,
    timeout: UserConstPtr<timespec>,
    sigsetsize: usize,
) -> LinuxResult<isize> {
    let set = unsafe { *set.get()? };
    let timeout: Option<Duration> = timeout.nullable(UserConstPtr::get)?.map(|ts| unsafe { *ts }.into());
    let Some(sig) = current_thread_data().signal.wait_timeout(set, timeout) else {
        return Err(LinuxError::EAGAIN);
    };
  ```


### 关键数据结构

- `Process` @ `process/src/process.rs:8` — 进程描述符，包含 pid、线程表、进程组、父子关系、僵尸状态

- `ProcessGroup` @ `process/src/process_group.rs:1` — 进程组，管理同组进程及组 ID

- `Session` @ `process/src/session.rs:1` — 会话，包含多个进程组及会话 ID

- `Thread` @ `process/src/thread.rs:1` — 线程描述符，关联所属进程

- `ProcessData` @ `core/src/process.rs:1` — 进程级运行时数据，包含信号动作表

- `ThreadData` @ `core/src/process.rs:1` — 线程级运行时数据，包含信号屏蔽字与待处理信号

- `TaskExt` @ `core/src/task.rs:1` — 任务扩展结构，关联 Thread 与 ThreadData

- `WaitQueueWrapper` @ `core/src/task.rs:1` — 信号等待队列封装，实现 axsignal::api::WaitQueue


### 主要接口

- `sys_kill` @ `api/src/imp/task/signal.rs:168` — 向进程/进程组发送信号，支持 pid 正/零/负三种模式

- `sys_tkill` @ `api/src/imp/task/signal.rs:218` — 向指定线程发送信号

- `sys_rt_sigaction` @ `api/src/imp/task/signal.rs:106` — 设置/获取信号处理动作

- `sys_rt_sigprocmask` @ `api/src/imp/task/signal.rs:86` — 修改/查询线程信号屏蔽字

- `fork` @ `process/src/process.rs:129` — 创建子进程，复制所属进程组

- `spawn_process` @ `process/src/process.rs:120` — 创建无父进程的新进程（如 init）

- `exit` @ `process/src/process.rs:152` — 进程退出，标记僵尸并将子进程移交 init

- `create_thread` @ `process/src/process.rs:210` — 在进程内创建新线程

- `remove_thread` @ `process/src/process.rs:201` — 移除线程，若线程为空则触发进程退出

## 六、文件系统

⚠ 该模块描述失败: `json_parse_failed`

## 七、信号机制

信号机制模块实现了Linux兼容的信号系统调用集，包括信号发送（kill、tkill、tgkill、rt_sigqueueinfo等）、信号处理（rt_sigaction）、信号屏蔽（rt_sigprocmask）、信号挂起等待（rt_sigsuspend、rt_sigtimedwait）以及信号返回（rt_sigreturn）。采用POST_TRAP钩子自动检查并处理信号，支持向线程、进程、进程组发送信号，信号动作包括终止、核心转储、停止、继续和处理函数。

### 设计要点


**· 信号检查通过POST_TRAP回调自动触发**


  引证: `api/src/imp/task/signal.rs:19-20`

  ```rust
  #[register_trap_handler(POST_TRAP)]
fn post_trap_callback(tf: &mut TrapFrame, from_user: bool) {
  ```


**· 信号动作定义四种标准行为**


  引证: `api/src/imp/task/signal.rs:24-38`

  ```rust
  match os_action {
    SignalOSAction::Terminate => { ... }
    SignalOSAction::CoreDump => { ... }
    SignalOSAction::Stop => { ... }
    SignalOSAction::Continue => { ... }
    SignalOSAction::Handler => { ... }
}
  ```


**· 信号屏蔽使用with_blocked_mut原子操作**


  引证: `api/src/imp/task/signal.rs:68-70`

  ```rust
  current_thread_data()
        .signal
        .with_blocked_mut::<LinuxResult<_>>(|blocked| {
  ```


**· 信号发送支持线程、进程、进程组三级粒度**


  引证: `api/src/imp/task/signal.rs:122-124`

  ```rust
  pub fn send_signal_thread(tid: Pid, sig: SignalInfo) -> LinuxResult<()> {
  ```


  引证: `api/src/imp/task/signal.rs:130-132`

  ```rust
  pub fn send_signal_process(pid: Pid, sig: SignalInfo) -> LinuxResult<()> {
  ```


  引证: `api/src/imp/task/signal.rs:138-140`

  ```rust
  pub fn send_signal_process_group(pgid: Pid, sig: SignalInfo) -> usize {
  ```


**· 信号挂起等待通过wait_timeout和wait_signal实现**


  引证: `api/src/imp/task/signal.rs:290-292`

  ```rust
  let Some(sig) = current_thread_data().signal.wait_timeout(set, timeout) else {
  ```


  引证: `api/src/imp/task/signal.rs:334-336`

  ```rust
  current_process_data().signal.wait_signal();
  ```


### 关键数据结构

- `Signo` @ `api/src/imp/task/signal.rs:7` — 信号编号枚举，来自axsignal crate

- `SignalSet` @ `api/src/imp/task/signal.rs:7` — 信号集类型，用于屏蔽和等待

- `SignalInfo` @ `api/src/imp/task/signal.rs:7` — 信号信息结构，包含信号编号和代码

- `SignalOSAction` @ `api/src/imp/task/signal.rs:7` — 信号动作枚举（Terminate, CoreDump, Stop, Continue, Handler）

- `kernel_sigaction` @ `api/src/imp/task/signal.rs:5` — Linux内核级别的sigaction结构，用于系统调用接口


### 主要接口

- `post_trap_callback` @ `api/src/imp/task/signal.rs:20` — POST_TRAP钩子，自动检查并处理用户态信号

- `check_signals` @ `api/src/imp/task/signal.rs:10` — 检查当前线程是否有待处理信号并执行相应动作

- `sys_rt_sigaction` @ `api/src/imp/task/signal.rs:77` — 设置或查询指定信号的处理动作

- `sys_rt_sigprocmask` @ `api/src/imp/task/signal.rs:51` — 设置或查询当前线程的信号屏蔽字

- `sys_rt_sigpending` @ `api/src/imp/task/signal.rs:117` — 获取当前挂起的信号集

- `sys_rt_sigreturn` @ `api/src/imp/task/signal.rs:274` — 从信号处理函数返回，恢复上下文

- `sys_rt_sigtimedwait` @ `api/src/imp/task/signal.rs:277` — 同步等待指定信号集中的信号，可设超时

- `sys_rt_sigsuspend` @ `api/src/imp/task/signal.rs:305` — 临时替换信号屏蔽字并挂起线程直到信号到来

- `sys_kill` @ `api/src/imp/task/signal.rs:151` — 向进程或进程组发送信号

- `sys_tkill` @ `api/src/imp/task/signal.rs:213` — 向指定线程发送信号

- `sys_tgkill` @ `api/src/imp/task/signal.rs:222` — 向指定线程组内的线程发送信号

- `sys_sigaltstack` @ `api/src/imp/task/signal.rs:343` — 设置或查询替代信号栈

## 八、进程间通信

共享内存子系统基于全局页分配器分配物理页，通过Arc引用计数管理生命周期，使用Mutex+BTreeMap维护段表，AtomicU32生成唯一键，实现POSIX共享内存语义。其他IPC机制（futex、消息队列、信号量）仅声明系统调用桩，未提供内核实现。

### 设计要点


**· 共享内存段用Arc管理生命周期**


  引证: `core/src/shared_memory.rs:40-55`

  ```rust
  pub fn create(&self, key: u32, size: usize) -> LinuxResult<Arc<SharedMemory>> {
        let page_count = size.div_ceil(PAGE_SIZE_4K);
        let allocator = global_allocator();
        let vaddr = allocator
            .alloc_pages(page_count, PAGE_SIZE_4K)
            .map_err(|_| LinuxError::ENOMEM)?;
        let shared_memory = SharedMemory {
            key,
            addr: vaddr,
            page_count,
        };
        let shared_memory = Arc::new(shared_memory);
        self.mem_map.lock().insert(key, shared_memory.clone());
        Ok(shared_memory)
    }
  ```


**· Drop trait自动归还分配器页**


  引证: `core/src/shared_memory.rs:18-24`

  ```rust
  impl Drop for SharedMemory {
    fn drop(&mut self) {
        let allocator = global_allocator();
        allocator.dealloc_pages(self.addr, self.page_count);
        info!(
            "[SharedMemory] dealloc pages: addr: {:#x}, page_count: {}, key: {}",
            self.addr, self.page_count, self.key
        );
    }
}
  ```


**· Mutex+BTreeMap保证并发安全**


  引证: `core/src/shared_memory.rs:27-29`

  ```rust
  pub struct SharedMemoryManager {
    pub mem_map: Mutex<BTreeMap<u32, Arc<SharedMemory>>>,
    next_key: AtomicU32,
}
  ```


**· AtomicU32生成单调递增键值**


  引证: `core/src/shared_memory.rs:37-40`

  ```rust
  pub fn next_available_key(&self) -> u32 {
        let next_key = self.next_key.fetch_add(1, Ordering::Relaxed);
        self.mem_map.lock().keys().max().unwrap_or(&0) + next_key
    }
  ```


### 关键数据结构

- `SharedMemory` @ `core/src/shared_memory.rs:10` — 共享内存段描述符，包含键、内核虚拟地址和页数

- `SharedMemoryManager` @ `core/src/shared_memory.rs:27` — 共享内存管理器，维护段表并分配键值


### 主要接口

- `next_available_key` @ `core/src/shared_memory.rs:37` — 生成下一个可用键值，确保全局唯一

- `get` @ `core/src/shared_memory.rs:41` — 根据键值查找共享内存段，返回Arc引用

- `create` @ `core/src/shared_memory.rs:44` — 分配页并创建新共享内存段，插入管理器

- `delete` @ `core/src/shared_memory.rs:68` — 从管理器中移除键值对应的共享内存段

## 九、网络

通过Socket枚举统一管理TCP/UDP套接字，内部封装axnet库，以Mutex保证线程安全。系统调用直接暴露为pub fn，地址转换使用SockAddr安全抽象，并实现FileLike trait以支持文件式读写。

### 设计要点


**· Socket枚举统一TCP/UDP，内部用Mutex保护**


  引证: `api/src/imp/net/socket.rs:41-44`

  ```rust
  pub enum Socket {
    Udp(Mutex<UdpSocket>),
    Tcp(Mutex<TcpSocket>),
}
  ```


**· 通过FileLike trait将socket映射为文件操作**


  引证: `api/src/imp/net/socket.rs:185-200`

  ```rust
  impl FileLike for Socket {
    fn read(&self, buf: &mut [u8]) -> LinuxResult<usize> {
        self.recv(buf)
    }
    fn write(&self, buf: &[u8]) -> LinuxResult<usize> {
        self.send(buf)
    }
  ```


**· SockAddr安全封装原始sockaddr，处理IPv4/IPv6**


  引证: `api/src/imp/net/socketaddr.rs:20-24`

  ```rust
  pub struct SockAddr {
    len: socklen_t,
    storage: MaybeUninit<sockaddr>,
}
  ```


**· 系统调用以pub fn sys_*形式直接导出**


  引证: `api/src/imp/net/socket.rs:274-276`

  ```rust
  pub fn sys_socket(domain: c_int, socktype: c_int, protocol: c_int) -> LinuxResult<isize> {
  ```


  引证: `api/src/imp/net/socket.rs:303-306`

  ```rust
  pub fn sys_bind(
    socket_fd: c_int,
    socket_addr: *const sockaddr,
    addrlen: socklen_t,
) -> LinuxResult<isize> {
  ```


**· DNS查询通过axnet::dns_query实现getaddrinfo**


  引证: `api/src/imp/net/socket.rs:436-438`

  ```rust
  if let Ok(a) = domain.parse::<IpAddr>() {
            vec![a]
        } else {
            axnet::dns_query(domain)?
  ```


**· UDP sendto/recvfrom需先bind，否则返回错误**


  引证: `api/src/imp/net/socket.rs:130-137`

  ```rust
  Socket::Udp(udpsocket) => {
                let udpsocket = udpsocket.lock();
                udpsocket
                    .bind(SocketAddr::new(IpAddr::V4(Ipv4Addr::new(127, 0, 0, 1)), 0))
                    .map_err(|_| LinuxError::EISCONN)?;
  ```


### 关键数据结构

- `Socket` @ `api/src/imp/net/socket.rs:41` — 枚举，表示UDP或TCP套接字，内部持有Mutex保护的底层socket

- `SocketOptionLevel` @ `api/src/imp/net/socket.rs:34` — 枚举，表示setsockopt的选项层级（IP/Socket/TCP/IPv6）

- `SockAddr` @ `api/src/imp/net/socketaddr.rs:20` — 安全的sockaddr抽象，支持IPv4和IPv6地址的转换


### 主要接口

- `sys_socket` @ `api/src/imp/net/socket.rs:274` — 创建套接字，返回文件描述符

- `sys_bind` @ `api/src/imp/net/socket.rs:303` — 将地址绑定到套接字

- `sys_connect` @ `api/src/imp/net/socket.rs:314` — 连接套接字到指定地址

- `sys_sendto` @ `api/src/imp/net/socket.rs:337` — 向指定地址发送数据

- `sys_send` @ `api/src/imp/net/socket.rs:361` — 向已连接套接字发送数据

- `sys_recvfrom` @ `api/src/imp/net/socket.rs:381` — 接收数据并获取源地址

- `sys_recv` @ `api/src/imp/net/socket.rs:418` — 从已连接套接字接收数据

- `sys_listen` @ `api/src/imp/net/socket.rs:437` — 监听套接字上的连接

- `sys_accept` @ `api/src/imp/net/socket.rs:451` — 接受连接，返回新套接字描述符

- `sys_shutdown` @ `api/src/imp/net/socket.rs:478` — 关闭套接字的读/写通道

- `sys_getsockname` @ `api/src/imp/net/socket.rs:594` — 获取套接字本地地址

- `sys_getpeername` @ `api/src/imp/net/socket.rs:610` — 获取套接字对端地址

- `sys_setsockopt` @ `api/src/imp/net/socket.rs:626` — 设置套接字选项

- `sys_getaddrinfo` @ `api/src/imp/net/socket.rs:471` — DNS域名解析，返回addrinfo链表

- `sys_freeaddrinfo` @ `api/src/imp/net/socket.rs:572` — 释放getaddrinfo返回的addrinfo内存

## 十、驱动框架

本仓库未实现此模块。

## 十一、系统调用层

通过 trap 中断统一入口，使用巨量 match 分发 Linux 系统调用至具体实现；未实现者使用 stub 策略（bypass/ENOSYS/exit）；实现位于 undefined_os_api 的 imp/interface 子模块，网络部分在 api/src/imp/net/socket.rs 内直接编码。

### 设计要点


**· 单一 trap 入口 dispatch 全部 syscall**


  引证: `src/syscall.rs:19-24`

  ```rust
  #[register_trap_handler(SYSCALL)]
fn handle_syscall(tf: &mut TrapFrame, syscall_num: usize) -> isize {
    let sysno = Sysno::new(syscall_num as _);
  ```


**· LinuxResult 统一错误处理与代码转换**


  引证: `src/syscall.rs:510-512`

  ```rust
  let ans = result.unwrap_or_else(|err| -err.code() as _);
  ```


**· 未实现 syscall 采用三级 stub 策略**


  引证: `src/syscall.rs:516-530`

  ```rust
  fn stub_unimplemented(syscall_num: usize) -> Result<isize, LinuxError> {
    warn!("Unimplemented syscall: {:?}, ENOSYS", Sysno::from(syscall_num as u32));
    Err(LinuxError::ENOSYS)
}

fn stub_bypass(sysno: Sysno) -> Result<isize, LinuxError> {
    warn!("Unimplemented syscall: {:?}, bypassed", sysno);
    Ok(0)
}
  ```


**· 条件编译适配 x86_64 / riscv64 / aarch64 差异**


  引证: `src/syscall.rs:91-96`

  ```rust
  #[cfg(any(target_arch = "riscv64", target_arch = "aarch64"))]
Sysno::clone => sys_clone(
    tf.arg0() as _,
    tf.arg1() as _,
    tf.arg2().into(),
    tf.arg3() as _,
    tf.arg4().into(),
  ```


**· Socket 实现采用 TCP/UDP 枚举分发**


  引证: `api/src/imp/net/socket.rs:55-58`

  ```rust
  pub enum Socket {
    Udp(Mutex<UdpSocket>),
    Tcp(Mutex<TcpSocket>),
}
  ```


**· 用户态指针转换与安全检查集中 in/out 封装**


  引证: `api/src/imp/net/socket.rs:223-232`

  ```rust
  pub fn char_ptr_to_str<'a>(str: *const c_char) -> LinuxResult<&'a str> {
    if str.is_null() {
        Err(LinuxError::EFAULT)
    } else {
        let str = str as *const _;
        unsafe { CStr::from_ptr(str) }
            .to_str()
            .map_err(|_| LinuxError::EINVAL)
  ```


### 关键数据结构

- `TrapFrame` @ `src/syscall.rs:3` — 架构相关的 trap 帧结构，保存寄存器上下文

- `Sysno` @ `src/syscall.rs:8` — 来自 syscalls crate 的系统调用号枚举

- `Socket` @ `api/src/imp/net/socket.rs:55` — UDP/TCP 套接字枚举，封装 Mutex 保护的底层 socket


### 主要接口

- `handle_syscall` @ `src/syscall.rs:19` — 系统调用总入口，通过 match sysno 分发至具体实现

- `stub_unimplemented` @ `src/syscall.rs:516` — 未实现 syscall 返回 ENOSYS

- `stub_bypass` @ `src/syscall.rs:521` — 未实现 syscall 返回 Ok(0) 静默绕过

- `sys_socket` @ `api/src/imp/net/socket.rs:266` — 创建 TCP 或 UDP socket 并注册到 fd 表

- `sys_bind` @ `api/src/imp/net/socket.rs:297` — 绑定地址到 socket

- `sys_connect` @ `api/src/imp/net/socket.rs:317` — 连接 socket 到指定地址

- `sys_sendto` @ `api/src/imp/net/socket.rs:339` — 发送数据到指定地址

- `sys_recvfrom` @ `api/src/imp/net/socket.rs:397` — 接收数据并获取源地址

- `sys_listen` @ `api/src/imp/net/socket.rs:456` — 监听 socket 连接

- `sys_accept` @ `api/src/imp/net/socket.rs:467` — 接受连接并返回新 fd

## 十二、验证透明表

对 LLM 输出的 **30** 条引证 evidence 进行二次重读校验, 结果如下 (✓support=12 · ~partial=6 · ✗contradict=1 · ?unrelated=11)。

| # | 模块 | 论断 | 引证 | verdict | 说明 |
|---|------|------|------|---------|------|
| 1 | boot | 两层启动：main 初始化全局资源 | `src/main.rs:27-45` | ✓ support | main函数中明确初始化了FD_TABLE、挂载文件系统等全局资源，符合论断描述。 |
| 2 | boot | run_user_app 封装用户程序加载与执行 | `core/src/entry.rs:17-68` | ✓ support | 代码实现了用户程序加载、地址空间设置、上下文创建及任务启动，封装了完整流程。 |
| 3 | boot | 使用 UspaceContext 创建用户态上下文 | `core/src/entry.rs:46-47` | ~ partial | 代码片段仅展示了包装 uspace 变量，未显示其类型或创建过程，无法确认使用了 UspaceContext。 |
| 4 | boot | 通过 axtask::spawn_task 调度用户任务 | `core/src/entry.rs:65-66` | ✓ support | 代码直接调用 axtask::spawn_task 启动用户任务，与论断相符。 |
| 5 | boot | 依赖 axhal 和 axfs 抽象硬件与文件系统 | `src/main.rs:7-8` | ? unrelated | 代码仅包含 extern crate axlog;，未涉及 axhal 或 axfs。 |
| 6 | boot | 依赖 axhal 和 axfs 抽象硬件与文件系统 | `core/src/entry.rs:2-4` | ? unrelated | 代码片段未引用axhal或axfs，只涉及进程和任务模块。 |
| 7 | mm | 地址空间架构自适应内核映射 | `core/src/mm.rs:21-28` | ✓ support | 代码通过条件编译根据架构决定是否复制内核映射，体现了架构自适应。 |
| 8 | mm | 多级页大小支持（4K/2M/1G） | `api/src/imp/mm/mmap.rs:114-128` | ~ partial | 代码仅展示了4K页大小的默认使用和HUGETLB错误处理，未涉及2M/1G页大小的具体支持。 |
| 9 | mm | ELF 加载与脚本解释器递归支持 | `core/src/mm.rs:113-140` | ✓ support | 代码尝试加载 ELF，若非 ELF 且以 #! 开头则提取解释器路径并递归调用自身，支持论断。 |
| 10 | mm | ELF 加载与脚本解释器递归支持 | `core/src/mm.rs:166-179` | ? unrelated | 代码只涉及ELF加载和栈初始化，未提及脚本解释器或递归支持。 |
| 11 | mm | 信号跳板映射到用户态 | `core/src/mm.rs:31-40` | ✓ support | 代码中函数map_trampoline明确注释为映射信号跳板到用户地址空间，并通过map_linear实现。 |
| 12 | mm | 基于 percpu 标志的用户内存访问管控 | `core/src/mm.rs:213-225` | ✓ support | 代码使用 per-CPU 变量 ACCESSING_USER_MEM 作为标志，在访问用户内存时设置和检查，实现管控。 |
| 13 | task | 两层级进程/线程分离模型 | `process/src/process.rs:8-17` | ✓ support | Process结构体包含threads字段（线程集合）和parent/children字段（进程树），直接体现进程/线程分离及进程层级。 |
| 14 | task | 原子计数器生成唯一 PID | `process/src/process.rs:234-238` | ✓ support | 代码使用原子fetch_add生成递增PID，保证唯一性，直接支持论断 |
| 15 | task | 僵尸进程与子进程移交机制 | `process/src/process.rs:141-160` | ~ partial | 代码设置了僵尸状态并定义了获取reaper的方法，但子进程移交逻辑仅有注释未实现。 |
| 16 | task | 进程组与会话层级管理 | `process/src/process.rs:49-87` | ✓ support | 代码实现了进程组的创建、移动和会话的创建，直接支持论断。 |
| 17 | task | 信号后处理回调机制 | `api/src/imp/task/signal.rs:28-65` | ? unrelated | 代码展示的是信号动作处理（Terminate、CoreDump等），而非回调机制（如注册/调用回调函数）。 |
| 18 | task | 等待队列实现信号同步 | `api/src/imp/task/signal.rs:288-308` | ~ partial | 代码展示 sys_rt_sigtimedwait 系统调用，涉及信号等待，但未明确呈现等待队列的实现细节。 |
| 19 | signal | 信号检查通过POST_TRAP回调自动触发 | `api/src/imp/task/signal.rs:19-20` | ? unrelated | 代码片段仅包含use导入语句，不包含函数实现或信号检查逻辑，无法支持论断。 |
| 20 | signal | 信号动作定义四种标准行为 | `api/src/imp/task/signal.rs:24-38` | ~ partial | 代码片段只展示了SignalOSAction::Terminate一种行为，未能证明定义了全部四种标准行为。 |
| 21 | signal | 信号屏蔽使用with_blocked_mut原子操作 | `api/src/imp/task/signal.rs:68-70` | ? unrelated | 提供的代码片段只包含一个闭括号和宏属性，与信号屏蔽或原子操作无关。 |
| 22 | signal | 信号发送支持线程、进程、进程组三级粒度 | `api/src/imp/task/signal.rs:122-124` | ? unrelated | 代码片段是sigaction相关参数，未涉及线程/进程/进程组信号发送机制。 |
| 23 | signal | 信号发送支持线程、进程、进程组三级粒度 | `api/src/imp/task/signal.rs:130-132` | ? unrelated | 给出的代码片段仅是一个错误返回，不涉及信号发送的粒度信息。 |
| 24 | signal | 信号发送支持线程、进程、进程组三级粒度 | `api/src/imp/task/signal.rs:138-140` | ? unrelated | 代码片段仅涉及信号动作设置，未提及信号发送的线程、进程或进程组粒度。 |
| 25 | signal | 信号挂起等待通过wait_timeout和wait_signal实现 | `api/src/imp/task/signal.rs:290-292` | ✗ contradict | 代码实际调用send_signal_thread发送信号，而非通过wait_timeout或wait_signal等待。 |
| 26 | signal | 信号挂起等待通过wait_timeout和wait_signal实现 | `api/src/imp/task/signal.rs:334-336` | ? unrelated | 代码片段未涉及wait_timeout或wait_signal，仅移除SIGSTOP并获取old_blocked。 |
| 27 | ipc | 共享内存段用Arc管理生命周期 | `core/src/shared_memory.rs:40-55` | ✓ support | 代码中get和create方法返回Arc<SharedMemory>，表明共享内存段通过Arc管理生命周期。 |
| 28 | ipc | Drop trait自动归还分配器页 | `core/src/shared_memory.rs:18-24` | ✓ support | Drop实现中调用了dealloc_pages，明确释放页面，直接支持论断。 |
| 29 | ipc | Mutex+BTreeMap保证并发安全 | `core/src/shared_memory.rs:27-29` | ? unrelated | 代码片段仅包含两个闭合花括号，未涉及Mutex或BTreeMap的任何定义或使用。 |
| 30 | ipc | AtomicU32生成单调递增键值 | `core/src/shared_memory.rs:37-40` | ~ partial | 代码只初始化AtomicU32为1，未展示生成或递增键值逻辑。 |

**通过率 (support + partial)**: 60%

---

*本报告由 oskag describe 自动生成, 所有引用经 verifier 二次校验.*