<script>
	let exampleURL = new URLSearchParams();
	exampleURL.set('title', 'Nintendo Switch OLED schwarz/weiß');
	exampleURL.set('image', 'https://gzhls.at/i/76/69/2557669-n0.jpg');
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>hello, this is the GH og:image service</h1>

	<p>
		See <a href="https://github.com/Geizhals-Preisvergleich/geizhals-og-image"
			>https://github.com/Geizhals-Preisvergleich/geizhals-og-image</a
		> or README.md for more details.
	</p>
	<p>
		<strong>Images:</strong> Visit <a href="/og/">/og/</a> for the generated images, e.g.
		<a href="/og?{exampleURL.toString()}">/og?{exampleURL.toString()}</a>
	</p>
	<p>
		<strong>Editor:</strong> Visit <a href="/og/editor/">/og/editor/</a> for the editor. e.g.
		<a href="/og/editor?{exampleURL.toString()}">/og/editor?{exampleURL.toString()}</a>
	</p>
</section>

<style lang="scss">
	section {
		padding: 1rem;
		max-width: 600px;
		margin: 0 auto;
	}

  * + * {
    margin-top: 1rem;
  }
</style>
