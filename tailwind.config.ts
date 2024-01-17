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
        /bg-(black|blue|green|orange|red|ovai-purple|ovai-teal|yellow|zinc)-(50|100|200|300|400|500|600|700|800|900|950)/,
      variants: ["hover"],
    },
    {
      pattern: /bg-(white|black)/,
      variants: ["hover"],
    },
    {
      pattern:
        /text-(black|blue|green|orange|red|ovai-purple|ovai-teal|white|yellow|zinc)-(50|100|200|300|400|500|600|700|800|900|950)/,
      variants: ["hover"],
    },
    {
      pattern:
        /border-(black|blue|green|orange|red|ovai-purple|ovai-teal|white|yellow|zinc)-(50|100|200|300|400|500|600|700|800|900|950)/,
      variants: ["hover"],
    },
    {
      pattern:
        /ring-(black|blue|green|orange|red|ovai-purple|ovai-teal|white|yellow|zinc)-(50|100|200|300|400|500|600|700|800|900|950)/,
      variants: ["focus"],
    },
  ],
  theme: {
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
