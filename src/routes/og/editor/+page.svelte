<script>
	import { browser, dev } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { extractSearchParams } from '../extract-params';
	import Form from './form.svelte';

	let renderparams = extractSearchParams($page.url.searchParams);
	let isAutoRefresh = dev;
	let refreshTimeout;

	if (browser) {
		onMount(() => {
      // kick off refresh loop
			isAutoRefresh && doRefresh(0);
			return () => {
				clearTimeout(refreshTimeout);
			};
		});
	}

	$: loading = !!(previewURL || renderparams.__refreshKey);

	// keep previewURL to to date (used for link in <Form>)
	$: previewURL = buildOGImageUrl(renderparams);

	// goto new url whenever a render parameter changes
	$: {
		let renderparamsWithoutUndefined = removeEmpty(renderparams);
		let usp = new URLSearchParams(renderparamsWithoutUndefined);
		let editorUrl = `/og/editor?${usp.toString()}`;
		if (browser && location.search !== editorUrl)
			goto(editorUrl, { replaceState: true, keepFocus: true });
	}

	/**
	 * Event handler for image onload.
	 */
	function onLoad() {
		loading = false;
	}

	/**
	 * Build URL to the image
	 * appends &debug=1 and &__t=<currentTime>
	 * @param {Object} renderparams
	 */
	function buildOGImageUrl(renderparams) {
		let filtered = removeEmpty(renderparams);
		filtered.push(['debug', 1]);
		filtered.push(['__t', new Date().toISOString()]); // cachebust
		let usp = new URLSearchParams(filtered);
		return `/og/?${usp.toString()}`;
	}

	/**
	 * Do refresh.
	 * Implemented as a timeout loop for easier control.
	 * Will call doRefresh again if the tab is visible and isAutoRefresh is `true`
	 * @param {number} inc incrementer. gets appended to renderparams for url to change
	 */
	function doRefresh(inc) {
		clearTimeout(refreshTimeout);
		refreshTimeout = setTimeout(() => {
			if (isAutoRefresh && document.visibilityState === 'visible') {
				inc++;
				renderparams.__refreshKey = inc;
			}
			doRefresh(inc);
		}, 4000);
	}

	/**
	 * Remove keys with null or undefined values from object
	 * @param {Object} obj the object to remove from
	 * @param {boolean} returnArray if true, will return an array. otherwise object.
	 * @returns {Object} obj cleaned from null and undefined
	 */
	function removeEmpty(obj, asArray = false) {
		const cleaned = Object.entries(obj).filter(([_, v]) => v != null);
		return asArray ? Object.fromEntries(cleaned) : cleaned;
	}
</script>

<div class="preview-page">
	<Form bind:data={renderparams} {loading} bind:isAutoRefresh />

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
