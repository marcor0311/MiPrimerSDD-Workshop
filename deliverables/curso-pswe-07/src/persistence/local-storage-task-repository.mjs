const storageKey = 'curso-pswe-07.tasks';

export function createLocalStorageTaskRepository(storage = globalThis.localStorage) {
  return {
    loadAll() {
      const serializedTasks = storage.getItem(storageKey);

      return serializedTasks === null ? [] : JSON.parse(serializedTasks);
    },

    saveAll(tasks) {
      storage.setItem(storageKey, JSON.stringify(tasks));
    },
  };
}
