<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let title = 'TagTock';
</script>

<header class="header">
	<div class="logo">
		<img src="/clock-logo.svg" alt="TagTock Logo" width="50" height="50" />
		<h1>{title}</h1>
	</div>

	<nav>
		<ul>
			<li><a href="/" on:click|preventDefault={() => goto('/')}>Timer</a></li>
			<li><a href="/history" on:click|preventDefault={() => goto('/history')}>History</a></li>
			<li><a href="/reports" on:click|preventDefault={() => goto('/reports')}>Reports</a></li>
		</ul>
	</nav>
</header>

<style>
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;

		background-color: #4caf50;
		color: white;
		text-align: center;
	}
	.logo h1 {
		display: inline-block;
	}

	nav ul {
		list-style-type: none;
		padding: 0;
	}

	nav li {
		display: inline;
		margin: 0 1rem;
	}

	nav a {
		color: white;
		text-decoration: none;
	}

	nav a:hover {
		text-decoration: underline;
	}
</style>
