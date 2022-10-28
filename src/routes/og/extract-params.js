/**
 * grab all required fields from searchparams
 * @param {URLSearchParams} searchParams
 * @returns {object}
 */
export function extractSearchParams(searchParams) {
	let renderparams = {
		title: searchParams.get('title') ?? undefined,
		image: searchParams.get('image') ?? undefined,
		variants: searchParams.get('variants') ?? undefined,
		ratings: searchParams.get('ratings') ?? undefined,
		ratings_count: searchParams.get('ratings_count') ?? undefined
	};
	return renderparams;
}
