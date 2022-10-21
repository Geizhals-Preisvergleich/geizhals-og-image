<script>
	import Card from '$lib/Card.svelte';
</script>

<div class="preview">
	<h1>Preview:</h1>

	<div class="card">
		<Card />
	</div>
</div>

<style>
	@font-face {
		font-family: 'Noto Sans';
		src: url('/src/lib/NotoSans-Regular.ttf');
	}

	.preview {
		background-color: #333;
    color: #bada55;
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
