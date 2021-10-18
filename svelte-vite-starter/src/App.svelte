<script lang="ts">
  import logo from './assets/svelte.png'
import CatFacts from './lib/CatFacts.svelte';
</script>

<main>
  <img src={logo} alt="Svelte Logo" />

  <CatFacts />
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  img {
    height: 16rem;
    width: 16rem;
  }
</style>
