import assert from 'node:assert/strict';
import test from 'node:test';

import { createLocalStorageTaskRepository } from '../../src/persistence/local-storage-task-repository.mjs';

function createFakeStorage(initialEntries = {}) {
  const entries = new Map(Object.entries(initialEntries));

  return {
    getItem(key) {
      return entries.get(key) ?? null;
    },
    setItem(key, value) {
      entries.set(key, String(value));
    },
  };
}

test('loadAll returns an empty list when storage has no saved tasks', () => {
  const repository = createLocalStorageTaskRepository(createFakeStorage());

  assert.deepEqual(repository.loadAll(), []);
});

test('loadAll reads saved tasks from storage', () => {
  const tasks = [{ id: 'task-1', title: 'Read', description: '', status: 'Pending' }];
  const storage = createFakeStorage({ 'curso-pswe-07.tasks': JSON.stringify(tasks) });
  const repository = createLocalStorageTaskRepository(storage);

  assert.deepEqual(repository.loadAll(), tasks);
});

test('saveAll stores the complete task list as JSON', () => {
  const storage = createFakeStorage();
  const repository = createLocalStorageTaskRepository(storage);
  const tasks = [{ id: 'task-1', title: 'Read', description: '', status: 'Pending' }];

  repository.saveAll(tasks);

  assert.equal(storage.getItem('curso-pswe-07.tasks'), JSON.stringify(tasks));
});
