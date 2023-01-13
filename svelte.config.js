import adapter from '@sveltejs/adapter-vercel';

const isProduction = process.env.NODE_ENV === 'production' ? true : false;

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	},
	vitePlugin: {
		experimental: {
			inspector: {
				showToggleButton: 'always',
				toggleButtonPos: 'bottom-right'
			}
		}
	}
};

export default config;
