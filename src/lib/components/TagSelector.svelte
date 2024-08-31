<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let selectedTags: string[] = [];
	export let availableTags: string[] = [];
	export let disabled: boolean = false;

	const dispatch = createEventDispatcher();

	function toggleTag(tag: string) {
		if (disabled) return;

		const index = selectedTags.indexOf(tag);
		if (index === -1) {
			selectedTags = [...selectedTags, tag];
		} else {
			selectedTags = selectedTags.filter((t) => t !== tag);
		}
		dispatch('change', selectedTags);
	}
</script>

<div class="tag-selector">
	{#each availableTags as tag}
		<button class:selected={selectedTags.includes(tag)} on:click={() => toggleTag(tag)} {disabled}>
			{tag}
		</button>
	{/each}
</div>

<style>
	.tag-selector {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	button {
		padding: 0.25rem 0.5rem;
		border: 1px solid #ccc;
		border-radius: 4px;
		background-color: #fff;
		cursor: pointer;
	}

	button:hover:not(:disabled),
	button:focus:not(:disabled) {
		background-color: #6eb4ff;
	}

	button.selected {
		background-color: #1387cf;
		color: #fff;
	}

	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>
