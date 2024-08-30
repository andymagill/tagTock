<script lang="ts">
	import { onMount } from 'svelte';
	import GoogleTagManager from '$lib/components/GoogleTagManager.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '../app.css';
	import '@fortawesome/fontawesome-free/css/all.min.css'
</script>

<GoogleTagManager />

<Header />

<slot />

<Footer />
