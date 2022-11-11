/**
 * grab all required fields from searchparams
 * @param {URLSearchParams} searchParams
 * @returns {object}
 */
export function extractSearchParams(searchParams) {
	let renderparams = {
		title: searchParams.get('title') ?? undefined,
		ximage: searchParams.get('ximage') ?? undefined,
		variants: searchParams.get('variants') === 'true' ? true : false,
		ratings: searchParams.get('ratings') ?? undefined,
		ratings_count: searchParams.get('ratings_count') ?? undefined,
	};
	return renderparams;
}
