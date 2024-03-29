import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-text": {
          "100": "rgb(240, 240, 240)",
          "200": "rgb(200, 200, 200)",
          "300": "rgb(150, 150, 150)",
          "400": "rgb(125, 125, 125)",
          "500": "rgb(100, 100, 100)",
          "600": "rgb(75, 75, 75)",
        },
        "base-dark": {
          "100": "rgb(12, 12, 12)",
          "200": "rgb(15, 15, 15)",
          "250": "rgb(18, 18, 18)",
          "300": "rgb(20, 20, 20)",
          "400": "rgb(24, 24, 24)",
          "500": "rgb(26, 26, 26)",
          "600": "rgb(30, 30, 30)",
          "700": "rgb(35, 35, 35)",
          "800": "rgb(40, 40, 40)",
          "900": "rgb(50, 50, 50)",
          "950": "rgb(60, 60, 60)",
        }
      }
    }

  },
  plugins: [],
};
export default config;
