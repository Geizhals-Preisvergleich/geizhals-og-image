import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import fs from 'fs';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), rawFonts(['.ttf', '.woff'])],
	resolve: {
		alias: {
			// these are the aliases and paths to them
			$utils: path.resolve('./src/lib/utils')
		}
	},
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import 'src/styles/variables.scss';
        `,
      },
    },
  },
};

// see https://geoffrich.net/posts/svelte-social-image/
function rawFonts(ext) {
	return {
		name: 'vite-plugin-raw-fonts',
		transform(code, id) {
			if (ext.some((e) => id.endsWith(e))) {
				const buffer = fs.readFileSync(id);
				return {
					code: `export default ${JSON.stringify(buffer)}`,
					map: null
				};
			}
		}
	};
}

export default config;
