<script lang="ts">
	import config from '$lib/config';
	import TimerContainer from '$lib/components/TimerContainer.svelte';
</script>

<svelte:head>
	<title>{$config.appName} - {$config.appDescription}</title>
</svelte:head>

<main>
	<h1>{$config.appDescription}</h1>
	<TimerContainer />
</main>

<style>
	main {
		max-width: 600px;
		margin: 0 auto;
		padding: 1rem;
	}
	h1 {
		display: none;
	}
</style>
