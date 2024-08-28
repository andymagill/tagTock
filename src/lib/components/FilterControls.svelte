<script lang="ts">
    export let availableTags: string[] = [];
    export let selectedTag: string = '';
  
    function handleTagChange(event: Event) {
      const select = event.target as HTMLSelectElement;
      selectedTag = select.value;
    }
  </script>
  
  <div class="filter-controls">
    <label for="tag-filter">Filter by tag:</label>
    <select id="tag-filter" value={selectedTag} on:change={handleTagChange}>
      <option value="">All tags</option>
      {#each availableTags as tag}
        <option value={tag}>{tag}</option>
      {/each}
    </select>
  </div>
  
  <style>
    .filter-controls {
      margin-bottom: 1rem;
      text-align: right;
    }
  
    label {
      margin-right: 0.5rem;
    }
  
    select {
      padding: 0.5rem;
      border-radius: 4px;
      border: 1px solid #ccc;
    }
  </style>