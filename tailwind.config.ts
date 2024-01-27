import type { Config } from "tailwindcss"
const plugin = require("tailwindcss/plugin")

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    "dark",
    {
      pattern: /^(bg|border|ring|text|)-(white|black)/,
    },
    {
      // Backgrounds
      pattern:
        /^bg-(mak-teal|sky|blue|purple|fuchsia|zinc|green|emerald|red|yellow)-[^/]+$/,
      variants: [
        "dark",
        "hover",
        "disabled",
        "group-hover",
        "peer-checked",
        "before",

        "after",

        "after:peer-checked",

        "peer-disabled",
        "checked",
      ],
    },
    {
      // Borders
      pattern:
        /^border-(mak-teal|sky|blue|purple|fuchsia|zinc|green|emerald|red|yellow)-[^/]+$/,
      variants: [
        "dark",
        "hover",
        "disabled",
        "group-hover",
        "peer-checked",
        "peer-disabled",
        "checked",
      ],
    },
    {
      // Ring Color
      pattern:
        /^ring-(mak-teal|sky|blue|purple|fuchsia|zinc|green|emerald|red|yellow)-[^/]+$/,
      variants: [
        "dark",
        "hover",
        "disabled",
        "group-hover",
        "peer-checked",
        "peer-disabled",
        "checked",
      ],
    },
    {
      // Text Color
      pattern:
        /^text-(mak-teal|sky|blue|purple|fuchsia|zinc|green|emerald|red|yellow)-[^/]+$/,
      variants: [
        "dark",
        "hover",
        "disabled",
        "group-hover",
        "peer-checked",
        "peer-disabled",
        "checked",
      ],
    },
    // {
    //   pattern:
    //     /bg-(black|blue|green|orange|red|mak-teal|yellow|zinc|purple)-(50|100|200|300|400|500|600|700|800|900|950)/,
    //   variants: ["hover", "focus", "disabled"],
    // },
    // {
    //   pattern: /bg-(white|black)/,
    //   variants: ["hover", "focus", "disabled"],
    // },
    // {
    //   pattern:
    //     /text-(black|blue|green|orange|red|mak-teal|white|yellow|zinc|purple)-(50|100|200|300|400|500|600|700|800|900|950)/,
    //   variants: ["hover", "focus", "disabled"],
    // },
    // {
    //   pattern:
    //     /border-(black|blue|green|orange|red|mak-teal|white|yellow|zinc|purple)-(50|100|200|300|400|500|600|700|800|900|950)/,
    //   variants: ["hover", "focus", "disabled"],
    // },
    // {
    //   pattern:
    //     /ring-(black|blue|green|orange|red|mak-teal|white|yellow|zinc|purple)-(50|100|200|300|400|500|600|700|800|900|950)/,
    //   variants: ["hover", "focus", "disabled"],
    // },
    // {
    //   pattern:
    //     /ring-offset-(black|blue|green|orange|red|mak-teal|white|yellow|zinc|purple)-(50|100|200|300|400|500|600|700|800|900|950)/,
    //   variants: ["hover", "focus", "disabled"],
    // },
    // {
    //   pattern:
    //     /outline-(black|blue|green|orange|red|mak-teal|white|yellow|zinc|purple)-(50|100|200|300|400|500|600|700|800|900|950)/,
    //   variants: ["hover", "focus", "disabled"],
    // },
  ],
  theme: {
    extend: {
      colors: {
        "mak-black": "#0f0f0f",
        mak: {
          teal: {
            50: "#e6f3f4",
            100: "#e6f3f4",
            200: "#acd6dc",
            300: "#73bac3",
            400: "#399eab",
            500: "#00a7bd",
            600: "#006571",
            700: "#004850",
            800: "#002a2f",
            900: "#000d0f",
            950: "#000d0f",
          },
        },
      },
      dropShadow: {
        "hard-sm": "2.5px 2.5px 1px rgba(0, 0, 0, 0.25)",
      },
      boxShadow: {
        "hard-sm": "inset 0px 0px 3.5px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ addUtilities }: any) {
      /** @type {import('@types/tailwindcss').Utility} */
      const utilities = {
        ".fade-in-out": {
          transition: "all 200ms ease-in-out",
        },
      }

      addUtilities(utilities, ["responsive", "hover"]) // Variants
    }),
  ],
}
export default config

// import type { Config } from "tailwindcss"
// const plugin = require("tailwindcss/plugin")

// const config: Config = {
//   darkMode: "class",
//   content: [
//     "./pages/**/*.{js,jsx,ts,tsx}",
//     "./components/**/*.{js,jsx,ts,tsx}",
//     "./app/**/*.{js,jsx,ts,tsx}",
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   safelist: [
//     {
//       pattern:
//         /((bg)|(text)|(border)|(ring)|(outline)|(ring-offset)|(fill)|(stroke))-(mak-teal)-(300|400|500|600)/,
//       variants: [
//         "hover",
//         "focus",
//         "disabled",
//         "dark:hover",
//         "dark:focus",
//         "dark:disabled",
//       ],
//     },
//     {
//       pattern:
//         /((bg)|(text)|(border)|(ring)|(outline)|(ring-offset)|(fill)|(stroke))-(blue)-(50|200|300|400|500|600|800|900|950)/,
//       variants: [
//         "hover",
//         "focus",
//         "disabled",
//         "dark:hover",
//         "dark:focus",
//         "dark:disabled",
//       ],
//     },
//     {
//       pattern:
//         /((bg)|(text)|(border)|(ring)|(outline)|(ring-offset)|(fill)|(stroke))-(purple)-(300|500|600)/,
//       variants: [
//         "hover",
//         "focus",
//         "disabled",
//         "dark:hover",
//         "dark:focus",
//         "dark:disabled",
//       ],
//     },
//     {
//       pattern:
//         /((bg)|(text)|(border)|(ring)|(outline)|(ring-offset)|(fill)|(stroke))-(zinc)-(50|100|200|300|400|500|600|700|800|900|950)/,
//       variants: [
//         "hover",
//         "focus",
//         "disabled",
//         "dark:hover",
//         "dark:focus",
//         "dark:disabled",
//       ],
//     },
//     {
//       pattern:
//         /((bg)|(text)|(border)|(ring)|(outline)|(ring-offset)|(fill)|(stroke))-(green)-(50|200|300|400|500|600|800|900|950)/,
//       variants: [
//         "hover",
//         "focus",
//         "disabled",
//         "dark:hover",
//         "dark:focus",
//         "dark:disabled",
//       ],
//     },
//     {
//       pattern:
//         /((bg)|(text)|(border)|(ring)|(outline)|(ring-offset)|(fill)|(stroke))-(red)-(50|200|300|400|500|600|800|900|950)/,
//       variants: [
//         "hover",
//         "focus",
//         "disabled",
//         "dark:hover",
//         "dark:focus",
//         "dark:disabled",
//       ],
//     },
//     {
//       pattern:
//         /((bg)|(text)|(border)|(ring)|(outline)|(ring-offset)|(fill)|(stroke))-(yellow)-(50|200|300|400|500|600|800|900|950)/,
//       variants: [
//         "hover",
//         "focus",
//         "disabled",
//         "dark:hover",
//         "dark:focus",
//         "dark:disabled",
//       ],
//     },
//     {
//       pattern:
//         /((bg)|(text)|(border)|(ring)|(outline)|(ring-offset)|(fill)|(stroke))-(white|black)/,
//       variants: [
//         "hover",
//         "focus",
//         "disabled",
//         "dark:hover",
//         "dark:focus",
//         "dark:disabled",
//       ],
//     },
//   ],
//   theme: {
//     extend: {
//       colors: {
//         mak: {
//           teal: {
//             50: "#e6f3f4",
//             100: "#e6f3f4",
//             200: "#acd6dc",
//             300: "#73bac3",
//             400: "#399eab",
//             500: "#008292",
//             600: "#006571",
//             700: "#004850",
//             800: "#002a2f",
//             900: "#000d0f",
//             950: "#000d0f",
//           },
//         },
//       },
//       dropShadow: {
//         "hard-sm": "2.5px 2.5px 1px rgba(0, 0, 0, 0.25)",
//       },
//       boxShadow: {
//         "hard-sm": "inset 0px 0px 3.5px rgba(0, 0, 0, 0.5)",
//       },
//     },
//   },
//   plugins: [
//     require("tailwindcss-animate"),
//     plugin(function ({ addUtilities }: any) {
//       /** @type {import('@types/tailwindcss').Utility} */
//       const utilities = {
//         ".fade-in-out": {
//           transition: "all 200ms ease-in-out",
//         },
//       }

//       addUtilities(utilities, ["responsive", "hover"]) // Variants
//     }),
//   ],
// }
// export default config
