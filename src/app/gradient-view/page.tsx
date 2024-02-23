"use client"

import { useMakUi } from "../_hooks/useMakUi/context/MakUiContext"
import { mak } from "../_hooks/useMakUi/elements/ts/mak"
import styled from "@emotion/styled"

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
      <mak.span makClassName="flex h-20 w-80 bg-gradient-to-r from-tertiary-700 light:from-danger-500 dark:hover:from-info " />
    </div>
  )
}

export default GradientView
