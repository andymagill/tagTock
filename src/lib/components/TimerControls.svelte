<script lang="ts">
	import { horizontalSlide } from '../utils/transitions';
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
			<button on:click={pauseTimer} transition:horizontalSlide={{ axis: 'x', duration: 300 }}>
				<i class="fas fa-pause"></i> Pause
			</button>
		{:else}
			<button on:click={startTimer} transition:horizontalSlide={{ axis: 'x', duration: 300 }}>
				<i class="fas fa-play"></i> Start
			</button>
		{/if}
		<button class="reset" on:click={resetTimer} disabled={!canReset}>
			<i class="fas fa-undo"></i> Reset
		</button>
	</div>
</div>

<style>
	.timer-container {
		/* flex: 1; */
		min-width: 44%;
	}

	.timer-display {
		text-align: center;
		margin-bottom: 2rem;
	}

	.timer-display time {
		display: block;
		font-size: clamp(48px, 8vw, 64px);
		line-height: 1em;
		padding: 1rem;
		border-radius: 8px;
	}

	.timer-controls {
		display: flex;
		justify-content: center;
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
		white-space: nowrap;
	}
	.reset {
		background-color: #dc3545;
	}
	button:hover:not(:disabled) {
		background-color: #0056b3;
	}

	button:disabled {
		background-color: #ccc;
		cursor: not-allowed;
	}
</style>
