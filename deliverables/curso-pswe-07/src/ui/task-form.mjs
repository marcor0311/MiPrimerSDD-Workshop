function createElement(tag, className, text) {
  const element = document.createElement(tag);

  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;

  return element;
}

export function createTaskForm({ task = null, onSave, onCancel }) {
  const isEditing = task !== null;
  const section = createElement('section');
  const heading = createElement('h1', 'page-title', isEditing ? 'Edit task' : 'Add task');
  const form = createElement('form', 'form-card');
  const titleLabel = createElement('label', 'form-field', 'Title');
  const titleInput = createElement('input');
  const titleErrorId = 'title-error';
  const descriptionLabel = createElement('label', 'form-field', 'Description (optional)');
  const descriptionInput = createElement('textarea');
  const error = createElement('p', 'form-error');
  const actions = createElement('div', 'form-actions');
  const saveButton = createElement('button', 'button button--primary', isEditing ? 'Save' : 'Add task');
  const cancelButton = createElement('button', 'button button--secondary', 'Cancel');

  titleInput.type = 'text';
  titleInput.name = 'title';
  titleInput.required = true;
  titleInput.autocomplete = 'off';
  titleInput.value = task?.title ?? '';
  titleInput.setAttribute('aria-describedby', titleErrorId);
  titleLabel.append(titleInput);

  descriptionInput.name = 'description';
  descriptionInput.rows = 5;
  descriptionInput.value = task?.description ?? '';
  descriptionLabel.append(descriptionInput);

  error.id = titleErrorId;
  error.hidden = true;
  error.setAttribute('role', 'alert');

  saveButton.type = 'submit';
  form.noValidate = true;
  cancelButton.type = 'button';
  cancelButton.addEventListener('click', onCancel);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    error.hidden = true;
    error.textContent = '';

    const result = onSave({ title: titleInput.value, description: descriptionInput.value });

    if (result?.ok === false) {
      error.textContent = result.error;
      error.hidden = false;
      titleInput.focus();
    }
  });

  actions.append(cancelButton, saveButton);
  form.append(titleLabel, error, descriptionLabel, actions);
  section.append(heading, form);

  return section;
}
