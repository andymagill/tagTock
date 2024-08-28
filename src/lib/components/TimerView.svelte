<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import { timerStore } from '$lib/stores/timerStore';
  import { taskStore } from '$lib/stores/taskStore';
  import TaskInput from '$lib/components/TaskInput.svelte';
  import TagSelector from '$lib/components/TagSelector.svelte';
  import type { TimerState } from '../../app';

  let timerState: TimerState;
  let intervalId: number | null = null;
  let availableTags = ['Work', 'Personal', 'Study', 'Exercise', 'Reading'];
  let taskDescription = '';

  const unsubscribe = timerStore.subscribe(value => {
    timerState = value;
  });

  $: currentTask = timerState?.currentTask ?? '';
  $: selectedTags = timerState?.selectedTags ?? [];
  $: isRunning = timerState?.isRunning ?? false;
  $: elapsedTime = timerState?.elapsedTime ?? 0;
  $: canArchive = currentTask.trim() !== '' && elapsedTime > 0;

  function formatTime(ms: number): string {
    const seconds = Math.floor(ms / 1000) % 60;
    const minutes = Math.floor(ms / (1000 * 60)) % 60;
    const hours = Math.floor(ms / (1000 * 60 * 60));
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  function startTimer() {
    timerStore.startTimer();
    if (!intervalId) {
      intervalId = setInterval(() => timerStore.updateElapsedTime(), 1000);
    }
  }

  function pauseTimer() {
    timerStore.stopTimer();
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  function archiveTask() {
    pauseTimer();
    if (currentTask && elapsedTime > 0) {
      taskStore.addTask(currentTask, taskDescription, selectedTags, elapsedTime);
      timerStore.resetTimer();
      taskDescription = '';
    }
  }

  function handleTaskInput(event: CustomEvent<{ name: string; description: string }>) {
    timerStore.setTask(event.detail.name);
    taskDescription = event.detail.description;
  }

  function handleTagChange(event: CustomEvent<string[]>) {
    timerStore.setTags(event.detail);
  }

  onMount(() => {
    if (isRunning) {
      intervalId = setInterval(() => timerStore.updateElapsedTime(), 1000);
    }
  });

  onDestroy(() => {
    if (intervalId) clearInterval(intervalId);
    unsubscribe();
  });
</script>

<section>
  <h1>TagTock Timer</h1>

  <div class="timer-container">
    <div class="timer-display">
      <time datetime={formatTime(elapsedTime)}>{formatTime(elapsedTime)}</time>
    </div>
    <div class="timer-controls">
      {#if isRunning}
        <button on:click={pauseTimer} transition:slide|local={{ duration: 300 }}>Pause</button>
      {:else}
        <button on:click={startTimer} transition:slide|local={{ duration: 300 }}>Start</button>
      {/if}
      {#if canArchive}
        <button on:click={archiveTask} transition:slide|local={{ duration: 300 }}>Archive</button>
      {/if}
    </div>
  </div>

  <TaskInput 
    name={currentTask}
    description={taskDescription}
    on:input={handleTaskInput}
  />

  <TagSelector 
    selectedTags={selectedTags}
    {availableTags}
    on:change={handleTagChange}
  />

  {#if currentTask}
    <div class="current-task">
      <h3>Current Task: {currentTask}</h3>
      <p>Description: {taskDescription || 'No description'}</p>
      <p>Tags: {selectedTags.join(', ') || 'None'}</p>
    </div>
  {/if}
</section>

<style>
  section {
    max-width: 600px;
    margin: 0 auto;
    padding: 1rem;
  }

  .timer-container {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1rem;
    align-items: center;
    margin-bottom: 2rem;
  }

  .timer-display {
    font-size: 3rem;
    text-align: center;
  }

  .timer-display time {
    font-family: monospace;
    background-color: #f0f0f0;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    display: inline-block;
  }

  .timer-controls {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }

  button:hover:not(:disabled) {
    background-color: #0056b3;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .current-task {
    margin-top: 2rem;
    padding: 1rem;
    background-color: #f0f0f0;
    border-radius: 4px;
  }
</style>