<script lang="ts">
	import BarChart from '$lib/components/BarChart.svelte';
	import { taskStore } from '$lib/stores/taskStore';
	import { onMount } from 'svelte';
	import type { Task } from '../../app';

	let tasks: Task[] = [];

	onMount(() => {
		const unsubscribe = taskStore.subscribe((taskList) => {
			tasks = taskList;
			console.log('Tasks in Charts page:', tasks); // Debug log
		});

		return unsubscribe;
	});
</script>

<svelte:head>
	<title>TagTock - Charts</title>
</svelte:head>

<section>
	<h1>Charts</h1>

	{#if tasks.length > 0}
		<BarChart {tasks} />
	{:else}
		<p>No tasks available to display in the chart.</p>
	{/if}
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
