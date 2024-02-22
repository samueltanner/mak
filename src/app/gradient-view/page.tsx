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
const StyledGradient = styled.button({
  "@media (min-width: 768px)": {
    "&.md\\:hover\\:focus\\:bg-primary-500:hover:focus": {
      backgroundColor: "#731AFF",
    },
  },

  "&.disabled\\:bg-warning-500:disabled": {
    backgroundColor: "#FFCC66",
  },
})

const GradientView = () => {
  const { verboseTheme } = useMakUi()

  return (
    <div className="group flex h-full w-full items-center justify-center flex-col gap-4">
      tw
      <span className="flex h-20 w-80 bg-gradient-to-r from-purple-500 from-[-100%]" />
      {/* mak */}
      {/* <mak.span makClassName="flex h-20 w-full bg-gradient-to-r from-indigo-500 from-20% via-sky-500 via-30% to-emerald-500 to-90%" /> */}
      {/* styled
      <mak.span
        className="fade-in-out flex h-20 w-80"
        makClassName="bg-gradient-to-r from-primary-500 from-10% to-dark-200 to-80%"
        // makClassName="bg-primary :bg-secondary"
      /> */}
      styled 2
      <mak.span makClassName="flex h-20 w-80 bg-gradient-to-r from-tertiary-700 light:from-danger-500 dark:hover:from-info" />
      {/* styled gradient */}
      <StyledGradient className="flex h-20 w-80 bg-blue-500 md:hover:focus:bg-primary-500 focus:border-[4px]">
        hi
      </StyledGradient>
    </div>
  )
}

export default GradientView
