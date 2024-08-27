<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { taskStore } from '../stores/taskStore';

	export let value: string = '';

	const dispatch = createEventDispatcher();

	function handleInput(event: Event) {
		const input = event.target as HTMLInputElement;
		value = input.value;
		dispatch('input', value);
	}

	function handleSubmit() {
		if (value.trim()) {
			taskStore.addTask(value.trim());
			value = '';
			dispatch('submit', value);
		}
	}
</script>

<div class="task-input">
	<input
		type="text"
		placeholder="What are you working on?"
		{value}
		on:input={handleInput}
		on:keydown={(e) => e.key === 'Enter' && handleSubmit()}
	/>
	<button on:click={handleSubmit} disabled={!value.trim()}> Start Task </button>
</div>

<style>
	.task-input {
		display: flex;
		margin-bottom: 1rem;
	}

	input {
		flex-grow: 1;
		padding: 0.5rem;
		font-size: 1rem;
		border: 1px solid #ccc;
		border-radius: 4px 0 0 4px;
	}

	button {
		padding: 0.5rem 1rem;
		font-size: 1rem;
		background-color: #4caf50;
		color: white;
		border: none;
		border-radius: 0 4px 4px 0;
		cursor: pointer;
	}

	button:disabled {
		background-color: #cccccc;
		cursor: not-allowed;
	}
</style>
