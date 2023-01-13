import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

import Inter from '$lib/fonts/Inter-Regular.woff';
import InterBold from '$lib/fonts/Inter-Bold.woff';
import InterExtraBold from '$lib/fonts/Inter-ExtraBold.woff';

import { html as toReactNode } from 'satori-html';
import Card from '$lib/Card.svelte';
import { error } from '@sveltejs/kit';
import { extractSearchParams } from './extract-params';

const height = 630;
const width = 1200;

/** @type {import('./$types').RequestHandler } */
export const GET = async (event) => {
	let searchParams = event.url.searchParams;

	// validating origin
	// TODO: this does not really work as we're not getting an origin from consuming applications AFAICT
	// validateOrigin(event);

	let renderparams = extractSearchParams(searchParams);

	// Credit: the SSR rendering part is based on https://github.com/geoffrich/sveltekit-og-post
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
 * Validate allowed origins.
 * FIXME: this does not work as most(?) consumers do not provide an origin
 * TODO: do more logging around origins
 * TODO: move allowlist to config or env var
 * @param {import(./$types).RequestEvent } event
 * @returns {boolean} `true` if origin is in the allowlist (specified locally here)
 */
function validateOrigin(event) {
	let allowed = false;
	let allowlist = ['https://geizhals.at', 'https://geizhals.at'];
	let origin = event.request.headers.get('origin');

	if (origin == null) allowed = true;
	if (allowlist.includes(origin)) allowed = true;

	if (!allowed) throw error(405, `Not allowed. Invalid origin "${origin}".`);
}
