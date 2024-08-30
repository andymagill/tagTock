/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	// interface Error {}
	// interface Locals {}
	// interface PageData {}
	// interface PageState {}
	// interface Platform {}
	// interface Session {}
}

// Define your custom types here
export interface Task {
	id: string;
	name: string;
	description: string;
	duration: number;
	tags: string[];
	createdAt: string;
}

interface Tag {
	id: string;
	name: string;
}

declare global {
	interface Window {
		dataLayer: Array<Record<string, unknown>>;
	}
}

export interface TimerState {
	isRunning: boolean;
	startTime: number | null;
	elapsedTime: number;
	currentTask: string;
	currentDescription: string;
	selectedTags: string[];
	lastUpdated: number;
}
