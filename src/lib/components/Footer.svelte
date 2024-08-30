<script lang="ts">
	import config from '$lib/config';
	let year = new Date().getFullYear();
</script>

<footer class="footer">
	<div class="wrapper">
		<nav>
			<ul>
				<li><a href="/about">About</a></li>
				<li><a href="/privacy">Privacy</a></li>
				<li><a href="/contact">Contact</a></li>
			</ul>
		</nav>

		<p class="copyright">&copy; {year} {$config.appName}. All rights reserved.</p>
	</div>
</footer>

<style>
	.footer {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		text-align: center;
		padding: 0.5rem 1rem;
	}
	.wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: column;
	}

	@media screen and (min-width: 480px) {
		.wrapper {
			flex-direction: row;
		}
	}

	nav ul {
		display: inline-block;
		list-style-type: none;
		padding: 0;
	}

	nav li {
		display: inline;
		margin: 0 0.5rem;
	}

	nav a {
		text-decoration: none;
	}

	nav a:hover {
		text-decoration: underline;
	}
	.copyright {
		font-size: 12px;
		margin: 0 0.5rem;
	}
</style>
