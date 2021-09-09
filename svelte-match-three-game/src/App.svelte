<script lang="ts">
	import { onMount } from "svelte";
	import {
		GridItemData,
		gridItemList,
		GridItemType,
		EmptyGridItem,
	} from "./models";

	import {fly} from 'svelte/transition';

	let grid: GridItemData[][] = [];

	let width = 8;
	let itemBeingDraggedIndex: number;
	let itemBeingReplacedIndex: number;
	let score = 0;

	onMount(() => {
		InitializeGrid();

		setInterval(() => CheckForRowMatches(), 200);
		setInterval(() => CheckForColumnMatches(), 200);

		setInterval(() => SimulateGravity(), 200);
		setInterval(() => AddItems(), 200);
	});

	const InitializeGrid = () => {
		for (var i = 0; i < width; i++) {
			grid[i] = [];
			for (var j = 0; j < width; j++) {
				var randIndex = Math.floor(Math.random() * gridItemList.length);

				if (randIndex < gridItemList.length)
					grid[i][j] = gridItemList[randIndex];
			}
		}
	};

	const CheckForRowMatches = () => {
		for (var i = 0; i < width; i++) {
			for (var j = 2; j < width; j++) {
				if (
					grid[i][j].type != GridItemType.EMPTY &&
					grid[i][j].type == grid[i][j - 1].type &&
					grid[i][j].type == grid[i][j - 2].type
				) {
					grid[i][j] = EmptyGridItem;
					grid[i][j - 1] = EmptyGridItem;
					grid[i][j - 2] = EmptyGridItem;

					score = score + 50;
				}
			}
		}
	};

	const CheckForColumnMatches = () => {
		for (var j = 0; j < width; j++) {
			for (var i = 2; i < width; i++) {
				if (
					grid[i][j].type != GridItemType.EMPTY &&
					grid[i][j].type == grid[i - 1][j].type &&
					grid[i][j].type == grid[i - 2][j].type
				) {
					grid[i][j] = EmptyGridItem;
					grid[i - 1][j] = EmptyGridItem;
					grid[i - 2][j] = EmptyGridItem;

					score = score + 50;
				}
			}
		}
	};

	const SimulateGravity = () => {
		for (var i = 1; i < width; i++) {
			for (var j = 0; j < width; j++) {
				if (grid[i][j].type == GridItemType.EMPTY) {
					const currentIndex = i * width + j;
					const topItem = (i - 1) * width + j;
					SwapItems(currentIndex, topItem);
				}
			}
		}
	};

	const AddItems = () => {
		for(var j=0; j<width; j++) {
			if (grid[0][j].type == GridItemType.EMPTY) {
				var randIndex = Math.floor(Math.random() * gridItemList.length);

				if (randIndex < gridItemList.length)
					grid[0][j] = gridItemList[randIndex];
			}
		}
	}

	const dragStart = (ev, index) => {
		itemBeingDraggedIndex = index;
	};

	const dragOver = (ev, index) => {
		itemBeingReplacedIndex = index;

		const isNextOrPrevCell =
			itemBeingDraggedIndex == itemBeingReplacedIndex + 1 ||
			itemBeingDraggedIndex == itemBeingReplacedIndex - 1;
		const isAtSameRows = Math.floor(itemBeingDraggedIndex / width) == Math.floor(itemBeingReplacedIndex / width)
		const isAboveOrBelowCell =
			itemBeingDraggedIndex == itemBeingReplacedIndex + width ||
			itemBeingDraggedIndex == itemBeingReplacedIndex - width;

		if ((isNextOrPrevCell && isAtSameRows) || isAboveOrBelowCell) {
			ev.preventDefault();
		}
	};

	const dragDrop = (ev) => {
		SwapItems(itemBeingDraggedIndex, itemBeingReplacedIndex);
	};

	const SwapItems = (itemBeingDraggedIndex, itemBeingReplacedIndex) => {
		let replaceItemRow = Math.floor(itemBeingReplacedIndex / width);
		let replaceItemCol = Math.floor(itemBeingReplacedIndex % width);

		let draggingItemRow = Math.floor(itemBeingDraggedIndex / width);
		let draggingItemCol = Math.floor(itemBeingDraggedIndex % width);

		var temp = grid[replaceItemRow][replaceItemCol];
		grid[replaceItemRow][replaceItemCol] =
			grid[draggingItemRow][draggingItemCol];
		grid[draggingItemRow][draggingItemCol] = temp;
	};
</script>

<main>
	<h2>Match Three Game</h2>
	<h4>Score: {score}</h4>
	<div class="board">
		{#each grid as griditemrow, i}
			{#each griditemrow as griditem, j}
				<div
					class="gridItem"
					draggable="true"
					on:dragstart={(ev) => dragStart(ev, i * width + j)}
					on:dragover={(ev) => dragOver(ev, i * width + j)}
					on:drop={(ev) => dragDrop(ev)}
					id={`${i * width + j}`}
				>
					{#if griditem.type == GridItemType.EMPTY }
						<div></div>
					{:else}
						<img 
							src={griditem.backgroundImage}
							alt={griditem.name}
							width="40px"
							height="40px"
						/>
					{/if}
				</div>
			{/each}
		{/each}
	</div>
</main>

<style>
	.board {
		width: 400px;
		display: flex;
		flex-wrap: wrap;
	}
	.gridItem {
		width: 50px;
		height: 50px;
	}
</style>
