
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
interface Task {
	id: string;
	name: string;
	duration: number;
	tags: string[];
	createdAt: Date;
}

interface Tag {
	id: string;
	name: string;
}

interface Timer {
	isRunning: boolean;
	startTime: number | null;
	elapsedTime: number;
}

export {};
