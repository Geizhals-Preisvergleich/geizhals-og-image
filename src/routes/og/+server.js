import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

import Inter from '$lib/fonts/Inter-Regular.woff';
import InterBold from '$lib/fonts/Inter-Bold.woff';
import InterExtraBold from '$lib/fonts/Inter-ExtraBold.woff';

import { html as toReactNode } from 'satori-html';
import Card from '$lib/Card.svelte';
import { redirect } from '@sveltejs/kit';

const height = 630;
const width = 1200;

/** @type {import('./$types').RequestHandler } */
export const GET = async (event) => {
	let searchParams = event.url.searchParams;
	let title = searchParams.get('title') ?? undefined;

	// renders the component (as string)
	const result = Card.render({
		title
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
			'content-type': 'image/png'
		}
	});
};
