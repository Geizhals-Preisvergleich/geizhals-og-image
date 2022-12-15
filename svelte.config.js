import adapter from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';

const isProduction = process.env.NODE_ENV === 'production' ? true : false;

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	},
	preprocess: [
		preprocess({
			sourceMap: !isProduction,
			scss: {
				// We can use a path relative to the root because
				// svelte-preprocess automatically adds it to `includePaths`
				// if none is defined.
				prependData: `@import 'src/styles/variables.scss';`
			},
			postcss: {
				plugins: [autoprefixer()]
			}
		})
	],
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
