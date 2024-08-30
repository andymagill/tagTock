<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let title = 'TagTock';
</script>

<header class="header">
	<div class="wrapper">
		<div class="logo">
			<a href="/">
				<img src="/clock-logo.svg" alt="{title} Logo" width="50" height="50" />
				<span class="h1">{title}</span>
			</a>
		</div>

		<nav>
			<ul>
				<li>
					<a href="/" on:click|preventDefault={() => goto('/')}>
						<i class="fa-regular fa-clock"></i>
						<span>Timer</span>
					</a>
				</li>
				<li>
					<a href="/archive" on:click|preventDefault={() => goto('/archive')}>
						<i class="fa-solid fa-list"></i>
						<span>Archive</span>
					</a>
				</li>
				<li>
					<a href="/reports" on:click|preventDefault={() => goto('/charts')}
						><i class="fa-solid fa-chart-simple"></i>
						<span>Charts</span>
					</a>
				</li>
			</ul>
		</nav>
	</div>
</header>

<style>
	.header {
		padding: 0.5rem 1rem;
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
		text-decoration: none;
		gap: 0.5em;
	}

	.wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: column;
	}

	@media (min-width: 480px) {
		.wrapper {
			flex-direction: row;
		}
	}
	nav ul {
		list-style-type: none;
		padding: 0;
	}

	nav li {
		display: inline;
		margin: 0 0.75rem;
	}

	nav a {
		text-decoration: none;
	}

	nav a:hover {
		text-decoration: underline;
	}
</style>
