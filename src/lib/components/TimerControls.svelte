<script lang="ts">
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { formatTime, getTimerHTML, convertDuration } from '../utils/timeUtils';
	import StopWatch from './StopWatch.svelte';
	import { horizontalSlide } from '../utils/transitions';

	export let isRunning: boolean;
	export let canReset: boolean;
	export let startTimer: () => void;
	export let pauseTimer: () => void;
	export let resetTimer: () => void;

	export let elapsedTime: number;

	export let durationArray = convertDuration(elapsedTime);
	onMount(async () => {
		durationArray = convertDuration(elapsedTime);
	});

	const hours = tweened(0, { duration: 800, easing: cubicOut });
	const minutes = tweened(0, { duration: 800, easing: cubicOut });
	const seconds = tweened(0, { duration: 800, easing: cubicOut });

	// Update the tweened values when elapsedTime changes
	$: {
		const durationArray = convertDuration(elapsedTime);
		hours.set(Math.floor(Number(durationArray[0])));
		minutes.set(Math.floor(Number(durationArray[1])));
		seconds.set(Math.floor(Number(durationArray[2])));
	}

	// Update the tweened value when elapsedTime changes
	$: durationArray = convertDuration(elapsedTime);
</script>

<div class="timer-container">
	<div class="watch-container">
		<StopWatch {elapsedTime} />
	</div>

	<div class="timer-display">
		<time datetime={elapsedTime.toString()}>
			<span>{Number($hours).toFixed(0).toString().padStart(2, '0')}</span>
			<span>{Number($minutes).toFixed(0).toString().padStart(2, '0')}</span>
			<span>{Number($seconds).toFixed(0).toString().padStart(2, '0')}</span>
		</time>
	</div>

	<div class="timer-controls">
		<button class="button start" on:click={startTimer} disabled={isRunning}>
			<i class="fas fa-play"></i>&nbsp;
			<span>Start</span>
		</button>

		<button class="button pause" on:click={pauseTimer} disabled={!isRunning}>
			<i class="fas fa-pause"></i>&nbsp;
			<span>Pause</span>
		</button>

		<button class="button reset" on:click={resetTimer} disabled={!canReset}>
			<i class="fas fa-undo"></i>&nbsp;
			<span>Reset</span>
		</button>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');

	.timer-container {
		min-width: 40%;
	}
	.timer-display {
		text-align: center;
		margin-bottom: 2rem;
	}
	.timer-display time {
		display: flex;
		font-size: clamp(3rem, 7vw, 4.4rem);
		line-height: 1em;
		border-radius: 0.25rem;
		font-family: 'Roboto Mono', 'Consolas', 'Courier New', monospace;
		font-weight: 200;
		margin: auto;
		width: max-content;
		text-shadow:
			-0.2rem -0.2rem 0 var(--background-color),
			0.2rem -0.2rem 0 var(--background-color),
			-0.2rem 0.2rem 0 var(--background-color),
			0.2rem 0.2rem 0 var(--background-color);
	}

	.timer-display :global(span:not(:last-child)::after) {
		font-family: sans-serif;
		content: ':';
		vertical-align: top;
		font-size: 70%;
	}
	.timer-controls {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-bottom: 1em;
	}
</style>
