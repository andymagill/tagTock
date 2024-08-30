<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	import { taskStore } from '$lib/stores/taskStore';
	import { timerStore } from '$lib/stores/timerStore';
	import type { Task } from '../../app';
	import Modal from './Modal.svelte';
	import { goto } from '$app/navigation';

	export let task: Task;
	export let expandedTaskId: string | null;

	let showModal = false;
	let modalTitle = '';
	let modalMessage = '';
	let modalAction: (() => void) | null = null;

	function formatDuration(ms: number): string {
		const seconds = Math.floor(ms / 1000) % 60;
		const minutes = Math.floor(ms / (1000 * 60)) % 60;
		const hours = Math.floor(ms / (1000 * 60 * 60));
		return `${hours}h ${minutes}m ${seconds}s`;
	}

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleString();
	}

	function toggleTaskExpansion() {
		expandedTaskId = expandedTaskId === task.id ? null : task.id;
	}

	function confirmDelete() {
		modalTitle = 'Confirm Delete';
		modalMessage = 'Are you sure you want to delete this task?';
		modalAction = deleteTask;
		showModal = true;
	}

	function deleteTask() {
		taskStore.deleteTask(task.id);
		showModal = false;
	}

	function confirmCopy() {
		modalTitle = 'Confirm Copy';
		modalMessage = 'Are you sure you want to copy this task to the timer?';
		modalAction = copyTask;
		showModal = true;
	}

	function copyTask() {
		console.log('Copying task:', task); // Debug log
		console.log('Task description:', task.description); // Debug log
		timerStore.setTask(task.name);
		timerStore.setDescription(task.description);
		timerStore.setTags(task.tags);
		console.log('Timer state after copy:', $timerStore); // Debug log
		showModal = false;
		goto('/'); // Navigate to the timer homepage
	}

	function handleModalClose() {
		showModal = false;
	}

	function handleModalConfirm() {
		if (modalAction) {
			modalAction();
		}
	}
</script>

<div class="task-item" transition:fade>
	<div class="task-header" on:click={toggleTaskExpansion}>
		<h3>{task.name}</h3>
		<span>{formatDuration(task.duration)}</span>
	</div>
	{#if expandedTaskId === task.id}
		<div class="task-details" transition:slide>
			<p><strong>Description:</strong> {task.description || 'No description'}</p>
			<p><strong>Tags:</strong> {task.tags.join(', ') || 'No tags'}</p>
			<p><strong>Created:</strong> {formatDate(task.createdAt)}</p>
			<div class="task-actions">
				<button on:click={confirmCopy}>Copy</button>
				<button on:click={confirmDelete}>Delete</button>
			</div>
		</div>
	{/if}
</div>

<Modal
	show={showModal}
	title={modalTitle}
	message={modalMessage}
	on:close={handleModalClose}
	on:confirm={handleModalConfirm}
/>

<style>
	.task-item {
		background-color: #f9f9f9;
		border: 1px solid #ddd;
		border-radius: 4px;
		margin-bottom: 1rem;
		overflow: hidden;
	}

	.task-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.67rem;
		cursor: pointer;
		background-color: #f0f0f0;
	}

	.task-header h3 {
		margin: 0;
		font-size: 1.6rem;
	}

	.task-details {
		padding: 1rem;
	}

	.task-actions {
		display: flex;
		justify-content: flex-end;
		gap: 0.5rem;
		margin-top: 1rem;
	}

	.task-actions button {
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		background-color: #007bff;
		color: white;
	}

	.task-actions button:hover {
		background-color: #0056b3;
	}
</style>
