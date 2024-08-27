import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { Task } from '../../app';

function createTaskStore() {
  const { subscribe, set, update } = writable<Task[]>(loadTasks());

  function loadTasks(): Task[] {
    if (browser) {
      const storedTasks = localStorage.getItem('tagTockTasks');
      if (storedTasks) {
        return JSON.parse(storedTasks);
      }
    }
    return [];
  }

  function saveTasks(tasks: Task[]) {
    if (browser) {
      localStorage.setItem('tagTockTasks', JSON.stringify(tasks));
    }
  }

  return {
    subscribe,
    addTask: (name: string, description: string, tags: string[] = [], duration: number = 0) => {
      const newTask: Task = {
        id: Date.now().toString(),
        name,
        description,
        duration,
        tags,
        createdAt: new Date().toISOString()
      };
      update(tasks => {
        const updatedTasks = [...tasks, newTask];
        saveTasks(updatedTasks);
        return updatedTasks;
      });
    },
    updateTaskDuration: (id: string, duration: number) => {
      update(tasks => {
        const updatedTasks = tasks.map(task => 
          task.id === id ? { ...task, duration } : task
        );
        saveTasks(updatedTasks);
        return updatedTasks;
      });
    },
    deleteTask: (id: string) => {
      update(tasks => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        saveTasks(updatedTasks);
        return updatedTasks;
      });
    },
    clearTasks: () => {
      set([]);
      saveTasks([]);
    },
  };
}

export const taskStore = createTaskStore();