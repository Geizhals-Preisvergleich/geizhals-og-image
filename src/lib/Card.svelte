<script>
	export let renderparams;
	let { title, image } = renderparams;
	if (title == '') title = '<title>';
</script>

<div class="cardroot">
	<div class="card">
		<div class="title">
			{title}
		</div>
		<div class="price">
			<span class="price-from">ab</span>
			<span class="price-price">€ 123,44</span>
		</div>
		<img
			class="gh-logo"
			width="602"
			height="177"
			src="https://gzhls.at/b/brands/geizhals.svg"
			alt=""
		/>
		{#if image}
			<img class="product-image" src={image} alt="" />
		{:else}
			<div class="placeholder-image">&#8249;image&#8250;</div>
		{/if}
	</div>
</div>

<style>
	.cardroot {
		display: flex;
		height: 100%;
		width: 100%;
		padding: 6px;
		justify-content: center;
		align-items: center;
		background: linear-gradient(to left, #d53a9d, #5c9ed5);
	}

	.card {
		position: relative;
		width: 100%;
		height: 100%;
		background-color: #fff;
		display: flex;
		border-radius: 14px;
		align-items: center;
	}

	.card * {
		word-break: break-all;
	}

	.title {
		font-family: 'Inter';
		font-size: 52px;
		font-weight: 900;
		margin: 0;
		margin-left: 350px;
		margin-right: 18px;
		color: #004780;
		line-height: 60px;
		display: flex;
		flex-direction: column;
	}

	.price {
		font-size: 0.8em;
		display: flex;
		margin-top: 0.75em;
		position: absolute;
		left: 350px;
		top: 400px;
		flex-direction: column;
	}
	.price-from {
		color: #666;
		font-weight: 600;
		margin-right: 0.5em;
		font-size: 30px;
	}
	.price-price {
		color: #004780;
		font-weight: 900;
		font-size: 52px;
	}

	img.product-image,
	.placeholder-image {
		position: absolute;
		top: 50%;
		height: 320px;
		width: 320px;
		left: 10px;
		object-fit: contain;
		transform: translateY(-50%);
	}

	.placeholder-image {
		background-color: #ddd;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.gh-logo {
		position: absolute;
		top: 20px;
		right: 20px;
		transform: scale(0.4);
		transform-origin: top right;
	}
</style>
