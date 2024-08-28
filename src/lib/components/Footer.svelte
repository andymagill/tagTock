<script lang="ts">
	import config from '$lib/config';
	let year = new Date().getFullYear();
</script>

<footer class="footer">
	<div class="wrapper">
		<p>&copy; {year} {$config.appName}. All rights reserved.</p>
	</div>
</footer>

<style>
	.footer {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: #333;
		color: white;
		text-align: center;
		padding: 0.5rem 1rem;
	}
	.wrapper {
		display: inline-flex;
		justify-content: center;
		align-items: center;
	}
</style>
