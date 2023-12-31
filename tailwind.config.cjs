/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				"nbg": "#1f2227",
				"nfg": "#abb2bf",
				"color0": "#2C323C",
				"color1": "#fa565c",
				"color2": "#98c379",
				"color3": "#e5c07b",
				"color4": "#61afef",
				"color5": "#c678dd",
				"color6": "#56b6c2",
				"color7": "#abb2bf",
			},
		},
	},
	"safelist": [
		"bg-color4",
		"bg-color6",
		"border-color1",
		"border-color2",
		"border-color3",
		"border-color4",
		"border-color5",
		"border-color6",
		"border-color7",
		"text-color1",
		"text-color2",
		"text-color3",
		"text-color4",
		"text-color5",
		"text-color6",
		"text-color7",
	],
	plugins: [],
}
