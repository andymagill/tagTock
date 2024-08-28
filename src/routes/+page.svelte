<script lang="ts">
	import config from '$lib/config';
	import TimerView from '$lib/components/TimerView.svelte';
</script>


<svelte:head>
	<title>{$config.appName} - {$config.appDescription}</title>
</svelte:head>

<main>
	<h1>{$config.appDescription}</h1>
	<TimerView />
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
