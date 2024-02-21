"use client"

import { useMakUi } from "../_hooks/useMakUi/context/MakUiContext"
import { mak } from "../_hooks/useMakUi/elements/ts/mak"
import styled from "@emotion/styled"

// {
//   "background-image": "linear-gradient(to bottom, var(--gradient-stops))",
//   "&.from-primary": {
//     "--gradient-stops": "var(--gradient-from), var(--gradient-to)",
//     "--gradient-from":
//       "var(--gradient-from-color) var(--gradient-from-position, 0%)",
//     "--gradient-from-color": "#731AFF",
//     "--gradient-to":
//       "var(--gradient-to-color) var(--gradient-to-position, 100%)",
//     "--gradient-to-color": "#00EAB3",
//   },
//   "&.hover\\:from-warning:hover": {
//     "--gradient-to":
//       "var(--gradient-to-color) var(--gradient-to-position, 100%)",
//     "--gradient-to-color": "#EE4444",
//   },
//   "&.to-secondary": {
//     "--gradient-to":
//       "var(--gradient-to-color) var(--gradient-to-position, 100%)",
//   },
// }
const StyledGradient = styled.div({
  "background-image": "linear-gradient(to right, var(--gradient-stops))",
  "&.from-secondary": {
    "--gradient-stops": "var(--gradient-from), var(--gradient-to)",
    "--gradient-from": "#00EAB3 var(--gradient-from-position, 0%)",
    "--gradient-to": "#0BA5EC var(--gradient-to-position, 100%)",
  },
  "&.to-danger": {
    "--gradient-to": "#EE4444 var(--gradient-to-position, 100%)",
  },
  "&.to-80\\%": {
    "--gradient-to-position": "80%",
  },
  "&.hover\\:to-info:hover": {
    "--gradient-to": "#0BA5EC var(--gradient-to-position, 100%)",
  },
  "&.hover\\:to-20\\%:hover": {
    "--gradient-to-position": "20%",
  },
})

const GradientView = () => {
  const { verboseTheme } = useMakUi()

  return (
    <div className="flex h-full w-full items-center justify-center flex-col gap-4">
      tw
      <span className="flex h-20 w-80 bg-gradient-to-r from-purple-500 from-[-100%]" />
      {/* mak */}
      {/* <mak.span makClassName="flex h-20 w-full bg-gradient-to-r from-indigo-500 from-20% via-sky-500 via-30% to-emerald-500 to-90%" /> */}
      {/* styled
      <mak.span
        className="fade-in-out flex h-20 w-80"
        makClassName="bg-gradient-to-r from-primary-500 from-10% to-dark-200 to-80%"
        // makClassName="bg-primary hover:bg-secondary"
      /> */}
      styled 2
      <mak.span makClassName="flex h-20 w-80 bg-gradient-to-r from-tertiary-700 from-60% hover:from-20% to-warning to-90% hover:to-120% hover:to-info" />
      {/* styled gradient */}
      <StyledGradient className="flex h-20 w-80 from-secondary bg-gradient-to-r to-danger to-80% hover:to-info hover:to-20%" />
    </div>
  )
}

export default GradientView
