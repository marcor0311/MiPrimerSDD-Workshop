import assert from 'node:assert/strict';
import test from 'node:test';

import { createTaskService } from '../../src/application/task-service.mjs';

function createFakeRepository(initialTasks = []) {
  let tasks = structuredClone(initialTasks);

  return {
    loadAll() {
      return structuredClone(tasks);
    },
    saveAll(nextTasks) {
      tasks = structuredClone(nextTasks);
    },
  };
}

test('list returns the tasks from the repository', () => {
  const tasks = [{ id: 'one', title: 'Read', description: '', status: 'Pending' }];
  const service = createTaskService(createFakeRepository(tasks));

  assert.deepEqual(service.listTasks(), tasks);
});

test('createTask saves a Pending task with a stable id and optional description', () => {
  const repository = createFakeRepository();
  const service = createTaskService(repository, () => 'task-1');

  const result = service.createTask({ title: ' Read ', description: 'Chapter 1' });

  assert.deepEqual(result, {
    ok: true,
    task: { id: 'task-1', title: 'Read', description: 'Chapter 1', status: 'Pending' },
  });
  assert.deepEqual(repository.loadAll(), [result.task]);
});

test('createTask rejects a missing or whitespace-only title', () => {
  const service = createTaskService(createFakeRepository(), () => 'task-1');

  assert.deepEqual(service.createTask({ title: '   ' }), {
    ok: false,
    error: 'Enter a task title.',
  });
});

test('createTask rejects titles that duplicate after trimming and case folding', () => {
  const repository = createFakeRepository([
    { id: 'task-1', title: 'Read', description: '', status: 'Pending' },
  ]);
  const service = createTaskService(repository, () => 'task-2');

  assert.deepEqual(service.createTask({ title: ' read ' }), {
    ok: false,
    error: 'Task titles must be unique.',
  });
  assert.equal(repository.loadAll().length, 1);
});

test('createTask defaults an omitted description to an empty string', () => {
  const service = createTaskService(createFakeRepository(), () => 'task-1');

  assert.equal(service.createTask({ title: 'Read' }).task.description, '');
});

test('listTasks filters tasks by Pending and Done status while All returns every task', () => {
  const tasks = [
    { id: 'one', title: 'Draft', description: '', status: 'Pending' },
    { id: 'two', title: 'Review', description: '', status: 'Done' },
  ];
  const service = createTaskService(createFakeRepository(tasks));

  assert.deepEqual(service.listTasks('All'), tasks);
  assert.deepEqual(service.listTasks('Pending'), [tasks[0]]);
  assert.deepEqual(service.listTasks('Done'), [tasks[1]]);
});

test('toggleTaskStatus changes Pending to Done and persists the task', () => {
  const initialTask = { id: 'one', title: 'Draft', description: '', status: 'Pending' };
  const repository = createFakeRepository([initialTask]);
  const service = createTaskService(repository);

  assert.deepEqual(service.toggleTaskStatus('one'), { ...initialTask, status: 'Done' });
  assert.deepEqual(repository.loadAll(), [{ ...initialTask, status: 'Done' }]);
});

test('toggleTaskStatus changes Done back to Pending', () => {
  const initialTask = { id: 'one', title: 'Draft', description: '', status: 'Done' };
  const service = createTaskService(createFakeRepository([initialTask]));

  assert.deepEqual(service.toggleTaskStatus('one'), { ...initialTask, status: 'Pending' });
});

test('updateTask saves a trimmed title and updated description', () => {
  const initialTask = { id: 'one', title: 'Draft', description: '', status: 'Pending' };
  const repository = createFakeRepository([initialTask]);
  const service = createTaskService(repository);

  const result = service.updateTask('one', { title: ' Revised ', description: 'New details' });

  assert.deepEqual(result, {
    ok: true,
    task: { ...initialTask, title: 'Revised', description: 'New details' },
  });
  assert.deepEqual(repository.loadAll(), [result.task]);
});

test('updateTask rejects a duplicate normalized title and preserves saved values', () => {
  const tasks = [
    { id: 'one', title: 'Draft', description: 'Keep this', status: 'Pending' },
    { id: 'two', title: 'Review', description: '', status: 'Done' },
  ];
  const repository = createFakeRepository(tasks);
  const service = createTaskService(repository);

  assert.deepEqual(service.updateTask('one', { title: ' review ', description: 'Unsaved' }), {
    ok: false,
    error: 'Task titles must be unique.',
  });
  assert.deepEqual(repository.loadAll(), tasks);
});

test('updateTask rejects an empty title', () => {
  const task = { id: 'one', title: 'Draft', description: '', status: 'Pending' };
  const repository = createFakeRepository([task]);
  const service = createTaskService(repository);

  assert.deepEqual(service.updateTask('one', { title: '  ', description: 'Changed' }), {
    ok: false,
    error: 'Enter a task title.',
  });
  assert.deepEqual(repository.loadAll(), [task]);
});

test('deleteTask removes and persists the selected task', () => {
  const tasks = [
    { id: 'one', title: 'Draft', description: '', status: 'Pending' },
    { id: 'two', title: 'Review', description: '', status: 'Done' },
  ];
  const repository = createFakeRepository(tasks);
  const service = createTaskService(repository);

  assert.equal(service.deleteTask('one'), true);
  assert.deepEqual(repository.loadAll(), [tasks[1]]);
});
