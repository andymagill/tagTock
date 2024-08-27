<script lang="ts">
	import { createEventDispatcher } from 'svelte';
  
	export let value: string = '';
  
	const dispatch = createEventDispatcher();
  
	function handleInput(event: Event) {
	  const input = event.target as HTMLInputElement;
	  value = input.value;
	  dispatch('input', value);
	}
  </script>
  
  <div class="task-input">
	<input
	  type="text"
	  bind:value
	  on:input={handleInput}
	  placeholder="Enter task name"
	/>
  </div>
  
  <style>
	.task-input {
	  margin-bottom: 1rem;
	}
  
	input {
	  width: 100%;
	  padding: 0.5rem;
	  border: 1px solid #ccc;
	  border-radius: 4px;
	}
  </style>