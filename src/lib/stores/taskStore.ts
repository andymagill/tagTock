import { writable } from 'svelte/store';
import { browser } from '$app/environment';

interface Task {
    id: string;
    name: string;
    duration: number;
    tags: string[];
    createdAt: Date;
}

function createTaskStore() {
    const { subscribe, set, update } = writable<Task[]>(loadTasks());

    function loadTasks(): Task[] {
        if (browser) {
            const storedTasks = localStorage.getItem('tagTockTasks');
            return storedTasks ? JSON.parse(storedTasks) : [];
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
        addTask: (name: string, tags: string[] = []) => {
            const newTask: Task = {
                id: Date.now().toString(),
                name,
                duration: 0,
                tags,
                createdAt: new Date()
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
            if (browser) {
                localStorage.removeItem('tagTockTasks');
            }
        },
        getTotalDuration: () => {
            const tasks = loadTasks();
            return tasks.reduce((total, task) => total + task.duration, 0);
        },
        getTasksByTag: (tag: string) => {
            const tasks = loadTasks();
            return tasks.filter(task => task.tags.includes(tag));
        }
    };
}

export const taskStore = createTaskStore();