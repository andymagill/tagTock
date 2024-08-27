<script lang="ts">
	import { createEventDispatcher } from 'svelte';
  
	export let name: string = '';
	export let description: string = '';
  
	const dispatch = createEventDispatcher<{
	  input: { name: string; description: string };
	}>();
  
	function handleInput() {
	  dispatch('input', { name, description });
	}
  </script>
  
  <div class="task-input">
	<input
	  type="text"
	  bind:value={name}
	  on:input={handleInput}
	  placeholder="Enter task name"
	/>
	<textarea
	  bind:value={description}
	  on:input={handleInput}
	  placeholder="Enter task description"
	  rows="3"
	></textarea>
  </div>
  
  <style>
	.task-input {
	  display: flex;
	  flex-direction: column;
	  gap: 0.5rem;
	  margin-bottom: 1rem;
	}
  
	input, textarea {
	  width: 100%;
	  padding: 0.5rem;
	  border: 1px solid #ccc;
	  border-radius: 4px;
	}
  
	textarea {
	  resize: vertical;
	}
  </style>