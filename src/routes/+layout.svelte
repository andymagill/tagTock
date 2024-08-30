<script lang="ts">
	import { onMount } from 'svelte';
	import GoogleTagManager from '$lib/components/GoogleTagManager.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '../app.css';
</script>

<GoogleTagManager />

<Header />

<slot />

<Footer />
