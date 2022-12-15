import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { env } from '$env/dynamic/private';

import Inter from '$lib/fonts/Inter-Regular.woff';
import InterBold from '$lib/fonts/Inter-Bold.woff';
import InterExtraBold from '$lib/fonts/Inter-ExtraBold.woff';

import { html as toReactNode } from 'satori-html';
import Card from '$lib/Card.svelte';
import { error, redirect } from '@sveltejs/kit';
import { extractSearchParams } from './extract-params';
import { dev } from '$app/environment';

const height = 630;
const width = 1200;

/** @type {import('./$types').RequestHandler } */
export const GET = async (event) => {
	let searchParams = event.url.searchParams;

	// validating origin
  // TODO: this does not really work as we're not getting an origin from consuming applications AFAICT
	// validateOrigin(event);

	validateKey(searchParams.get('key'), searchParams.get('debug'));

	let renderparams = extractSearchParams(searchParams);

	// renders the component (as string)
	const result = Card.render({
		renderparams
	});

	const element = toReactNode(`${result.html}<style>${result.css.code}</style>`);

	const svg = await satori(element, {
		fonts: [
			{
				name: 'Inter',
				data: Buffer.from(Inter),
				style: 'normal',
				weight: 400
			},
			{
				name: 'Inter',
				data: Buffer.from(InterBold),
				style: 'normal',
				weight: 700
			},
			{
				name: 'Inter',
				data: Buffer.from(InterExtraBold),
				style: 'normal',
				weight: 900
			}
		],
		height,
		width
	});

	const resvg = new Resvg(svg, {
		fitTo: {
			mode: 'width',
			value: width
		}
	});

	const image = resvg.render();

	return new Response(image.asPng(), {
		headers: {
			'content-type': 'image/png',
			'Cache-Control': 'max-age=60'
		}
	});
};

/**
 * Validate the provided key from the URL against
 * the KEY defined in environment
 * @param {string|null} keyFromUrlParams
 * @param {string|null} debug
 */
function validateKey(keyFromUrlParams, debug) {
	if (dev || debug == '1') return true;

	if (typeof env.KEY === 'undefined') {
		throw error(500, 'Server misconfiguration: env.KEY is missing.');
	}

	if (env.KEY !== keyFromUrlParams) {
		throw error(405, 'Not allowed. Missing or wrong key.');
	}
}

function validateOrigin(event) {
	let allowed = false;
	let allowlist = ['https://geizhals.at', 'https://geizhals.at'];
	let origin = event.request.headers.get('origin');

	if (origin == null) allowed = true;
	if (allowlist.includes(origin)) allowed = true;

	if (!allowed) throw error(405, `Not allowed. Invalid origin "${origin}".`);
}
