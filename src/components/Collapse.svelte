
<script lang="ts">
	import { BASE } from '@constants';
	export let title: string = '';
	export let items: { name: string; }[] = [];

	let collapsed = false;

	function onToggleCollapse(_: MouseEvent) {
		collapsed = !collapsed;
	}
</script>

<div class={collapsed ? 'collapse' : ''}>
	<button class="collapseButton" on:click={onToggleCollapse}><span class="collapseIcon">▸</span>{title}</button>
	<ul>
		{#each items as item (`${title.toLowerCase()}-${item.name}`)}
			<li id={`link-${title.toLowerCase().replace(' ', '-')}-${item.name}`}>
				<a href={BASE + `/docs/${title.toLowerCase().replace(' ', '-')}/${item.name}`}>{item.name}</a>
			</li>
		{/each}
	</ul>
</div>

<style>
	.collapseButton {
		width: 100%;
		padding: 4px 0px 4px 8px;
		
		background-color: transparent;
		border: none;
		border-radius: 4px;

		text-align: left;
		font-family: 'Inter', sans-serif;

		cursor: pointer;

		&:hover {
			background-color: rgb(243, 243, 243);
		}
	}

	.collapseIcon {
		display: inline-block;
		transform: rotate(90deg);
		transition: transform 0.1s;
	}

	.collapse {
		& ul {
			display: none;
		}
		& .collapseIcon {
			transform: rotate(0deg);
		}
	}
</style>