function createElement(tag, className, text) {
  const element = document.createElement(tag);

  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;

  return element;
}

const filters = ['All', 'Pending', 'Done'];

export function createListScreen({ allTasks, visibleTasks, filter, onAdd, onOpen, onFilterChange }) {
  const page = createElement('div');
  const header = createElement('header', 'app-header');
  const appName = createElement('h1', 'app-name', 'Curso-PSWE-07');
  const toolbar = createElement('div', 'toolbar');
  const filterGroup = createElement('div', 'filter-group');
  const addButton = createElement('button', 'button button--primary', 'Add task');
  const taskList = createElement('div', 'task-list');

  filterGroup.setAttribute('role', 'group');
  filterGroup.setAttribute('aria-label', 'Filter tasks');

  for (const filterName of filters) {
    const filterButton = createElement('button', 'filter-button', filterName);

    filterButton.type = 'button';
    filterButton.setAttribute('aria-pressed', String(filter === filterName));
    filterButton.addEventListener('click', () => onFilterChange(filterName));
    filterGroup.append(filterButton);
  }

  addButton.type = 'button';
  addButton.addEventListener('click', onAdd);
  toolbar.append(filterGroup, addButton);
  header.append(appName);
  page.append(header, toolbar);

  if (visibleTasks.length === 0) {
    const emptyState = createElement('div', 'empty-state');
    const message = allTasks.length === 0
      ? 'No tasks yet. Add one to get started.'
      : 'No tasks match this filter.';

    emptyState.append(createElement('p', null, message));
    page.append(emptyState);
    return page;
  }

  for (const task of visibleTasks) {
    const row = createElement('button', 'task-row');
    const status = createElement('span', `status-indicator${task.status === 'Done' ? ' status-indicator--done' : ''}`);
    const statusText = createElement('span', 'visually-hidden', task.status);
    const title = createElement('span', `task-title${task.status === 'Done' ? ' task-title--done' : ''}`, task.title);

    row.type = 'button';
    row.setAttribute('aria-label', `${task.title}, ${task.status}`);
    row.addEventListener('click', () => onOpen(task.id));
    status.setAttribute('aria-hidden', 'true');
    row.append(status, statusText, title);
    taskList.append(row);
  }

  page.append(taskList);

  return page;
}
