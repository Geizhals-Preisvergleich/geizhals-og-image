import { error } from '@sveltejs/kit';
import { JSDOM } from 'jsdom';


let baseUrl = 'http://ogimage.ghwb/';
let baseUrlPostfix = '?gh_beta=ogimage';


/** @type {import('./$types').PageServerLoad} */
export async function load({}) {
	let dom = await fetchPageAsDom(baseUrl);

	// console.log(dom.window.document.querySelector('.secondary-nav-item.deals-link').textContent); // "Hello world"
	let top10links = dom.window.document.querySelectorAll('#gh_m_top .line-clamp a');

	let images = await getImages(top10links);

	return {
		images
	};

	throw error(404, 'Not found');
}

async function getImages(links) {
	let collectedImages = [];

	let promises = [...links].map((link) => {
		return fetchPageAsDom(baseUrl + link + baseUrlPostfix);
	});

	let results = await Promise.all(promises);

	results.forEach((pageDOM) => {
		let image = pageDOM.window.document
			.querySelector('meta[property="og:image"]')
			.getAttribute('content');
		collectedImages.push(image);
	});

	return collectedImages;
}

async function fetchPageAsDom(url) {
	let r = await fetch(url);
	let text = await r.text();
	let dom = new JSDOM(text);
	return dom;
}
