<script>
	import { draggable } from '@neodrag/svelte';
	import GripVertical from 'tabler-icons-svelte/icons/GripVertical.svelte';

	export let data;
	export let loading = false;
	export let isAutoRefresh = false;

	let url;
	$: {
		let usp = new URLSearchParams(data);
		url = `/og?${usp.toString()}`;
	}
</script>

<form use:draggable={{ cancel: 'input, label' }}>
	<div class="grip-icon">
		<GripVertical size="1rem" />
	</div>
	<label>
		Title:
		<textarea rows=4 class="cancel-drag" placeholder="<title>" bind:value={data.title}></textarea>
	</label>
	<label>
		Image:
		<input class="cancel-drag" type="text" bind:value={data.image} placeholder="url to an image" />
	</label>
	<div class="rating">
		<label>
			Rating (0-5):
			<input
				class="cancel-drag"
				type="number"
				min="0"
				max="5"
				bind:value={data.ratings}
				placeholder="5"
			/>
		</label>
		<label>
			Rating Anzahl:
			<input
				class="cancel-drag"
				type="number"
				min="0"
				bind:value={data.ratings_count}
				placeholder="25"
			/>
		</label>
	</div>
	<label class="checkbox">
		<input class="cancel-drag" type="checkbox" bind:checked={data.variants} />
		Varianten-Badge?
	</label>

	<hr />
	<label class="checkbox">
		<input type="checkbox" bind:checked={isAutoRefresh} />
		auto-refresh image (every 4 seconds)
	</label>

	<div class="links">
		<a href={url} target="_blank" rel="noreferrer" style="align-self: flex-start;">open og image ⤴️</a>
	</div>

	{#if loading}<div class="loading">loading</div>{/if}
</form>

<style>
	a {
		color: #fff;
	}
	form {
		position: absolute;
		top: 1rem;
		right: 1rem;
		border: 2px solid var(--primary);
		border-radius: 5px;
		padding: 1rem;
		color: #fff;
		font-size: 80%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		background: rgb(0 0 0 / 72%);
		z-index: 100;
		backdrop-filter: blur(10px);
		cursor: grab;
	}

	.grip-icon {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		pointer-events: none;
	}

	label {
		display: flex;
		flex-direction: column;
		text-transform: uppercase;
		font-weight: 600;
	}
	input[type='text'],
	input[type='number'],
	textarea {
		border: 1px solid var(--primary);
		background-color: rgba(0, 0, 0, 0.656);
		color: #fff;
		padding: 0.5em;
		font-weight: normal;
	}

	.loading {
		position: absolute;
		bottom: 0;
		right: 0;
	}

	.checkbox {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
	}

	.rating {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
	}
	.rating > * {
		flex: 1;
	}

	.links {
		display: flex;
		justify-content: space-between;
	}
</style>
