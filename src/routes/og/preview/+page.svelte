<script>
	import { page } from '$app/stores';
	import Card from '$lib/Card.svelte';
	import { extractSearchParams } from '../extract-params';
	let renderparams = extractSearchParams($page.url.searchParams);
  import Inputs from './inputs.svelte'
</script>

<div class="preview">

  <Inputs bind:data={renderparams} />

	<div class="card">
		{#key renderparams}
			<Card {renderparams} />
		{/key}
	</div>
</div>

<style>
	@font-face {
		font-family: 'Inter';
		src: url('/src/lib/fonts/Inter-Regular.woff');
		font-weight: 400;
	}
	@font-face {
		font-family: 'Inter';
		src: url('/src/lib/fonts/Inter-Bold.woff');
		font-weight: 700;
	}
	@font-face {
		font-family: 'Inter';
		src: url('/src/lib/fonts/Inter-ExtraBold.woff');
		font-weight: 900;
	}

	.preview {
		background-color: rgb(16, 5, 12);
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.card {
		height: 630px;
		width: 1200px;
	}

</style>
