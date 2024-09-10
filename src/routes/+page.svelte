<script lang="ts">
	import config from '$lib/config';
	import CurrentTask from '$lib/components/CurrentTask.svelte';
</script>

<svelte:head>
	<title>{$config.appName} - {$config.appDescription}</title>
</svelte:head>

<main>
	<div class="wrapper">
		<h1>{$config.appDescription}</h1>
		<CurrentTask />
	</div>
</main>

<style>
	.wrapper h1 {
		display: none;
	}
</style>
