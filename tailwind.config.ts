import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    {
      pattern:
        /bg-(black|blue|green|orange|red|mak-teal|yellow|zinc)-(50|100|200|300|400|500|600|700|800|900|950)/,
      variants: ["hover"],
    },
    {
      pattern: /bg-(white|black)/,
      variants: ["hover"],
    },
    {
      pattern:
        /text-(black|blue|green|orange|red|mak-teal|white|yellow|zinc)-(50|100|200|300|400|500|600|700|800|900|950)/,
      variants: ["hover"],
    },
    {
      pattern:
        /border-(black|blue|green|orange|red|mak-teal|white|yellow|zinc)-(50|100|200|300|400|500|600|700|800|900|950)/,
      variants: ["hover"],
    },
    {
      pattern:
        /ring-(black|blue|green|orange|red|mak-teal|white|yellow|zinc)-(50|100|200|300|400|500|600|700|800|900|950)/,
      variants: ["focus"],
    },
  ],
  theme: {
    colors: {
      mak: {
        teal: {
          50: "#e6f3f4",
          100: "#e6f3f4",
          200: "#acd6dc",
          300: "#73bac3",
          400: "#399eab",
          500: "#008292",
          600: "#006571",
          700: "#004850",
          800: "#002a2f",
          900: "#000d0f",
          950: "#000d0f",
        },
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
}
export default config
