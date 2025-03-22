/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				"nbg": "#FEFEFE",
				"nfg": "#070707",
			},
		},
	},
	plugins: [],
}
