<script lang="ts">
	import { defaultAdditionalClass } from './svg/defaults';
	export let additionalClass: string = defaultAdditionalClass;
</script>

<svg
	width="24"
	height="24"
	viewBox="0 0 24 24"
	xmlns="http://www.w3.org/2000/svg"
	class={additionalClass}
  fill="#155dfc"
	><style>
		.spinner_9y7u {
			animation: spinner_fUkk 2.4s linear infinite;
			animation-delay: -2.4s;
		}
		.spinner_DF2s {
			animation-delay: -1.6s;
		}
		.spinner_q27e {
			animation-delay: -0.8s;
		}
		@keyframes spinner_fUkk {
			8.33% {
				x: 13px;
				y: 1px;
			}
			25% {
				x: 13px;
				y: 1px;
			}
			33.3% {
				x: 13px;
				y: 13px;
			}
			50% {
				x: 13px;
				y: 13px;
			}
			58.33% {
				x: 1px;
				y: 13px;
			}
			75% {
				x: 1px;
				y: 13px;
			}
			83.33% {
				x: 1px;
				y: 1px;
			}
		}
	</style><rect class="spinner_9y7u" x="1" y="1" rx="1" width="10" height="10" /><rect
		class="spinner_9y7u spinner_DF2s"
		x="1"
		y="1"
		rx="1"
		width="10"
		height="10"
	/><rect class="spinner_9y7u spinner_q27e" x="1" y="1" rx="1" width="10" height="10" /></svg
>
<!--<div
	class={cn(
		"animate-spin text-blue-600",
		size === "default" && "h-8 w-8",
		size === "sm" && "h-4 w-4",
		size === "lg" && "h-12 w-12",
		className
	)}
	role="status"
	aria-label="Loading"
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="100%"
		height="100%"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<path d="M21 12a9 9 0 1 1-6.219-8.56" />
	</svg>
</div>-->
