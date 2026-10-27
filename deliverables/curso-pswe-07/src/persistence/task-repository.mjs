/**
 * @typedef {object} TaskRepository
 * @property {() => Array<{id: string, title: string, description: string, status: 'Pending'|'Done'}>} loadAll
 * @property {(tasks: Array<{id: string, title: string, description: string, status: 'Pending'|'Done'}>) => void} saveAll
 */

export {};
