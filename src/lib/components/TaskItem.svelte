<script lang="ts">
	import { goto } from '$app/navigation';
	import { fade, slide } from 'svelte/transition';
	import { taskStore } from '$lib/stores/taskStore';
	import { timerStore } from '$lib/stores/timerStore';
	import type { Task } from '../../app';
	import Modal from './Modal.svelte';
	import { formatDateShort, formatDateLong, formatDuration } from '../utils/timeUtils';

	export let task: Task;
	export let expandedTaskId: string | null;

	let showModal = false;
	let modalTitle = '';
	let modalMessage = '';
	let modalAction: (() => void) | null = null;

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
	<button class="task-header" on:click={toggleTaskExpansion}>
		<h3 class="name">{task.name}</h3>
		<span class="duration">{formatDuration(task.duration)}</span>
		<span class="datetime">{formatDateShort(task.createdAt)}</span>
	</button>
	{#if expandedTaskId === task.id}
		<div class="task-details" transition:slide>
			<p><strong>Description:</strong> {task.description || 'No description'}</p>
			<p><strong>Tags:</strong> {task.tags.join(', ') || 'No tags'}</p>
			<p><strong>Created:</strong> {formatDateLong(task.createdAt)}</p>
			<div class="task-actions">
				<button class="button" on:click={confirmCopy}>
					<i class="fas fa-copy"></i>&nbsp;
					<span>Copy</span>
				</button>
				<button class="button delete" on:click={confirmDelete}>
					<i class="fas fa-remove"></i>&nbsp;
					<span>Delete</span>
				</button>
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
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(2, 1fr);
		grid-template-areas:
			'name name'
			'duration datetime';
		gap: 0.5rem;
		padding: 1rem;

		cursor: pointer;
		background-color: #f0f0f0;
		width: 100%;
		border: 1px none transparent;
	}
	@media (min-width: 480px) {
		.task-header {
			grid-template-columns: repeat(4, 1fr);
			grid-template-rows: 1fr;
			grid-template-areas: 'name name duration datetime';
			gap: 1rem;
		}
	}

	.task-header h3 {
		grid-area: name;
		margin: 0;

		font-size: 1.14rem;
		font-weight: 400;
		text-align: left;
		line-height: 1em;
	}
	@media (min-width: 480px) {
		.task-header h3 {
			grid-column: 1 / 3;
			grid-row: 1 / 2;
		}
	}
	.task-header span {
		margin: 0;

		font-size: 1rem;
		font-weight: 300;
		text-align: left;
		white-space: nowrap;
	}
	.task-header .duration {
		grid-area: duration;
	}

	.task-header .datetime {
		grid-area: datetime;
		text-align: right;
	}

	.task-details {
		padding: 1rem;
	}
	.task-details :global(p:first-child) {
		margin-top: 0;
	}
	.duration {
		text-align: left;
	}
	.task-actions {
		display: flex;
		justify-content: flex-end;
		gap: 0.5rem;
		margin-top: 1rem;
	}
</style>
