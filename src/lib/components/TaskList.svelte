<script lang="ts">
  import { onMount } from 'svelte';
  import { taskStore } from '$lib/stores/taskStore';
  import { fade, slide } from 'svelte/transition';
  import type { Task } from '../../app';

  let tasks: Task[] = [];
  let expandedTaskId: string | null = null;

  onMount(() => {
    const unsubscribe = taskStore.subscribe(value => {
      tasks = value;
    });

    return unsubscribe;
  });

  function formatDuration(ms: number): string {
    const seconds = Math.floor(ms / 1000) % 60;
    const minutes = Math.floor(ms / (1000 * 60)) % 60;
    const hours = Math.floor(ms / (1000 * 60 * 60));
    return `${hours}h ${minutes}m ${seconds}s`;
  }

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString();
  }

  function toggleTaskExpansion(taskId: string) {
    expandedTaskId = expandedTaskId === taskId ? null : taskId;
  }

  function deleteTask(taskId: string) {
    taskStore.deleteTask(taskId);
  }
</script>

<div class="task-list">
  {#if tasks.length === 0}
    <p>No tasks recorded yet.</p>
  {:else}
    {#each tasks as task (task.id)}
      <div class="task-item" transition:fade>
        <button
          class="task-summary"
          on:click={() => toggleTaskExpansion(task.id)}
          aria-expanded={expandedTaskId === task.id}
          aria-controls={`task-details-${task.id}`}
        >
          <span class="task-name">{task.name}</span>
          <span class="task-duration">{formatDuration(task.duration)}</span>
        </button>
        {#if expandedTaskId === task.id}
          <div 
            id={`task-details-${task.id}`}
            class="task-details" 
            transition:slide
          >
            <p>Created: {formatDate(task.createdAt)}</p>
            <p>Tags: {task.tags.join(', ') || 'None'}</p>
            <button on:click={() => deleteTask(task.id)}>Delete Task</button>
          </div>
        {/if}
      </div>
    {/each}
  {/if}
</div>

<style>
  .task-list {
    max-width: 600px;
    margin: 0 auto;
  }

  .task-item {
    background-color: #f0f0f0;
    border-radius: 4px;
    margin-bottom: 1rem;
    overflow: hidden;
  }

  .task-summary {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 1rem;
    background-color: transparent;
    border: none;
    text-align: left;
    cursor: pointer;
  }

  .task-summary:hover,
  .task-summary:focus {
    background-color: #e0e0e0;
    outline: none;
  }

  .task-name {
    font-weight: bold;
  }

  .task-details {
    padding: 1rem;
    background-color: #ffffff;
    border-top: 1px solid #e0e0e0;
  }

  button {
    cursor: pointer;
  }

  .task-details button {
    background-color: #ff4136;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
  }

  .task-details button:hover,
  .task-details button:focus {
    background-color: #ff1a1a;
  }
</style>