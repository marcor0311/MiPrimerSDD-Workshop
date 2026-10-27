function createElement(tag, className, text) {
  const element = document.createElement(tag);

  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;

  return element;
}

export function createDetailScreen({ task, onBack, onEdit, onToggle, onDelete }) {
  const page = createElement('section');
  const backButton = createElement('button', 'back-button', 'Back');
  const card = createElement('article', 'detail-card');
  const title = createElement('h1', 'detail-title', task.title);
  const descriptionText = task.description?.trim().length > 0 ? task.description : 'No description';
  const description = createElement('p', 'detail-description', descriptionText);
  const statusClass = task.status === 'Done' ? 'detail-status detail-status--done' : 'detail-status';
  const status = createElement('p', statusClass, task.status);
  const actions = createElement('div', 'detail-actions');
  const editButton = createElement('button', 'button button--secondary', 'Edit');
  const toggleButton = createElement(
    'button',
    'button button--primary',
    task.status === 'Done' ? 'Mark as not done' : 'Mark as done',
  );
  const deleteButton = createElement('button', 'button button--danger', 'Delete');

  backButton.type = 'button';
  editButton.type = 'button';
  toggleButton.type = 'button';
  deleteButton.type = 'button';
  backButton.addEventListener('click', onBack);

  card.append(title, description, status, actions);

  if (onEdit) {
    editButton.addEventListener('click', onEdit);
    actions.append(editButton);
  }

  if (onToggle) {
    toggleButton.addEventListener('click', onToggle);
    actions.append(toggleButton);
  }

  if (onDelete) {
    deleteButton.addEventListener('click', onDelete);
    actions.append(deleteButton);
  }

  if (actions.childElementCount === 0) actions.remove();

  page.append(backButton, card);

  return page;
}
