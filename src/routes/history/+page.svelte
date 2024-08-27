<script lang="ts">
    import TaskList from '$lib/components/TaskList.svelte';
  </script>
  
  <svelte:head>
    <title>TagTock - Task History</title>
  </svelte:head>
  
  <main>
    <h1>Task History</h1>
    <TaskList />
  </main>
  
  <style>
    main {
      max-width: 800px;
      margin: 0 auto;
      padding: 1rem;
    }
  
    h1 {
      text-align: center;
      margin-bottom: 2rem;
    }
  </style>