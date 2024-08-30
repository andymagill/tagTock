<script lang="ts">
	import config from '$lib/config';
	import CurrentTask from '$lib/components/CurrentTask.svelte';
</script>

<svelte:head>
	<title>{$config.appName} - {$config.appDescription}</title>
</svelte:head>

<main>
	<h1>{$config.appDescription}</h1>
	<CurrentTask />
</main>

<style>
	main {
		max-width: 800px;
		margin: 0 auto;
		padding: 1rem;
	}
	h1 {
		display: none;
	}
</style>
