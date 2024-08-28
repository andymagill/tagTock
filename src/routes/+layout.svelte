
<script lang="ts">
  	import { onMount } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '../app.css'; 
</script>

<Header />

<slot />

<Footer />
