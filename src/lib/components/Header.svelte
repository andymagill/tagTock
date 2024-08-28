<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let title = 'TagTock';
</script>

<header class="header">
	<div class="logo">
		<a href="/">
			<img src="/clock-logo.svg" alt="TagTock Logo" width="50" height="50" />
			<span class="h1">{title}</span>
		</a>
	</div>

	<nav>
		<ul>
			<li><a href="/" on:click|preventDefault={() => goto('/')}>Timer</a></li>
			<li><a href="/archive" on:click|preventDefault={() => goto('/Archive')}>Archive</a></li>
			<li><a href="/reports" on:click|preventDefault={() => goto('/reports')}>Reports</a></li>
		</ul>
	</nav>
</header>

<style>
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem 1rem;

		background-color: #4caf50;
		color: white;
		text-align: center;
	}
	.h1 {
		display: inline-block;
		margin: 0;
		font-size: 2rem;
		font-weight: bold;
	}
	a {
		display: inline-flex;
		align-items: center;
		color: white;
		text-decoration: none;
		gap: 0.5em;
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
