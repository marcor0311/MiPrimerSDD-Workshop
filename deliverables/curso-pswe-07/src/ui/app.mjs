import { createTaskService } from '../application/task-service.mjs';
import { createLocalStorageTaskRepository } from '../persistence/local-storage-task-repository.mjs';
import { createDetailScreen } from './detail-screen.mjs';
import { createListScreen } from './list-screen.mjs';
import { createTaskForm } from './task-form.mjs';

const root = document.getElementById('app');
const taskService = createTaskService(createLocalStorageTaskRepository());
const state = {
  screen: 'list',
  activeFilter: 'All',
  taskId: null,
};

function showList() {
  state.screen = 'list';
  state.taskId = null;
  render();
}

function renderList() {
  const tasks = taskService.listTasks();

  return createListScreen({
    allTasks: tasks,
    visibleTasks: taskService.listTasks(state.activeFilter),
    filter: state.activeFilter,
    onAdd() {
      state.taskId = null;
      state.screen = 'form';
      render();
    },
    onOpen(taskId) {
      state.taskId = taskId;
      state.screen = 'detail';
      render();
    },
    onFilterChange(filter) {
      state.activeFilter = filter;
      render();
    },
  });
}

function renderDetail() {
  const task = taskService.listTasks().find((item) => item.id === state.taskId);

  if (!task) return renderList();

  return createDetailScreen({
    task,
    onBack: showList,
    onEdit() {
      state.screen = 'form';
      render();
    },
    onToggle() {
      taskService.toggleTaskStatus(task.id);
      render();
    },
    onDelete() {
      if (!window.confirm('Delete this task?')) return;

      taskService.deleteTask(task.id);
      showList();
    },
  });
}

function renderForm() {
  const task = state.taskId === null
    ? null
    : taskService.listTasks().find((item) => item.id === state.taskId);

  if (state.taskId !== null && !task) {
    state.screen = 'list';
    state.taskId = null;
    return renderList();
  }

  return createTaskForm({
    task,
    onSave(values) {
      const result = task
        ? taskService.updateTask(task.id, values)
        : taskService.createTask(values);

      if (result?.ok) {
        state.screen = task ? 'detail' : 'list';
        if (!task) state.taskId = null;
        render();
      }

      return result;
    },
    onCancel() {
      if (task) {
        state.screen = 'detail';
        render();
      } else {
        showList();
      }
    },
  });
}

function render() {
  if (!root) return;

  const screen = state.screen === 'detail'
    ? renderDetail()
    : state.screen === 'form'
      ? renderForm()
      : renderList();

  root.replaceChildren(screen);
}

render();
