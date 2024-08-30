import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { TimerState } from '../../app';

const initialState: TimerState = {
	isRunning: false,
	startTime: null,
	elapsedTime: 0,
	currentTask: '',
	currentDescription: '',
	selectedTags: [],
	lastUpdated: Date.now()
};

function createTimerStore() {
	const { subscribe, set, update } = writable<TimerState>(loadTimerState());

	function loadTimerState(): TimerState {
		if (browser) {
			const savedState = localStorage.getItem('tagTockTimerState');
			if (savedState) {
				const parsedState = JSON.parse(savedState);
				// If the timer was running when last saved, calculate the elapsed time
				if (parsedState.isRunning && parsedState.startTime) {
					const now = Date.now();
					parsedState.elapsedTime += now - parsedState.lastUpdated;
					parsedState.startTime = now - parsedState.elapsedTime;
					parsedState.lastUpdated = now;
				}
				return parsedState;
			}
		}
		return initialState;
	}

	function saveTimerState(state: TimerState) {
		if (browser) {
			localStorage.setItem('tagTockTimerState', JSON.stringify(state));
		}
	}

	return {
		subscribe,
		set: (state: TimerState) => {
			set(state);
			saveTimerState(state);
		},
		startTimer: () =>
			update((state) => {
				if (!state.isRunning) {
					const now = Date.now();
					state.isRunning = true;
					state.startTime = now - state.elapsedTime;
					state.lastUpdated = now;
					saveTimerState(state);
				}
				return state;
			}),
		stopTimer: () =>
			update((state) => {
				if (state.isRunning) {
					state.isRunning = false;
					state.elapsedTime = Date.now() - state.startTime!;
					state.lastUpdated = Date.now();
					saveTimerState(state);
				}
				return state;
			}),
		resetTimer: () => {
			const resetState = { ...initialState, lastUpdated: Date.now() };
			set(resetState);
			saveTimerState(resetState);
		},
		resetElapsedTime: () =>
			update((state) => {
				state.isRunning = false;
				state.startTime = null;
				state.elapsedTime = 0;
				state.lastUpdated = Date.now();
				saveTimerState(state);
				return state;
			}),
		updateElapsedTime: () =>
			update((state) => {
				if (state.isRunning) {
					const now = Date.now();
					state.elapsedTime = now - state.startTime!;
					state.lastUpdated = now;
					saveTimerState(state);
				}
				return state;
			}),
		setTask: (task: string) =>
			update((state) => {
				state.currentTask = task;
				saveTimerState(state);
				return state;
			}),
		setDescription: (description: string) =>
			update((state) => {
				state.currentDescription = description;
				saveTimerState(state);
				return state;
			}),
		setTags: (tags: string[]) =>
			update((state) => {
				state.selectedTags = tags;
				saveTimerState(state);
				return state;
			})
	};
}

export const timerStore = createTimerStore();
