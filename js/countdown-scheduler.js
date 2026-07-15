(() => {
  "use strict";

  if (window.MoneyLoanCountdownScheduler) return;

  const tasks = new Map();
  const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  let timer = 0;
  let nextTaskId = 1;

  const normalizedInterval = (value, reducedMotion) => {
    const interval = Number.isFinite(value) ? value : 50;
    return Math.max(reducedMotion ? 1000 : 50, interval);
  };

  const stop = () => {
    if (timer) window.clearTimeout(timer);
    timer = 0;
  };

  const schedule = () => {
    stop();
    if (document.hidden || !tasks.size) return;
    const now = Date.now();
    const delay = Math.max(0, Math.min(...Array.from(tasks.values(), (task) => task.dueAt - now)));
    timer = window.setTimeout(run, delay);
  };

  const updateTask = (task, now) => {
    const nextInterval = task.update(now, { reducedMotion: reduceMotionQuery.matches });
    task.interval = normalizedInterval(nextInterval, reduceMotionQuery.matches);
    task.dueAt = now.getTime() + task.interval;
  };

  function run() {
    timer = 0;
    if (document.hidden || !tasks.size) return;
    const now = new Date();
    tasks.forEach((task) => {
      if (task.dueAt <= now.getTime()) updateTask(task, now);
    });
    schedule();
  }

  const add = (update) => {
    if (typeof update !== "function") return () => {};
    const id = nextTaskId;
    nextTaskId += 1;
    const task = { update, interval: 50, dueAt: 0 };
    tasks.set(id, task);
    updateTask(task, new Date());
    schedule();
    return () => {
      tasks.delete(id);
      schedule();
    };
  };

  const resume = () => {
    if (document.hidden) {
      stop();
      return;
    }
    tasks.forEach((task) => { task.dueAt = 0; });
    if (tasks.size) run();
  };

  document.addEventListener("visibilitychange", resume);
  if (typeof reduceMotionQuery.addEventListener === "function") {
    reduceMotionQuery.addEventListener("change", resume);
  }

  window.MoneyLoanCountdownScheduler = Object.freeze({ add });
})();
