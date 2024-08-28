
<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let show = false;
  export let title: string;
  export let message: string;

  const dispatch = createEventDispatcher();

  function close() {
    dispatch('close');
  }

  function confirm() {
    dispatch('confirm');
  }
</script>

{#if show}
  <div class="modal-backdrop" on:click={close}>
    <div class="modal-content" on:click|stopPropagation>
      <h2>{title}</h2>
      <p>{message}</p>
      <div class="modal-actions">
        <button on:click={close}>Cancel</button>
        <button on:click={confirm}>Confirm</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    background-color: white;
    padding: 2rem;
    border-radius: 4px;
    max-width: 400px;
    width: 100%;
  }

  h2 {
    margin-top: 0;
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1rem;
  }

  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:first-child {
    background-color: #f0f0f0;
  }

  button:last-child {
    background-color: #007bff;
    color: white;
  }
</style>
