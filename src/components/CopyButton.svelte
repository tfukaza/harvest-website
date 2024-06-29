
<script lang="ts">
	export let copyText: string = '';

	let copied: boolean = false;
	let timerID: number | null = null;

	function copyToClipboard(e: MouseEvent) {
		const text = copyText;
		navigator.clipboard.writeText(text);
		if (timerID) {
			clearTimeout(timerID);
		}
		copied = true;
		timerID = setTimeout(() => {
			copied = false;
		}, 1000);
	}
</script>

<button on:click={copyToClipboard} class:animated = {copied}>
	<span id="copy">📋</span>
	<span id="ok">✅</span>
</button>

<style lang="scss">
	button {
		position: absolute;
		top: 5px;
		right: 5px;
		z-index: 1000;

		background-color: transparent;
		border: 2px solid rgb(104, 107, 138);
		border-radius: 4px;
		padding: 4px;
		cursor: pointer;

		transition: background-color 0.2s;

		&:hover {
			background-color: rgb(131, 141, 157);
		}

		span {
			opacity: 0.8;
		}

		#copy {
			display: inline;
		}
		#ok {
			display: none;
		}
	}

	.animated {
		animation: copied 1s;
		#copy {
			display: none;
		}
		#ok {
			display: inline;
		}
	}

	@keyframes copied {
		0% {
			border-color: rgb(58, 174, 38);
		}
		100% {
			border-color: rgb(104, 107, 138);
		}
	}
</style>