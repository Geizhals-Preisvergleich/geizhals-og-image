<script>
	export let data;
</script>

<ul>
	{#each data.images as image}
		<li><img alt="" src={image} /></li>
	{/each}
</ul>

<style>
  ul {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(3, 500px);
    gap: 1rem;
    margin: 0;
    padding: 0;
  }
</style>
