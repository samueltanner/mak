"use client"

import { mak } from "../_hooks/useMakUi/elements/ts/mak"
import styled from "@emotion/styled"

// backgroundImage: `linear-gradient(to right, var(--gradient-stops))`,
// ".from-abc-500": {
//   "--gradient-from": "#4f46e5 var(--gradient-from-position)",
//   "--gradient-via": "#ffffff var(--gradient-via-position)",
//   "--gradient-to": "#30cfd0 var(--gradient-to-position)",
// },
const StyledGradient = styled.div({
  "&:hover": {
    "background-image": "linear-gradient(to right, var(--gradient-stops))",
  },
  "&.from-10\\%": { "--gradient-from-position": "10%" },
  "&.to-dark-200": {
    "--gradient-to": "#b8b8b8 var(--gradient-to-position)",
  },
  "&.to-80\\%": { "--gradient-to-position": "80%" },
  "&.from-primary-500\\/80": {
    "--gradient-from": "rgba(0,167,189,0.8) var(--gradient-from-position)",
    "--gradient-to": "#b8b8b8 var(--gradient-to-position)",
    "--gradient-stops": "var(--gradient-from), var(--gradient-to)",
  },
})

//   background-image: linear-gradient(
//     to right,
//     rgba(0, 167, 189, 0.8) 0%,
//     #b8b8b8 80%
//   );
// `

const GradientView = () => {
  return (
    <div className="flex h-full w-full items-center justify-center flex-col gap-4">
      mak
      <mak.span makClassName="flex h-20 w-full bg-gradient-to-r from-indigo-500 from-20% via-sky-500 via-30% to-emerald-500 to-90%" />
      styled
      <StyledGradient className="flex h-20 w-80 hover:bg-gradient-to-r from-primary-500/80 from-10% to-dark-200 to-80%" />
    </div>
  )
}

export default GradientView
