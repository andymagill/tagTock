<script lang="ts">
	import TaskList from '$lib/components/TaskList.svelte';
	import FilterControls from '$lib/components/FilterControls.svelte';
	import { taskStore } from '$lib/stores/taskStore';
	import { onMount } from 'svelte';

	let availableTags: string[] = [];
	let selectedTag: string = '';

	onMount(() => {
		const unsubscribe = taskStore.subscribe((tasks) => {
			availableTags = [...new Set(tasks.flatMap((task) => task.tags))];
		});

		return unsubscribe;
	});
</script>

<svelte:head>
	<title>TagTock - Archive</title>
</svelte:head>

<section>
	<h1>Task Archive</h1>

	<FilterControls {availableTags} bind:selectedTag />

	<TaskList filterTag={selectedTag} />
</section>

<style>
	section {
		max-width: 800px;
		margin: 0 auto;
		padding: 1rem;
	}

	h1 {
		text-align: center;
		margin-bottom: 2rem;
	}
</style>
