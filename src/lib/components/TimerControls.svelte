<script lang="ts">
  import { slide } from 'svelte/transition';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';

  export let elapsedTime: number;
  export let isRunning: boolean;
  export let canReset: boolean;
  export let startTimer: () => void;
  export let pauseTimer: () => void;
  export let resetTimer: () => void;

  const displayedTime = tweened(0, {
    duration: 1250,
    easing: cubicOut
  });

  $: displayedTime.set(elapsedTime);

  function formatTime(ms: number): string {
    const seconds = Math.floor(ms / 1000) % 60;
    const minutes = Math.floor(ms / (1000 * 60)) % 60;
    const hours = Math.floor(ms / (1000 * 60 * 60));
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
</script>

<div class="timer-container">
  <div class="timer-display">
    <time datetime={formatTime($displayedTime)}>{formatTime($displayedTime)}</time>
  </div>

  <div class="timer-controls">
    {#if isRunning}
      <button on:click={pauseTimer} transition:slide|local={{ duration: 300 }}>Pause</button>
    {:else}
      <button on:click={startTimer} transition:slide|local={{ duration: 300 }}>Start</button>
    {/if}
    <button on:click={resetTimer} disabled={!canReset}>Reset</button>
  </div>
</div>

<style>
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
    padding: 2rem;
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
    background-color: #ccc;
    cursor: not-allowed;
  }
</style>