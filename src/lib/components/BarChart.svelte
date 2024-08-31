<script lang="ts">
	import { onMount } from 'svelte';
	import type { ChartOptions, ChartTypeRegistry } from 'chart.js';
	import type { ChartData as ChartDataOriginal } from 'chart.js';
	import type { Task } from '../../app';

	export let tasks: Task[] = [];

	// Define chart data type
	type ChartData<TType extends keyof ChartTypeRegistry = keyof ChartTypeRegistry> = Omit<
		ChartDataOriginal<TType>,
		'datasets'
	> & {
		// define dataset type
		datasets: {
			data: number[];
			label: string;
			backgroundColor: string | string[];
			borderColor: string | string[];
			borderWidth: number;
		}[];
	};

	let chartData: ChartData<'bar'>;
	let chartOptions: ChartOptions<'bar'>;
	let Chart: any;
	let isMounted = false;

	onMount(async () => {
		// Import the chart components
		const { Bar } = await import('svelte-chartjs');
		const {
			Chart: ChartJS,
			Title,
			Tooltip,
			Legend,
			BarElement,
			CategoryScale,
			LinearScale
		} = await import('chart.js');

		// Register the chart components
		ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
		Chart = Bar;
		isMounted = true;
	});

	$: {
		// Convert tasks to hours
		const tasksByTag = tasks.reduce(
			(acc, task) => {
				task.tags.forEach((tag) => {
					if (!acc[tag]) acc[tag] = 0;
					acc[tag] += task.duration;
				});
				return acc;
			},
			{} as Record<string, number>
		);

		const labels = Object.keys(tasksByTag);
		const data = Object.values(tasksByTag).map((duration) => duration / (1000 * 60 * 60)); // Convert to hours

		chartData = {
			labels,
			datasets: [
				{
					label: 'Hours Spent',
					data: data, // Array of data points for the dataset
					backgroundColor: 'rgba(75, 192, 192, 0.6)',
					borderColor: 'rgba(75, 192, 192, 1)',
					borderWidth: 1
				}
			]
		};

		chartOptions = {
			responsive: true,
			plugins: {
				legend: {
					position: 'top' as const
				},
				title: {
					display: true,
					text: 'Time Spent by Tag'
				}
			},
			scales: {
				y: {
					beginAtZero: true, // Start the y-axis at zero
					title: {
						display: true,
						text: 'Hours'
					}
				}
			}
		};
	}
</script>

{#if isMounted && tasks.length > 0 && chartData && chartData.datasets[0].data.length > 0}
	<div class="chart-container">
		<svelte:component this={Chart} data={chartData} options={chartOptions} />
	</div>
{:else if isMounted}
	<p>No data available to display in the chart.</p>
{:else}
	<p>Loading chart...</p>
{/if}

<style>
	.chart-container {
		width: 100%;
		max-width: 800px;
		margin: 0 auto;
	}
</style>
