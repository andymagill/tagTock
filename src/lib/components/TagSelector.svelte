<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	export let selectedTags: string[] = [];
	export let availableTags: string[] = [];

	let newTag = '';
	let isAddingTag = false;

	const dispatch = createEventDispatcher();

	function addTag() {
		if (newTag && !selectedTags.includes(newTag) && !availableTags.includes(newTag)) {
			availableTags = [...availableTags, newTag];
			selectTag(newTag);
			newTag = '';
		}
		isAddingTag = false;
	}

	function selectTag(tag: string) {
		if (!selectedTags.includes(tag)) {
			selectedTags = [...selectedTags, tag];
			dispatch('change', selectedTags);
		}
	}

	function removeTag(tag: string) {
		selectedTags = selectedTags.filter((t) => t !== tag);
		dispatch('change', selectedTags);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			addTag();
		}
	}
</script>

<div class="tag-selector">
	<div class="selected-tags">
		{#each selectedTags as tag (tag)}
			<span class="tag" transition:fade>
				{tag}
				<button on:click={() => removeTag(tag)}>×</button>
			</span>
		{/each}
	</div>

	<div class="tag-input">
		{#if isAddingTag}
			<input
				bind:value={newTag}
				placeholder="Add new tag"
				on:blur={addTag}
				on:keydown={handleKeydown}
				autofocus
			/>
		{:else}
			<button on:click={() => (isAddingTag = true)}>+ Add Tag</button>
		{/if}
	</div>

	<div class="available-tags">
		{#each availableTags.filter((tag) => !selectedTags.includes(tag)) as tag (tag)}
			<button class="tag" on:click={() => selectTag(tag)}>{tag}</button>
		{/each}
	</div>
</div>

<style>
	.tag-selector {
		margin-bottom: 1rem;
	}

	.selected-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
	}

	.tag {
		background-color: #e0e0e0;
		border-radius: 16px;
		padding: 0.25rem 0.5rem;
		font-size: 0.875rem;
		display: inline-flex;
		align-items: center;
	}

	.tag button {
		background: none;
		border: none;
		cursor: pointer;
		font-size: 1rem;
		margin-left: 0.25rem;
	}

	.tag-input input {
		width: 100%;
		padding: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	.available-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 0.5rem;
	}

	.available-tags .tag {
		cursor: pointer;
	}
</style>
