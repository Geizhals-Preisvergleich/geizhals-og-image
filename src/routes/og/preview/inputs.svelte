<script>

	export let data;

  let url;
  $: {
    let usp = new URLSearchParams(data);
    url = `/og?${usp.toString()}`
  }
</script>

<form>
	<label>
		Title:
		<input type="text" bind:value={data.title} placeholder="<title>"/>
	</label>
	<label>
		Image:
		<input type="text" bind:value={data.image} placeholder="url to an image"/>
	</label>

  <a href={url} target="_blank">open og image</a>
</form>

<style>
  a {
    color: #fff;
  }
	form {
		position: absolute;
		top: 1rem;
		border: 1px solid #fff;
		border-radius: 5px;
		padding: 1rem;
		color: #fff;
		font-size: 80%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	label {
		display: flex;
		flex-direction: column;
		text-transform: uppercase;
		font-weight: 600;
	}
	input[type='text'] {
		border: 1px solid #fff;
    background-color: #444;
    color: #fff;
		padding: 0.5em;
		width: 50ch;
		font-weight: normal;
	}
</style>
