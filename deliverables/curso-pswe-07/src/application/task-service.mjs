function normalizeTitle(title) {
  return title.trim().toLowerCase();
}

export function createTaskService(repository, createId = () => globalThis.crypto.randomUUID()) {
  return {
    listTasks(filter = 'All') {
      const tasks = repository.loadAll();

      return filter === 'All' ? tasks : tasks.filter((task) => task.status === filter);
    },

    createTask({ title, description = '' }) {
      const savedTitle = typeof title === 'string' ? title.trim() : '';

      if (savedTitle.length === 0) {
        return { ok: false, error: 'Enter a task title.' };
      }

      const tasks = repository.loadAll();
      const duplicate = tasks.some((task) => normalizeTitle(task.title) === normalizeTitle(savedTitle));

      if (duplicate) {
        return { ok: false, error: 'Task titles must be unique.' };
      }

      const task = {
        id: createId(),
        title: savedTitle,
        description,
        status: 'Pending',
      };

      repository.saveAll([...tasks, task]);

      return { ok: true, task };
    },

    toggleTaskStatus(taskId) {
      const tasks = repository.loadAll();
      const task = tasks.find((item) => item.id === taskId);

      if (!task) return null;

      const updatedTask = { ...task, status: task.status === 'Done' ? 'Pending' : 'Done' };
      repository.saveAll(tasks.map((item) => item.id === taskId ? updatedTask : item));

      return updatedTask;
    },

    updateTask(taskId, { title, description = '' }) {
      const savedTitle = typeof title === 'string' ? title.trim() : '';

      if (savedTitle.length === 0) {
        return { ok: false, error: 'Enter a task title.' };
      }

      const tasks = repository.loadAll();
      const task = tasks.find((item) => item.id === taskId);

      if (!task) return null;

      const duplicate = tasks.some(
        (item) => item.id !== taskId && normalizeTitle(item.title) === normalizeTitle(savedTitle),
      );

      if (duplicate) {
        return { ok: false, error: 'Task titles must be unique.' };
      }

      const updatedTask = { ...task, title: savedTitle, description };
      repository.saveAll(tasks.map((item) => item.id === taskId ? updatedTask : item));

      return { ok: true, task: updatedTask };
    },

    deleteTask(taskId) {
      const tasks = repository.loadAll();
      const remainingTasks = tasks.filter((item) => item.id !== taskId);

      if (remainingTasks.length === tasks.length) return false;

      repository.saveAll(remainingTasks);

      return true;
    },
  };
}
