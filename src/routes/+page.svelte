<script lang="ts">
	import TimerView from '$lib/components/TimerView.svelte';
</script>
  
<svelte:head>
    <title>TagTock - A minimalistic time tracking app</title>
  </svelte:head>

<main>
	<h1>TagTock Timer</h1>
	<p>A minimalistic time tracking app</p>
	<TimerView />
</main>

<style>
	main {
		max-width: 600px;
		margin: 0 auto;
		padding: 1rem;
	}

	h1,
	h1 + p {
		display: none;
	}
</style>
