<script lang="ts">
  import { onMount } from 'svelte';
  import { taskStore } from '$lib/stores/taskStore';
  import type { Task } from '../../app';
  import TaskItem from './TaskItem.svelte';

  export let filterTag: string = '';

  let tasks: Task[] = [];
  let expandedTaskId: string | null = null;

  $: filteredTasks = filterTag
    ? tasks.filter(task => task.tags.includes(filterTag))
    : tasks;

  onMount(() => {
    const unsubscribe = taskStore.subscribe(value => {
      tasks = value;
    });

    return unsubscribe;
  });
</script>

<div class="task-list">
  {#if filteredTasks.length === 0}
    <p>No tasks found.</p>
  {:else}
    {#each filteredTasks as task (task.id)}
      <TaskItem {task} bind:expandedTaskId />
    {/each}
  {/if}
</div>

<style>
  .task-list {
    margin-top: 2rem;
  }
</style>