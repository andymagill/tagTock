<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { formatTime, getTImerHTML } from '../utils/timeUtils';
	import StopWatch from './StopWatch.svelte';
	import { horizontalSlide } from '../utils/transitions';

	export let elapsedTime: number;
	export let isRunning: boolean;
	export let canReset: boolean;
	export let startTimer: () => void;
	export let pauseTimer: () => void;
	export let resetTimer: () => void;

	export let displayedTime = tweened(0, {
		duration: 1250,
		easing: cubicOut
	});

	$: displayedTime.set(elapsedTime);
</script>

<div class="timer-container">
	<div class="watch-container">
		<StopWatch elapsedTime={$displayedTime} />
	</div>

	<div class="timer-display">
		<time datetime={formatTime($displayedTime)}>{@html getTImerHTML($displayedTime)}</time>
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
	@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Mono:wght@100..900&display=swap');

	.timer-container {
		/* flex: 1; */
		min-width: 44%;
	}
	.timer-display {
		text-align: center;
		margin-bottom: 2rem;
	}
	.timer-display time {
		display: flex;
		font-size: 4rem;
		line-height: 1em;
		border-radius: 0.25rem;
		font-family: 'Noto Sans Mono', monospace;
		font-weight: 300;
		margin: auto;
		width: max-content;
		text-shadow:
			-0.2rem -0.2rem 0 var(--background-color),
			0.2rem -0.2rem 0 var(--background-color),
			-0.2rem 0.2rem 0 var(--background-color),
			0.2rem 0.2rem 0 var(--background-color);
	}
	@media (min-width: 480px) {
		.timer-display time {
			font-size: clamp(3rem, 8vw, 4rem);
		}
	}
	.timer-display :global(span:not(:last-child)::after) {
		content: ':';
		display: inline-block;
		width: 1rem;
		position: relative;
		left: -0.15em;
	}
	.timer-controls {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-bottom: 1em;
	}
</style>
