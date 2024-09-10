<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { timerStore } from '$lib/stores/timerStore';
	import { taskStore } from '$lib/stores/taskStore';
	import TaskInput from '$lib/components/TaskInput.svelte';
	import TagSelector from '$lib/components/TagSelector.svelte';
	import TimerControls from '$lib/components/TimerControls.svelte';

	let currentTask: string;
	let currentDescription: string;
	let selectedTags: string[];
	let isRunning: boolean;
	let elapsedTime: number;
	let availableTags = ['Work', 'Personal', 'Study', 'Exercise', 'Reading'];
	let intervalId: number | null = null;

	$: ({ currentTask, currentDescription, selectedTags, isRunning, elapsedTime } = $timerStore);
	$: canArchive = currentTask.trim() !== '' && elapsedTime > 0;

	function archiveTask() {
		if (currentTask && elapsedTime > 0) {
			taskStore.addTask(currentTask, currentDescription, selectedTags, elapsedTime);
			resetTimer();
			timerStore.setTask('');
			timerStore.setDescription('');
			timerStore.setTags([]);
		}
	}

	function handleTaskInput(event: CustomEvent<{ name: string; description: string }>) {
		timerStore.setTask(event.detail.name);
		timerStore.setDescription(event.detail.description);
		console.log('Task input updated:', event.detail); // Debug log
	}

	function handleTagChange(event: CustomEvent<string[]>) {
		timerStore.setTags(event.detail);
	}

	function startTimer() {
		timerStore.startTimer();
		startInterval();
	}

	function pauseTimer() {
		timerStore.stopTimer();
		stopInterval();
	}

	function resetTimer() {
		timerStore.resetTimer();
		stopInterval();
	}

	function startInterval() {
		intervalId = setInterval(() => {
			timerStore.updateElapsedTime();
		}, 1000);
	}

	function stopInterval() {
		if (intervalId) {
			clearInterval(intervalId);
			intervalId = null;
		}
	}
	const unsubscribe = timerStore.subscribe((value) => {
		({ currentTask, currentDescription, selectedTags, isRunning, elapsedTime } = value);

		if (value.isRunning && !intervalId) {
			startInterval();
		} else if (!value.isRunning && intervalId) {
			stopInterval();
		}
	});

	onMount(() => {
		console.log('Initial timer state:', $timerStore); // Debug log
	});
	onDestroy(() => {
		stopInterval();
		unsubscribe();
	});
</script>

<section class="current-task">
	<TimerControls
		{elapsedTime}
		{isRunning}
		canReset={elapsedTime > 0}
		{startTimer}
		{pauseTimer}
		{resetTimer}
	/>
	<div class="task-controls">
		<TaskInput name={currentTask} description={currentDescription} on:input={handleTaskInput} />

		<TagSelector {selectedTags} {availableTags} on:change={handleTagChange} />

		<div class="task-actions">
			<button class="button archive" on:click={archiveTask} disabled={!canArchive}>
				<i class="fas fa-save"></i>&nbsp; Archive
			</button>
		</div>
	</div>
</section>

<style>
	.current-task {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	@media (min-width: 480px) {
		.current-task {
			flex-direction: row;
		}
	}
	.task-controls {
		flex-grow: 1;
	}
	.task-actions {
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
	}
</style>
