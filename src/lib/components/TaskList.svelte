<script lang="ts">
  import { onMount } from 'svelte';
  import { taskStore } from '$lib/stores/taskStore';
  import { timerStore } from '$lib/stores/timerStore';
  import { fade, slide } from 'svelte/transition';
  import type { Task } from '../../app';
  import Modal from './Modal.svelte';
  import { goto } from '$app/navigation';

  export let filterTag: string = '';

  let tasks: Task[] = [];
  let expandedTaskId: string | null = null;
  let showModal = false;
  let modalTitle = '';
  let modalMessage = '';
  let modalAction: (() => void) | null = null;

  $: filteredTasks = filterTag
    ? tasks.filter(task => task.tags.includes(filterTag))
    : tasks;

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

  function confirmDelete(taskId: string) {
    modalTitle = 'Confirm Delete';
    modalMessage = 'Are you sure you want to delete this task?';
    modalAction = () => deleteTask(taskId);
    showModal = true;
  }

  function deleteTask(taskId: string) {
    taskStore.deleteTask(taskId);
    showModal = false;
  }

  function confirmCopy(task: Task) {
    modalTitle = 'Replace Current Timer';
    modalMessage = 'Are you sure you want to copy this task to the current timer?';
    modalAction = () => copyTask(task);
    showModal = true;
  }

  function copyTask(task: Task) {
    timerStore.setTask(task.name);
    timerStore.setDescription(task.description);
    timerStore.setTags(task.tags);
    showModal = false;
    goto('/');
  }

  function handleModalClose() {
    showModal = false;
  }

  function handleModalConfirm() {
    if (modalAction) {
      modalAction();
    }
  }
</script>

<Modal
  bind:show={showModal}
  title={modalTitle}
  message={modalMessage}
  on:close={handleModalClose}
  on:confirm={handleModalConfirm}
/>

<div class="task-list">
  <div class="task-header">
    <span class="task-name">Task Name</span>
    <span class="task-duration">Duration</span>
    <span class="task-date">Start Date</span>
  </div>

  {#if filteredTasks.length === 0}
    <p>No tasks recorded yet.</p>
  {:else}
    {#each filteredTasks as task (task.id)}
      <div class="task-item" transition:fade>
        <button
          class="task-summary"
          on:click={() => toggleTaskExpansion(task.id)}
          aria-expanded={expandedTaskId === task.id}
          aria-controls={`task-details-${task.id}`}
        >
          <span class="task-name">{task.name}</span>
          <span class="task-duration">{formatDuration(task.duration)}</span>
          <span class="task-date">{formatDate(task.createdAt)}</span>
        </button>

        {#if expandedTaskId === task.id}
          <div 
            id={`task-details-${task.id}`}
            class="task-details" 
            transition:slide
          >
            <div class="task-info">
              <p><strong>Description:</strong> {task.description || 'No description provided'}</p>
              <p><strong>Tags:</strong> {task.tags.join(', ') || 'None'}</p>
            </div>

            <div class="task-actions">
              <button on:click={() => confirmCopy(task)}>Copy</button>
              <button on:click={() => confirmDelete(task.id)}>Delete</button>
            </div>
          </div>
        {/if}
      </div>
    {/each}
  {/if}
</div>

<style>
  .task-list {
    max-width: 800px;
    margin: 0 auto;
  }

  .task-header {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 1rem;
    padding: 0.5rem;
    font-weight: bold;
    background-color: #f0f0f0;
    border-radius: 4px 4px 0 0;
  }

  .task-item {
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    border-top: none;
    overflow: hidden;
  }

  .task-summary {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 1rem;
    width: 100%;
    padding: 1rem;
    background-color: transparent;
    border: none;
    text-align: left;
    cursor: pointer;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
  }

  .task-summary:hover,
  .task-summary:focus {
    background-color: #f8f8f8;
    outline: none;
  }

  .task-name {
    font-weight: bold;
  }

  .task-details {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    background-color: #f8f8f8;
    border-top: 1px solid #e0e0e0;
  }

  .task-info {
    flex-grow: 1;
    padding-right: 1rem;
  }

  .task-actions {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    min-width: 100px;
  }

  .task-actions button {
    cursor: pointer;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    transition: background-color 0.2s;
  }

  .task-actions button:hover {
    background-color: #0056b3;
  }

  .task-actions button:last-child {
    background-color: #dc3545;
  }

  .task-actions button:last-child:hover {
    background-color: #c82333;
  }
</style>