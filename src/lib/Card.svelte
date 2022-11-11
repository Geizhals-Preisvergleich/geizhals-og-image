<script>
	import { dev } from '$app/environment';

	export let renderparams;

	let { title, ximage: image, variants, ratings, ratings_count } = renderparams;
	if (title == '') title = '<title>';

	function validImage(url) {
		return url.includes('https://');
	}
</script>

<div class="cardroot" class:debug={dev}>
	<div class="card">
		{#if image && validImage(image)}
			<img class="product-image" src={image} alt="" />
		{:else}
			<div class="placeholder-image">&#8249;image&#8250;</div>
		{/if}

		<div class="main">
			<div class="title">
				{title}
			</div>
			<div class="meta">
				{#if ratings && ratings_count}
					<div class="ratings">
						<span class="stars-wrap">
							<span class="stars stars-0">
								{#each Array.from({ length: 5 }) as star}★{/each}
							</span>
							<span class="stars stars-1">
								{#each Array.from({ length: 5 }) as star}★{/each}
							</span>
							<span class="stars stars-2" style:width="{(ratings / 5) * 100}%">
                <span class="inner">
                  {#each Array.from({ length: 5 }) as star}★{/each}
                </span>
							</span>
						</span>
						<span class="ratings_count">
							{ratings} / {ratings_count} Bewertungen
						</span>
					</div>
				{/if}
				{#if variants}
					<div class="variants">Varianten</div>
				{/if}
			</div>
		</div>

		<div class="footer">
			<img
				class="gh-logo"
				width="602"
				height="177"
				src="https://gzhls.at/b/brands/geizhals.svg"
				alt=""
			/>
			<div class="gh-wordmark">Vertrauen ist gut, vergleichen ist besser.</div>
		</div>
	</div>
</div>

<style>
	.cardroot {
		display: flex;
		height: 100%;
		width: 100%;
		padding: 14px;
		justify-content: center;
		align-items: center;
		background: linear-gradient(to left, #d53a9d, #5c9ed5);
		font-size: 24px;
	}
	.cardroot.debug * {
		/* border: 1px solid #ddd; */
	}

	.card {
		position: relative;
		width: 100%;
		height: 100%;
		background-color: #fff;
		border-radius: 18px;
		align-items: center;
		justify-content: flex-start;
		flex: 1;
	}

	.cardroot * {
		display: flex;
		word-break: normal;
	}

	.main {
		flex-direction: column;
		/* border: 1px solid blue; */
		margin-right: 350px;
		position: absolute;
		left: 20px;
		top: 20px;
    bottom: 120px;
		width: 65%;
		z-index: 1;
		align-items: flex-start;
    justify-content: center;
	}

	.meta {
		align-items: flex-start;
		flex-direction: column;
		display: flex;
		font-size: 30px;
		color: #333;
		font-weight: normal;
		margin-top: 1rem;
		padding-right: 20px;
		max-width: 70%;
		text-align: right;
	}

	.ratings {
		text-align: right;
		align-items: center;
	}

	.stars-wrap {
		position: relative;
	}
	.stars {
		color: rgb(192, 192, 192);
		font-size: 40px;
		position: absolute;
		left: 0;
		text-align: left;
	}

	.stars-0 {
		position: relative;
		opacity: 0;
	}

	.stars-2 {
		height: 1em;
		overflow: hidden;
		color: rgb(243, 174, 0);
	}
  .stars-2 .inner {
    position: absolute;
  }

	.ratings_count {
		margin-left: 1rem;
	}

	.variants {
		background-color: #0070cc;
		color: #fff;
		text-transform: uppercase;
		font-size: 26px;
		padding: 5px 12px ;
    border-radius: 5px;
		font-weight: 600;
		margin-top: 0.5rem;
	}

	.title {
		font-family: 'Inter';
		font-size: 54px;
		font-weight: 900;
		margin: 0;
		color: #004780;
		line-height: 1.2em;
		max-height: 280px;
		display: flex;
		/* text-overflow: ellipsis;
    white-space: nowrap; */
		overflow: hidden;
		text-align: left;
		/* background-color: #005599; */
		/* background-color: rgba(255, 255, 255, 0.8); */
		/* color: #fff; */
		padding: 20px;
		padding-left: 0;
	}

	img.product-image,
	.placeholder-image {
		position: absolute;
		top: 50%;
		margin-top: -20px;
		transform: translateY(-50%);
		right: 20px;
		width: 400px;
		height: 400px;
		object-fit: contain;
	}

	.placeholder-image {
		background-color: #ddd;
		align-items: center;
		justify-content: center;
	}

	.footer {
		position: absolute;
		bottom: 20px;
		left: 20px;
		right: 20px;
		align-items: flex-end;
		justify-content: space-between;
		color: #666;
	}
	.gh-logo {
		transform: scale(0.45);
		transform-origin: bottom left;
	}

	.gh-wordmark {
	}
</style>
