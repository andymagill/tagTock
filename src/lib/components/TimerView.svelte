<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { taskStore } from '$lib/stores/taskStore';
	import TaskInput from '$lib/components/TaskInput.svelte';
	import TagSelector from '$lib/components/TagSelector.svelte';

	let isRunning = false;
	let startTime: number | null = null;
	let elapsedTime = 0;
	let intervalId: number | null = null;

	let currentTask = '';
	let selectedTags: string[] = [];
	let availableTags: string[] = ['Work', 'Personal', 'Study', 'Exercise', 'Reading'];

	function formatTime(ms: number): string {
		const seconds = Math.floor(ms / 1000) % 60;
		const minutes = Math.floor(ms / (1000 * 60)) % 60;
		const hours = Math.floor(ms / (1000 * 60 * 60));
		return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	}

	function startTimer() {
		if (!isRunning) {
			isRunning = true;
			startTime = Date.now() - elapsedTime;
			intervalId = setInterval(() => {
				elapsedTime = Date.now() - startTime!;
			}, 1000);
		}
	}

	function stopTimer() {
		if (isRunning) {
			isRunning = false;
			clearInterval(intervalId!);
			intervalId = null;
		}
	}

	function resetTimer() {
		stopTimer();
		elapsedTime = 0;
	}

	function handleTaskSubmit() {
		if (currentTask) {
			taskStore.addTask(currentTask, selectedTags);
			startTimer();
		}
	}

	function handleTaskComplete() {
		stopTimer();
		if (currentTask) {
			taskStore.updateTaskDuration(currentTask, elapsedTime);
			currentTask = '';
			selectedTags = [];
			resetTimer();
		}
	}

	onDestroy(() => {
		if (intervalId) clearInterval(intervalId);
	});
</script>

<section>
	<div class="timer-display">
		<h2>{formatTime(elapsedTime)}</h2>
	</div>

	<div class="timer-controls">
		{#if isRunning}
			<button on:click={stopTimer}>Pause</button>
			<button on:click={handleTaskComplete}>Complete Task</button>
		{:else}
			<button on:click={startTimer} disabled={!currentTask}>Start</button>
			<button on:click={resetTimer}>Reset</button>
		{/if}
	</div>

	<TaskInput bind:value={currentTask} on:submit={handleTaskSubmit} />

	<TagSelector bind:selectedTags bind:availableTags on:change={() => {}} />

	{#if currentTask}
		<div class="current-task">
			<h3>Current Task: {currentTask}</h3>
			<p>Tags: {selectedTags.join(', ') || 'None'}</p>
		</div>
	{/if}
</section>

<style>
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

	.current-task {
		margin-top: 2rem;
		padding: 1rem;
		background-color: #f0f0f0;
		border-radius: 4px;
	}
</style>
