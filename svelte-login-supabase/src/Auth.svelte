<script>
	import Login from "./Login.svelte";
	import Signup from "./Signup.svelte";

	let currentTab = "Login";

	const changeTab = (tab) => {
		currentTab = tab;
	};
</script>

<main class="container">
	<div class="row flex flex-center">
		<div class="col-4 offset-4 mt-5">
			<div class="row">
				<div class="col tab-heading {currentTab == 'Login' ? 'tab-active': ''}" on:click={() => changeTab("Login")}>
					<span>Login</span>
				</div>
				<div class="col tab-heading {currentTab == 'Signup' ? 'tab-active': ''}" on:click={() => changeTab("Signup")}>
					<span>Create Account</span>
				</div>
			</div>
			{#if currentTab === "Login"}
				<Login />
			{:else}
				<Signup />
			{/if}
		</div>
	</div>
</main>

<style>
	.tab-heading {
		font-weight: bold;
		padding: 1rem;
		background-color: lightgray;
	}

	.tab-active {
		background: black;
		color: white;
	}

	:global(.form-widget) {
		display: flex;
		flex-direction: column;
		gap: 10px;
		background-color: #FEFFDE;
		padding: 3rem;
		border-radius: 0 0 10px 10px;
	}

	:global(.form-widget input[type="submit"]) {
		width: 100%;
		margin-top: 1rem;
	}
</style>
