<script lang="ts">
	export let items: Record<string, { name: string; url: string }[]> = {};
	let collapsed: { [key: string]: boolean } = {};
	let selected: string = "";

	function onToggleCollapse(e: MouseEvent) {
		const className: string =
			(e.target as HTMLElement).getAttribute("data-class") || "";
		collapsed[className] = !collapsed[className];
	}

	function onSelected(e: MouseEvent) {
		const target = e.target as HTMLElement;
		const functionPath = target.getAttribute("data-function") || "";
		selected = functionPath;
	}

	const classNames = Object.keys(items);

	let open = false;

	function toggleMenu() {
		open = !open;
	}

</script>


<nav id="doc-nav" class:open={open}>
	<button id="mobile-menu" on:click={toggleMenu} class:open={open}>
		<span></span>
		<span></span>
		<span></span>
	</button>
	<div id="sidebar-container">
		{#each classNames as className}
			{@const functions = items[className]}
			<div class={collapsed[className] ? "" : "collapse"}>
				<button
					class="collapseButton"
					on:click={onToggleCollapse}
					data-class={className}
				>
					<span class="collapseIcon">▸</span>{className}
				</button>
				<ul>
					{#each functions as item}
						<li
							id={`link-${className.toLowerCase().replace(" ", "-")}-${item.name}`}
							class:selected={selected ===
								className + "." + item.name}
						>
							<a
								href={item.url}
								data-function={className + "." + item.name}
								on:click={onSelected}
							>
								{item.name}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</nav>


<style lang="scss">
	.collapseButton {
		width: 100%;
		padding: 4px 0px 4px 8px;

		background-color: transparent;
		border: none;
		border-radius: 4px;

		text-align: left;
		font-family: "Inter", sans-serif;
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
			padding: 0px;
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
				text-wrap: wrap;

				font-size: 0.9rem;
				line-height: 1.1;
			}
		}
		& .selected {
			background: rgb(241, 241, 241);
			font-weight: bold;
		}
	}

	#mobile-menu {
		display: none;
		
		@media screen and (max-width: 1200px) {

			position: absolute;
			top: 0px;
			right: -50px;
			width: 50px;
			height: 50px;
			display: block;
			background-color: #ffffff;
			z-index: 1000;
			border-left: 0px solid #e3e3e3;
			border-bottom: 1px solid #e3e3e3;
			border-top: 0px solid #e3e3e3;
			border-right: 1px solid #e3e3e3;

			border-radius: 0px 0px 5px 0px;

			> span {
				display: block;
				width: 30px;
				height: 4px;
				border-radius: 2px;
				background-color: rgb(150, 150, 150);
				margin: 6px auto;
				transition: 0.2s;
			}
			&.open {
				span:nth-child(1) {
					width: 16px;
					transform: translate(-7px, 5.5px) rotate(-45deg);
				}
				span:nth-child(2) {
					width: 22px;
				}
				span:nth-child(3) {
					width: 16px;
					transform: translate(-7px, -5.5px) rotate(45deg);
				}
			}
		}
	}

	#doc-nav {
		
		top: max(10vh, 50px);
		position: sticky;
		align-self: start;

		margin-bottom: 50px;
		box-sizing: border-box;

		background-color: #ffffff;

		z-index: 999;
		
		@media screen and (max-width: 1200px){
			
			height: 100vh;
			position: fixed;
			width: 250px;
			top: 50px;
			left: -250px;
			border-right: 1px solid #e3e3e3;

			box-sizing: border-box;

			transition: left 0.2s ease;   

			&.open {
				left: 0px;
				box-shadow: 20px 0px 40px 20px rgba(80, 84, 85, 0.07)
			}
		}

		#sidebar-container {
			margin-top: 3vh;
			min-width: 250px;
			min-height: 50px;
			overflow: hidden;
		
			padding: 8px;
			max-height: 80vh;
			overflow-x: hidden;
			overflow-y: scroll;

			@media screen and (max-width: 1200px) {
				margin-top: 0px;
				box-sizing: border-box;
				max-height: calc(100vh - 50px);
			}
			
			&::-webkit-scrollbar {
			width: 6px;
			}
			&::-webkit-scrollbar-thumb {
				background: #dfdfdf;
				border-radius: 3px;
			}
			&::-webkit-scrollbar-thumb:hover {
				background: #555;
			}
			&::-webkit-scrollbar-track {
				background: transparent;
				width: 6px;
				border-radius: 3px;
			}
		}
	}

	// #doc-content {
	// 	grid-column: 4 / 11;
	// 	margin-top: max(20vh, 50px);
	// 	padding: 0px 40px;
	// 	padding-bottom: 100px;
	// 	min-height: 110vh;

	// 	box-shadow: -16px 0px 40px 3px rgb(80 84 85 / 7%);

	// 	@media screen and (max-width: 1200px){
	// 		padding: 0px 20px;
	// 		grid-column: 3 / 11;

	// 		transition: transform 0.2s ease;

	// 		&.open {
	// 			transform: translateX(80%);
	// 		}
	// 	}
	// }
	
</style>
