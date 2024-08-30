<script lang="ts">
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';
    import { PUBLIC_GTM_ID } from '$env/static/public';
  
    export let id: string = PUBLIC_GTM_ID || '';
    
    //
    onMount(() => {
      if (browser && id) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      }
    });
    
    $: gtmScript = `
      (function(w,d,s,l,i){
        w[l]=w[l]||[];
        var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
        j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
        f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${id}');
    `;
  </script>
  
  <svelte:head>
    {#if id}
      {@html `<script>${gtmScript}</script>`}
    {/if}
  </svelte:head>
  
  {#if id}
    {@html `
      <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${id}"
      height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    `}
  {/if}