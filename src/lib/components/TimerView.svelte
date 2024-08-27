<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { timerStore } from '$lib/stores/timerStore';
  import { taskStore } from '$lib/stores/taskStore';
  import TaskInput from '$lib/components/TaskInput.svelte';
  import TagSelector from '$lib/components/TagSelector.svelte';
  import type { TimerState } from '../../app';

  let timerState: TimerState;
  let intervalId: number | null = null;
  let availableTags = ['Work', 'Personal', 'Study', 'Exercise', 'Reading'];

  const unsubscribe = timerStore.subscribe(value => {
    timerState = value;
  });

  $: currentTask = timerState?.currentTask ?? '';
  $: selectedTags = timerState?.selectedTags ?? [];
  $: isRunning = timerState?.isRunning ?? false;
  $: elapsedTime = timerState?.elapsedTime ?? 0;
  $: canFinish = currentTask.trim() !== '' && elapsedTime > 0;

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

  function finishTask() {
    pauseTimer();
    if (currentTask && elapsedTime > 0) {
      taskStore.addTask(currentTask, selectedTags, elapsedTime);
      timerStore.resetTimer();
    }
  }

  function handleTaskInput(event: CustomEvent<string>) {
    timerStore.setTask(event.detail);
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

  <div class="timer-display">
    <h2>{formatTime(elapsedTime)}</h2>
  </div>

  <div class="timer-controls">
    {#if isRunning}
      <button on:click={pauseTimer}>Pause</button>
    {:else}
      <button on:click={startTimer}>Start</button>
    {/if}
    <button on:click={finishTask} disabled={!canFinish}>Finish</button>
  </div>

  <TaskInput 
    value={currentTask} 
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

  .timer-display {
    font-size: 2rem;
    text-align: center;
    margin: 2rem 0;
  }

  .timer-controls {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
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