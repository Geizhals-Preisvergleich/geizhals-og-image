<script>

  let image = "https://geizhals-og-image.vercel.app/og?title=Nintendo+Switch+schwarz%2Fgrau+%282019%29+dfef&ximage=https%3A%2F%2Fgzhls.at%2Fi%2F54%2F42%2F2135442-n0.jpg&key=123456"

</script>

<svelte:head>
	<title>metatag test</title>
	<meta name="title" content="metatag test" />
	<meta name="description" content="this is a test for metatag" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://geizhals-og-image.vercel.app/" />
	<meta property="og:title" content="metatag test" />
	<meta property="og:description" content="this is a test for metatag" />
	<meta
		property="og:image"
		content="{image}"
	/>

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://geizhals-og-image.vercel.app/" />
	<meta property="twitter:title" content="metatag test" />
	<meta property="twitter:description" content="this is a test for metatag" />
	<meta
		property="twitter:image"
		content="{image}"
	/></svelte:head
>
