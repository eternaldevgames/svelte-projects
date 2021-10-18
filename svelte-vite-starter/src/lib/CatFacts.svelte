<script>
	import { onMount } from "svelte";

	let promise;
	onMount(async () => {
		promise = getRandomCatFacts();
	});

	const getRandomCatFacts = async () => {
		const res = await fetch("https://catfact.ninja/fact");
		const json = await res.json();

		if (json.fact) {
			return json.fact;
		} else {
			throw new Error("Not found any interesting facts");
		}
	};

	const reload = () => {
		promise = getRandomCatFacts();
	};
</script>

<main>
	<h1>Cat Facts</h1>
	<div class="cat-fact-container">
		{#await promise}
			<p>...loading...</p>
		{:then fact}
			<p>{fact}</p>
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}
	</div>

	<button on:click={() => reload()}>One more fact</button>
</main>

<style>
	.cat-fact-container {
		border: 0.2rem solid #ccc;
		padding: 5rem;
		margin: 2rem;
		border-radius: 1rem;
		background-color: beige;
	}

	button {
		padding: 1rem 2rem;
		background-color: olive;
		color: white;
		font-weight: bold;
		text-transform: uppercase;
		border: 0px;
		border-radius: 1rem;
		box-shadow: 2px 2px 5px grey;
	}
</style>
