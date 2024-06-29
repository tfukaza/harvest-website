
<script lang="ts">
	export let items: Record<string, {name: string, url: string}[]> = {};
	let collapsed:{[key: string]: boolean} = {};
	let selected: string = '';
	
	function onToggleCollapse(e: MouseEvent) {
		const className:string = (e.target as HTMLElement).getAttribute('data-class') || '';
		collapsed[className] = !collapsed[className];
	}

	function onSelected(e: MouseEvent) {
		const target = e.target as HTMLElement;
		const functionPath = target.getAttribute('data-function') || '';
		selected = functionPath;
	}

	const classNames = Object.keys(items);
</script>

{#each classNames as className}
	{@const functions = items[className]}
	<div class={collapsed[className] ? 'collapse' : ''}>
		<button class="collapseButton" on:click={onToggleCollapse} data-class={className}>
			<span class="collapseIcon">▸</span>{className}
		</button>
		<ul>
			{#each functions as item}
				<li id={`link-${className.toLowerCase().replace(' ', '-')}-${item.name}`} 
					class:selected={selected === className + '.' + item.name}>
					<a 	href={item.url} 
						data-function={className + '.' + item.name} 
						on:click={onSelected}>
						{item.name}
					</a>
				</li>
			{/each}
		</ul>
	</div>
{/each}

<style lang="scss">
	.collapseButton {
		width: 100%;
		padding: 4px 0px 4px 8px;
		
		background-color: transparent;
		border: none;
		border-radius: 4px;

		text-align: left;
		font-family: 'Inter', sans-serif;
		font-size: 0.9rem;

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

	ul {
		margin: 0;
		padding-left: 16px;
	
		li {
			display: block;
			list-style-type: none;
			border-radius: 6px;
			padding:  0px;
			margin: 0px;

			&:hover {
				background: rgb(236, 236, 236);
			}
			
			a {
				cursor: pointer;
				user-drag: none;
				-webkit-user-drag: none;
				user-select: none;
				-moz-user-select: none;
				-webkit-user-select: none;
				-ms-user-select: none;
				display: block;
				box-sizing: border-box;
				padding: 5px 0px 5px 8px;
				text-decoration: none;
				text-wrap:wrap;
				
				font-size: 0.9rem;
				line-height: 1.1;

				
			}
		}
		& .selected {
			background: rgb(241, 241, 241);
			font-weight: bold;
		}
	}
</style>