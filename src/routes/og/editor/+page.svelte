<script>
	import { browser, dev } from '$app/environment';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { extractSearchParams } from '../extract-params';
	let renderparams = extractSearchParams($page.url.searchParams);
	import Inputs from './inputs.svelte';

	$: previewURL = buildOGImageUrl(renderparams);

	function buildOGImageUrl(renderparams) {
    let filtered = Object.entries(renderparams).filter(el => el[1] != undefined);
		let usp = new URLSearchParams(filtered);
		return `/og/?${usp.toString()}`;
	}

	$: loading = previewURL || renderparams.refreshKey ? true : false;

	function onLoad() {
		loading = false;
	}

	let autoRefresh = dev;
	let refreshTimeout;

	if (browser) {
		onMount(() => {
			doRefresh(0);
			return () => {
				clearTimeout(refreshTimeout);
			};
		});
	}

	function doRefresh(inc) {
		clearTimeout(refreshTimeout);
		refreshTimeout = setTimeout(() => {
			if (autoRefresh && document.visibilityState === 'visible') {
        inc++;
				renderparams.refreshKey = inc;
			}
			doRefresh(inc);
		}, 4000);
	}
</script>

<div class="preview-page">
	<Inputs bind:data={renderparams} {loading} bind:autoRefresh />

	<div class="preview">
		{#if previewURL}
			<img src={previewURL} on:load={onLoad} alt="OG Preview" />
		{/if}
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

	.preview-page {
		position: relative;
		background-color: rgb(16, 5, 12);
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		color: #fff;
	}
	.preview {
		height: 630px;
		width: 1200px;
		resize: both;
		overflow: hidden;
		position: relative;
	}
</style>
