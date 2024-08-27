<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let title = 'TagTock';
</script>

<header class="header">
	<h1>{title}</h1>
	<!-- TODO: change to logo -->
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
		background-color: #4caf50;
		color: white;
		padding: 1rem;
		text-align: center;
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
