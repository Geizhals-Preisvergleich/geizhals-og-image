# Geizhals OG Images

Experiment to leverage [satori](https://github.com/vercel/satori) and SvelteKit to generate dynamic [open graph](https://ogp.me/) images for Geizhals product pages. This application houses both the image generation part as well as an [Editor](#editor) for testing/debugging purposes.

![og](https://user-images.githubusercontent.com/465547/212314944-0298eb64-5330-419a-8bf3-d2195a26ee63.png)

The content of the generated image can be set by specifying GET parameters (eg. /og?title=this%20is%20a%20title).

## Customizing

To change the content and design of the og image, modify the contents of [src/lib/Card.svelte](./src/lib/Card.svelte).

### Inputs/Parameters

The list of parameters is defined in [src/routes/og/extract-params.js](./src/routes/og/extract-params.js). Changes to the parameters also need to be applied to the markup in Card.svelte as well as in Form.svelte (for the editor).

### Fonts

This example uses Inter font. If you want to use a different font, place the woff files in $lib/fonts and load them in [src/routes/og/+server.js](./src/routes/og/+server.js).


## Run dev server

Install dependencies with `npm install` (or `pnpm install` or `yarn`), then start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

By default, the dev server will available at http://localhost:5173/

## Images

With the (dev) server running, visit http://localhost:5173/og?title=Nintendo+Switch+OLED+schwarz%2Fwei%C3%9F&image=https%3A%2F%2Fgzhls.at%2Fi%2F76%2F69%2F2557669-n0.jpg&variants=true&ratings=5&ratings_count=7

## Editor

![editor](https://user-images.githubusercontent.com/465547/212315043-3659cee8-4ce3-4d26-9012-850a37094699.png)

For better testing and developing, a simple editor interface can be found at http://localhost:5173/og/editor/

When any of the inputs values change, the image is re-generated. While working on the Card.svelte component, you can also activate "Auto Refresh", which will refresh the image every 4 seconds to show the result of Card.svelte with the current parameters.

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Preliminary work

- SvelteKit project setup is based on [`SvelteKit Starter (Preprocess, PostCSS, AutoPrefixer)`](https://stackblitz.com/edit/sveltejs-kit-template-default-stn1sy).
- [satori](https://github.com/vercel/satori) by vercel
- [satori-html](https://github.com/natemoo-re/satori-html) by Nate Moore / Astro
- [Create dynamic social card images with Svelte components](https://geoffrich.net/posts/svelte-social-image/) by [Geoff Rich](https://geoffrich.net/)

