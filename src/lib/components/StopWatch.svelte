<script lang="ts">
	export let elapsedTime: number = 0;

	$: hourRotation = calculateHourRotation(elapsedTime);
	$: minutesRotation = calculateMinuteRotation(elapsedTime);
	$: secondsRotation = calculateSecondRotation(elapsedTime);

	function calculateHourRotation(ms: number) {
		const hours = (ms / 3600000) % 12;
		return hours * 30;
	}

	function calculateMinuteRotation(ms: number) {
		const minutes = (ms / 60000) % 60;
		return minutes * 6;
	}

	function calculateSecondRotation(ms: number) {
		const seconds = (ms / 1000) % 60;
		return seconds * 6;
	}
</script>

<section class="stopwatch">
	<div class="clock">
		<div class="hand hour" style={`transform: translateX(-50%) rotate(${hourRotation}deg)`} />
		<div class="hand minute" style={`transform: translateX(-50%) rotate(${minutesRotation}deg)`} />
		<div class="hand second" style={`transform: translateX(-50%) rotate(${secondsRotation}deg)`} />

		<span class="second-labels fifteen">15</span>
		<span class="second-labels thirty">30</span>
		<span class="second-labels fortyfive">45</span>
		<span class="second-labels sixty">60</span>
	</div>
</section>

<style>
	:root {
		--clock-ticks-mask-image: #000;
		--clock-quarter-marks: #555;
		--clock-twelth-marks: #555;
		--clock-sixtieth-marks: #ccc;
		--second-labels: #333;
	}
    .stopwatch{
        max-width: 75%;
        margin: 0 auto;
    }

	.clock {
		align-items: center;
		display: flex;
		justify-content: center;
		margin-bottom: 20px;
		position: relative;
		width: 100%;
        aspect-ratio: 1 / 1;

		&::before {
			content: '';
			width: 100%;
			height: 100%;
			border-radius: 50%;
			-webkit-mask-image: radial-gradient(circle at center, transparent 66%, #fff 66.1%);
			mask-image: radial-gradient(circle at center, transparent 66%, #fff 66.1%);
			background-image: repeating-conic-gradient(
					from 359deg,
					var(--clock-quarter-marks) 0 2deg,
					transparent 2deg 90deg
				),
				repeating-conic-gradient(
					from 359.5deg,
					var(--clock-twelth-marks) 0 1deg,
					transparent 1deg 30deg
				),
				repeating-conic-gradient(
					from 359.75deg,
					var(--clock-sixtieth-marks) 0 0.5deg,
					transparent 0.5deg 6deg
				);
		}

		& .second-labels {
			color: var(--second-labels);
			position: absolute;

			&.sixty {
				top: 5%;
			}

			&.fifteen {
				right: 5%;
			}

			&.thirty {
				bottom: 5%;
			}

			&.fortyfive {
				left: 5%;
			}
		}
		& .hand {
			bottom: 50%;
			height: 30%;
			left: 50%;
			position: absolute;
			transform: translateX(-50%) rotate(0deg);
			transform-origin: bottom;
			width: 3px;

			&.second {
				background-color: #6d605a;
				height: 45%;
				width: 2px;
			}

			&.minute {
				background-color: #51665e;
				height: 30%;
				width: 3px;
			}

			&.hour {
				background-color: #3e3e53;
				height: 25%;
				width: 4px;
			}
		}
	}
</style>
