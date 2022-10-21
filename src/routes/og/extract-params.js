
/**
 * grab all required fields from searchparams
 * @param {URLSearchParams} searchParams
 * @returns {object}
 */
export function extractSearchParams(searchParams) {
  let renderparams = {
    title: searchParams.get('title') ?? undefined,
    image: searchParams.get('image') ?? undefined,
  }
  return renderparams;
}